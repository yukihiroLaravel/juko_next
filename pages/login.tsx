import Header from '@/components/layouts/Header';
import { LoginForm } from '@/features/login/components/LoginForm';
import { fetcher } from '@/lib/Fetcher';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

const Login: NextPage = () => {
  const router = useRouter();

  const { error, isValidating } = useSWR('/api/proxy/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    fallbackData: null,
    errorRetryCount: 0,
  });

  useEffect(() => {
    if (!isValidating && error?.response?.status !== 401) {
      router.push('/courses');
    }
  }, [error, router, isValidating]);

  return (
    <>
      <Header isLogin={false} />
      <LoginForm />
    </>
  );
};

export default Login;
