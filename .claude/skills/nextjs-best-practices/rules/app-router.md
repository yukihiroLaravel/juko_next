# App Router

## Server Component と Client Component

- 既定は Server Component である。状態・イベント・ブラウザの API・SWR を使う部品だけに `'use client'` を付ける
- `'use client'` は境界に付ける。その部品から import されるものはすべてクライアント側になる
- Server Component から Client Component へ渡す props は直列化できる値だけにする。関数や class のインスタンスは渡せない
- このリポジトリの画面は、Cookie 認証の API をブラウザから呼ぶため、ほとんどが Client Component である。既存の画面に合わせる

## ルーティング

- 利用者の区分ごとのレイアウトは route group（`(student)`・`(instructor)`）で分ける
- 動的な区間の値は、Client Component では `useParams` で受け取る。Server Component で受け取るときは、Next.js 16 では `params` が Promise であることに注意する
- 画面のパスは1か所で組み立てる関数から取る。文字列を各所で連結しない
- 画面の移動は `<Link>` を使う。処理のあとに移動するときだけ `useRouter().push` を使う

## 特別なファイル

| ファイル        | 役割                                                      |
| --------------- | --------------------------------------------------------- |
| `layout.tsx`    | 画面をまたいで残る枠。移動しても状態が保たれる            |
| `page.tsx`      | その URL の画面。部品を並べるだけにする                   |
| `loading.tsx`   | 区間全体の読み込み中の表示                                |
| `error.tsx`     | 区間全体の失敗の表示。Client Component でなければならない |
| `not-found.tsx` | 見つからないときの表示                                    |

## 環境変数

- ブラウザで読む値は `NEXT_PUBLIC_` で始める。秘密の値に `NEXT_PUBLIC_` を付けない
- 環境変数は1か所で読み、既定値もそこで決める
