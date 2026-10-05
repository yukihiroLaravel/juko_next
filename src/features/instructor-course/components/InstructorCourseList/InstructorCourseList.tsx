'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { bulkActionLabels, type BulkAction } from '../../types/bulkAction';
import type { Course } from '../../types/course';
import { InstructorCourseListUI } from './InstructorCourseList.ui';

const dummyCourses: Course[] = [
  {
    id: 1,
    title: 'Laravel入門講座',
    deadline: '2025/12/31まで',
    isInProgress: true,
    currentStudents: 3,
    capacity: 10,
    tags: ['Laravel'],
  },
  {
    id: 2,
    title: 'React基礎講座',
    deadline: '開始日から30日後',
    isInProgress: false,
    currentStudents: 5,
    capacity: 5,
    tags: ['React'],
  },
  {
    id: 3,
    title: 'Web開発基礎',
    deadline: null,
    isInProgress: true,
    currentStudents: 2,
    capacity: null,
    tags: ['Laravel', 'React'],
  },
  {
    id: 4,
    title: '新任講師向け講座',
    deadline: null,
    isInProgress: false,
    currentStudents: 0,
    capacity: 20,
    tags: [],
  },
];

export function InstructorCourseList() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isClassificationEnabled, setIsClassificationEnabled] = useState(false);
  const [selectedCourseIds, setSelectedCourseIds] = useState<number[]>([]);
  const [pendingAction, setPendingAction] = useState<BulkAction | null>(null);

  const handleCourseSelectionChange = (courseId: number, checked: boolean) => {
    setSelectedCourseIds((currentIds) =>
      checked
        ? currentIds.includes(courseId)
          ? currentIds
          : [...currentIds, courseId]
        : currentIds.filter((id) => id !== courseId),
    );
  };

  const filteredCourses = dummyCourses.filter((course) =>
    course.title.toLowerCase().includes(searchKeyword.trim().toLowerCase()),
  );

  const visibleSelectedCourseIds = selectedCourseIds.filter((id) =>
    filteredCourses.some((course) => course.id === id),
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

  const groupedCourses = Object.entries(
    filteredCourses.reduce<Record<string, Course[]>>((groups, course) => {
      const tags = course.tags.length > 0 ? course.tags : ['未分類'];

      tags.forEach((tag) => {
        groups[tag] ??= [];
        groups[tag].push(course);
      });

      return groups;
    }, {}),
  ).map(([tag, courses]) => ({ tag, courses }));

  return (
    <InstructorCourseListUI
      courses={filteredCourses}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={setSearchKeyword}
      isClassificationEnabled={isClassificationEnabled}
      onClassificationChange={setIsClassificationEnabled}
      selectedCourseIds={selectedCourseIds}
      onCourseSelectionChange={handleCourseSelectionChange}
      onBulkAction={handleBulkAction}
      groupedCourses={groupedCourses}
      hasVisibleSelection={visibleSelectedCourseIds.length > 0}
      onRegister={() => router.push(routes.instructor.courses.create())}
      isConfirmDialogOpen={pendingAction !== null}
      onConfirmBulkAction={executeBulkAction}
      onCancelBulkAction={() => setPendingAction(null)}
    />
  );
}
