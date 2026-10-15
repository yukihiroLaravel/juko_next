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

type SortBy = 'title' | 'course_id' | 'start_date';

type Props = {
  notifications: Notification[];
  sortBy: SortBy;
  sortOrder: 'asc' | 'desc';
  onSortChange: (column: SortBy) => void;
  onNotificationClick: (notificationId: string) => void;
};

export function NotificationTableUI({
  notifications,
  sortBy,
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
                onClick={() => onSortChange('title')}
                aria-label="タイトルで並び替え"
                className="text-muted-foreground"
              >
                {sortBy === 'title' && sortOrder === 'asc' ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </Button>
            </span>
          </TableHead>

          <TableHead>
            <span className="inline-flex items-center gap-1">
              講座名
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onSortChange('course_id')}
                aria-label="講座名で並び替え"
                className="text-muted-foreground"
              >
                {sortBy === 'course_id' && sortOrder === 'asc' ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </Button>
            </span>
          </TableHead>

          <TableHead>
            <span className="inline-flex items-center gap-1">
              開始日付
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onSortChange('start_date')}
                aria-label="開始日付で並び替え"
                className="text-muted-foreground"
              >
                {sortBy === 'start_date' && sortOrder === 'asc' ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
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
            <TableCell>{notification.startDate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
