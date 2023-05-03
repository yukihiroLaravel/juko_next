import { Course } from '@/features/course/types/Course';
import React, { FC } from 'react';
import CourseCard from './CourseCard';
import Link from 'next/link';

type Props = {
  courses: Course[];
};

const CourseCardList: FC<Props> = (props) => {
  const { courses } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      {courses.map((course) => {
        return (
          <Link key={course.course_id} href="/course">
            <a>
              <CourseCard course={course} />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default CourseCardList;
