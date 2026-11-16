---
paths:
  - 'src/**/*.tsx'
---

# 部品

部品の分け方と置き場を定める。React と Next.js の汎用的なベストプラクティスは `nextjs-best-practices` スキルにあり、衝突する場合は `.claude/rules/` を優先する。

既存コードには規約を決める前の書き方が残っている。新しく書くときと直すときに適用し、既存コードを一括で作り替えない。

## Container と Presentational

部品は原則として Container と Presentational に分ける。

| ファイル              | 役割             | 持ってよいもの                                                              |
| --------------------- | ---------------- | --------------------------------------------------------------------------- |
| `<部品>.tsx`          | Container        | 状態・データの取得と送信・変換・イベントの処理                              |
| `<部品>.ui.tsx`       | Presentational   | props で受けた値の表示・UI の一時的な状態（開閉・パスワードの表示切替など） |
| `<部品>.skeleton.tsx` | 読み込み中の表示 | 表示だけ                                                                    |
| `<部品>.test.tsx`     | テスト           | —                                                                           |

- Presentational はデータの取得と送信をしない。SWR・axios・ドメインのフックを呼ばない。型の参照はしてよい（CHK-UI-01）
- Presentational は業務の状態を持たない。業務の判定（期限切れか、完了できるか）は Container で行い、真偽値や文言で渡す（CHK-UI-02）
- ページ（`app/` の `page.tsx`）は Container を並べ、Suspense と ErrorBoundary で囲むだけにする。業務の処理を書かない

## 置き場

横断的に使うものは `src/` 直下、ドメイン固有のものは `src/features/<ドメイン>/` に置く。

```
src/features/<ドメイン>/
  components/<部品>/   部品ごとに1ディレクトリ
  hooks/               use<処理>.ts
  types/               API の応答の型
  utils/               map<元>To<先>.ts・swrKeys.ts
  validation/          <フォーム>Schema.ts
```

- ドメインをまたいで使うようになったら、`src/` 直下の共通ディレクトリへ移す。別のドメインの `features/` を参照しない（CHK-IMPORT-02）
- 画面のパスは `src/lib/routes.ts` の `routes` から取る。文字列で組み立てない

## 共通部品の腐敗防止層

shadcn/ui の部品は `components/ui/` に生成されるが、`features/` から直接参照しない。`components/atoms/` で再公開したものを使う（CHK-IMPORT-01）。

```
src/components/
  ui/button.tsx       shadcn/ui の生成物（直接参照しない）
  atoms/Button.tsx    ui/button を再公開する
```

shadcn/ui の部品を足したときは、同じ変更で `atoms/` に再公開のファイルを足す。

## 表示の文言

- 用語はバックエンドの `docs/domain/shared/glossary.md` に従う。画面の文言でも講座をコース、受講生を生徒と書かない
- 利用者向けの文言は日本語で書く

## アクセシビリティ

押して何かが起きるものは `<button>`、移動するものは `<Link>` にし、`<div onClick>` にしない。入力にはラベル、文字のないボタンには `aria-label`、画像には `alt` を付ける。すべての操作をキーボードだけでできるようにし、フォーカスの枠を消さない。

書き方の詳細は `nextjs-best-practices` スキルの `rules/accessibility.md` にある。ここで付けた役割とラベルは、テストで要素を探す手がかりにもなる。
