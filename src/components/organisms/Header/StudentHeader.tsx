'use client';

import { StudentHeaderUI } from './StudentHeader.ui';

export function StudentHeader() {
  const handleLogout = () => {
    // 生徒用ログアウト処理
    console.log('student logout');
  };

  return <StudentHeaderUI userName="山田 花子" onLogout={handleLogout} />;
}