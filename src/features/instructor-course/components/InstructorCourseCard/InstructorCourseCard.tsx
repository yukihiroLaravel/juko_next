import Link from 'next/link';
import { Checkbox } from '@/components/atoms/Checkbox';
import { routes } from '@/lib/routes';
import { InstructorCourseCardUI } from './InstructorCourseCard.ui';

type InstructorCourseCardProps = {
  id: number;
  title: string;
  deadline: string | null;
  isInProgress: boolean;
  currentStudents: number;
  capacity: number | null;
  tags: string[];
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
  return (
    <div className="relative">
      <div className="absolute top-3 left-3 z-10">
        <Checkbox
          aria-label={`${title}を選択`}
          checked={isSelected}
          onClick={(event) => event.stopPropagation()}
          onCheckedChange={(checked) => onSelectionChange(id, checked === true)}
        />
      </div>
      <Link href={routes.instructor.courses.detail(id)} className="block">
        <InstructorCourseCardUI
          title={title}
          deadline={deadline}
          isInProgress={isInProgress}
          currentStudents={currentStudents}
          capacity={capacity}
          tags={tags}
        />
      </Link>
    </div>
  );
}
