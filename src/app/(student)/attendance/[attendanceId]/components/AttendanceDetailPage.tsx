'use client';

import { useCallback, useState } from 'react';
import type { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { AttendanceDetailPageUI } from './AttendanceDetailPage.ui';
import { attendanceDetailMock } from '@/features/attendance/mocks/attendanceDetailMock';
import type { Chapter } from '@/features/attendance/types/attendanceDetail';

export function AttendanceDetailPage() {
  const [chapters, setChapters] = useState<Chapter[]>(attendanceDetailMock);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setChapters((prevChapters) => {
      const oldIndex = prevChapters.findIndex(
        (chapter) => chapter.chapter_id === active.id,
      );
      const newIndex = prevChapters.findIndex(
        (chapter) => chapter.chapter_id === over.id,
      );

      return arrayMove(prevChapters, oldIndex, newIndex);
    });
  }, []);

  return (
    <AttendanceDetailPageUI chapters={chapters} onDragEnd={handleDragEnd} />
  );
}