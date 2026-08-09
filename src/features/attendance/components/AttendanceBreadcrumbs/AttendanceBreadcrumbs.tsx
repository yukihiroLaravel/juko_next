'use client';

import { Breadcrumbs } from '@/components/organisms/Breadcrumbs';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToLesson } from '@/features/attendance/utils/mapAttendanceDetailToLesson';
import { routes } from '@/lib/routes';
import type { BreadcrumbItem } from '@/types/breadcrumb';

export type AttendanceBreadcrumbsProps = {
  attendanceId: string;
  lessonId?: string;
};

export function AttendanceBreadcrumbs({
  attendanceId,
  lessonId,
}: AttendanceBreadcrumbsProps) {
  const { attendanceDetail, error } = useAttendanceDetail(attendanceId);

  if (error) {
    return null;
  }

  const items: BreadcrumbItem[] = [
    { label: '講座一覧', href: routes.attendance.list() },
  ];

  if (attendanceDetail) {
    const lessonTitle = lessonId
      ? mapAttendanceDetailToLesson(attendanceDetail, lessonId)?.lessonTitle
      : undefined;

    items.push({
      label: attendanceDetail.course.title,
      href: lessonTitle ? routes.attendance.detail(attendanceId) : undefined,
    });

    if (lessonTitle) {
      items.push({ label: lessonTitle });
    }
  } else {
    items.push({ label: '講座名', isLoading: true });

    if (lessonId) {
      items.push({ label: 'レッスン名', isLoading: true });
    }
  }

  return <Breadcrumbs items={items} />;
}
