'use client';

import type { LessonListItem } from '@/features/attendance/types/lessonListItem';
import { useLesson } from '@/features/attendance/hooks/useLesson';
import { LessonSidebarUI } from './LessonSidebar.ui';

/** チャプター進捗率（値はダミー） */
const chapterProgressPercent = 33;

type LessonSidebarProps = {
  attendanceId: string;
  activeLessonId: string;
};

export function LessonSidebar({
  attendanceId,
  activeLessonId,
}: LessonSidebarProps) {
  const { attendanceDetail } = useLesson(attendanceId);

  // 受講講座のチャプターを取得
  const chapters = attendanceDetail?.course.chapters ?? [];
  const activeChapter = chapters.find((chapter) =>
    chapter.lessons.some(
      (lesson) => String(lesson.lesson_id) === activeLessonId,
    ),
  );

  // チャプターに紐づく全レッスンを取得
  const lessons: LessonListItem[] = (activeChapter?.lessons ?? []).map(
    (lesson) => ({
      id: String(lesson.lesson_id),
      title: lesson.title,
      status: lesson.lesson_attendance?.status ?? 'before_attendance',
    }),
  );

  return (
    <LessonSidebarUI
      attendanceId={attendanceId}
      progressPercent={chapterProgressPercent}
      lessons={lessons}
      activeLessonId={activeLessonId}
    />
  );
}
