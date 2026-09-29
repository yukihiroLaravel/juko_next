#!/usr/bin/env node
//
// 規約の検査。docs/architecture/convention-checks.md の区分 A のうち、
// ESLint で判定しないもの（テストの書き方とドキュメント）をここで判定する。
//
// 使い方
//   node scripts/check-conventions.mjs            作業中に見るものだけ
//   node scripts/check-conventions.mjs --merge    取り込む前に全部見る
//   node scripts/check-conventions.mjs --quiet    違反があるときだけ出す
//
// 違反があれば終了コード 1 を返し、場所と直し方を出す。

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const args = new Set(process.argv.slice(2));
const merge = args.has('--merge');
const quiet = args.has('--quiet');

// バックエンドの docs/。未確定事項（Q-NNN）と機能の受け入れ基準はここにある。
// リポジトリを単体で取得した環境では存在しないため、無ければその検査を飛ばす。
const backendDocs = path.resolve(root, '../../backend/laravelapp/docs');

const violations = [];
const report = (id, file, line, message) =>
  violations.push({ id, file: path.relative(root, file), line, message });

function walk(dir, predicate) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (name === 'node_modules' || name.startsWith('.')) return [];
    if (statSync(full).isDirectory()) return walk(full, predicate);
    return predicate(full) ? [full] : [];
  });
}

const lineOf = (text, index) => text.slice(0, index).split('\n').length;
const hasJapanese = (s) => /[぀-ヿ一-鿿]/.test(s);

const testFiles = walk(path.join(root, 'src'), (f) => /\.test\.tsx?$/.test(f));
const docFiles = walk(path.join(root, 'docs'), (f) => f.endsWith('.md'));
// 規約そのものと雛形は、禁止した書き方や仮の ID を例として含むため対象から外す
const isRuleOrTemplate = (f) =>
  /documentation-rules\.md$|template\.md$|convention-checks\.md$|coding-standards\.md$/.test(
    f,
  );

// 受け入れ基準の定義を集める。定義は番号付きの箇条書きの先頭に ID を置く形である
function collectDefinedIds(docsDir) {
  const ids = new Set();
  for (const file of walk(docsDir, (f) => f.endsWith('.md'))) {
    for (const m of readFileSync(file, 'utf8').matchAll(
      /^\s*\d+\.\s+`(AC-[A-Z]+-\d{3})`/gm,
    )) {
      ids.add(m[1]);
    }
    for (const m of readFileSync(file, 'utf8').matchAll(
      /^#{2,4}\s+(Q-\d{3})/gm,
    )) {
      ids.add(m[1]);
    }
  }
  return ids;
}

const definedIds = new Set([
  ...collectDefinedIds(path.join(root, 'docs/specs')),
  ...collectDefinedIds(path.join(backendDocs, 'specs')),
  ...collectDefinedIds(path.join(backendDocs, 'domain')),
]);
const canResolveBackend = existsSync(backendDocs);

// バックエンドの機能仕様の接頭辞。画面仕様の接頭辞はこれらと重ねない（docs/specs/README.md）
const backendPrefixes = [
  'COMMON',
  'AUTHZ',
  'ACCOUNT',
  'AUTHOR',
  'ENROLL',
  'PROG',
  'ANALYTICS',
  'NOTIF',
  'TAG',
];
const isBackendId = (id) =>
  id.startsWith('Q-') || backendPrefixes.includes(id.split('-')[1]);

// テスト

