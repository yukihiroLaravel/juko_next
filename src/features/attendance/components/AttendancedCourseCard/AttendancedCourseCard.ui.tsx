import { Card } from '@/components/atoms/Card';
import { Badge } from '@/components/atoms/Badge';
import { User } from 'lucide-react';

type AttendancedCourseCardUIProps = {
  title: string;
  isExpired: boolean;
  instructorName: string;
  progress: number;
};

export function AttendancedCourseCardUI({
  title,
  isExpired,
  instructorName,
  progress,
}: AttendancedCourseCardUIProps) {
  return (
    <Card className="w-full max-w-[350px] overflow-hidden rounded-md border bg-transparent p-0">
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
        {/* 講師名 */}
        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <Badge
            variant="secondary"
            className="flex h-5 w-5 items-center justify-center rounded-full p-0"
          >
            <User className="h-3 w-3" />
          </Badge>
          <span>{instructorName}</span>
        </div>
        {/* 進捗 */}
        <p className="text-muted-foreground text-xs">進捗 {progress}%</p>
      </div>
    </Card>
  );
}
