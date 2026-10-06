'use client';

import { Notification } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModalUI } from './NotificationDetailModal.ui';

type Props = {
  notification: Notification | null;
  onClose: () => void;
};

export function NotificationDetailModal({
  notification,
  onClose,
}: Props) {
  const isOpen = notification !== null;

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <NotificationDetailModalUI
      notification={notification}
      open={isOpen}
      onOpenChange={handleOpenChange}
    />
  );
}