'use client';

import { CourseSidebar } from '@/features/attendance/components/CourseSidebar/CourseSidebar';
import { ChapterAccordion } from '@/features/attendance/components/ChapterAccordion/ChapterAccordion';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';

export default function Page() {
  const chapters = [
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
      lessons: [
        { id: 'lesson-3', title: 'レッスン3', isCompleted: false },
      ],
    },
  ];
  return (
    <SidebarProvider>
      <CourseSidebar />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">講座詳細</span>
        </header>
        <main className="flex-1 p-4 space-y-2">
          {/* 操作ボタン */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => console.log('all chapters completed')}
              className="px-3 py-1 border rounded text-sm"
            >
              全Chapter完了
            </button>

            <button
              type="button"
              onClick={() => console.log('all lessons completed')}
              className="px-3 py-1 border rounded text-sm"
            >
              全Lesson完了
            </button>
          </div>

          {/* カリキュラム一覧 */}
          {chapters.map((chapter) => (
            <ChapterAccordion
              key={chapter.id}
              chapter={chapter}
            />
          ))}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
