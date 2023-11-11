import { Course } from '@/features/course/types/Course';
import { Instructor } from '@/features/instructor/types/Instructor';
import { useState } from 'react';
import { Attendance } from '@/features/attendance/types/Attendance';
import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

type Data = {
  data: (Attendance & {
    course: Course & {
      instructor: Instructor;
    };
  })[];
};

export const useFetchCourses = () => {
  const [text, setText] = useState('');
  const updateText = (text: string) => setText(text);

  const {
    data: attendances,
    isLoading,
    error,
  } = useSWR<Data>(
    text
      ? `/api/v1/attendance/index?search_word=${text}`
      : '/api/v1/attendance/index',
    fetcher
  );

  return {
    attendances: attendances?.data,
    isLoading,
    error,
    updateText,
  };
};
