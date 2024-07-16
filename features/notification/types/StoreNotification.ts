import { Notification } from './Notification';

export type StoreNotification = Pick<
  Notification,
  'title' | 'start_date' | 'end_date' | 'content'
> & {
  course_id: string;
  type: string;
};
