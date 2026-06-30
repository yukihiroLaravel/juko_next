/** レッスンの受講ステータス */
export type LessonStatus =
  | 'before_attendance' // 未実施
  | 'in_attendance' // 視聴中／選択中
  | 'completed_attendance'; // 完了
