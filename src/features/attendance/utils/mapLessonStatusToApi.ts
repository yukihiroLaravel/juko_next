import type {
  LessonStatus,
  ApiLessonStatus,
} from '@/features/attendance/types/lessonStatus';

const LESSON_STATUS_TO_API: Record<LessonStatus, ApiLessonStatus> = {
  before_attendance: 'before_attendance',
  in_attendance: 'in_attendance',
  completed_attendance: 'completed_attendance',
};

export function mapLessonStatusToApi(status: LessonStatus): ApiLessonStatus {
  return LESSON_STATUS_TO_API[status];
}
