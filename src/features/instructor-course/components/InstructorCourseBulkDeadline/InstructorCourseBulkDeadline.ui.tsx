import type { Control, FieldValues, Path } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import {
  DeadlineFields,
  type DeadlineType,
} from '../DeadlineFields/DeadlineFields';

type Props<T extends FieldValues> = {
  courseCount: number;
  control: Control<T>;
  deadlineTypeName: Path<T>;
  fixedDateName: Path<T>;
  relativeDaysName: Path<T>;
  fixedDateError?: string;
  relativeDaysError?: string;
  onDeadlineTypeChange: (value: DeadlineType) => void;
  onFixedDateChange: (value: string) => void;
  onRelativeDaysChange: (value: number) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
  confirmAction: 'update' | 'delete' | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function InstructorCourseBulkDeadlineUI<T extends FieldValues>({
  courseCount,
  control,
  deadlineTypeName,
  fixedDateName,
  relativeDaysName,
  fixedDateError,
  relativeDaysError,
  onDeadlineTypeChange,
  onFixedDateChange,
  onRelativeDaysChange,
  onSubmit,
  onDelete,
  confirmAction,
  onConfirm,
  onCancel,
}: Props<T>) {
  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">受講期限一括変更</h1>
      <p>対象講座：{courseCount}件</p>
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6 rounded-md border bg-white p-6"
      >
        <DeadlineFields
          control={control}
          deadlineTypeName={deadlineTypeName}
          fixedDateName={fixedDateName}
          relativeDaysName={relativeDaysName}
          onDeadlineTypeChange={onDeadlineTypeChange}
          onFixedDateChange={onFixedDateChange}
          onRelativeDaysChange={onRelativeDaysChange}
          fixedDateError={fixedDateError}
          relativeDaysError={relativeDaysError}
          idPrefix="bulk-deadline"
        />
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
