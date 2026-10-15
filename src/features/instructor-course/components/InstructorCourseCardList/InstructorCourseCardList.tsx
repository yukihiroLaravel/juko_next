'use client';

import { useEffect, useMemo } from 'react';
import { useInstructorCourses } from '../../hooks/useInstructorCourses';
import type { Course } from '../../types/course';
import { mapInstructorCourseApiToCourse } from '../../utils/mapInstructorCourseApiToCourse';
import { InstructorCourseCardListUI } from './InstructorCourseCardList.ui';

type InstructorCourseCardListProps = {
  page: number;
  searchWord: string;
  isClassificationEnabled: boolean;
  selectedCourseIds: number[];
  onCourseSelectionChange: (courseId: number, checked: boolean) => void;
  onPageChange: (page: number) => void;
  onVisibleCourseIdsChange: (courseIds: number[]) => void;
};

export function InstructorCourseCardList({
  page,
  searchWord,
  isClassificationEnabled,
  selectedCourseIds,
  onCourseSelectionChange,
  onPageChange,
  onVisibleCourseIdsChange,
}: InstructorCourseCardListProps) {
  const { courses: apiCourses, meta } = useInstructorCourses({
    page,
    search_word: searchWord,
    per_page: 6,
  });

  const courses = useMemo(
    () => apiCourses.map((course) => mapInstructorCourseApiToCourse(course)),
    [apiCourses],
  );

  // 一括変更の対象を表示中の講座に絞るため、取得した講座を一覧の外に知らせる
  useEffect(() => {
    onVisibleCourseIdsChange(courses.map((course) => course.id));
  }, [courses, onVisibleCourseIdsChange]);

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

  return (
    <InstructorCourseCardListUI
      courses={courses}
      groupedCourses={groupedCourses}
      isClassificationEnabled={isClassificationEnabled}
      selectedCourseIds={selectedCourseIds}
      onCourseSelectionChange={onCourseSelectionChange}
      currentPage={meta?.current_page ?? 1}
      lastPage={meta?.last_page ?? 1}
      onPageChange={onPageChange}
    />
  );
}
