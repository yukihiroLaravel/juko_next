import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

type Props = {
  courseCount: number;
  register: (
    name: 'capacity',
    options: { setValueAs: (value: string) => number | undefined },
  ) => Record<string, unknown>;
  error?: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  confirmAction: 'update' | 'delete' | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function InstructorCourseBulkCapacityUI({
  courseCount,
  register,
  error,
  onSubmit,
  onDelete,
  confirmAction,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">講座定員一括変更</h1>
      <p>対象講座：{courseCount}件</p>
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6 rounded-md border bg-white p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="bulk-capacity">講座定員</Label>
          <Input
            id="bulk-capacity"
            type="number"
            min={1}
            step={1}
            placeholder="上限なし"
            {...register('capacity', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={onDelete}>
            削除
          </Button>
          <Button type="submit">更新</Button>
        </div>
      </form>
      {confirmAction && (
        <div
          role="dialog"
          aria-label="確認"
          className="fixed inset-0 grid place-items-center bg-black/30"
        >
          <div className="space-y-4 rounded-md bg-white p-6">
            <p>本当に実行しますか？</p>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel}>
                キャンセル
              </Button>
              <Button type="button" onClick={onConfirm}>
                {confirmAction === 'delete' ? '削除する' : '更新する'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
