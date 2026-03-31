'use client';

import { CourseSidebarUI } from './CourseSidebar.ui';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToCourseSidebar } from '@/features/attendance/utils/mapAttendanceDetailToCourseSidebar';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';

export type CourseSidebarProps = {
  attendanceId: string;
};

export function CourseSidebar({ attendanceId }: CourseSidebarProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <p className="text-sm text-red-500">データの取得に失敗しました。</p>
        </SidebarHeader>
      </Sidebar>
    );
  }

  if (isLoading || !attendanceDetail) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <p className="text-muted-foreground text-sm">読み込み中...</p>
        </SidebarHeader>
      </Sidebar>
    );
  }

  const courseSidebar = mapAttendanceDetailToCourseSidebar(attendanceDetail);

  return <CourseSidebarUI {...courseSidebar} />;
}
