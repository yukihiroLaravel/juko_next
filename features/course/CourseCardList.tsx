import { useFetchCourses } from '@/hooks/useFetchCourses';
import CourseCard from './CourseCard';

const CourseCardList = () => {
  const [Courses] = useFetchCourses();
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[30px]">
      {Courses.map((course) => {
        return <CourseCard key={course.course_id} course={course} />;
      })}
    </div>
  );
};

export default CourseCardList;
