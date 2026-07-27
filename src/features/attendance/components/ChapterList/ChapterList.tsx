'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToChapters } from '@/features/attendance/utils/mapAttendanceDetailToChapters';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';
import { ChapterListUI } from './ChapterList.ui';

type ChapterListProps = {
  attendanceId: string;
};

export function ChapterList({ attendanceId }: ChapterListProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return <FetchErrorMessage />;
  }

  if (isLoading || !attendanceDetail) {
    return <LoadingMessage />;
  }

  return (
    <ChapterListUI chapters={mapAttendanceDetailToChapters(attendanceDetail)} />
  );
}
