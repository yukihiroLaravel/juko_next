import { Attendance } from '@/features/attendance/types/Attendance';
import { Instructor } from '@/types/Instructor';
import { FC } from 'react';
import { Course } from '../types/Course';

type Props = {
  course:
    | (Course & {
        instructor: Instructor;
        attendance: Attendance;
      })
    | Course;
};

export const CourseTitle: FC<Props> = ({ course }) => {
  return (
    <>
      <p className="font-semibold text-[16px] mb-[16px]">{course.title}</p>
    </>
  );
};
