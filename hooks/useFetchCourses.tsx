import { Axios } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Course } from '@/types/Course';

export const useFetchCourses = (args: {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsError: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { setIsLoading, setIsError } = args;
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    Axios.get('api/proxy/api/v1/courses?student_id=1')
      .then((res) => {
        setCourses(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
        setIsError(true);
      });
  }, [setIsLoading, setIsError]);
  return [courses] as const;
};
