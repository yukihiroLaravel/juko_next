'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { useAttendanceProgress } from '@/features/attendance/hooks/useAttendanceProgress';
import { mapAttendanceDetailToLessonSidebar } from '@/features/attendance/utils/mapAttendanceDetailToLessonSidebar';
import { calculateProgressPercent } from '@/features/attendance/utils/calculateProgressPercent';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';
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
          <p className="text-sm text-red-500">データの取得に失敗しました。</p>
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
          <p className="text-muted-foreground text-sm">読み込み中...</p>
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
