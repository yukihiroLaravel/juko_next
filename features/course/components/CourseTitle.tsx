import { Attendance } from '@/types/Attendance';
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
      {'instructor' in course ? (
        <>
          <p className="font-semibold text-[16px] mb-[16px]">
            講師 : {course.instructor.last_name} {course.instructor.first_name}
          </p>
          <p className="font-semibold text-[16px] mb-[16px]">進捗 {course.attendance.progress}%</p>
        </>
      ) : (
        ''
      )}
    </>
  );
};
