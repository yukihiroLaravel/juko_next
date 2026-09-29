'use client';

import { InstructorHeaderUI } from './InstructorHeader.ui';
import { useUser } from '@/hooks/useUser';
import { useLogout } from '@/features/auth/hooks/useLogout';

export function InstructorHeader() {
  const { user, isLoading } = useUser();
  const { logout } = useLogout();

  if (isLoading) {
    return <InstructorHeaderUI userName="読み込み中..." onLogout={() => {}} />;
  }

  return (
    <InstructorHeaderUI userName={user?.name ?? 'ゲスト'} onLogout={logout} />
  );
}
