import { Axios } from '@/lib/api';
import { Course } from '@/features/course/types/Course';
import { useEffect, useState } from 'react';

export const useFetchInstructorCourses = (args: {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsError: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { setIsLoading, setIsError } = args;
  const [instructorCourses, setInstructorCourses] = useState<Course[]>([]);

  useEffect(() => {
    Axios.get('/api/v1/instructor/course/index')
      .then((res) => {
        setInstructorCourses(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [setIsLoading, setIsError]);
  return [instructorCourses] as const;
};
