import { Course } from '@/types/Course';
import CourseCard from './CourseCard';

const CoursesData: Course[] = [
  {
    course_id: 1,
    title: 'PHP入門講座',
    image: '/course/xxx.png',
    instructor: {
      instructor_id: 1,
      nick_name: 'タロー',
      last_name: '山田',
      first_name: '太郎',
      email: 'test@example.com',
    },
    attendance: {
      attendance_id: 1,
      progress: 70,
    },
  },
];

const CourseCardList = () => {
  return (
    <>
      {CoursesData.map((course) => {
        return <CourseCard key={course.course_id} />;
      })}
    </>
  );
};

export default CourseCardList;
