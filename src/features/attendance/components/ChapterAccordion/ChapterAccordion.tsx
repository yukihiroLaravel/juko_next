'use client';

import { useMemo, useState } from 'react';
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
import type { CompleteChapterLessons } from '@/features/attendance/hooks/useCompleteChapterLessons';
import type { Chapter } from '@/features/attendance/types';

type ChapterAccordionProps = {
  chapter: Chapter;
  isCompleting: boolean;
  completeChapterLessons: CompleteChapterLessons;
};

export function ChapterAccordion({
  chapter,
  isCompleting,
  completeChapterLessons,
}: ChapterAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: chapter.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const [lessonOrder, setLessonOrder] = useState<string[]>([]);

  const lessons = useMemo(() => {
    const index = new Map(lessonOrder.map((id, i) => [id, i]));
    return [...chapter.lessons].sort(
      (a, b) => (index.get(a.id) ?? Infinity) - (index.get(b.id) ?? Infinity),
    );
  }, [chapter.lessons, lessonOrder]);

  const completedLessonCount = lessons.filter(
    (lesson) => lesson.isCompleted,
  ).length;

  const totalLessonCount = lessons.length;

  const handleLessonDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = lessons.map((lesson) => lesson.id);
    setLessonOrder(
      arrayMove(
        ids,
        ids.indexOf(String(active.id)),
        ids.indexOf(String(over.id)),
      ),
    );
  };

  // 非活性は完了処理全体で共有するが、ラベルの切り替えは実行中のチャプターのみに限定する
  const [isCompletingThisChapter, setIsCompletingThisChapter] = useState(false);

  const handleCompleteAllLessons = async () => {
    if (
      !window.confirm(
        `「${chapter.title}」のすべてのレッスンを完了状態にします。よろしいですか？`,
      )
    ) {
      return;
    }

    setIsCompletingThisChapter(true);

    try {
      const result = await completeChapterLessons(chapter.id);

      if (result.success) {
        toast.success('チャプターの全レッスンを完了しました');
      } else {
        toast.error(result.error);
      }
    } finally {
      setIsCompletingThisChapter(false);
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
        isCompletingAllLessons={isCompletingThisChapter}
        isCompleteAllLessonsDisabled={isCompleting}
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
