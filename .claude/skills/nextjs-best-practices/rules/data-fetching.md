# データの取得と更新（SWR）

## 取得

- 取得はフックに包む。部品の中で `useSWR` を直接呼ばない
- フックは画面で使う名前で値を返す（`data` ではなく `attendanceDetail`）
- キーは関数で作り、1か所に置く。取得と再検証で同じキーを使うためである
- 取得してはいけない条件（ID がまだない）ではキーを `null` にする。フックの中で条件分岐して `useSWR` を呼び分けない
- 応答の型をジェネリクスで渡す。`any` で受けない

```ts
export function useAttendanceDetail(attendanceId: string) {
  const { data, error, isLoading } = useSWR<AttendanceDetailResponse>(
    attendanceDetailKey(attendanceId),
    fetcher,
  );
  return { attendanceDetail: data?.data, error, isLoading };
}
```

## 送信と更新

- 送信はフックに包み、結果を値で返す（`{ success: true }` か `{ success: false, error }`）。部品に例外の扱いをさせない
- 送信が成功したら、影響する取得のキーを `mutate(key)` で再検証する。影響する画面を思い出して並べる
- 送信中の状態をフックで持ち、二重送信を防ぐ
- 楽観的更新（成功を待たずに表示を変える）は、失敗時に戻す処理とセットでなければ使わない

## エラー

- HTTP の状態コードを利用者向けの文言に変えるのはフックの責任である。部品で状態コードを見ない
- 401・403・404 は再試行しても直らない。再試行しない
- 取得の失敗と、0件であることを区別する。失敗を空の配列で覆い隠さない

## 避けること

- useEffect の中で axios を呼んで useState に入れる。キャッシュ・重複の排除・再検証を失う
- 同じデータを複数のキーで取る。キャッシュが分かれて表示が食い違う
