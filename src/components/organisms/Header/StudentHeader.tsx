'use client';

import { StudentHeaderUI } from './StudentHeader.ui';
import { useUser } from '@/hooks/useUser';
import { useLogout } from '@/features/auth/hooks/useLogout';

export function StudentHeader() {
  const { user, isLoading } = useUser();
  const { logout } = useLogout();

  if (isLoading) {
    return <StudentHeaderUI userName="読み込み中..." onLogout={() => {}} />;
  }

  return (
    <StudentHeaderUI
      userName={user?.nick_name ?? 'ゲスト'}
      onLogout={() => logout('student')}
    />
  );
}
