'use client';

import { Suspense, type KeyboardEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { useInstructorCourses } from '@/features/instructor-course/hooks/useInstructorCourses';
import { mapInstructorCourseApiToCourse } from '@/features/instructor-course/utils/mapInstructorCourseApiToCourse';
import { routes } from '@/lib/routes';
import {
  bulkActionConfirmations,
  bulkActionLabels,
  type BulkAction,
  type ConfirmableBulkAction,
} from '../../types/bulkAction';
import type { Course } from '../../types/course';
import { InstructorCourseCard } from '../InstructorCourseCard/InstructorCourseCard';
import { InstructorCourseListSkeleton } from './InstructorCourseList.skeleton';
import { InstructorCourseListUI } from './InstructorCourseList.ui';

type InstructorCourseListContentProps = {
  page: number;
  submittedSearchKeyword: string;
  isClassificationEnabled: boolean;
  selectedCourseIds: number[];
  onCourseSelectionChange: (courseId: number, checked: boolean) => void;
  onPageChange: (page: number) => void;
};

function InstructorCourseListContent({
  page,
  submittedSearchKeyword,
  isClassificationEnabled,
  selectedCourseIds,
  onCourseSelectionChange,
  onPageChange,
}: InstructorCourseListContentProps) {
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

  const currentPage = meta?.current_page ?? 1;
  const lastPage = meta?.last_page ?? 1;
  const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

  if (courses.length === 0) {
    return (
      <p className="text-muted-foreground py-12 text-center">
        該当する講座はありません。
      </p>
    );
  }

  if (isClassificationEnabled) {
    return (
      <div className="space-y-8">
        {groupedCourses.map(({ tag, courses: tagCourses }, index) => (
          <section key={tag} aria-labelledby={`course-tag-${index}`}>
            <h2
              id={`course-tag-${index}`}
              className="mb-4 text-xl font-semibold"
            >
              {tag}
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tagCourses.map((course) => (
                <InstructorCourseCard
                  key={course.id}
                  {...course}
                  isSelected={selectedCourseIds.includes(course.id)}
                  onSelectionChange={onCourseSelectionChange}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <InstructorCourseCard
            key={course.id}
            {...course}
            isSelected={selectedCourseIds.includes(course.id)}
            onSelectionChange={onCourseSelectionChange}
          />
        ))}
      </div>

      <nav
        aria-label="ページネーション"
        className="flex items-center justify-center gap-2 pt-4"
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          前へ
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'secondary' : 'outline'}
            size="sm"
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
        >
          次へ
        </Button>
      </nav>
    </>
  );
}

export function InstructorCourseList() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [submittedSearchKeyword, setSubmittedSearchKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [isClassificationEnabled, setIsClassificationEnabled] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [pendingAction, setPendingAction] =
    useState<ConfirmableBulkAction | null>(null);

  const handleCourseSelectionChange = (courseId: number, checked: boolean) => {
    setSelectedCourseIds((currentIds) =>
      checked
        ? currentIds.includes(courseId)
          ? currentIds
          : [...currentIds, courseId]
        : currentIds.filter((id) => id !== courseId),
    );
  };

  const visibleSelectedCourseIds = selectedCourseIds;

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

  const handleSearchSubmit = () => {
    setSubmittedSearchKeyword(searchKeyword.trim());
    setPage(1);
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
      listContent={
        <Suspense fallback={<InstructorCourseListSkeleton />}>
          <InstructorCourseListContent
            page={page}
            submittedSearchKeyword={submittedSearchKeyword}
            isClassificationEnabled={isClassificationEnabled}
            selectedCourseIds={selectedCourseIds}
            onCourseSelectionChange={handleCourseSelectionChange}
            onPageChange={setPage}
          />
        </Suspense>
      }
    />
  );
}
