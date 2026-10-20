import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import { isNotificationsKey } from '../utils/swrKeys';
import type { MarkNotificationReadResponse } from '../types/notification';

type MarkReadResult = { success: true } | { success: false; error: string };
type ErrorResponse = { message?: string; errors?: Record<string, string[]> };

export function useMarkNotificationRead() {
  const { mutate } = useSWRConfig();

  async function markNotificationRead(
    notificationId: number,
  ): Promise<MarkReadResult> {
    try {
      await Axios.post<MarkNotificationReadResponse>(
        '/api/v1/notifications/mark-read',
        {
          notification_id: notificationId,
        },
      );
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const data = error.response?.data;
        switch (error.response?.status) {
          case 401:
            return {
              success: false,
              error: '認証の有効期限が切れました。再度ログインしてください',
            };
          case 422:
            return {
              success: false,
              error:
                Object.values(data?.errors ?? {})[0]?.[0] ??
                data?.message ??
                '入力内容に誤りがあります',
            };
          default:
            return {
              success: false,
              error: data?.message ?? '既読登録に失敗しました',
            };
        }
      }
      return { success: false, error: '予期しないエラーが発生しました' };
    }

    // 登録済みなら、一覧の再検証失敗を登録の失敗として扱わない。
    try {
      await mutate(isNotificationsKey);
    } catch (error) {
      console.warn('お知らせ一覧の再検証に失敗しました', {
        notificationId,
        reason: error,
      });
    }
    return { success: true };
  }

  return { markNotificationRead };
}
