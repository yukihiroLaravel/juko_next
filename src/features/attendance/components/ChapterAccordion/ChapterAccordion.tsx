import { useState } from 'react';
import { toast } from 'sonner';
import { ChapterAccordionUI } from './ChapterAccordion.ui';
import { LessonItem } from '../LessonItem/LessonItem';
import { CSS } from '@dnd-kit/utilities';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  useSortable,
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Chapter } from '@/features/attendance/types';
import { useCompleteChapterLessons } from '@/features/attendance/hooks/useCompleteChapterLessons';

type ChapterAccordionProps = {
  attendanceId: string;
  chapter: Chapter;
};

export function ChapterAccordion({
  attendanceId,
  chapter,
}: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { completeChapterLessons, isSubmitting } =
    useCompleteChapterLessons(attendanceId);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [lessons, setLessons] = useState(chapter.lessons);

  const completedLessonCount = lessons.filter(
    (lesson) => lesson.isCompleted,
  ).length;

  const totalLessonCount = lessons.length;

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setLessons((prev) => {
      const oldIndex = prev.findIndex((l) => l.id === active.id);
      const newIndex = prev.findIndex((l) => l.id === over.id);
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  const handleCompleteAllLessons = async () => {
    if (
      !window.confirm(
        `「${chapter.title}」のすべてのレッスンを完了状態にします。よろしいですか？`,
      )
    ) {
      return;
    }

    const result = await completeChapterLessons(chapter.id);

    if (result.success) {
      toast.success('チャプターの全レッスンを完了しました');
    } else {
      toast.error(result.error ?? 'チャプターの全レッスン完了に失敗しました');
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ChapterAccordionUI
        title={chapter.title}
        isOpen={isOpen}
        completedLessonCount={completedLessonCount}
        totalLessonCount={totalLessonCount}
        onToggle={handleToggle}
        onCompleteAllLessons={handleCompleteAllLessons}
        isCompletingAllLessons={isSubmitting}
        dragHandleProps={{ ...attributes, ...listeners }}
      >
        {isOpen && (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleLessonDragEnd}
          >
            <SortableContext
              items={lessons.map((l) => l.id)}
              strategy={verticalListSortingStrategy}
            >
              {lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </ChapterAccordionUI>
    </div>
  );
}
