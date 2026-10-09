'use client';

import { NotificationTableUI, Notification } from './NotificationTable.ui';

type Props = {
  notifications: Notification[];
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
  onNotificationClick: (notificationId: string) => void;
};

export function NotificationTable(props: Props) {
  return <NotificationTableUI {...props} />;
}
