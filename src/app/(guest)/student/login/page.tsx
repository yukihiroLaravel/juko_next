import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';
import { Button } from '@/components/atoms/Button';

export default function StudentLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />
        <div className="text-center">
          <Button asChild variant="link">
            <Link href="/">TOPページへ戻る</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
