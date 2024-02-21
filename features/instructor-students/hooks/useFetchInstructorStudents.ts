import { Student } from '@/features/student/types/Student';
import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

type Params = {
  courseId: string | undefined;
};

export const useFetchInstructorStudents = ({ courseId }: Params) => {
  const fetchUrl = courseId
    ? `/api/v1/instructor/course/${courseId}/student/index`
    : null;

  const { data, isLoading, error, mutate } = useSWR<{
    data: {
      students: Student[];
      pagination: {
        page: number;
        total: number;
      };
    };
  }>(fetchUrl, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    students: data?.data.students,
    isLoading,
    error,
    mutate,
  };
};
