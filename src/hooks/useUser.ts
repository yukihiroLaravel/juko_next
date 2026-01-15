import useSWR from 'swr';
import { Axios } from '@/lib/api';
import type { User } from '@/features/auth/types';

const fetcher = (url: string) => Axios.get<User>(url).then((res) => res.data);

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
