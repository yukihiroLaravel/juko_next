import useSWR from 'swr';
import type { InstructorCoursesResponse } from '@/features/instructor-course/types/instructorCourse';
import { fetcher } from '@/utils/fetcher';

type InstructorCoursesQuery = {
  page?: number;
  search_word?: string;
  per_page?: number;
};

export function useInstructorCourses({
  page = 1,
  search_word = '',
  per_page = 6,
}: InstructorCoursesQuery = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(per_page),
  });

  const normalizedSearchWord = search_word.trim();
  if (normalizedSearchWord) {
    params.set('search_word', normalizedSearchWord);
  }

  const { data } = useSWR<InstructorCoursesResponse>(
    `/api/v1/instructor/courses/index?${params.toString()}`,
    fetcher,
    { suspense: true },
  );

  return {
    courses: data?.data ?? [],
    meta: data?.meta,
    links: data?.links,
  };
}
