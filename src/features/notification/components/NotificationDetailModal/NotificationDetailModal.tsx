'use client';

import { Notification } from '../NotificationTable/NotificationTable.ui';
import { NotificationDetailModalUI } from './NotificationDetailModal.ui';

type Props = {
  notification: Notification | null;
  onClose: () => void;
  onCloseAutoFocus: (event: Event) => void;
};

export function NotificationDetailModal({
  notification,
  onClose,
  onCloseAutoFocus,
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
      onCloseAutoFocus={onCloseAutoFocus}
    />
  );
}
