import { SignupForm } from '@/features/instructor/components/SignupForm/SignupForm';

export default function InstructorSignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
