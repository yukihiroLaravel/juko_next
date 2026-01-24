import { LessonItemUI } from "./LessonItem.ui"

type Lesson = {
  id: string
  title: string
  isCompleted: boolean
}

type LessonItemProps = {
  lesson: Lesson
}

export function LessonItem({ lesson }: LessonItemProps) {
  return (
    <LessonItemUI
      title={lesson.title}
      isCompleted={lesson.isCompleted}
    />
  )
}
