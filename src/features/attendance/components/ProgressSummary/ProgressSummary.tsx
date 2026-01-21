'use client';

import { ProgressSummaryUI } from './ProgressSummary.ui';

export function ProgressSummary() {
  const completedChapters = 2;
  const totalChapters = 10;

  const completedLessons = 5;
  const totalLessons = 30;

  const progressRate = Math.round((completedChapters / totalChapters) * 100);

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
