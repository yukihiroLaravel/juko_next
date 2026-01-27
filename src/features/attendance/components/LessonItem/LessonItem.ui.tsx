type LessonItemUIProps = {
  title: string
  isCompleted: boolean
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>
}

export function LessonItemUI({
  title,
  isCompleted,
  dragHandleProps,
}: LessonItemUIProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-3 border-b">
      {/* ☰ ドラッグハンドル */}
      <div
        {...dragHandleProps}
        className="cursor-grab text-gray-400"
        onClick={(e) => e.stopPropagation()}
      >
        ☰
      </div>

      <span>
        {isCompleted ? "✅" : "◻️"}
      </span>
      <span
        className={isCompleted ? "text-gray-400 line-through" : ""}
      >
        {title}
      </span>
    </div>
  );
}
