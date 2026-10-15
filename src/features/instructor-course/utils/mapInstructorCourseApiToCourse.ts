import type { Course } from '@/features/instructor-course/types/course';
import type {
  InstructorCourseApiDeadline,
  InstructorCourseApiItem,
} from '@/features/instructor-course/types/instructorCourse';

function formatDeadline(
  courseDeadline: InstructorCourseApiDeadline | null,
): string | null {
  if (!courseDeadline) {
    return null;
  }

  if (courseDeadline.fixed_date) {
    return `${courseDeadline.fixed_date.replace(/-/g, '/')}まで`;
  }

  if (
    courseDeadline.relative_days !== null &&
    courseDeadline.relative_days !== undefined
  ) {
    return `開始日から${courseDeadline.relative_days}日後`;
  }

  return null;
}

export function mapInstructorCourseApiToCourse(
  course: InstructorCourseApiItem,
): Course {
  const storageUrl = process.env.NEXT_PUBLIC_STORAGE_URL ?? '';

  return {
    id: course.course_id,
    title: course.title,
    deadline: formatDeadline(course.course_deadline),
    isInProgress: course.has_active_students,
    currentStudents: 0,
    capacity: null,
    tags: course.tags.map((tag) => tag.content),
    image: course.image
      ? `${storageUrl.replace(/\/+$/, '')}/${course.image.replace(/^\/+/, '')}`
      : undefined,
  };
}
