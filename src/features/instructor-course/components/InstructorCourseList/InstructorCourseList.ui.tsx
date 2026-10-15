import { type KeyboardEvent, type ReactNode } from 'react';
import { Button } from '@/components/atoms/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/DropdownMenu';
import { Input } from '@/components/atoms/Input';
import { Switch } from '@/components/atoms/Switch';
import { bulkActionLabels, type BulkAction } from '../../types/bulkAction';

type InstructorCourseListUIProps = {
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSearchKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  isClassificationEnabled: boolean;
  onClassificationChange: (checked: boolean) => void;
  onBulkAction: (action: BulkAction) => void;
  onRegister: () => void;
  hasVisibleSelection: boolean;
  confirmDialog: {
    title: string;
    description: string;
    confirmLabel: string;
    isDestructive: boolean;
  } | null;
  onConfirmBulkAction: () => void;
  onCancelBulkAction: () => void;
  listContent: ReactNode;
};

export function InstructorCourseListUI({
  searchKeyword,
  onSearchKeywordChange,
  onSearchSubmit,
  onSearchKeyDown,
  isClassificationEnabled,
  onClassificationChange,
  onBulkAction,
  onRegister,
  hasVisibleSelection,
  confirmDialog,
  onConfirmBulkAction,
  onCancelBulkAction,
  listContent,
}: InstructorCourseListUIProps) {
  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">講座一覧</h1>
        <Button onClick={onRegister}>講座を登録</Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Input
          aria-label="講座検索"
          className="max-w-md"
          placeholder="講座名・分類名で検索"
          type="search"
          value={searchKeyword}
          onChange={(event) => onSearchKeywordChange(event.target.value)}
          onKeyDown={onSearchKeyDown}
          onBlur={onSearchSubmit}
        />

        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={isClassificationEnabled}
            onCheckedChange={onClassificationChange}
          />
          分類表示
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">一括変更</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('publish')}
            >
              {bulkActionLabels.publish}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('unpublish')}
            >
              {bulkActionLabels.unpublish}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('clearDeadline')}
            >
              {bulkActionLabels.clearDeadline}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('delete')}
            >
              {bulkActionLabels.delete}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('deadline')}
            >
              {bulkActionLabels.deadline}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('clearCapacity')}
            >
              {bulkActionLabels.clearCapacity}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('capacity')}
            >
              {bulkActionLabels.capacity}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {listContent}

      <Dialog
        open={confirmDialog !== null}
        onOpenChange={(open) => !open && onCancelBulkAction()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirmDialog?.title}</DialogTitle>
            <DialogDescription>{confirmDialog?.description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={onCancelBulkAction}>
              キャンセル
            </Button>
            <Button
              variant={confirmDialog?.isDestructive ? 'destructive' : 'default'}
              onClick={onConfirmBulkAction}
            >
              {confirmDialog?.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
