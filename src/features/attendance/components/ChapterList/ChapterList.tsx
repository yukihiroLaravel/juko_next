'use client';

import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToChapters } from '@/features/attendance/utils/mapAttendanceDetailToChapters';
import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';
import type { CompleteChapterLessons } from '@/features/attendance/hooks/useCompleteChapterLessons';
import { ChapterListUI } from './ChapterList.ui';

type ChapterListProps = {
  attendanceId: string;
  isCompleting: boolean;
  completeChapterLessons: CompleteChapterLessons;
};

export function ChapterList({
  attendanceId,
  isCompleting,
  completeChapterLessons,
}: ChapterListProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return <FetchErrorMessage />;
  }

  if (isLoading || !attendanceDetail) {
    return <LoadingMessage />;
  }

  return (
    <ChapterListUI
      key={attendanceId}
      attendanceId={attendanceId}
      chapters={mapAttendanceDetailToChapters(attendanceDetail)}
      isCompleting={isCompleting}
      completeChapterLessons={completeChapterLessons}
    />
  );
}
