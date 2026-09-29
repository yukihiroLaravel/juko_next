import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import type { StudentResponse } from '../types/student';

export function useStudent() {
  const { data, error, mutate } = useSWR<StudentResponse>(
    '/api/v1/students',
    fetcher,
    { suspense: true },
  );

  return {
    student: data?.data,
    error,
    mutate,
  };
}
