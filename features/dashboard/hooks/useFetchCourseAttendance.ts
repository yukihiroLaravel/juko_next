import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

interface Params {
  courseId: number;
  type: 'week' | 'month' | 'year';
}

export const useFetchCourseAttendance = ({ courseId, type }: Params) => {
  const { data, error, isLoading } = useSWR<{ login_rate: number }>(
    `/api/v1/instructor/course/${courseId}/attendance/${type}`,
    fetcher
  );
  return {
    loginRate: data?.login_rate,
    isLoading,
    isError: error,
  };
};
