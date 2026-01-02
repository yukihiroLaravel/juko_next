import Link from 'next/link';
import { Button } from '@/components/atoms/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/atoms/Card';

export default function TopPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">受講管理アプリ</CardTitle>
          <CardDescription>ログイン方法を選択してください</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/student/login">生徒としてログイン</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/instructor/login">講師としてログイン</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
