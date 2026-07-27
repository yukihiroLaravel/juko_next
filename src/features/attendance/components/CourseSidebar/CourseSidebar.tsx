'use client';

import { CourseSidebarUI } from './CourseSidebar.ui';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { useAttendanceProgress } from '@/features/attendance/hooks/useAttendanceProgress';
import { mapAttendanceDetailToCourseSidebar } from '@/features/attendance/utils/mapAttendanceDetailToCourseSidebar';
import { calculateProgressPercent } from '@/features/attendance/utils/calculateProgressPercent';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';

export type CourseSidebarProps = {
  attendanceId: string;
};

export function CourseSidebar({ attendanceId }: CourseSidebarProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);
  const {
    attendanceProgress,
    error: progressError,
    isLoading: isProgressLoading,
  } = useAttendanceProgress(attendanceId);

  if (error || progressError) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <FetchErrorMessage />
        </SidebarHeader>
      </Sidebar>
    );
  }

  if (
    isLoading ||
    isProgressLoading ||
    !attendanceDetail ||
    !attendanceProgress
  ) {
    return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="p-4">
          <LoadingMessage />
        </SidebarHeader>
      </Sidebar>
    );
  }

  const courseSidebar = mapAttendanceDetailToCourseSidebar(attendanceDetail);

  const progressPercent = calculateProgressPercent(
    attendanceProgress.number_of_completed_lessons,
    attendanceProgress.number_of_total_lessons,
  );

  return (
    <CourseSidebarUI {...courseSidebar} progressPercent={progressPercent} />
  );
}
