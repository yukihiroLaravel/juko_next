import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Student } from '../types/Student';

export const useFetchStudent = () => {
  const { data, isLoading, isValidating, error, mutate } = useSWR<{
    data: Student;
  }>('/api/v1/student', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    onErrorRetry: (error) => {
      if (error.response.status === 401) return;
    },
  });

  return {
    student: data?.data,
    isLoading,
    isValidating,
    error,
    mutate,
  };
};
