'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { InstructorCourseListUI } from './InstructorCourseList.ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog';
import { Button } from '@/components/atoms/Button';
import type { Course } from '../../types/course';

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
  const [pendingAction, setPendingAction] = useState<string | null>(null);

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
    console.log(pendingAction, visibleSelectedCourseIds);
    setPendingAction(null);
  };

  const handleBulkAction = (action: string) => {
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

    const labels: Record<string, string> = {
      publish: '選択済み講座を公開',
      unpublish: '選択済み講座を非公開',
      clearDeadline: '選択して受講期限をなくす',
      delete: '選択済み講座を削除',
      clearCapacity: '選択して定員をなくす',
    };
    if (labels[action]) setPendingAction(labels[action]);
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
    >
      <Dialog
        open={pendingAction !== null}
        onOpenChange={(open) => !open && setPendingAction(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>一括変更の確認</DialogTitle>
            <DialogDescription>本当に実行しますか？</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingAction(null)}>
              キャンセル
            </Button>
            <Button onClick={executeBulkAction}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </InstructorCourseListUI>
  );
}
