import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';

type ChapterAccordionUIProps = {
  title: string;
  isOpen: boolean;
  completedLessonCount: number;
  totalLessonCount: number;
  onToggle: () => void;
  children: React.ReactNode;
};

export function ChapterAccordionUI({
  title,
  isOpen,
  completedLessonCount,
  totalLessonCount,
  onToggle,
  children,
}: ChapterAccordionUIProps) {
  return (
    <div className="mb-2 rounded border">
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
        <span className="font-medium">{title}</span>
        <span
          className={cn('text-sm', isOpen ? 'text-gray-200' : 'text-gray-500')}
        >
          {completedLessonCount} / {totalLessonCount} 完了
        </span>
      </Button>

      {/* Body */}
      {isOpen && <div className="pl-4">{children}</div>}
    </div>
  );
}
