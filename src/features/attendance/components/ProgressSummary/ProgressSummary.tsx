'use client';

import { LoadingMessage } from '@/components/StatusMessage/LoadingMessage';
import { FetchErrorMessage } from '@/components/StatusMessage/FetchErrorMessage';
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
    return <FetchErrorMessage />;
  }

  if (isLoading || !attendanceProgress) {
    return <LoadingMessage />;
  }

  const progressRate = calculateProgressPercent(
    attendanceProgress.number_of_completed_lessons,
    attendanceProgress.number_of_total_lessons,
  );

  const handleContinue = () => {
    if (attendanceProgress.continue_from) {
      router.push(
        `/attendance/${attendanceId}/lessons/${attendanceProgress.continue_from.lesson_id}`,
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
      canContinue={Boolean(attendanceProgress.continue_from)}
      onContinue={handleContinue}
    />
  );
}
