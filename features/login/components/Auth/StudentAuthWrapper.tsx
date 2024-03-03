import { FC, ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';
import { Loading } from '@/components/utils/Loading';
import Router from 'next/router';

type Props = {
  children: ReactNode;
};

export const StudentAuthWrapper: FC<Props> = ({ children }) => {
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
      <div className="mx-auto my-10 min-h-[100vh] w-3/4">
        <Loading />
      </div>
    );

  return <>{children}</>;
};
