'use client';

import { useSearchParams } from 'next/navigation';
import { RegisteredNoticeUI } from './RegisteredNotice.ui';

export function RegisteredNotice() {
  const searchParams = useSearchParams();

  return <RegisteredNoticeUI show={searchParams.get('registered') === '1'} />;
}
