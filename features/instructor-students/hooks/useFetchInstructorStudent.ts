import { Student } from '@/features/student/types/Student';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Args = {
  studentId: number | undefined;
};

export const useFetchInstructorStudent = ({ studentId }: Args) => {
  const shouldFetch = studentId !== undefined;
  const fetchUrl = shouldFetch
    ? `/api/v1/instructor/student/${studentId}`
    : null;
  const { data, isLoading, error, mutate } = useSWR<{
    data: Student;
  }>(fetchUrl, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    student: data?.data,
    isLoading,
    error,
    mutate,
  };
};
