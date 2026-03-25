import { LessonItemUI } from './LessonItem.ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Lesson } from '@/features/attendance/types/attendanceDetail';

type LessonItemProps = {
  lesson: Lesson;
};

export function LessonItem({ lesson }: LessonItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: lesson.lesson_id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <LessonItemUI
        title={lesson.title}
        isCompleted={lesson.is_completed}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
