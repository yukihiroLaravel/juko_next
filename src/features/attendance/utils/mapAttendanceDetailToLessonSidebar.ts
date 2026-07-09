import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';
import type { LessonListItem } from '@/features/attendance/types/lessonListItem';

export function mapAttendanceDetailToLessonSidebar(
  attendanceDetail: AttendanceDetail,
  activeLessonId: string,
): LessonListItem[] {
  const activeChapter = attendanceDetail.course.chapters.find((chapter) =>
    chapter.lessons.some(
      (lesson) => String(lesson.lesson_id) === activeLessonId,
    ),
  );

  return (activeChapter?.lessons ?? []).map((lesson) => ({
    id: String(lesson.lesson_id),
    title: lesson.title,
    status: lesson.lessonAttendance?.status ?? 'before_attendance',
  }));
}
