'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToChapters } from '@/features/attendance/utils/mapAttendanceDetailToChapters';
import { ChapterListUI } from './ChapterList.ui';

type ChapterListProps = {
  attendanceId: string;
};

export function ChapterList({ attendanceId }: ChapterListProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return <p className="text-sm text-red-500">データの取得に失敗しました。</p>;
  }

  if (isLoading || !attendanceDetail) {
    return <p className="text-muted-foreground text-sm">読み込み中...</p>;
  }

  return (
    <ChapterListUI chapters={mapAttendanceDetailToChapters(attendanceDetail)} />
  );
}
