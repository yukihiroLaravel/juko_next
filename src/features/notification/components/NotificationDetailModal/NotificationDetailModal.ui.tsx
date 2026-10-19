'use client';

import { DialogHeader } from '@/components/atoms/Dialog';
import { Separator } from '@/components/atoms/Separator';
import type { Notification } from '../NotificationTable/NotificationTable.ui';

type Props = { notification: Notification };

export function NotificationDetailModalUI({ notification }: Props) {
  return (
    <>
      <DialogHeader>
        <div className="space-y-1 text-left">
          <p className="text-sm font-medium">
            お知らせ：{notification.courseName}
          </p>
          {notification.courseDeadline !== null && (
            <p className="text-muted-foreground text-sm">
              受講期限: {notification.courseDeadline}
            </p>
          )}
          <h2 className="text-lg font-semibold">{notification.title}</h2>
        </div>
      </DialogHeader>
      <Separator />
      <div className="max-h-80 overflow-y-auto whitespace-pre-wrap">
        {notification.body}
      </div>
    </>
  );
}
