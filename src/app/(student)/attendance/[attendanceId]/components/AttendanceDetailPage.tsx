'use client';

import { useCallback, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { AttendanceDetailPageUI } from './AttendanceDetailPage.ui';

const initialChapters = [
  {
    id: 'chapter-1',
    title: '第1章 はじめに',
    lessons: [
      { id: 'lesson-1', title: 'レッスン1', isCompleted: true },
      { id: 'lesson-2', title: 'レッスン2', isCompleted: false },
    ],
  },
  {
    id: 'chapter-2',
    title: '第2章 応用',
    lessons: [{ id: 'lesson-3', title: 'レッスン3', isCompleted: false }],
  },
];

export function AttendanceDetailPage() {
  const [chapters, setChapters] = useState(initialChapters);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setChapters((prevChapters) => {
      const oldIndex = prevChapters.findIndex(
        (chapter) => chapter.id === active.id,
      );
      const newIndex = prevChapters.findIndex(
        (chapter) => chapter.id === over.id,
      );

      return arrayMove(prevChapters, oldIndex, newIndex);
    });
  }, []);

  return (
    <AttendanceDetailPageUI chapters={chapters} onDragEnd={handleDragEnd} />
  );
}