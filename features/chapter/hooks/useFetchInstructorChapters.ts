import { fetcher } from '@/lib/Fetcher';
import { Chapter } from '../types/Chapter';
import useSWR from 'swr';
import { Lesson } from '@/features/lesson/types/Lesson';

type Params = {
  courseId: number | null;
  chapterId: number | null;
};

export const useFetchInstructorChapters = ({ courseId, chapterId }: Params) => {
  const shouldFetch = courseId !== null && chapterId !== null;

  const { data, error, isLoading, mutate } = useSWR<{
    data: Chapter & {
      lessons: Lesson[];
    };
  }>(
    shouldFetch
      ? `/api/v1/instructor/course/${courseId}/chapter/${chapterId}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
    },
  );

  return {
    chapter: data?.data,
    error,
    isLoading,
    mutate,
  };
};
