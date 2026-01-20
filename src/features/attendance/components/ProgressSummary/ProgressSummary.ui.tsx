"use client";

import { Button } from "@/components/atoms/Button";

type ProgressSummaryUIProps = {
  progressRate: number;
  completedChapters: number;
  totalChapters: number;
  completedLessons: number;
  totalLessons: number;
  onContinue: () => void;
};

export function ProgressSummaryUI({
  progressRate,
  completedChapters,
  totalChapters,
  completedLessons,
  totalLessons,
  onContinue,
}: ProgressSummaryUIProps) {
  return (
    <section className="rounded-md border bg-white p-4 space-y-4">
      <div className="text-sm text-gray-600">
        {progressRate}% 完了
      </div>

      <div className="space-y-1 text-sm">
        <div>
          完了チャプター数：{completedChapters} / {totalChapters}
        </div>
        <div>
          完了レッスン数：{completedLessons} / {totalLessons}
        </div>
      </div>

      <Button onClick={onContinue}>
        続きからはじめる
      </Button>
    </section>
  );
}
