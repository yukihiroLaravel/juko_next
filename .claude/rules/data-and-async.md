---
paths:
  - 'src/**/*.ts'
  - 'src/**/*.tsx'
---

# データの取得と送信、非同期の状態

## データの取得と送信

- 取得は SWR のフックに包み、`features/<ドメイン>/hooks/use<対象>.ts` に置く。SWR は `suspense: true` で呼び、フックは画面で使う形の値（`attendanceDetail`）だけを返す。`isLoading` と `error` は返さない
- SWR のキーは `utils/swrKeys.ts` に関数で置く。取得と再検証で同じキーを使うためである
- 送信は `use<処理>.ts` のフックに包み、`{ success: true }` か `{ success: false, error: <利用者向けの文言> }` を返す。例外を Container へ投げない（CHK-DATA-01）
- 送信が成功したら、影響する取得のキーを `mutate` で再検証する
- 利用者向けのエラーの文言はフックで決める。Container と Presentational で HTTP の状態コードを見ない
- 応答の型は `types/` に置き、画面の形への変換は `utils/map<元>To<先>.ts` に置く。Presentational に応答の型をそのまま渡さない
- 応答の型は `api.json` だけを信じて作らない。バックエンドの Resource と、実際に API を呼んだ応答で形を確かめる

## 非同期の状態

Async React の考え方を採る（ADR-FE-0002）。待つこと・失敗すること・前の表示を残すことを、部品の中の分岐ではなく React の仕組みに任せる。

| 状態             | 受け持つもの                                                      |
| ---------------- | ----------------------------------------------------------------- |
| 読み込み中       | Suspense の代替表示（`<部品>.skeleton.tsx`）                      |
| 取得の失敗       | ErrorBoundary の代替表示                                          |
| 取り直している間 | transition（`useTransition`・`useDeferredValue`）で前の表示を残す |
| 0件              | Container。空であることを Presentational へ渡して表示する         |

読み込み中・取得の失敗・0件の3つは、どの画面でも必ず表示を決める（CHK-DATA-02）。

### 取得

- Container で `isLoading`・`error` による分岐を書かない（CHK-DATA-03）
- Suspense と ErrorBoundary は、ページか、失敗しても残りの画面が使える区画の単位で置く。ErrorBoundary を Suspense の外側にする
- ErrorBoundary の代替表示には、何が失敗したかと再試行の手段を置く
- 検索の条件やタブを変えて取り直すときは、条件の更新を `startTransition` で包むか、条件を `useDeferredValue` で遅らせる。代替表示へ戻さず前の結果を残し、取り直していることは `isPending` で示す

### 送信

- 送信の失敗は ErrorBoundary に投げない。送信のフックが結果を値で返し、操作した場所の近くに出す
- 新しく書く送信は、送信中の状態を `useState` で持たず、`useTransition` の `isPending`（React の Actions）で表す。フォームは `useActionState` を使ってよい
- 成功を待たずに表示を変えたいときは `useOptimistic` を使う。失敗したときは React が元の表示に戻す

既存の送信のフックは送信中の状態を `useState` で持っている。そのフックを直すときに移す。

### 既存コードとの差異

講座詳細とレッスンの部品（チャプター一覧・レッスン・各サイドバー・進捗のまとめ・パンくず）は、`isLoading` と `error` で分岐している。その部品を直すときに Suspense と ErrorBoundary へ移す。

### 例外

Suspense が合わない使い方もありうる。そう見えたときは、自分で判断して `isLoading` の分岐で書かず、プランの「承認の前に決めてほしいこと」に書く。扱いが決まったらこの節に書き足す。

検討が要りそうな場面の例は次のとおりである。

- ログイン中の利用者の取得。未ログインなら別の画面へ移す判定を伴い、今は認証の確認とヘッダーが `isLoading` で分岐している。扱いが決まるまで移さない
- 取得するかどうかが操作によって決まり、キーが `null` になる間の表示
- 画面の一部だけを、画面の他の部分より後から表示したいとき
