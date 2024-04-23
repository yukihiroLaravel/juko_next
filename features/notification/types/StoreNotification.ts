import { Notification } from './Notification';

export type StoreNotification = Pick<
  Notification,
  'title' | 'course_id' | 'start_date' | 'end_date' | 'content'
> & {
  type: string;
};
