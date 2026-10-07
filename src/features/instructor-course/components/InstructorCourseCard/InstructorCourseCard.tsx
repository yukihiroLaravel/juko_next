import Link from 'next/link';
import { Checkbox } from '@/components/atoms/Checkbox';
import { routes } from '@/lib/routes';
import { InstructorCourseCardUI } from './InstructorCourseCard.ui';
import type { Course } from '../../types/course';

type InstructorCourseCardProps = Course & {
  isSelected: boolean;
  onSelectionChange: (courseId: number, checked: boolean) => void;
};

export function InstructorCourseCard({
  id,
  title,
  deadline,
  isInProgress,
  currentStudents,
  capacity,
  tags,
  isSelected,
  onSelectionChange,
}: InstructorCourseCardProps) {
  const isFull = capacity !== null && currentStudents >= capacity;
  return (
    <div className="relative">
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          className="bg-white"
          aria-label={`${title}を選択`}
          checked={isSelected}
          onCheckedChange={(checked) => onSelectionChange(id, checked === true)}
        />
      </div>
      <Link href={routes.instructor.courses.edit(id)} className="block">
        <InstructorCourseCardUI
          title={title}
          deadline={deadline}
          isInProgress={isInProgress}
          currentStudents={currentStudents}
          capacity={capacity}
          isFull={isFull}
          tags={tags}
        />
      </Link>
    </div>
  );
}
