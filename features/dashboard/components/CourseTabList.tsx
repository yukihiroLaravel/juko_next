import { Course } from '@/features/course/types/Course';
import CourseTab from '@/features/dashboard/components/CourseTab';
import { useFetchInstructorCourses } from '@/features/course/hooks/useFetchInstructorCourses';
import { useEffect } from 'react';

interface Props {
  selectedCourse: Course | undefined;
  updateSelectedCourse: (course: Course) => void;
}

export default function CourseTabList({
  updateSelectedCourse,
  selectedCourse,
}: Props) {
  // 講座を取得
  const { courses } = useFetchInstructorCourses();

  useEffect(() => {
    if (courses && !selectedCourse) {
      if (courses[0]) {
        updateSelectedCourse(courses[0]);
      }
    }
  }, [courses]);

  return (
    <div className="flex overflow-x-auto bg-white shadow-md">
      {courses?.map((course) => (
        <CourseTab
          key={course.course_id}
          course={course}
          selectedCourseId={selectedCourse?.course_id}
          clickHandler={() => updateSelectedCourse(course)}
        />
      ))}
    </div>
  );
}
