import type { AttendanceDetail } from '@/features/attendance/types/attendanceDetail';

const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL ?? '';

export type CourseSidebarMappedProps = {
  thumbnailUrl: string;
  categoryName: string;
  courseName: string;
};

export function mapAttendanceDetailToCourseSidebar(
  attendanceDetail: AttendanceDetail,
): CourseSidebarMappedProps {
  return {
    thumbnailUrl: `${storageUrl}/${attendanceDetail.course.image}`,
    categoryName: attendanceDetail.course.tags[0]?.content ?? '',
    courseName: attendanceDetail.course.title,
  };
}
