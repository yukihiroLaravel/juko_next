import { InstructorHeader } from '@/components/organisms/Header';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['instructor']}>
      <InstructorHeader />
      <main>{children}</main>
    </AuthGuard>
  );
}