for (const file of testFiles) {
  const text = readFileSync(file, 'utf8');
  const blocks = [...text.matchAll(/\b(it|test)\(\s*(['"`])(.*?)\2/g)];

  blocks.forEach((m, i) => {
    const line = lineOf(text, m.index);
    const title = m[3];
    const body = text.slice(m.index, blocks[i + 1]?.index ?? text.length);

    // CHK-TEST-02
    const missing = ['Arrange', 'Act', 'Assert'].filter(
      (w) => !new RegExp(`//\\s*${w}\\b`).test(body),
    );
    if (missing.length > 0) {
      report(
        'CHK-TEST-02',
        file,
        line,
        `「${title}」に ${missing.join('・')} のコメントがない。// Arrange・// Act・// Assert で区切る。`,
      );
    }

    // CHK-TEST-03
    if (!hasJapanese(title)) {
      report(
        'CHK-TEST-03',
        file,
        line,
        `テスト名「${title}」を日本語にする。利用者と業務の言葉で、何をしたら何が起きるかを書く。`,
      );
    }
  });

  for (const m of text.matchAll(/\bdescribe\(\s*(['"`])(.*?)\1/g)) {
    if (!hasJapanese(m[2])) {
      report(
        'CHK-TEST-03',
        file,
        lineOf(text, m.index),
        `describe「${m[2]}」を日本語にする。画面や部品の呼び名で書く。`,
      );
    }
  }
}

// 参照している ID が実在するか（テストのコメントと docs/ の本文）

for (const file of [...testFiles, ...docFiles]) {
  if (isRuleOrTemplate(file)) continue;
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\b(AC-[A-Z]+-\d{3}|Q-\d{3})\b/g)) {
    const id = m[1];
    if (definedIds.has(id)) continue;
    // コード中の TODO(Q-NNN) は下の CHK-DOC-05 で見る
    if (id.startsWith('Q-') && testFiles.includes(file)) continue;
    // バックエンドの ID は、バックエンドの docs/ が手元にあるときだけ判定する
    if (!canResolveBackend && isBackendId(id)) continue;
    // CHK-TEST-04・CHK-DOC-04
    report(
      file.includes('/src/') ? 'CHK-TEST-04' : 'CHK-DOC-04',
      file,
      lineOf(text, m.index),
      `${id} が docs/specs/ にもバックエンドの docs/ にも定義されていない。ID を直すか、先に仕様へ追加する。`,
    );
  }
}

// TODO(Q-NNN) の記録が実在するか

if (canResolveBackend) {
  for (const file of walk(path.join(root, 'src'), (f) => /\.tsx?$/.test(f))) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(/TODO\((Q-\d{3})\)/g)) {
      if (definedIds.has(m[1])) continue;
      // CHK-DOC-05
      report(
        'CHK-DOC-05',
        file,
        lineOf(text, m.index),
        `${m[1]} がバックエンドの docs/domain/open-questions.md にない。先に未確定事項として記録する。`,
      );
    }
  }
}

// ドキュメント

for (const file of docFiles) {
  const name = path.basename(file);
  const text = readFileSync(file, 'utf8');

  // CHK-DOC-06
  if (
    merge &&
    file.includes(`${path.sep}docs${path.sep}changes${path.sep}`) &&
    name !== 'template.md'
  ) {
    report(
      'CHK-DOC-06',
      file,
      1,
      '起票が残っている。恒久文書へ反映したうえでファイルごと削除する。',
    );
  }

  // CHK-DOC-08
  if (/(_v\d+|_old|_\d{8})\.md$/.test(name)) {
    report(
      'CHK-DOC-08',
      file,
      1,
      '版を分けたファイルを作らない。元の文書を上書きし、履歴は Git に任せる。',
    );
  }

  if (isRuleOrTemplate(file)) continue;

  // CHK-DOC-07（コードブロックの中は見ない）
  let inCode = false;
  text.split('\n').forEach((line, i) => {
    if (/^\s*```/.test(line)) inCode = !inCode;
    if (inCode) return;
    if (/\*\*[^*]+\*\*/.test(line)) {
      report(
        'CHK-DOC-07',
        file,
        i + 1,
        '太字記法を使わない。強調は見出しと表で表す。',
      );
    }
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line) && i > 0) {
      report(
        'CHK-DOC-07',
        file,
        i + 1,
        '区切り線を使わない。見出しの階層で区切る。',
      );
    }
  });
}

// 結果

if (violations.length === 0) {
  if (!quiet) {
    console.log(
      `規約の検査を通過した（テスト ${testFiles.length} ファイル・文書 ${docFiles.length} ファイル${merge ? '・取り込み前の検査を含む' : ''}）。`,
    );
  }
  process.exit(0);
}

for (const v of violations) {
  console.error(`${v.id} ${v.file}:${v.line} ${v.message}`);
}
console.error(
  `\n規約の違反が ${violations.length} 件ある。判定の一覧は docs/architecture/convention-checks.md にある。`,
);
process.exit(1);
