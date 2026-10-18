'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/atoms/Dialog';
import { Button } from '@/components/atoms/Button';
import { useRetryNotification } from '../../hooks/useNotification';
import { NotificationDetail } from './NotificationDetail';
import { NotificationDetailModalSkeleton } from './NotificationDetailModal.skeleton';

type Props = {
  notificationId: number | null;
  onClose: () => void;
  onCloseAutoFocus: (event: Event) => void;
};

export function NotificationDetailModal({
  notificationId,
  onClose,
  onCloseAutoFocus,
}: Props) {
  const { retryNotification, clearNotificationError } = useRetryNotification();

  const handleClose = () => {
    if (notificationId !== null) clearNotificationError(notificationId);
    onClose();
  };

  return (
    <Dialog
      open={notificationId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="max-w-2xl"
        aria-describedby={undefined}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <DialogTitle className="sr-only">お知らせ詳細</DialogTitle>
        {notificationId !== null && (
          <ErrorBoundary
            key={notificationId}
            fallbackRender={({ resetErrorBoundary }) => (
              <div role="alert">
                <p>お知らせの取得に失敗しました。</p>
                <Button
                  variant="outline"
                  onClick={async () => {
                    const result = await retryNotification(notificationId);
                    if (result.success) resetErrorBoundary();
                  }}
                >
                  再試行
                </Button>
              </div>
            )}
          >
            <Suspense fallback={<NotificationDetailModalSkeleton />}>
              <NotificationDetail notificationId={notificationId} />
            </Suspense>
          </ErrorBoundary>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
