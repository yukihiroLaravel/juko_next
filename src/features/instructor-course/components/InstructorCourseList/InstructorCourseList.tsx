'use client';

import { type KeyboardEvent, useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { useInstructorCourses } from '../../hooks/useInstructorCourses';
import {
  bulkActionConfirmations,
  bulkActionLabels,
  type BulkAction,
  type ConfirmableBulkAction,
} from '../../types/bulkAction';
import type { Course } from '../../types/course';
import { mapInstructorCourseApiToCourse } from '../../utils/mapInstructorCourseApiToCourse';
import { InstructorCourseListUI } from './InstructorCourseList.ui';

export function InstructorCourseList() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedSearchKeyword, setSubmittedSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isClassificationEnabled, setIsClassificationEnabled] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [pendingAction, setPendingAction] =
    useState<ConfirmableBulkAction | null>(null);
  const [isRefreshing, startTransition] = useTransition();

  const { courses: apiCourses, meta } = useInstructorCourses({
    page,
    search_word: submittedSearchKeyword,
    per_page: 6,
  });

  const courses = useMemo(
    () => apiCourses.map((course) => mapInstructorCourseApiToCourse(course)),
    [apiCourses],
  );

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

  const handleSearchKeywordChange = (value: string) => {
    setSearchKeyword(value);
  };

  // 検索とページの移動で取り直す間は、代替表示に戻さず前の結果を残す
  const handleSearchSubmit = () => {
    const nextSearchKeyword = searchKeyword.trim();

    startTransition(() => {
      setSubmittedSearchKeyword(nextSearchKeyword);
      setPage(1);
    });
  };

  const handlePageChange = (nextPage: number) => {
    startTransition(() => {
      setPage(nextPage);
    });
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  return (
    <InstructorCourseListUI
      searchKeyword={searchKeyword}
      onSearchKeywordChange={handleSearchKeywordChange}
      onSearchSubmit={handleSearchSubmit}
      onSearchKeyDown={handleSearchKeyDown}
      isClassificationEnabled={isClassificationEnabled}
      onClassificationChange={setIsClassificationEnabled}
      onBulkAction={handleBulkAction}
      hasVisibleSelection={visibleSelectedCourseIds.length > 0}
      onRegister={() => router.push(routes.instructor.courses.create())}
      confirmDialog={confirmDialog}
      onConfirmBulkAction={executeBulkAction}
      onCancelBulkAction={() => setPendingAction(null)}
      courses={courses}
      groupedCourses={groupedCourses}
      selectedCourseIds={selectedCourseIds}
      onCourseSelectionChange={handleCourseSelectionChange}
      currentPage={meta?.current_page ?? 1}
      lastPage={meta?.last_page ?? 1}
      onPageChange={handlePageChange}
      isRefreshing={isRefreshing}
    />
  );
}
