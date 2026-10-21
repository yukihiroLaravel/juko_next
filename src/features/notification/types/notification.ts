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

/** お知らせ一覧APIの `sort_by` に指定できる項目 */
export type NotificationSortBy =
  'title' | 'course_id' | 'start_date' | 'instructor_nick_name' | 'read_status';

export type NotificationSortOrder = 'asc' | 'desc';

export type NotificationsQuery = {
  page: number;
  perPage: number;
  sortBy: NotificationSortBy;
  order: NotificationSortOrder;
};

export type NotificationDetail = {
  notification_id: number;
  course_id: number;
  course_title: string;
  title: string;
  content: string;
  instructor_nick_name: string | null;
  start_date: string;
  end_date: string;
  attendance_deadline: string | null;
};

export type NotificationResponse = { data: NotificationDetail };

export type MarkNotificationReadResponse = { result: true };
