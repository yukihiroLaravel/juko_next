import { Course } from '@/features/course/types/Course';
import { Instructor } from '@/types/Instructor';
import { Attendance } from '@/features/attendance/types/Attendance';
import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

type Data = Course & {
  instructor: Instructor;
  attendance: Attendance;
};

export const useFetchCourses = () => {
  const {
    data: courses,
    isLoading,
    error,
  } = useSWR<{
    data: Data[];
  }>('/api/v1/course/index', fetcher);

  return {
    courses: courses?.data,
    isLoading,
    error,
  };
};
