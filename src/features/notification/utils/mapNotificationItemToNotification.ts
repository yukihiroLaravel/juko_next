import { format } from 'date-fns';
import { parseInputDate } from '@/utils/date';
import type { Notification } from '@/features/notification/components/NotificationTable/NotificationTable.ui';
import type { NotificationItem } from '@/features/notification/types/notification';

export function mapNotificationItemToNotification(
  item: NotificationItem,
): Notification {
  // start_date は 'yyyy-MM-dd HH:mm:ss' で返るので、日付だけを表示する
  const startDate = parseInputDate(item.start_date);

  return {
    id: String(item.notification_id),
    title: item.title,
    courseName: item.course_title,
    courseDeadline: null,
    startDate: startDate ? format(startDate, 'yyyy/MM/dd') : item.start_date,
    body: item.content,
  };
}
