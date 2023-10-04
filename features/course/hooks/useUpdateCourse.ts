import { useForm } from 'react-hook-form';
import { Course } from '../types/Course';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateSchema } from '../schemas/UpdateSchema';
import { UpdateCourse } from '../types/UpdateCourse';
import { useEffect } from 'react';

type Params = {
  course: Course | undefined;
};

export const useUpdateCourse = ({ course }: Params) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateCourse>({
    defaultValues: {
      course_id: course?.course_id,
      title: course?.title,
      status: course?.status,
    },
    resolver: yupResolver(UpdateSchema),
  });

  useEffect(() => {
    if (!course) return;
    setValue('course_id', course.course_id);
    setValue('title', course.title);
    setValue('status', course.status);
  }, [course]);

  return {
    register,
    setValue,
    handleSubmit,
    errors,
  };
};
