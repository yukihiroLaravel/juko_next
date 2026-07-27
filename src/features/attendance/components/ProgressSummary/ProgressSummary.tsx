'use client';

import { useAttendanceProgress } from '@/features/attendance/hooks/useAttendanceProgress';
import { calculateProgressPercent } from '@/features/attendance/utils/calculateProgressPercent';
import { ProgressSummaryUI } from './ProgressSummary.ui';
import { useRouter } from 'next/navigation';

type ProgressSummaryProps = {
  attendanceId: string;
};

export function ProgressSummary({ attendanceId }: ProgressSummaryProps) {
  const router = useRouter();
  const { attendanceProgress, error, isLoading } =
    useAttendanceProgress(attendanceId);

  if (error) {
    return <p className="text-sm text-red-500">データの取得に失敗しました。</p>;
  }

  if (isLoading || !attendanceProgress) {
    return <p className="text-muted-foreground text-sm">読み込み中...</p>;
  }

  const progressRate = calculateProgressPercent(
    attendanceProgress.number_of_completed_lessons,
    attendanceProgress.number_of_total_lessons,
  );

  const handleContinue = () => {
    if (attendanceProgress.continue_from) {
      router.push(
        `/attendance/${attendanceId}/lesson/${attendanceProgress.continue_from.lesson_id}`,
      );
    }
  };

  return (
    <ProgressSummaryUI
      progressRate={progressRate}
      completedChapters={attendanceProgress.number_of_completed_chapters}
      totalChapters={attendanceProgress.number_of_total_chapters}
      completedLessons={attendanceProgress.number_of_completed_lessons}
      totalLessons={attendanceProgress.number_of_total_lessons}
      canContinue={attendanceProgress.continue_from !== null}
      onContinue={handleContinue}
    />
  );
}
