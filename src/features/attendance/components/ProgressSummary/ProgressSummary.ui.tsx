import { Button } from '@/components/atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/Card';

type ProgressSummaryUIProps = {
  progressRate: number;
  completedChapters: number;
  totalChapters: number;
  completedLessons: number;
  totalLessons: number;
  canContinue: boolean;
  onContinue: () => void;
};

export function ProgressSummaryUI({
  progressRate,
  completedChapters,
  totalChapters,
  completedLessons,
  totalLessons,
  canContinue,
  onContinue,
}: ProgressSummaryUIProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>学習の進捗</CardTitle>
        <CardDescription>{progressRate}% 完了</CardDescription>
      </CardHeader>

      <CardContent className="space-y-1 text-sm">
        <div>
          完了チャプター数：{completedChapters} / {totalChapters}
        </div>
        <div>
          完了レッスン数：{completedLessons} / {totalLessons}
        </div>
      </CardContent>

      <CardFooter>
        <Button disabled={!canContinue} onClick={onContinue}>
          続きからはじめる
        </Button>
      </CardFooter>
    </Card>
  );
}
