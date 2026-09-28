---
name: nextjs-best-practices
description: >-
  React 19・Next.js 16（App Router）・SWR・React Hook Form・zod・shadcn/ui・Tailwind CSS で
  コードを書く、レビューする、リファクタリングするときに使う汎用のベストプラクティス集。
  部品の分け方、状態と useEffect、データの取得と更新、Suspense と ErrorBoundary、
  フォームと入力の検証、Server Component と Client Component の境界、アクセシビリティ、
  スタイル、描画の性能、React Testing Library でのテストを扱う。
  .tsx・.ts を新しく書くとき、既存の部品を直すとき、フロントエンドのコードをレビューするときに発火する。
---

# React と Next.js のベストプラクティス

関心ごとごとにルールファイルを分けた索引である。各ルールファイルは、何をするかとその理由を書いている。API の正確な書き方は、入っている版の公式ドキュメントで確かめる。

## 既存に合わせることを先にする

どのルールを当てるよりも先に、このリポジトリがすでにどう書いているかを確かめる。React と Next.js には正しい書き方が複数あり、最良の選択はコードベースがすでに使っているものである。理屈の上でより良い書き方があっても、書き方が混ざるほうが悪い。

隣の部品・同じドメインのフック・近い画面のテストを見る。確立した書き方があればそれに従い、2つ目の書き方を持ち込まない。ここのルールは、既存に書き方がないときの既定であり、既存を上書きするものではない。

プロジェクト固有の規約は `docs/architecture/coding-standards.md` にあり、このスキルと衝突したらそちらを優先する。

## 当て方

1. 変更するファイル・近くのコード・関係するテストを見て、確立した書き方を確かめる。正しさか安全性の欠陥があるときだけ逸れ、逸れたことを伝える
2. 変更が関わる関心ごとを下の索引に対応させ、対応したルールファイルを編集の前に読む。関係のないルールファイルは読まない
3. 筋の通る最小の変更にする。既存の構成と命名を保ち、同じ仕事に2つ目の書き方を持ち込まない
4. 版によって違う API（Next.js の `params`・キャッシュ、React 19 の新しいフック）は、入っている版で確かめる
5. 狭いテストから先に走らせ、そのあと検査と型検査を走らせる
6. 終える前に、対応させたルールすべてに照らして差分を読み直す

## ルールの索引

横断的な変更では、複数のルールファイルが要ることが多い。

| 関心ごと                                          | 読む                                                       |
| ------------------------------------------------- | ---------------------------------------------------------- |
| 部品の分け方・props の設計・合成                  | [`rules/component-design.md`](rules/component-design.md)   |
| 状態の置き場・派生値・useEffect を使わない書き方  | [`rules/state-and-effects.md`](rules/state-and-effects.md) |
| SWR での取得・キー・再検証・送信のあとの更新      | [`rules/data-fetching.md`](rules/data-fetching.md)         |
| 読み込み中・失敗・0件、Suspense と ErrorBoundary  | [`rules/async-states.md`](rules/async-states.md)           |
| React Hook Form と zod・サーバーからのエラー      | [`rules/forms.md`](rules/forms.md)                         |
| App Router・Server と Client の境界・ルーティング | [`rules/app-router.md`](rules/app-router.md)               |
| ラベル・役割・キーボード操作・フォーカス          | [`rules/accessibility.md`](rules/accessibility.md)         |
| Tailwind CSS・shadcn/ui・`cn()`                   | [`rules/styling.md`](rules/styling.md)                     |
| 再描画・React Compiler・リストの key・重い部品    | [`rules/performance.md`](rules/performance.md)             |
| React Testing Library・フックの差し替え・探し方   | [`rules/testing.md`](rules/testing.md)                     |

## 判断の原則

- 新しい補助関数や依存より、フレームワークの機能と既存の抽象を優先する
- 先回りの抽象化をしない。取り出すのは、境界がはっきりするとき、意味のある重複が消えるとき、振る舞いを単独で確かめられるようになるときだけにする
- 値は計算で出せるなら状態にしない。外部と同期する必要がないなら useEffect を使わない
- 表示の部品にデータの取得を持ち込まない
