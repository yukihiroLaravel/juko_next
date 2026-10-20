import { format } from 'date-fns';
import { parseInputDate } from '@/utils/date';
import type { NotificationDetail } from '../types/notification';
import type { Notification } from '../components/NotificationTable/NotificationTable.ui';

export function mapNotificationDetailToNotification(
  detail: NotificationDetail,
): Notification {
  const deadline = parseInputDate(detail.attendance_deadline ?? undefined);
  return {
    id: String(detail.notification_id),
    title: detail.title,
    courseName: detail.course_title,
    body: detail.content,
    courseDeadline: deadline
      ? format(deadline, 'yyyy/MM/dd')
      : detail.attendance_deadline,
    startDate: detail.start_date,
  };
}
