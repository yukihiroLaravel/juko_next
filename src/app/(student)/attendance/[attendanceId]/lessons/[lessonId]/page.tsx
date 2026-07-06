'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { LessonSidebar } from '@/features/attendance/components/LessonSidebar/LessonSidebar';
import { Lesson } from '@/features/attendance/components/Lesson/Lesson';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';

function SidebarFallback({ message }: { message: string }) {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader className="p-4">
        <p className="text-muted-foreground text-sm">{message}</p>
      </SidebarHeader>
    </Sidebar>
  );
}

export default function LessonPage() {
  const params = useParams();
  const attendanceId = params.attendanceId as string;
  const lessonId = params.lessonId as string;

  return (
    <SidebarProvider>
      <ErrorBoundary
        fallback={<SidebarFallback message="データの取得に失敗しました。" />}
      >
        <Suspense fallback={<SidebarFallback message="読み込み中..." />}>
          <LessonSidebar
            attendanceId={attendanceId}
            activeLessonId={lessonId}
          />
        </Suspense>
      </ErrorBoundary>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium">レッスン</span>
        </header>
        <main className="flex-1 space-y-2 p-4">
          <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
            <Suspense
              fallback={
                <div className="text-muted-foreground text-sm">
                  読み込み中...
                </div>
              }
            >
              <Lesson
                key={lessonId}
                attendanceId={attendanceId}
                lessonId={lessonId}
              />
            </Suspense>
          </ErrorBoundary>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
