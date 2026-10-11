import { useFormState, type UseFormReturn } from 'react-hook-form';
import type { BulkDeadlineSchema } from '../../validation/BulkCourseSettingsSchema';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/atoms/Dialog';
import { Button } from '@/components/atoms/Button';
import {
  DeadlineFields,
  type DeadlineType,
} from '../DeadlineFields/DeadlineFields';

type Props = {
  courseCount: number;
  form: UseFormReturn<BulkDeadlineSchema>;
  onDeadlineTypeChange: (value: DeadlineType) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  confirmAction: 'update' | 'delete' | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function InstructorCourseBulkDeadlineUI({
  courseCount,
  form,
  onDeadlineTypeChange,
  onSubmit,
  onDelete,
  confirmAction,
  onConfirm,
  onCancel,
}: Props) {
  const { errors } = useFormState({ control: form.control });
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">受講期限一括変更</h1>
      <p>対象講座：{courseCount}件</p>
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6 rounded-md border bg-white p-6"
      >
        <DeadlineFields
          control={form.control}
          deadlineTypeName="deadline_type"
          fixedDateName="fixed_date"
          relativeDaysName="relative_days"
          onDeadlineTypeChange={onDeadlineTypeChange}
          fixedDateError={errors.fixed_date?.message}
          relativeDaysError={errors.relative_days?.message}
          idPrefix="bulk-deadline"
        />
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
            <DialogDescription>{`${courseCount}件の講座の受講期限を${confirmAction === 'delete' || form.getValues('deadline_type') === 'none' ? 'なくします' : form.getValues('deadline_type') === 'fixed_date' ? `${form.getValues('fixed_date')}に変更します` : `開始日から${form.getValues('relative_days')}日後に変更します`}。本当に実行しますか？`}</DialogDescription>
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
