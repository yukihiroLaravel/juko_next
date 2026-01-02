import { LoginForm } from '@/features/auth/components/LoginForm/LoginForm';

export default function StudentLoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
