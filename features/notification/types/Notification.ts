export type Notification = {
  notification_id: number;
  course_id: number;
  title: string;
  type: 'once' | 'always';
  start_date: string;
  end_date: string;
  content: string;
  course_title: string;
};
