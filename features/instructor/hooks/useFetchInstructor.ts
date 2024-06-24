import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Instructor } from '../types/Instructor';

export const useFetchInstructor = () => {
  const { data, isLoading, isValidating, error, mutate } = useSWR<{
    data: Instructor;
  }>('/api/v1/instructor', fetcher, {
    revalidateOnFocus: false,
    onErrorRetry: (error) => {
      if (error.response.status === 401) return;
    },
  });

  return {
    instructor: data?.data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
