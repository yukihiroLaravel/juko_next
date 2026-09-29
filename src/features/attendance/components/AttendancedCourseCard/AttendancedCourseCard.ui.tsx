import { Card } from '@/components/atoms/Card';
import { CircleUserRound } from 'lucide-react';

type AttendancedCourseCardUIProps = {
  title: string;
  instructorName: string;
  isExpired: boolean;
  progress: number;
};

export function AttendancedCourseCardUI({
  title,
  instructorName,
  isExpired,
  progress,
}: AttendancedCourseCardUIProps) {
  return (
    <Card className="overflow-hidden rounded-md border bg-transparent p-0 hover:opacity-80">
      {/* サムネイル */}
      <div className="flex aspect-[16/9] w-full items-center justify-center bg-indigo-400">
        <span className="text-sm font-semibold text-black">サムネイル</span>
      </div>
      {/* 下段 */}
      <div className="space-y-1.5 bg-white p-3">
        {/* タイトル + 受講期限切れ */}
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{title}</p>
          {isExpired && (
            <span className="text-xs font-semibold text-red-600">
              受講期限切れ
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-gray-700">
          <CircleUserRound className="h-4 w-4" />
          <span>{instructorName}</span>
        </div>
        {/* 進捗 */}
        <p className="text-muted-foreground text-xs">進捗 {progress}%</p>
      </div>
    </Card>
  );
}
