import { useFormState, type UseFormReturn } from 'react-hook-form';
import type { BulkCapacitySchema } from '../../validation/BulkCourseSettingsSchema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/atoms/Dialog';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';

type Props = {
  courseCount: number;
  form: UseFormReturn<BulkCapacitySchema>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  confirmAction: 'update' | 'delete' | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function InstructorCourseBulkCapacityUI({
  courseCount,
  form,
  onSubmit,
  onDelete,
  confirmAction,
  onConfirm,
  onCancel,
}: Props) {
  const { errors } = useFormState({ control: form.control });
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
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
            max={100}
            step={1}
            placeholder="上限なし"
            {...form.register('capacity', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
          {errors.capacity && (
            <p className="text-sm text-red-600">{errors.capacity.message}</p>
          )}
        </div>
        <div className="flex justify-end gap-3">
          <Button type="button" variant="destructive" onClick={onDelete}>
            削除
          </Button>
          <Button type="submit">更新</Button>
        </div>
      </form>
      <Dialog
        open={confirmAction !== null}
        onOpenChange={(open) => !open && onCancel()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {confirmAction === 'delete' ? '削除の確認' : '更新の確認'}
            </DialogTitle>
            <DialogDescription>{`${courseCount}件の講座の定員を${confirmAction === 'delete' || form.getValues('capacity') === undefined ? 'なくします' : `${form.getValues('capacity')}に変更します`}。本当に実行しますか？`}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              キャンセル
            </Button>
            <Button
              type="button"
              variant={confirmAction === 'delete' ? 'destructive' : 'default'}
              onClick={onConfirm}
            >
              {confirmAction === 'delete' ? '削除する' : '更新する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
