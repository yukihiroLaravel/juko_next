export type NotificationItem = {
  notification_id: number;
  course_id: number;
  instructor_id: number;
  course_title: string;
  title: string;
  type: 'always' | 'once';
  read_status: 'read' | 'unread' | null;
  content: string;
  instructor_nick_name: string | null;
  start_date: string;
  end_date: string;
};

export type NotificationsResponse = {
  data: {
    notifications: NotificationItem[];
    pagination: {
      page: number;
      total: number;
    };
  };
};
