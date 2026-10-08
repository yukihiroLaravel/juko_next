'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/atoms/Table';
import { Button } from '@/components/atoms/Button';
import { ChevronUp, ChevronDown } from 'lucide-react';

export type Notification = {
  id: string;
  title: string;
  courseName: string;
  courseDeadline: string | null;
  startDate: string;
  body: string;
};

type Props = {
  notifications: Notification[];
  sortOrder: 'asc' | 'desc';
  onSortChange: () => void;
  onNotificationClick: (notificationId: string) => void;
};

export function NotificationTableUI({
  notifications,
  sortOrder,
  onSortChange,
  onNotificationClick,
}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <span className="inline-flex items-center gap-1">
              タイトル
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onSortChange}
                aria-label="タイトルで並び替え"
                className="text-muted-foreground"
              >
                {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </span>
          </TableHead>

          <TableHead>
            <span className="inline-flex items-center gap-1">
              講座名
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onSortChange}
                aria-label="講座名で並び替え"
                className="text-muted-foreground"
              >
                {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </span>
          </TableHead>

          <TableHead>
            <span className="inline-flex items-center gap-1">
              講座受講期限
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onSortChange}
                aria-label="講座受講期限で並び替え"
                className="text-muted-foreground"
              >
                {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </span>
          </TableHead>

          <TableHead>
            <span className="inline-flex items-center gap-1">
              開始日付
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={onSortChange}
                aria-label="開始日付で並び替え"
                className="text-muted-foreground"
              >
                {sortOrder === 'asc' ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {notifications.map((notification) => (
          <TableRow
            key={notification.id}
            tabIndex={0}
            onClick={() => onNotificationClick(notification.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onNotificationClick(notification.id);
              }
            }}
            className="cursor-pointer"
          >
            <TableCell className="font-medium">{notification.title}</TableCell>
            <TableCell>{notification.courseName}</TableCell>
            <TableCell>{notification.courseDeadline ?? '—'}</TableCell>
            <TableCell>{notification.startDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
