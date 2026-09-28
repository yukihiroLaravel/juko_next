# 受講管理アプリ フロントエンド ドキュメント

受講管理アプリの画面を扱う。このディレクトリはフロントエンドの画面の仕様・実装の構成・意思決定の記録を置く。業務知識とバックエンド API の仕様はバックエンドの `docs/` にあり、ここには写さない。

## 索引

| 置き場                                                                 | 内容                                                     |
| ---------------------------------------------------------------------- | -------------------------------------------------------- |
| [documentation-rules.md](documentation-rules.md)                       | このプロジェクトでのドキュメント運用ルール               |
| [specs/](specs/README.md)                                              | 画面の仕様。画面ごとの振る舞い・状態・遷移と受け入れ基準 |
| [architecture/overview.md](architecture/overview.md)                   | 技術スタックと実装の構成                                 |
| [architecture/coding-standards.md](architecture/coding-standards.md)   | このプロジェクト固有のコーディング規約                   |
| [architecture/convention-checks.md](architecture/convention-checks.md) | 規約をどこまで機械で判定できるかの対応表                 |
| [adr/](adr/README.md)                                                  | 意思決定の記録                                           |
| [changes/template.md](changes/template.md)                             | 変更を起票するときの雛形                                 |

## バックエンドの docs/ との分担

| 知りたいこと                   | 置き場                                         |
| ------------------------------ | ---------------------------------------------- |
| 用語の意味・業務のルール       | バックエンドの `docs/domain/`                  |
| API の振る舞い（受け入れ基準） | バックエンドの `docs/specs/features/`          |
| エンドポイントの一覧           | バックエンドの `docs/architecture/api.md`      |
| 未確定事項                     | バックエンドの `docs/domain/open-questions.md` |
| 画面の振る舞い（受け入れ基準） | このリポジトリの `docs/specs/`                 |

バックエンドの `docs/` は、Docker 環境のリポジトリ（laravel_next_docker）の中で `../../backend/laravelapp/docs/` にある。用語と未確定事項は1か所に集めるため、フロントエンド側に別の用語集や未確定事項の一覧を作らない。

## 読む順序

1. バックエンドの `docs/domain/shared/glossary.md` — 講座・チャプター・レッスン・受講状況などの言葉の意味
2. [specs/README.md](specs/README.md) — 画面仕様の一覧と書き方
3. 関わる画面の仕様と、そこから参照しているバックエンドの受け入れ基準
4. [architecture/overview.md](architecture/overview.md) — それをどう実装しているか

実装に着手する前にバックエンドの `docs/domain/open-questions.md` を読む。未確定のまま動いている箇所があり、勝手に埋めると確定後に矛盾する。

## ID の引き方

| 見かけた ID                                  | 引く先                                                                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `AC-<画面の略称>-NNN`                        | このリポジトリの `docs/specs/screens/`（略称と画面の対応は [specs/README.md](specs/README.md)） |
| `AC-ENROLL-010` などバックエンドの機能の略称 | バックエンドの `docs/specs/features/`                                                           |
| `BR-SHARED-006`                              | バックエンドの `docs/domain/shared/business-rules.md`                                           |
| `Q-007`                                      | バックエンドの `docs/domain/open-questions.md`                                                  |
| `ADR-FE-0001`                                | [adr/README.md](adr/README.md)。接頭辞のない `ADR-0001` はバックエンドの `docs/adr/`            |

```bash
grep -rn 'AC-ENROLL-010' docs/ src/ ../../backend/laravelapp/docs/
```
