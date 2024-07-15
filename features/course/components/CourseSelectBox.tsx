import { SelectBox } from '@/components/atoms/SelectBox';
import { FC } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useFetchInstructorCourses } from '../hooks/useFetchInstructorCourses';

type Props = {
  id: string;
  register?: UseFormRegisterReturn;
};

export const CourseSelectBox: FC<Props> = ({ id, register }) => {
  const { courses } = useFetchInstructorCourses();
  return (
    <SelectBox
      id={id}
      options={courses?.map((course) => ({
        value: String(course.course_id),
        label: course.title,
      }))}
      register={register}
    />
  );
};
