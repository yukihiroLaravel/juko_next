import { Attendance } from '@/features/attendance/types/Attendance';
import { Instructor } from '@/features/instructor/types/Instructor';
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
      <p className="mb-[16px] text-[16px] font-semibold">{course.title}</p>
    </>
  );
};
