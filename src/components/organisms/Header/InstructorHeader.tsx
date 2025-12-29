'use client';

import { InstructorHeaderUI } from './InstructorHeader.ui';

export function InstructorHeader() {
  const handleLogout = () => {
    // 講師用ログアウト処理
    console.log('instructor logout');
  };

  return <InstructorHeaderUI userName="山田 花子" onLogout={handleLogout} />;
}