'use client';

import { useParams } from 'next/navigation';

import { LessonSidebar } from '@/features/attendance/components/LessonSidebar/LessonSidebar';
import { Lesson } from '@/features/attendance/components/Lesson/Lesson';
import { AttendanceBreadcrumbs } from '@/features/attendance/components/AttendanceBreadcrumbs/AttendanceBreadcrumbs';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/Sidebar';

export default function LessonPage() {
  const params = useParams();
  const attendanceId = params.attendanceId as string;
  const lessonId = params.lessonId as string;

  return (
    <SidebarProvider>
      <LessonSidebar attendanceId={attendanceId} activeLessonId={lessonId} />
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <AttendanceBreadcrumbs
            attendanceId={attendanceId}
            lessonId={lessonId}
          />
        </header>
        <main className="flex-1 space-y-2 p-4">
          <Lesson
            key={`${attendanceId}-${lessonId}`}
            attendanceId={attendanceId}
            lessonId={lessonId}
          />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
