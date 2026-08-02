import { useCallback, useState } from 'react';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import {
  attendanceDetailKey,
  attendanceProgressKey,
} from '@/features/attendance/utils/swrKeys';

type CompleteAttendanceResult = {
  success: boolean;
  error?: string;
};

export function useCompleteAttendance(attendanceId: string) {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const completeAttendance =
    useCallback(async (): Promise<CompleteAttendanceResult> => {
      setIsSubmitting(true);

      try {
        await Axios.put(`/api/v1/attendances/${attendanceId}/complete`);

        await Promise.all([
          mutate(attendanceDetailKey(attendanceId)),
          mutate(attendanceProgressKey(attendanceId)),
        ]);

        return { success: true };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const responseStatus = error.response?.status;
          const data = error.response?.data;

          switch (responseStatus) {
            case 401:
              return {
                success: false,
                error: '認証の有効期限が切れました。再度ログインしてください',
              };
            case 403:
              return {
                success: false,
                error: 'この操作を行う権限がありません',
              };
            case 422: {
              const validationErrors = data?.errors as
                | Record<string, string[]>
                | undefined;
              const firstError = validationErrors
                ? Object.values(validationErrors)[0]?.[0]
                : undefined;
              return {
                success: false,
                error:
                  firstError ?? data?.message ?? '入力内容に誤りがあります',
              };
            }
            default:
              return {
                success: false,
                error: data?.message ?? '全チャプターの完了に失敗しました',
              };
          }
        }
        return {
          success: false,
          error: '予期しないエラーが発生しました',
        };
      } finally {
        setIsSubmitting(false);
      }
    }, [attendanceId, mutate]);

  return { completeAttendance, isSubmitting };
}
