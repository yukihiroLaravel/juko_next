'use client';

import { CourseSidebarUI } from './CourseSidebar.ui';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToCourseSidebar } from '@/features/attendance/utils/mapAttendanceDetailToCourseSidebar';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';

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
          <FetchErrorMessage />
        </SidebarHeader>
      </Sidebar>
    );
  }

  if (isLoading || !attendanceDetail) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <LoadingMessage />
        </SidebarHeader>
      </Sidebar>
    );
  }

  const courseSidebar = mapAttendanceDetailToCourseSidebar(attendanceDetail);

  return <CourseSidebarUI {...courseSidebar} />;
}
