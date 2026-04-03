'use client';

import { useState, useCallback } from 'react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ProgressSummary } from '@/features/attendance/components/ProgressSummary/ProgressSummary';
import { CourseSidebar } from '@/features/attendance/components/CourseSidebar/CourseSidebar';
import { ChapterAccordion } from '@/features/attendance/components/ChapterAccordion/ChapterAccordion';
import { Button } from '@/components/atoms/Button';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const attendanceId = params.attendanceId as string;

  const [chapters, setChapters] = useState([
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
  ]);

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
    <SidebarProvider>
      <CourseSidebar attendanceId={attendanceId} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">講座詳細</span>
        </header>
        <main className="flex-1 space-y-2 p-4">
          <ProgressSummary attendanceId={attendanceId} />
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => console.log('all chapters completed')}
            >
              全Chapter完了
            </Button>

            <Button
              type="button"
              onClick={() => console.log('all lessons completed')}
            >
              全Lesson完了
            </Button>
          </div>

          {/* カリキュラム一覧 */}
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={chapters.map((ch) => ch.id)}
              strategy={verticalListSortingStrategy}
            >
              {chapters.map((chapter) => (
                <ChapterAccordion key={chapter.id} chapter={chapter} />
              ))}
            </SortableContext>
          </DndContext>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
