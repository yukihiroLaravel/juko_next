'use client';

import { Suspense, type KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import {
  bulkActionConfirmations,
  bulkActionLabels,
  type BulkAction,
  type ConfirmableBulkAction,
} from '../../types/bulkAction';
import { InstructorCourseCardList } from '../InstructorCourseCardList/InstructorCourseCardList';
import { InstructorCourseCardListSkeleton } from '../InstructorCourseCardList/InstructorCourseCardList.skeleton';
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
        <Suspense fallback={<InstructorCourseCardListSkeleton />}>
          <InstructorCourseCardList
            page={page}
            searchWord={submittedSearchKeyword}
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
