import { Course } from '@/features/course/types/Course';
import clsx from 'clsx';

interface Props {
  course: Course;
  selectedCourseId: number | undefined;
  clickHandler: (course: Course) => void;
}

export default function CourseTag({
  course,
  selectedCourseId,
  clickHandler,
}: Props) {
  const cardClassName = clsx(
    'flex cursor-pointer items-center justify-center',
    'h-8 w-32 shrink-0',
    'sm:h-10 sm:w-40 sm:shrink-0',
    selectedCourseId === course.course_id ? 'border-b-4 border-primary' : ''
  );
  return (
    <div
      key={course.course_id}
      className={cardClassName}
      onClick={() => clickHandler(course)}
    >
      <div className="text-center">
        <p className="text-sm font-bold">{course.title}</p>
      </div>
    </div>
  );
}
