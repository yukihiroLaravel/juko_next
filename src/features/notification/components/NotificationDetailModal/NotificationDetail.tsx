'use client';

import { useNotification } from '../../hooks/useNotification';
import { mapNotificationDetailToNotification } from '../../utils/mapNotificationDetailToNotification';
import { NotificationDetailModalUI } from './NotificationDetailModal.ui';

export function NotificationDetail({
  notificationId,
}: {
  notificationId: number;
}) {
  const { notification } = useNotification(notificationId);
  if (!notification) return <p>お知らせが見つかりません。</p>;
  return (
    <NotificationDetailModalUI
      notification={mapNotificationDetailToNotification(notification)}
    />
  );
}
