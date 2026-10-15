'use client';

import { ErrorBoundary } from 'react-error-boundary';
import { InstructorCourseList } from '@/features/instructor-course/components/InstructorCourseList/InstructorCourseList';

export default function InstructorCoursesPage() {
  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <InstructorCourseList />
    </ErrorBoundary>
  );
}
