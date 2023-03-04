import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Props = {
  children: ReactNode;
};

export const AuthenticatedLayout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const isLoginScreen = router?.pathname === '/login';

  const { data, error } = useSWR('/api/proxy/api/user', fetcher);

  useEffect(() => {
    // ログイン画面ではなく、失敗ステータスの場合はログイン画面へリダイレクト
    if (router.isReady && !isLoginScreen && error === 401) {
      router.push('/login');
    }

    // ログイン済みの場合は、コース一覧画面へ
    if (isLoginScreen && data?.id) {
      router.push('/courses');
    }
  }, [data, router, error, isLoginScreen]);

  if (isLoginScreen) {
    return <>{children}</>;
  }

  return data?.id ? <>{children}</> : null;
};
