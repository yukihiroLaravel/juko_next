'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useInstructorCourses } from '@/features/instructor-course/hooks/useInstructorCourses';
import { routes } from '@/lib/routes';
import {
  bulkActionConfirmations,
  bulkActionLabels,
  type BulkAction,
  type ConfirmableBulkAction,
} from '../../types/bulkAction';
import type { Course } from '../../types/course';
import { InstructorCourseListUI } from './InstructorCourseList.ui';

type ApiCourse = {
  course_id: number;
  title: string;
  image: string | null;
  status: string;
  has_active_students: boolean;
  tags: Array<{ tag_id: number; content: string }>;
  course_deadline: { fixed_date?: string | null; relative_days?: number | null } | null;
};

const formatDeadline = (
  courseDeadline: ApiCourse['course_deadline'],
): string | null => {
  if (!courseDeadline) {
    return null;
  }

  if (courseDeadline.fixed_date) {
    return `${courseDeadline.fixed_date}まで`;
  }

  if (courseDeadline.relative_days !== null && courseDeadline.relative_days !== undefined) {
    return `開始日から${courseDeadline.relative_days}日後`;
  }

  return null;
};

const mapApiCourseToCourse = (course: ApiCourse): Course => ({
  id: course.course_id,
  title: course.title,
  deadline: formatDeadline(course.course_deadline),
  isInProgress: course.has_active_students,
  currentStudents: 0,
  capacity: null,
  tags: course.tags.map((tag) => tag.content),
  image: course.image ?? undefined,
});

export function InstructorCourseList() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isClassificationEnabled, setIsClassificationEnabled] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [pendingAction, setPendingAction] =
    useState<ConfirmableBulkAction | null>(null);

  const { courses: apiCourses, meta, error } = useInstructorCourses({
    page,
    search_word: searchKeyword.trim(),
    per_page: 6,
  });

  const courses = useMemo(
    () => apiCourses.map((course) => mapApiCourseToCourse(course)),
    [apiCourses],
  );

  const handleCourseSelectionChange = (courseId: number, checked: boolean) => {
    setSelectedCourseIds((currentIds) =>
      checked
        ? currentIds.includes(courseId)
          ? currentIds
          : [...currentIds, courseId]
        : currentIds.filter((id) => id !== courseId),
    );
  };

  const visibleSelectedCourseIds = selectedCourseIds.filter((id) =>
    courses.some((course) => course.id === id),
  );

  const executeBulkAction = () => {
    if (!pendingAction) return;

    console.log(bulkActionLabels[pendingAction], visibleSelectedCourseIds);
    setPendingAction(null);
  };

  const handleBulkAction = (action: BulkAction) => {
    if (visibleSelectedCourseIds.length === 0) return;

    if (action === 'deadline') {
      router.push(
        routes.instructor.courses.bulkDeadline(visibleSelectedCourseIds),
      );
      return;
    }

    if (action === 'capacity') {
      router.push(
        routes.instructor.courses.bulkCapacity(visibleSelectedCourseIds),
      );
      return;
    }

    setPendingAction(action);
  };

  const confirmation = pendingAction
    ? bulkActionConfirmations[pendingAction]
    : null;
  const confirmDialog = confirmation && {
    title: confirmation.title,
    description: `${confirmation.describe(visibleSelectedCourseIds.length)}本当に実行しますか？`,
    confirmLabel: confirmation.confirmLabel,
    isDestructive: confirmation.isDestructive,
  };

  const groupedCourses = Object.entries(
    courses.reduce<Record<string, Course[]>>((groups, course) => {
      const tags = course.tags.length > 0 ? course.tags : ['未分類'];

      tags.forEach((tag) => {
        groups[tag] ??= [];
        groups[tag].push(course);
      });

      return groups;
    }, {}),
  ).map(([tag, grouped]) => ({ tag, courses: grouped }));

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
    setPage(1);
  };

  if (error) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 p-6">
        <p role="alert">講座の取得に失敗しました。</p>
      </div>
    );
  }

  return (
    <InstructorCourseListUI
      courses={courses}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={handleSearchKeywordChange}
      isClassificationEnabled={isClassificationEnabled}
      onClassificationChange={setIsClassificationEnabled}
      selectedCourseIds={selectedCourseIds}
      onCourseSelectionChange={handleCourseSelectionChange}
      onBulkAction={handleBulkAction}
      groupedCourses={groupedCourses}
      hasVisibleSelection={visibleSelectedCourseIds.length > 0}
      onRegister={() => router.push(routes.instructor.courses.create())}
      confirmDialog={confirmDialog}
      onConfirmBulkAction={executeBulkAction}
      onCancelBulkAction={() => setPendingAction(null)}
      meta={meta}
      onPageChange={setPage}
    />
  );
}
