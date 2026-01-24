import { LessonItemUI } from "./LessonItem.ui";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Lesson = {
  id: string
  title: string
  isCompleted: boolean
}

type LessonItemProps = {
  lesson: Lesson
}

export function LessonItem({ lesson }: LessonItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: lesson.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <LessonItemUI
        title={lesson.title}
        isCompleted={lesson.isCompleted}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
