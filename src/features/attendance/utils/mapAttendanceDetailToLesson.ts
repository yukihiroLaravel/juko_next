import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';
import type { LessonStatus } from '@/features/attendance/types/lessonStatus';

export type LessonView = {
  chapterTitle: string;
  lessonTitle: string;
  videoUrl: string;
  status: LessonStatus;
  lessonAttendanceId: number | null;
};

export function mapAttendanceDetailToLesson(
  attendanceDetail: AttendanceDetail,
  lessonId: string,
): LessonView | null {
  const chapter = attendanceDetail.course.chapters.find((chapter) =>
    chapter.lessons.some((lesson) => String(lesson.lesson_id) === lessonId),
  );
  const lesson = chapter?.lessons.find(
    (lesson) => String(lesson.lesson_id) === lessonId,
  );

  if (!chapter || !lesson) {
    return null;
  }

  return {
    chapterTitle: chapter.title,
    lessonTitle: lesson.title,
    videoUrl: lesson.url,
    status: lesson.lessonAttendance?.status ?? 'before_attendance',
    lessonAttendanceId: lesson.lessonAttendance?.lesson_attendance_id ?? null,
  };
}
