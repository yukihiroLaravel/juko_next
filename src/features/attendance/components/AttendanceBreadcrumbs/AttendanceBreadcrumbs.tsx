'use client';

import { BreadcrumbsUI } from '@/components/organisms/Breadcrumbs';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToLesson } from '@/features/attendance/utils/mapAttendanceDetailToLesson';
import { routes } from '@/lib/routes';
import type { BreadcrumbItemData } from '@/types/breadcrumb';

export type AttendanceBreadcrumbsProps = {
  attendanceId: string;
  lessonId?: string;
};

export function AttendanceBreadcrumbs({
  attendanceId,
  lessonId,
}: AttendanceBreadcrumbsProps) {
  const { attendanceDetail, isLoading } = useAttendanceDetail(attendanceId);

  const items: BreadcrumbItemData[] = [
    { label: '講座一覧', href: routes.attendance.list() },
  ];

  if (attendanceDetail) {
    const lessonTitle = lessonId
      ? mapAttendanceDetailToLesson(attendanceDetail, lessonId)?.lessonTitle
      : undefined;

    items.push({
      label: attendanceDetail.course.title,
      href: lessonId ? routes.attendance.detail(attendanceId) : undefined,
    });

    if (lessonId) {
      items.push({ label: lessonTitle ?? 'レッスン' });
    }
  } else if (isLoading) {
    // 解決待ちの項目は Skeleton にして、ヘッダーの高さと階層の数を保つ
    items.push({ label: '講座名', isLoading: true });

    if (lessonId) {
      items.push({ label: 'レッスン名', isLoading: true });
    }
  }

  return <BreadcrumbsUI items={items} />;
}
