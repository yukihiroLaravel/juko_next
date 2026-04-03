'use client';

import { ProgressSummaryUI } from './ProgressSummary.ui';
import { useAttendanceDetail } from '@/features/attendance/hooks/useAttendanceDetail';
import { mapAttendanceDetailToProgressSummary } from '@/features/attendance/utils/mapAttendanceDetailToProgressSummary';

type ProgressSummaryProps = {
  attendanceId: string;
};

export function ProgressSummary({ attendanceId }: ProgressSummaryProps) {
  const { attendanceDetail, error, isLoading } =
    useAttendanceDetail(attendanceId);

  if (error) {
    return <div>データ取得失敗</div>;
  }

  if (isLoading || !attendanceDetail) {
    return <div>読み込み中...</div>;
  }

  const progressSummary =
    mapAttendanceDetailToProgressSummary(attendanceDetail);

  const handleContinue = () => {
    // TODO: 最後に未完了のレッスンへ遷移
  };

  return (
    <ProgressSummaryUI
      {...progressSummary}
      onContinue={handleContinue}
    />
  );
}