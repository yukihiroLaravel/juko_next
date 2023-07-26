import { Axios } from '@/lib/api';
import { InstructorCourse } from '@/features/course/types/InstructorCourse';
import { useEffect, useState } from 'react';

export const useFetchInstructorCourses = (args: {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsError: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { setIsLoading, setIsError } = args;
  const [instructorCourses, setInstructorCourses] = useState<InstructorCourse[]>([]);

  useEffect(() => {
    Axios.get('/api/v1/instructor/course/index?instructor_id=1')
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
