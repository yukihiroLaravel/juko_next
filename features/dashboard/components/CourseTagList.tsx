import { Course } from '@/features/course/types/Course';
import { useState } from 'react';
import CourseTag from './CourseTag';

export default function CourseTagList() {
  const [selectedCourse, setSelectedCourse] = useState<Course>({
    course_id: 1,
    title: '講座1',
    image: 'https://placehold.jp/150x150.png',
    status: 'private',
  });

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  // 講座を取得
  // 仮で空の配列を作成
  const courses: Course[] = [
    {
      course_id: 1,
      title: '講座1',
      image: 'https://placehold.jp/150x150.png',
      status: 'private',
    },
    {
      course_id: 2,
      title: '講座2',
      image: 'https://placehold.jp/150x150.png',
      status: 'public',
    },
    {
      course_id: 3,
      title: '講座3',
      image: 'https://placehold.jp/150x150.png',
      status: 'private',
    },
    {
      course_id: 4,
      title: '講座4',
      image: 'https://placehold.jp/150x150.png',
      status: 'public',
    },
    {
      course_id: 5,
      title: '講座5',
      image: 'https://placehold.jp/150x150.png',
      status: 'private',
    },
    {
      course_id: 6,
      title: '講座6',
      image: 'https://placehold.jp/150x150.png',
      status: 'public',
    },
    {
      course_id: 7,
      title: '講座7',
      image: 'https://placehold.jp/150x150.png',
      status: 'private',
    },
    {
      course_id: 8,
      title: '講座8',
      image: 'https://placehold.jp/150x150.png',
      status: 'public',
    },
    {
      course_id: 9,
      title: '講座9',
      image: 'https://placehold.jp/150x150.png',
      status: 'private',
    },
    {
      course_id: 10,
      title: '講座10',
      image: 'https://placehold.jp/150x150.png',
      status: 'public',
    },
  ];
  /* 横スクロール可能なタグリスト */
  return (
    <div className="flex overflow-x-auto bg-white">
      {courses.map((course) => (
        <CourseTag
          key={course.course_id}
          course={course}
          selectedCourseId={selectedCourse.course_id}
          clickHandler={handleCourseClick}
        />
      ))}
    </div>
  );
}
