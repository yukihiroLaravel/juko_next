# ADR-FE-0002 非同期の状態を Async React の考え方で扱う

## ステータス

承認済み (2026-09-28)

## 背景

読み込み中と取得の失敗の書き方が2通り混在していた。講座一覧とプロフィールは SWR を `suspense: true` で呼んで Suspense と ErrorBoundary に任せ、講座詳細とレッスンの部品は `isLoading` と `error` で分岐していた。同じ種類の失敗が画面によって違う形で出るうえ、エージェントがどちらに合わせるかを決められない。

候補は (a) Async React の考え方に統一する・(b) `isLoading` と `error` の分岐に統一する・(c) 画面ごとに既存へ合わせる、である。

Async React は、待つこと（Suspense）・失敗すること（ErrorBoundary）・前の表示を残して更新すること（transition）・送信中と楽観的な表示（Actions・`useOptimistic`）を React の仕組みに任せ、部品の中に状態の分岐を書かない考え方である。

## 決定

非同期の状態は Async React の考え方で扱う。読み込み中は Suspense、取得の失敗は ErrorBoundary、取り直している間は transition に任せる。Suspense が合わない場面は例外として個別に検討する。

## 理由

- 読み込み中と失敗の表示を境界の位置だけで決められる。部品ごとに分岐を書くと、書き忘れた部品で空白の画面が出る
- Container が「データがある前提」で書けるため、分岐が減り、テストも状態ごとの差し替えが少なくなる
- 取り直すたびに代替表示へ戻る問題は transition で避けられる。分岐型を選ぶ理由の多くがこれで解消する
- React 19 は Actions・`useOptimistic`・`useActionState` を備えており、送信中の状態も同じ考え方で扱える
- (b) は不採用とした。状態の分岐が部品ごとに増え、表示の一貫性を規約とレビューだけで保つことになる
- (c) は不採用とした。混在が続き、新しい画面でどちらを選ぶかの判断が毎回要る

## 影響

- 分岐型で書かれた既存の部品は、その部品を修正するときに移す。一括では作り替えない
- 認証まわり（ログイン中の利用者の取得）は、未ログイン時の画面の振り分けを伴うため例外の候補として残し、扱いは別に決める
- 例外の扱いが決まったら `docs/architecture/coding-standards.md` の「非同期の状態」に書き足す
- 送信の失敗は ErrorBoundary に投げず、これまでどおり送信のフックが結果を値で返す

## 関連文書

- `docs/architecture/coding-standards.md`
- `docs/architecture/convention-checks.md`
