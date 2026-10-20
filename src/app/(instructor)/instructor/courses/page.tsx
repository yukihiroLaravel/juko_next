'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { InstructorCourseList } from '@/features/instructor-course/components/InstructorCourseList/InstructorCourseList';
import { InstructorCourseListSkeleton } from '@/features/instructor-course/components/InstructorCourseList/InstructorCourseList.skeleton';

export default function InstructorCoursesPage() {
  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <Suspense fallback={<InstructorCourseListSkeleton />}>
        <InstructorCourseList />
      </Suspense>
    </ErrorBoundary>
  );
}
