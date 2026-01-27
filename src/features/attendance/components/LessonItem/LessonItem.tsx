import { LessonItemUI } from './LessonItem.ui';
import type { Lesson } from '@/features/attendance/types';

type LessonItemProps = {
  lesson: Lesson;
};

export function LessonItem({ lesson }: LessonItemProps) {
  return <LessonItemUI title={lesson.title} isCompleted={lesson.isCompleted} />;
}
