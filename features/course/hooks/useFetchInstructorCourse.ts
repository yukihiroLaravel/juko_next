import { Chapter } from '@/features/chapter/types/Chapter';
import { Course } from '@/features/course/types/Course';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Data = Course & {
  chapters: (Chapter & {
    lessons: (Lesson & {
      lessonAttendance: LessonAttendance;
    })[];
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
  } = useSWR<{
    data: Data;
  }>(fetchUrl, fetcher);

  return {
    course: course?.data,
    isLoading,
    error,
  };
};
