import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeaderCell,
} from '@/components/atoms/Table';
import { Notification } from '../types/Notification';

type Props = {
  notifications: Notification[]
};

export const NotificationsTable: React.FC<Props> = ({ notifications }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>タイトル</TableHeaderCell>
          <TableHeaderCell>講座名</TableHeaderCell>
          <TableHeaderCell>表示タイプ</TableHeaderCell>
          <TableHeaderCell>開始日時</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {notifications.map((notification) => (
          <TableRow key={notification.notification_id}>
            <TableCell>{notification.course_title}</TableCell>
            <TableCell>{notification.title}</TableCell>
            <TableCell>
              {notification.type === 'once'
                ? '一度だけ表示'
                : notification.type === 'always'
                  ? '常に表示'
                  : ''}
            </TableCell>
            <TableCell>{notification.start_date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
