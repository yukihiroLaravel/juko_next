import type { LessonStatus } from '@/features/attendance/types/lessonStatus';

export type LessonListItem = {
  id: string;
  title: string;
  status: LessonStatus;
};
