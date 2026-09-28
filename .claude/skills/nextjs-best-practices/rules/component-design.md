# 部品の設計

## 役割で分ける

- データと振る舞いを持つ部品（Container）と、受け取った値を表示する部品（Presentational）を分ける
- Presentational は props だけで表示が決まるようにする。同じ props なら同じ表示になる
- Presentational が持ってよい状態は、開閉やホバーのような UI の一時的なものだけである

## props

- props は表示に必要な形で渡す。API の応答をそのまま渡さず、Container で変換してから渡す
- 真偽値の props は `is`・`has`・`can` で始め、何が真なのかを名前で表す（`isExpired`・`canComplete`）
- コールバックは `on<出来事>` とし、何が起きたかを表す（`onComplete`・`onPageChange`）。どう処理するかの名前（`handleClick`）を props にしない
- 選択肢が限られる値は文字列の合併型にする（`'asc' | 'desc'`）。真偽値を2つ並べて4通りの組み合わせを作らない
- 省略できる props を増やしすぎない。省略時の振る舞いが複数あるなら部品を分ける

## 合成

- 部品が大きくなったら、条件分岐を props で増やすより、中身を `children` や別の部品に分ける
- 同じ見た目の分岐が3か所以上に現れたら部品に取り出す。2か所なら重複のままでよい
- 部品の中で別の部品を定義しない。描画のたびに別の部品として扱われ、状態が失われる

## 命名とファイル

- 部品名は何を表示するかで付ける（`LessonItem`・`ProgressSummary`）。どこに置くかで付けない（`LeftPanel`）
- 1ファイル1部品を基本とし、ファイル名と部品名を揃える
- 名前付き export を使う。default export はページとレイアウトなど Next.js が求める箇所だけにする
