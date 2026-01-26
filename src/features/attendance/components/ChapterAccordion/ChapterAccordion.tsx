import { useState } from "react";
import { ChapterAccordionUI } from "./ChapterAccordion.ui";
import { LessonItem } from "../LessonItem/LessonItem";
import type { Chapter } from '@/features/attendance/types';

type ChapterAccordionProps = {
  chapter: Chapter
}

export function ChapterAccordion({ chapter }: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(prev => !prev)
  }

  const completedLessonCount = chapter.lessons.filter(
    lesson => lesson.isCompleted
  ).length

  const totalLessonCount = chapter.lessons.length

  return (
    <ChapterAccordionUI
      title={chapter.title}
      isOpen={isOpen}
      completedLessonCount={completedLessonCount}
      totalLessonCount={totalLessonCount}
      onToggle={handleToggle}
    >
      {chapter.lessons.map(lesson => (
        <LessonItem key={lesson.id} lesson={lesson} />
      ))}
    </ChapterAccordionUI>
  )
}
