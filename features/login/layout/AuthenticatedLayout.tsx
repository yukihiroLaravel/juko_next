import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Props = {
  children: ReactNode;
};

export const AuthenticatedLayout: FC<Props> = ({ children }) => {
  const [userId, setUserId] = useState<number | undefined>();
  const router = useRouter();

  const isLoginScreen = router?.pathname === '/login';

  const { data, error } = useSWR('/api/proxy/api/user', fetcher);

  useEffect(() => {
    // ユーザーが存在し、ログイン画面でない場合はユーザーIDを設定
    if (data?.id && router.isReady && isLoginScreen === false) {
      setUserId(data.id);
      return;
    }

    // ログイン画面ではなく、失敗ステータスの場合はログイン画面へリダイレクト
    if (isLoginScreen === false && error !== 200) {
      router.push('/login');
    }
  }, [data, router, error, isLoginScreen, userId]);

  if (isLoginScreen) {
    return <>{children}</>;
  }

  return userId ? <>{children}</> : null;
};
