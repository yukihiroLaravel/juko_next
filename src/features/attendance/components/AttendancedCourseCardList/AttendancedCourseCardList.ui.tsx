'use client';

import { AttendancedCourseCard } from '../AttendancedCourseCard/AttendancedCourseCard';

type Course = {
  id: string;
  title: string;
  progress: number;
  isExpired: boolean;
};

type AttendancedCourseCardListUIProps = {
  courses: Course[];
};

export function AttendancedCourseCardListUI({
  courses,
}: AttendancedCourseCardListUIProps) {
  return (
    <div className="mx-auto grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <AttendancedCourseCard
          key={course.id}
          title={course.title}
          progress={course.progress}
          isExpired={course.isExpired}
        />
      ))}
    </div>
  );
}
