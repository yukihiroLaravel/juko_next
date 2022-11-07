import { Course } from '@/types/Course';
import React, { FC } from 'react';
import CourseCard from './CourseCard';

type Props = {
  courses: Course[];
};

const CourseCardList: FC<Props> = (props) => {
  const { courses } = props;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      {courses.map((course) => {
        return <CourseCard key={course.course_id} course={course} />;
      })}
    </div>
  );
};

export default CourseCardList;
