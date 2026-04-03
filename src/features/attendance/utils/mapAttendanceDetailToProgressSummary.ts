import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';

type ProgressSummaryData = {
  progressRate: number;
  completedChapters: number;
  totalChapters: number;
  completedLessons: number;
  totalLessons: number;
};

export function mapAttendanceDetailToProgressSummary(
  attendanceDetail: AttendanceDetail,
): ProgressSummaryData {
  const chapters = attendanceDetail.course.chapters;
  const totalChapters = chapters.length;

  const allLessons = chapters.flatMap((chapter) => chapter.lessons);
  const totalLessons = allLessons.length;

  const completedLessons = allLessons.filter(
    (lesson) => lesson.lessonAttendance.status === 'completed_attendance',
  ).length;

  const completedChapters = chapters.filter(
    (chapter) =>
      chapter.lessons.length > 0 &&
      chapter.lessons.every(
        (lesson) => lesson.lessonAttendance.status === 'completed_attendance',
      ),
  ).length;

  const progressRate =
    totalLessons === 0
      ? 0
      : Math.round((completedLessons / totalLessons) * 100);

  return {
    progressRate,
    completedChapters,
    totalChapters,
    completedLessons,
    totalLessons,
  };
}