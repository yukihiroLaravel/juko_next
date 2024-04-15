export type Notification = {
  notification_id: number;
  course_id: number;
  title: string;
  course_title: string;
  type: 'one' | 'always';
  start_date: string;
};
