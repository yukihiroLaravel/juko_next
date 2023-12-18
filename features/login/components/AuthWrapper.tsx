import { FC, ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';
import { Loading } from '@/components/utils/Loading';
import Router from 'next/router';

type Props = {
  children: ReactNode;
};

export const AuthWrapper: FC<Props> = ({ children }) => {
  const { isValidating, error } = useSWR('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    if (!isValidating && error) {
      Router.push('/login');
    }
  }, [isValidating, error]);

  if (isValidating)
    return (
      <div className="w-3/4 mx-auto min-h-[100vh] mt-10 mb-10">
        <Loading />
      </div>
    );

  return <>{children}</>;
};
