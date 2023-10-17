import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

type Args = {
  courseId: string | string[] | undefined;
};

type Data = {
  number_of_completed_chapters: number;
  number_of_total_chapters: number;
  number_of_completed_lessons: number;
  number_of_total_lessons: number;
  continue_lesson_id: number | null;
};

export const useFetchProgress = ({ courseId }: Args) => {
  const shouldFetch = courseId !== undefined;
  const fetchUrl = shouldFetch ? `/api/v1/course/${courseId}/progress` : null;
  const { data, isLoading, error, mutate } = useSWR<{
    data: Data;
  }>(fetchUrl, fetcher);

  return {
    data: data?.data,
    isLoading,
    error,
    mutate,
  };
};
