import type { CourseSidebarUIProps } from '@/features/attendance/components/CourseSidebar/CourseSidebar.ui';
import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL ?? '';

export function mapAttendanceDetailToCourseSidebar(
  attendanceDetail: AttendanceDetail,
): CourseSidebarUIProps {
  return {
    thumbnailUrl: `${storageUrl}/${attendanceDetail.course.image}`,
    categoryName: attendanceDetail.course.tags[0]?.content ?? '',
    courseName: attendanceDetail.course.title,
    // progress_percent がAPIレスポンスに含まれていないため暫定値
    progressPercent: 20,
  };
}
