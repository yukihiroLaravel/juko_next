import { useState } from 'react';
import { ChapterAccordionUI } from './ChapterAccordion.ui';
import { LessonItem } from '../LessonItem/LessonItem';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Chapter } from '@/features/attendance/types/attendanceDetail';

type ChapterAccordionProps = {
  chapter: Chapter;
};

export function ChapterAccordion({ chapter }: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.chapter_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [lessons, setLessons] = useState(chapter.lessons);

  const completedLessonCount = lessons.filter(
    (lesson) => lesson.is_completed,
  ).length;

  const totalLessonCount = lessons.length;

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLessons((prev) => {
      const oldIndex = prev.findIndex(
        (lesson) => lesson.lesson_id === active.id,
      );
      const newIndex = prev.findIndex(
        (lesson) => lesson.lesson_id === over.id,
      );
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ChapterAccordionUI
        title={chapter.title}
        isOpen={isOpen}
        completedLessonCount={completedLessonCount}
        totalLessonCount={totalLessonCount}
        onToggle={handleToggle}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        {isOpen && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleLessonDragEnd}
          >
            <SortableContext
              items={lessons.map((lesson) => lesson.lesson_id)}
              strategy={verticalListSortingStrategy}
            >
              {lessons.map((lesson) => (
                <LessonItem key={lesson.lesson_id} lesson={lesson} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </ChapterAccordionUI>
    </div>
  );
}
