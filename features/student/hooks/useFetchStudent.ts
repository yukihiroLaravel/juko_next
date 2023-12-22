import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Student } from '../types/Student';

export const useFetchStudent = () => {
  const { data, isLoading, error, mutate } = useSWR<{
    data: Student;
  }>('/api/v1/student/edit', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    student: data?.data,
    isLoading,
    error,
    mutate,
  };
};
