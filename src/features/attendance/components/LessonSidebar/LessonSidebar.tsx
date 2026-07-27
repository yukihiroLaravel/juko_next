'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { useAttendanceProgress } from '@/features/attendance/hooks/useAttendanceProgress';
import { mapAttendanceDetailToLessonSidebar } from '@/features/attendance/utils/mapAttendanceDetailToLessonSidebar';
import { calculateProgressPercent } from '@/features/attendance/utils/calculateProgressPercent';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';
import { LessonSidebarUI } from './LessonSidebar.ui';

type LessonSidebarProps = {
  attendanceId: string;
  activeLessonId: string;
};

export function LessonSidebar({
  attendanceId,
  activeLessonId,
}: LessonSidebarProps) {
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

  const lessons = mapAttendanceDetailToLessonSidebar(
    attendanceDetail,
    activeLessonId,
  );

  const progressPercent = calculateProgressPercent(
    attendanceProgress.number_of_completed_lessons,
    attendanceProgress.number_of_total_lessons,
  );

  return (
    <LessonSidebarUI
      attendanceId={attendanceId}
      progressPercent={progressPercent}
      lessons={lessons}
      activeLessonId={activeLessonId}
    />
  );
}
