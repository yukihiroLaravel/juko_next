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
    <Card className="w-[440px] overflow-hidden rounded-lg border bg-transparent p-0">
      {/* サムネイル */}
      <div className="aspect-[4/3] w-full bg-indigo-400 flex items-center justify-center">
        <span className="text-sm font-semibold text-black">サムネイル</span>
      </div>
      {/* 下段 */}
      <div className="bg-white p-4 space-y-2">
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
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Badge
            variant="secondary"
            className="flex h-5 w-5 items-center justify-center rounded-full p-0"
          >
            <User className="h-3 w-3" />
          </Badge>
          <span>{instructorName}</span>
        </div>
        {/* 進捗 */}
        <p className="text-xs text-muted-foreground">進捗 {progress}%</p>
      </div>
    </Card>
  );
}
