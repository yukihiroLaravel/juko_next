# スタイル（Tailwind CSS と shadcn/ui）

## shadcn/ui

- 部品は `pnpm dlx shadcn@latest add <部品>` で `components/ui/` に生成する。生成物は必要なら直してよいが、このリポジトリでは `components/atoms/` で再公開してから使う
- 生成された部品の variant（`variant="outline"`・`size="sm"`）で足りるなら、クラスを足して上書きしない
- 同じ上書きが繰り返し現れたら、variant を足す

## Tailwind CSS

- クラスの結合と条件付きの付け外しは `cn()`（`@/lib/utils`）で行う。文字列の連結で書かない
- 色は `bg-primary`・`text-muted-foreground` のようなテーマの変数を使う。`#` の色や `text-gray-500` を新たに直書きしない
- 任意の値（`w-[327px]`）を避け、目盛りの値を使う
- クラスの並びは Prettier の Tailwind プラグインに任せる

## 避けること

- インラインの `style` で見た目を決める。動的に計算する値（進捗の幅など）だけに使う
- 見た目のためだけに部品の props を増やす。`className` を受けて `cn()` で合成する
