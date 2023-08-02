import { Axios } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Course } from '@/features/course/types/Course';
import { Instructor } from '@/types/Instructor';
import { Attendance } from '@/types/Attendance';

type Data = Course & {
  instructor: Instructor;
  attendance: Attendance;
};

export const useFetchCourses = (args: {
  setIsLoading: (value: React.SetStateAction<boolean>) => void;
  setIsError: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { setIsLoading, setIsError } = args;
  const [courses, setCourses] = useState<Data[]>([]);
  useEffect(() => {
    Axios.get('/api/v1/course/index?student_id=1')
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
