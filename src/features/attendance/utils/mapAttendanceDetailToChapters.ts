import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';
import type { Chapter } from '@/features/attendance/types';

export function mapAttendanceDetailToChapters(
  attendanceDetail: AttendanceDetail,
): Chapter[] {
  return [...attendanceDetail.course.chapters]
    .sort((a, b) => a.order - b.order)
    .map((chapter) => ({
      id: String(chapter.chapter_id),
      title: chapter.title,
      lessons: [...chapter.lessons]
        .sort((a, b) => a.order - b.order)
        .map((lesson) => ({
          id: String(lesson.lesson_id),
          title: lesson.title,
          isCompleted:
            lesson.lessonAttendance?.status === 'completed_attendance',
        })),
    }));
}
