'use client';

import { useMemo, useState } from 'react';
import { DndContext, closestCenter, type DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ChapterAccordion } from '@/features/attendance/components/ChapterAccordion/ChapterAccordion';
import type { CompleteChapterLessons } from '@/features/attendance/hooks/useCompleteChapterLessons';
import type { Chapter } from '@/features/attendance/types';

type ChapterListUIProps = {
  attendanceId: string;
  chapters: Chapter[];
  isCompleting: boolean;
  completeChapterLessons: CompleteChapterLessons;
};

export function ChapterListUI({
  attendanceId,
  chapters,
  isCompleting,
  completeChapterLessons,
}: ChapterListUIProps) {
  const [order, setOrder] = useState<string[]>([]);

  const orderedChapters = useMemo(() => {
    const index = new Map(order.map((id, i) => [id, i]));
    return [...chapters].sort(
      (a, b) => (index.get(a.id) ?? Infinity) - (index.get(b.id) ?? Infinity),
    );
  }, [chapters, order]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const ids = orderedChapters.map((chapter) => chapter.id);
    setOrder(
      arrayMove(
        ids,
        ids.indexOf(String(active.id)),
        ids.indexOf(String(over.id)),
      ),
    );
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={orderedChapters.map((ch) => ch.id)}
        strategy={verticalListSortingStrategy}
      >
        {orderedChapters.map((chapter) => (
          <ChapterAccordion
            key={chapter.id}
            attendanceId={attendanceId}
            chapter={chapter}
            isCompleting={isCompleting}
            completeChapterLessons={completeChapterLessons}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}
