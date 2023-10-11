import { Course } from '@/features/course/types/Course';
import { Instructor } from '@/features/instructor/types/Instructor';
import { Attendance } from '@/features/attendance/types/Attendance';
import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { useState } from 'react';

type Data = Course & {
  instructor: Instructor;
  attendance: Attendance;
};

export const useFetchInstructorCourses = () => {
  const [text, setText] = useState('');
  const updateText = (text: string) => setText(text);

  const {
    data: courses,
    isLoading,
    error,
  } = useSWR<{
    data: Data[];
  }>(text ? `/api/v1/instructor/course/index?text=${text}` : '/api/v1/instructor/course/index', fetcher);

  return {
    courses: courses?.data,
    isLoading,
    error,
    updateText,
  };
};
