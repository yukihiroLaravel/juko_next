'use client';

import { calculateProgressPercent } from '@/features/attendance/utils/calculateProgressPercent';
import { ProgressSummaryUI } from './ProgressSummary.ui';

export function ProgressSummary() {
  const completedChapters = 2;
  const totalChapters = 10;

  const completedLessons = 5;
  const totalLessons = 30;

  const progressRate = calculateProgressPercent(
    completedChapters,
    totalChapters,
  );

  const handleContinue = () => {
    // TODO: 最後に未完了のレッスンへ遷移
    console.log('continue from last lesson');
  };

  return (
    <ProgressSummaryUI
      progressRate={progressRate}
      completedChapters={completedChapters}
      totalChapters={totalChapters}
      completedLessons={completedLessons}
      totalLessons={totalLessons}
      onContinue={handleContinue}
    />
  );
}
