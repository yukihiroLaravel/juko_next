# AGENTS.md

このファイルは、このリポジトリのコードを操作するエージェントへのガイダンスである。Claude Code は `CLAUDE.md` からこのファイルを読み込む。エージェントを問わず同じ内容が効くよう、指示はここに一本化する。

受講管理アプリのフロントエンドである。受講生・講師が使う画面を Next.js 16（App Router）と React 19 で実装し、Laravel のバックエンド API を呼ぶ。

このファイルは入口である。仕様と規約の実体は `docs/` にあり、ここには索引と、取り違えると壊れるものだけを置く。詳細をこのファイルに書き足さない。

## ドキュメントの索引

| 知りたいこと                         | 置き場                                                            |
| ------------------------------------ | ----------------------------------------------------------------- |
| 画面の振る舞い（受け入れ基準）       | `docs/specs/`                                                     |
| 技術構成・ディレクトリの構成         | `docs/architecture/overview.md`                                   |
| コーディング規約・テストの書き方     | `docs/architecture/coding-standards.md`                           |
| 規約の検査手段                       | `docs/architecture/convention-checks.md`                          |
| 設計判断の経緯                       | `docs/adr/`                                                       |
| これから作る変更の起票               | `docs/changes/template.md`                                        |
| ドキュメントの書き方                 | `docs/documentation-rules.md`                                     |
| 変更を実装するときの手順             | `.claude/skills/change-flow/SKILL.md`                             |
| 用語の意味・業務のルール・未確定事項 | バックエンドの `docs/domain/`（`../../backend/laravelapp/docs/`） |
| API の振る舞い・エンドポイント       | バックエンドの `docs/specs/features/`・`docs/architecture/api.md` |

全体の入口は `docs/README.md` にある。ID を見かけたら `grep -rn '<ID>' docs/ src/ ../../backend/laravelapp/docs/` で引く。

## 実装前に必ず押さえる

- `features/` から `components/ui/` を直接参照しない。`components/atoms/` を経由する
- `*.ui.tsx`（Presentational）でデータの取得と送信をしない。SWR・axios・ドメインのフックは Container で呼ぶ
- 送信のフックは `{ success, error }` を返し、例外を投げない。利用者向けのエラーの文言はフックで決める
- 読み込み中は Suspense、取得の失敗は ErrorBoundary に任せる（Async React の考え方・ADR-FE-0002）。部品の中で `isLoading`・`error` の分岐を書かない。0件の表示は必ず決める
- 画面の文言でも用語を揺らさない。講座をコース、受講生を生徒と書かない

## 用語

バックエンドの `docs/domain/shared/glossary.md` を唯一の正とする。講座・チャプター・レッスン・受講・受講状況の表記を揺らさない。

## よく使うコマンド

Node と pnpm は `mise.toml` で版を固定している。`scripts/run` がその版で実行する。エージェントのシェルでは mise が有効になっていないことがあるため、必ず `scripts/run` を通す。

```bash
# テスト（1ファイルだけなら末尾にパスを付ける）
scripts/run pnpm test
scripts/run pnpm test src/features/auth/components/LoginForm

# 検査
scripts/run pnpm lint
scripts/run pnpm type-check
scripts/run pnpm format:check
scripts/run pnpm check-conventions

# 整形
scripts/run pnpm format

# 開発サーバー（バックエンドを先に docker compose up -d で起動しておく）
scripts/run pnpm dev
```

規約の検査はファイルを書いた直後にも自動で走る。違反はその場で返るので、指摘されたら直してから次に進む。

## 進め方

コードに手を入れるときは `change-flow` スキルに従う。`/change-flow` でも呼べる。

実装は TDD で進める。勝手に先へ進まず、次の2か所で必ず依頼者の承認を取る。

1. 起票を書く前。変更する振る舞い・変更する範囲・対象外の3点を要点だけ提示する
2. 失敗するテストを書いたあと、実装に入る前。画面で何を確かめるかを利用者の言葉で提示する

2番目が仕様の確定点である。ここではテストのコードを見せない。依頼者には開発の経験が浅い者が多く、コードを見せると判断できないまま承認する形になるためである。

テストで確かめるのは、操作の結果と状態による出し分けだけである。API との通信と見た目は確かめない（ADR-FE-0001）。

作業ブランチは `feature/update-next-version` から切り、PR もこのブランチへ向けて出す。`main` へ向けない。コミットは意味のある単位に分ける。

## 実装のルール

- コーディング規約は `docs/architecture/coding-standards.md` に従う。React と Next.js の汎用的なベストプラクティスは `nextjs-best-practices` スキルを参照し、衝突する場合はプロジェクトの規約を優先する
- ドキュメントを書くときは `documentation-conventions` スキルと `docs/documentation-rules.md` に従う
- 依存を足すときは依頼者の承認を取る

## 仕様が不足しているとき

- まずバックエンドの `docs/domain/open-questions.md` を見る。未確定として記録済みかもしれない
- 記録があるならその暫定方針に従う。暫定で実装するときはコードに `TODO(Q-NNN)` を残す
- 記録がなく判断できないときは、勝手に決めずに確認する
- 画面が必要とする API がまだないときは、フロントエンドだけで先に進めてよいかを関門1で確認する
