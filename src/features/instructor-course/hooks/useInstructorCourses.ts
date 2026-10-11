import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

type InstructorCoursesQuery = {
  page?: number;
  search_word?: string;
  per_page?: number;
};

type Tag = {
  tag_id: number;
  content: string;
};

type CourseItem = {
  course_id: number;
  title: string;
  image: string | null;
  status: string;
  has_active_students: boolean;
  tags: Tag[];
  course_deadline: {
    course_deadline_id?: number;
    fixed_date?: string | null;
    relative_days?: number | null;
  } | null;
};

type PaginationMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};

type PaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

type InstructorCoursesResponse = {
  data: CourseItem[];
  meta: PaginationMeta;
  links: PaginationLinks;
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

  const { data, error } = useSWR<InstructorCoursesResponse>(
    `/api/v1/instructor/courses/index?${params.toString()}`,
    fetcher,
    { suspense: true },
  );

  return {
    courses: data?.data ?? [],
    meta: data?.meta,
    links: data?.links,
    error,
  };
}
