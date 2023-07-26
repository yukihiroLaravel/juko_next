import { InstructorCourse } from '@/features/course/types/InstructorCourse';
import React, { FC } from 'react';
import InstructorCourseCard from './InstructorCourseCard';
import Link from 'next/link';

type Props = {
  instructorCourses: InstructorCourse[];
};

const InstructorCourseCardList: FC<Props> = (props) => {
  const { instructorCourses } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      {instructorCourses.map((instructorCourse) => {
        return (
          <Link key={instructorCourse.course_id} href="/instructor/course">
            <a>
              <InstructorCourseCard instructorCourse={instructorCourse} />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default InstructorCourseCardList;
