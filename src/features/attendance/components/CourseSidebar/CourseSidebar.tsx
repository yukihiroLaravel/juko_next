'use client';

import { CourseSidebarUI } from './CourseSidebar.ui';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToCourseSidebar } from '@/features/attendance/utils/mapAttendanceDetailToCourseSidebar';

export type CourseSidebarProps = {
  attendanceId: string;
};

export function CourseSidebar({ attendanceId }: CourseSidebarProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return <div>データの取得に失敗しました。</div>;
  }

  if (isLoading || !attendanceDetail) {
    return <div>読み込み中...</div>;
  }

  const courseSidebar =
    mapAttendanceDetailToCourseSidebar(attendanceDetail);

  return <CourseSidebarUI {...courseSidebar} />;
}
