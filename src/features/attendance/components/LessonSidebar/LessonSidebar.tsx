'use client';

import type { LessonListItem } from '@/features/attendance/types/lessonListItem';
import { LessonSidebarUI } from './LessonSidebar.ui';

/** チャプター進捗率（値はダミー） */
const chapterProgressPercent = 33;

/** レッスン一覧（値はダミー） */
const lessons: LessonListItem[] = [
  { id: '1', title: 'Lesson 1', status: 'in_attendance' },
  { id: '2', title: 'Lesson 2', status: 'before_attendance' },
  { id: '3', title: 'Lesson 3', status: 'before_attendance' },
  { id: '4', title: 'Lesson 4', status: 'completed_attendance' },
];

type LessonSidebarProps = {
  attendanceId: string;
  activeLessonId: string;
};

export function LessonSidebar({
  attendanceId,
  activeLessonId,
}: LessonSidebarProps) {
  return (
    <LessonSidebarUI
      attendanceId={attendanceId}
      progressPercent={chapterProgressPercent}
      lessons={lessons}
      activeLessonId={activeLessonId}
    />
  );
}
