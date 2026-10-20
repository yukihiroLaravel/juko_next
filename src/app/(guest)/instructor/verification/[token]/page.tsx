'use client';

import { useParams } from 'next/navigation';
import { VerificationForm } from '@/features/instructor/components/VerificationForm/VerificationForm';

export default function InstructorVerificationPage() {
  const params = useParams();
  const token = params.token as string;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-md">
        <VerificationForm token={token} />
      </div>
    </div>
  );
}
