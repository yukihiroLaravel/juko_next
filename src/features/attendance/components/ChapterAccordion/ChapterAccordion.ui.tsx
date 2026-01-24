type ChapterAccordionUIProps = {
  title: string
  isOpen: boolean
  completedLessonCount: number
  totalLessonCount: number
  onToggle: () => void
  children: React.ReactNode
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

export function ChapterAccordionUI({
  title,
  isOpen,
  completedLessonCount,
  totalLessonCount,
  onToggle,
  children,
  dragHandleProps,
}: ChapterAccordionUIProps) {
  return (
    <div className="border rounded mb-2">
      {/* Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center px-4 py-2 bg-gray-100"
      >
        {/* ★ ドラッグハンドル */}
        <div
          {...dragHandleProps}
          className="cursor-grab text-gray-400"
          onClick={(e) => e.stopPropagation()}
        >
          ☰
        </div>
        
        <span className="font-medium">{title}</span>
        <span className="text-sm text-gray-500">
          {completedLessonCount} / {totalLessonCount} 完了
        </span>
      </button>

      {/* Body */}
      {isOpen && (
        <div className="pl-4">
          {children}
        </div>
      )}
    </div>
  )
}