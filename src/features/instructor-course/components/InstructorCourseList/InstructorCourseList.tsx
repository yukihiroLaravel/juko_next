'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { routes } from '@/lib/routes';
import { InstructorCourseListUI } from './InstructorCourseList.ui';

type Course = {
  id: number;
  title: string;
  deadline: string | null;
  isInProgress: boolean;
  currentStudents: number;
  capacity: number | null;
  tags: string[];
};

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

  const handleCourseSelectionChange = (courseId: number, checked: boolean) => {
    setSelectedCourseIds((currentIds) =>
      checked
        ? currentIds.includes(courseId)
          ? currentIds
          : [...currentIds, courseId]
        : currentIds.filter((id) => id !== courseId),
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedCourseIds.length === 0) return;

    if (action === 'deadline') {
      router.push(routes.instructor.courses.bulkDeadline(selectedCourseIds));
      return;
    }
    if (action === 'capacity') {
      router.push(routes.instructor.courses.bulkCapacity(selectedCourseIds));
      return;
    }

    const labels: Record<string, string> = {
      publish: '選択済み講座を公開',
      unpublish: '選択済み講座を非公開',
      clearDeadline: '選択して受講期限をなくす',
      delete: '選択済み講座を削除',
      clearCapacity: '選択して定員をなくす',
    };
    const label = labels[action];
    if (!label || !window.confirm('本当に実行しますか？')) return;
    console.log(label, selectedCourseIds);
  };

  const filteredCourses = dummyCourses.filter((course) =>
    course.title.toLowerCase().includes(searchKeyword.trim().toLowerCase()),
  );

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
      onRegister={() => router.push(routes.instructor.courses.create())}
    />
  );
}
