import { FC, ReactNode, useEffect } from 'react';
import { Loading } from '@/components/utils/Loading';
import Router from 'next/router';
import { useFetchStudent } from '@/features/student/hooks/useFetchStudent';

type Props = {
  children: ReactNode;
};

export const StudentAuthWrapper: FC<Props> = ({ children }) => {
  const { student, isLoading, isValidating, error } = useFetchStudent();

  useEffect(() => {
    if (!isValidating && error && Router.pathname !== '/login') {
      Router.push('/login');
    } else if (Router.pathname === '/login' && student && !isLoading) {
      Router.push('/student/courses');
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
