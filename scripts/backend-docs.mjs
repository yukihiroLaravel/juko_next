#!/usr/bin/env node
//
// バックエンドの docs/ の場所を求める。用語・業務ルール・未確定事項と API の受け入れ基準はここにある。
//
// 次の順に探し、最初に見つかった場所を使う。
//   1. 環境変数 JUKO_BACKEND_DOCS
//   2. このリポジトリの根から ../../backend/laravelapp/docs（laravel_next_docker の中で取得したとき）
//   3. git の共通ディレクトリから求めた本体の作業ツリーの根から ../../backend/laravelapp/docs
//      （worktree で作業しているとき。worktree の根からは 2 の相対パスが届かない）
// リポジトリを単体で取得した環境（継続的インテグレーションなど）では見つからず、null を返す。
//
// 使い方
//   node scripts/backend-docs.mjs     見つかった場所を出す。見つからなければ終了コード 1
//   import { findBackendDocs } from './backend-docs.mjs'

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const relative = '../../backend/laravelapp/docs';

function mainWorktreeRoot() {
  try {
    const commonDir = execFileSync(
      'git',
      ['rev-parse', '--path-format=absolute', '--git-common-dir'],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
    ).trim();
    return path.dirname(commonDir);
  } catch {
    return null;
  }
}

export function findBackendDocs() {
  const candidates = [
    process.env.JUKO_BACKEND_DOCS,
    path.resolve(root, relative),
    mainWorktreeRoot() && path.resolve(mainWorktreeRoot(), relative),
  ].filter(Boolean);

  return candidates.find((dir) => existsSync(dir)) ?? null;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = findBackendDocs();
  if (dir === null) {
    process.exit(1);
  }
  console.log(dir);
}
