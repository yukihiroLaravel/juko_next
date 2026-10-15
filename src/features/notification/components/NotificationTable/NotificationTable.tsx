'use client';

import { NotificationTableUI, Notification } from './NotificationTable.ui';

type SortBy = 'title' | 'course_id' | 'start_date';
type Props = {
  notifications: Notification[];
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
  onSortChange: (column: SortBy) => void;
  onNotificationClick: (notificationId: string) => void;
};

export function NotificationTable(props: Props) {
  return <NotificationTableUI {...props} />;
}
