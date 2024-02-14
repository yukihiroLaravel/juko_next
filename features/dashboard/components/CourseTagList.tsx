import { Course } from '@/features/course/types/Course';
import CourseTag from './CourseTag';
import { useFetchInstructorCourses } from '@/features/course/hooks/useFetchInstructorCourses';
import { useEffect } from 'react';

interface Props {
  selectedCourse: Course | undefined;
  updateSelectedCourse: (course: Course) => void;
}

export default function CourseTagList({
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
        <CourseTag
          key={course.course_id}
          course={course}
          selectedCourseId={selectedCourse?.course_id}
          clickHandler={() => updateSelectedCourse(course)}
        />
      ))}
    </div>
  );
}
