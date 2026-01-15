import { StudentHeader } from '@/components/organisms/Header';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard allowedRoles={['student']}>
      <StudentHeader />
      <main>{children}</main>
    </AuthGuard>
  );
}
