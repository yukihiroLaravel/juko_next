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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      {CoursesData.map((course) => {
        return <CourseCard key={course.course_id} />;
      })}
    </div>
  );
};

export default CourseCardList;
