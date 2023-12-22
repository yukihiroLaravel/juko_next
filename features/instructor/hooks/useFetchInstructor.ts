import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Instructor } from '../types/Instructor';

export const useFetchInstructor = () => {
  const { data, isLoading, error, mutate } = useSWR<{
    data: Instructor;
  }>('/api/v1/instructor/edit', fetcher, {
    revalidateOnFocus: false,
  });

  return {
    instructor: data?.data,
    isLoading,
    error,
    mutate,
  };
};
