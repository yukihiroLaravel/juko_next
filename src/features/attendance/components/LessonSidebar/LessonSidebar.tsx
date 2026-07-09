'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToLessonSidebar } from '@/features/attendance/utils/mapAttendanceDetailToLessonSidebar';
import { Sidebar, SidebarHeader } from '@/components/atoms/Sidebar';
import { LessonSidebarUI } from './LessonSidebar.ui';

/** チャプター進捗率（値はダミー） */
const chapterProgressPercent = 33;

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

  const lessons = mapAttendanceDetailToLessonSidebar(
    attendanceDetail,
    activeLessonId,
  );

  return (
    <LessonSidebarUI
      attendanceId={attendanceId}
      progressPercent={chapterProgressPercent}
      lessons={lessons}
      activeLessonId={activeLessonId}
    />
  );
}
