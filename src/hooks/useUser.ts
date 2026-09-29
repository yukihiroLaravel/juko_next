import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { User } from '@/features/auth/types';

export function useUser() {
  const { data, error, isLoading, mutate } = useSWR<User>(
    '/api/user',
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: true,
      dedupingInterval: 300000,
      errorRetryCount: 0,
      revalidateOnMount: true,
    },
  );

  return {
    user: data,
    isLoading,
    isAuthenticated: !!data && !error,
    error,
    mutate,
  };
}
