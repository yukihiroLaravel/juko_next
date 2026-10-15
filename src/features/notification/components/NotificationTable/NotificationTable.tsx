'use client';

import {
  NotificationTableUI,
  Notification,
  NotificationSortColumn,
} from './NotificationTable.ui';
import type { NotificationSortOrder } from '@/features/notification/types/notification';

type Props = {
  notifications: Notification[];
  sortBy: NotificationSortColumn;
  sortOrder: NotificationSortOrder;
  onSortChange: (column: NotificationSortColumn) => void;
  onNotificationClick: (notificationId: string) => void;
};

export function NotificationTable(props: Props) {
  return <NotificationTableUI {...props} />;
}
