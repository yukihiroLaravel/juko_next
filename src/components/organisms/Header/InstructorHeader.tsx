'use client';

import { InstructorHeaderUI } from './InstructorHeader.ui';

export function InstructorHeader() {
  const handleLogout = () => {
    // TODO: 講師用ログアウトエンドポイントを設定
    console.log('instructor logout');
  };

  return <InstructorHeaderUI userName="山田 花子" onLogout={handleLogout} />;
}
