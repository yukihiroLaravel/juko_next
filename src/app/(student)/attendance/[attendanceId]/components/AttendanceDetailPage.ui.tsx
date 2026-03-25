'use client';

import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  SortableContext,
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

type Lesson = {
  id: string;
  title: string;
  isCompleted: boolean;
};

type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};

type Props = {
  chapters: Chapter[];
  onDragEnd: (event: DragEndEvent) => void;
};

export function AttendanceDetailPageUI({ chapters, onDragEnd }: Props) {
  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">講座詳細</span>
        </header>

        <main className="flex-1 space-y-2 p-4">
          <ProgressSummary />

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

          <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext
              items={chapters.map((chapter) => chapter.id)}
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