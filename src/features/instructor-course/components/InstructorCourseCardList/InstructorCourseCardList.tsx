'use client';

import { useMemo } from 'react';
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
};

export function InstructorCourseCardList({
  page,
  searchWord,
  isClassificationEnabled,
  selectedCourseIds,
  onCourseSelectionChange,
  onPageChange,
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
