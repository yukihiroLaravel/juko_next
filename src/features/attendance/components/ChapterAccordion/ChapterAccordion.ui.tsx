import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

type ChapterAccordionUIProps = {
  title: string;
  isOpen: boolean;
  completedLessonCount: number;
  totalLessonCount: number;
  onToggle: () => void;
  onCompleteAllLessons: () => void;
  isCompletingAllLessons: boolean;
  children: React.ReactNode;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function ChapterAccordionUI({
  title,
  isOpen,
  completedLessonCount,
  totalLessonCount,
  onToggle,
  onCompleteAllLessons,
  isCompletingAllLessons,
  children,
  dragHandleProps,
}: ChapterAccordionUIProps) {
  return (
    <div className="rounded border">
      {/* Header */}
      <Button
        type="button"
        onClick={onToggle}
        className={cn(
          'flex w-full items-center justify-between px-4 py-2 transition-colors',
          isOpen
            ? 'bg-primary hover:bg-primary text-white hover:text-white'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200',
        )}
      >
        {/* ★ ドラッグハンドル */}
        <div
          {...dragHandleProps}
          className="cursor-grab text-gray-400"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="h-4 w-4" />
        </div>

        <span className="font-medium">{title}</span>
        <span
          className={cn('text-sm', isOpen ? 'text-gray-200' : 'text-gray-500')}
        >
          {completedLessonCount} / {totalLessonCount} 完了
        </span>
      </Button>

      {/* Body */}
      {isOpen && (
        <div className="space-y-2 p-2 pl-4">
          <div className="flex justify-end">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={onCompleteAllLessons}
              disabled={isCompletingAllLessons}
            >
              このチャプターの全レッスンを完了
            </Button>
          </div>
          {children}
        </div>
      )}
    </div>
  );
}
