import { Chapter } from '@/features/chapter/types/Chapter';
import { Course } from '@/features/course/types/Course';
import { Lesson } from '@/features/lesson/types/Lesson';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Data = Course & {
  chapters: (Chapter & {
    lessons: Lesson[];
  })[];
};

type Args = {
  courseId: string | string[] | undefined;
};

export const useFetchInstructorCourse = ({ courseId }: Args) => {
  const shouldFetch = courseId !== undefined;
  const fetchUrl = shouldFetch ? `/api/v1/instructor/course/${courseId}` : null;
  const {
    data: course,
    isLoading,
    error,
    mutate,
  } = useSWR<{
    data: Data;
  }>(fetchUrl, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    course: course?.data,
    isLoading,
    error,
    mutate,
  };
};
