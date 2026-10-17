import type { NotificationDetail } from '../types/notification';
import type { Notification } from '../components/NotificationTable/NotificationTable.ui';

export function mapNotificationDetailToNotification(
  detail: NotificationDetail,
): Notification {
  return {
    id: String(detail.notification_id),
    title: detail.title,
    courseName: detail.course_title,
    body: detail.content,
    courseDeadline: detail.attendance_deadline,
    startDate: detail.start_date,
  };
}
