import { Suspense } from 'react';
import Link from 'next/link';
import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';
import { RegisteredNotice } from '@/features/instructor/components/RegisteredNotice/RegisteredNotice';
import { Button } from '@/components/atoms/Button';

export default function InstructorLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Suspense fallback={null}>
          <RegisteredNotice />
        </Suspense>
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
