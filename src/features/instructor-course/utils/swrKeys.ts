const INSTRUCTOR_COURSES_KEY_PREFIX = '/api/v1/instructor/courses/index';

export function isInstructorCoursesKey(key: unknown): boolean {
  return (
    typeof key === 'string' && key.startsWith(INSTRUCTOR_COURSES_KEY_PREFIX)
  );
}
