export type Notification = {
  notification_id: number;
  course_id: number;
  title: string;
  type: 'always' | 'once';
  start_date: string;
  end_date: string;
  content: string;
  course_title: string;
};

export const NOTIFICATION_TYPE = {
  TYPE_ALWAYS: 'always',
  TYPE_ONCE: 'once',
} as const;

export type NotificationType =
  | typeof NOTIFICATION_TYPE.TYPE_ALWAYS
  | typeof NOTIFICATION_TYPE.TYPE_ONCE;
