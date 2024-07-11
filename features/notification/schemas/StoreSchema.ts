import * as yup from 'yup';
import { StoreNotification } from '../types/StoreNotification';
import {
  NOTIFICATION_TYPE,
  NotificationType,
} from '@/features/notification/types/Notification';

export const StoreSchema: yup.ObjectSchema<StoreNotification> = yup
  .object()
  .shape({
    course_id: yup.number().required('講座名を選択してください。'),
    title: yup.string().required('タイトルを入力してください。'),
    type: yup
      .string()
      .test('type', '表示タイプを選択してください。', (value) => {
        return Object.values(NOTIFICATION_TYPE).includes(
          value as NotificationType,
        );
      })
      .required('表示タイプを選択してください。'),
    start_date: yup.string().required('開始日時を入力してください。'),
    end_date: yup.string().required('終了日時を入力してください。'),
    content: yup.string().required('お知らせ内容を入力してください。'),
  });
