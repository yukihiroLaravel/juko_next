import { LessonItemUI } from './LessonItem.ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { routes } from '@/lib/routes';
import type { Lesson } from '@/features/attendance/types';

type LessonItemProps = {
  attendanceId: string;
  lesson: Lesson;
};

export function LessonItem({ attendanceId, lesson }: LessonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <LessonItemUI
        title={lesson.title}
        href={routes.attendance.lesson(attendanceId, lesson.id)}
        isCompleted={lesson.isCompleted}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
