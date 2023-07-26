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

  const { isValidating, error } = useSWR('/api/user', fetcher);

  useEffect(() => {
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
