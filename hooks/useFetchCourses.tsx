import { Axios } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Course } from '@/types/Course';

export const useFetchCourses = (setIsLoading: (value: React.SetStateAction<boolean>) => void) => {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    Axios.get('api/proxy/api/v1/courses?student_id=1').then((res) => {
      setCourses(res.data.data);
      setIsLoading(false);
    });
  }, [setIsLoading]);
  return [courses] as const;
};
