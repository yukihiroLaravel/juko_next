import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CheckCircle, Circle, GripVertical } from 'lucide-react';
type LessonItemUIProps = {
  title: string;
  href: string;
  isCompleted: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
};

export function LessonItemUI({
  title,
  href,
  isCompleted,
  dragHandleProps,
}: LessonItemUIProps) {
  return (
    <div className="flex items-center gap-2 border-b px-3 py-2">
      <div
        {...dragHandleProps}
        className="cursor-grab text-gray-400"
        onClick={(e) => e.stopPropagation()}
      >
        <GripVertical className="h-4 w-4" />
      </div>
      {/* ドラッグハンドル以外の領域をレッスン画面へのリンクにする */}
      <Link
        href={href}
        className="hover:bg-accent flex flex-1 items-center gap-2 rounded px-1 py-1"
      >
        <span>
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400" />
          )}
        </span>
        <span className={cn(isCompleted && 'text-gray-400 line-through')}>
          {title}
        </span>
      </Link>
    </div>
  );
}
