import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';
import { Loading } from '@/components/utils/Loading';

type Props = {
  children: ReactNode;
};

export const AuthWrapper: FC<Props> = ({ children }) => {
  const router = useRouter();

  const { isValidating, error } = useSWR('/api/proxy/api/user', fetcher);

  useEffect(() => {
    // ログイン画面ではなく、失敗ステータスの場合はログイン画面へリダイレクト
    if (!isValidating && router.isReady && error?.response?.status === 401) {
      router.push('/login');
    }
  }, [isValidating, router, error]);

  if (isValidating)
    return (
      <div className="w-3/4 mx-auto min-h-[100vh] mt-10 mb-10">
        <Loading />
      </div>
    );

  return <>{children}</>;
};
