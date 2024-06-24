import { FC, ReactNode, useEffect } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';
import { Loading } from '@/components/utils/Loading';
import Router from 'next/router';
import { useFetchInstructor } from '@/features/instructor/hooks/useFetchInstructor';

type Props = {
  children: ReactNode;
};

export const InstructorAuthWrapper: FC<Props> = ({ children }) => {
  const { instructor, isLoading, isValidating, error } = useFetchInstructor();

  useEffect(() => {
    if (!isValidating && error && Router.pathname !== '/instructor/login') {
      Router.push('/instructor/login');
    } else if (
      Router.pathname === '/instructor/login' &&
      instructor &&
      !isLoading
    ) {
      Router.push('/instructor/courses');
    }
  }, [isValidating, error]);

  if (isValidating)
    return (
      <div className="mx-auto my-10 min-h-screen w-3/4">
        <Loading />
      </div>
    );

  return <>{children}</>;
};
