'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/atoms/Dialog';
import { Button } from '@/components/atoms/Button';
import { Separator } from '@/components/atoms/Separator';
import { Notification } from '../NotificationTable/NotificationTable.ui';

type Props = {
  notification: Notification | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function NotificationDetailModalUI({
  notification,
  open,
  onOpenChange,
}: Props) {
  if (!notification) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="space-y-1 text-left">
            <p className="text-sm font-medium">
              お知らせ：{notification.courseName}
            </p>

            <DialogDescription>
              受講期限: {notification.courseDeadline ?? '—'}
            </DialogDescription>

            <DialogTitle>{notification.title}</DialogTitle>
          </div>
        </DialogHeader>

        <Separator />

        <div className="max-h-80 overflow-y-auto whitespace-pre-wrap">
          {notification.body}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
