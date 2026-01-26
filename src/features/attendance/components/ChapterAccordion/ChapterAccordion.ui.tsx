import { Button } from '@/components/atoms/Button';
import { cn } from "@/lib/utils";

type ChapterAccordionUIProps = {
  title: string
  isOpen: boolean
  completedLessonCount: number
  totalLessonCount: number
  onToggle: () => void
  children: React.ReactNode
}

export function ChapterAccordionUI({
  title,
  isOpen,
  completedLessonCount,
  totalLessonCount,
  onToggle,
  children,
}: ChapterAccordionUIProps) {
  return (
    <div className="border rounded mb-2">
      {/* Header */}
      <Button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full flex justify-between items-center px-4 py-2 transition-colors",
          isOpen
            ? "bg-primary text-white hover:bg-primary hover:text-white"
            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
        )}
      >
        <span className="font-medium">{title}</span>
        <span className="text-sm text-gray-500">
          {completedLessonCount} / {totalLessonCount} 完了
        </span>
      </Button>

      {/* Body */}
      {isOpen && (
        <div className="pl-4">
          {children}
        </div>
      )}
    </div>
  )
}