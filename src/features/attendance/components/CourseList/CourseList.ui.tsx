"use client";

import { AttendancedCourseCard } from "../AttendancedCourseCard/AttendancedCourseCard";

type Course = {
  id: string;
  title: string;
  instructorName: string;
  progress: number;
  isExpired: boolean;
};

type CourseListUIProps = {
  courses: Course[];
};

export function CourseListUI({ courses }: CourseListUIProps) {
  return (
    <div className="mx-auto grid max-w-[1100px] gap-16 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <AttendancedCourseCard
          key={course.id}
          title={course.title}
          instructorName={course.instructorName}
          progress={course.progress}
          isExpired={course.isExpired}
        />
      ))}
    </div>
  );
}