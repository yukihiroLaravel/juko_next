# テスト（Vitest と React Testing Library）

このリポジトリで何を確かめ、何を確かめないかは `docs/architecture/coding-standards.md` の「テスト」にある。ここには書き方の汎用的なルールを置く。

## 利用者のように探す

要素は、利用者に見える手がかりで探す。優先の順は次のとおりである。

1. `getByRole`（名前付き）: `getByRole('button', { name: 'ログイン' })`
2. `getByLabelText`: フォームの入力
3. `getByText`: 文言
4. `getByTestId`: 他で探せないときの最後の手段

クラス名・DOM の構造・部品の名前で探さない。見た目を変えただけでテストが落ちる。

## 取り出し方の使い分け

| 使う         | 場面                                                                   |
| ------------ | ---------------------------------------------------------------------- |
| `getBy...`   | 今そこにあるはずのもの                                                 |
| `findBy...`  | 操作や非同期の処理のあとに現れるもの                                   |
| `queryBy...` | ないことを確かめるとき（`expect(queryBy...).not.toBeInTheDocument()`） |

`waitFor` の中で操作をしない。`waitFor` は照合だけを包む。

## 操作

- `@testing-library/user-event` を使い、`userEvent.setup()` してから操作する
- `fireEvent` は使わない。利用者の操作に近い一連のイベントが起きない

## 差し替え

- 通信を切り離すときは、データのフックのモジュールを `vi.mock` で差し替え、`vi.mocked(useXxx).mockReturnValue(...)` で状態を与える
- 差し替えるのはフックの境界だけにする。部品の内側の関数を差し替えると、実装に縛られたテストになる
- `next/navigation` を使う部品は、`useRouter` などを `vi.mock('next/navigation')` で差し替える

## 照合

- `@testing-library/jest-dom` の照合を使う（`toBeInTheDocument`・`toBeDisabled`・`toHaveValue`）
- 1つのテストで確かめる振る舞いは1つにする。照合が複数でも、同じ振る舞いの別の面ならよい
- スナップショットを使わない。何を確かめているかが読めず、見た目の変更で落ちる
