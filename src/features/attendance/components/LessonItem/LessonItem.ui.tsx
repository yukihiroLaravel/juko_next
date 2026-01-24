type LessonItemUIProps = {
  title: string
  isCompleted: boolean
}

export function LessonItemUI({
  title,
  isCompleted,
}: LessonItemUIProps) {
  return (
    <div className="flex items-center gap-2 py-2 px-3 border-b">
      <span>
        {isCompleted ? "✅" : "◻️"}
      </span>
      <span
        className={isCompleted ? "text-gray-400 line-through" : ""}
      >
        {title}
      </span>
    </div>
  )
}
