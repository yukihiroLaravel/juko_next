import { useCallback, useState } from 'react';
import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import type { LessonStatus } from '@/features/attendance/types/lessonStatus';
import { mapLessonStatusToApi } from '@/features/attendance/utils/mapLessonStatusToApi';
import {
  attendanceDetailKey,
  attendanceProgressKey,
} from '@/features/attendance/utils/swrKeys';

type UpdateLessonStatusResult =
  | { success: true }
  | { success: false; error: string };

export function useUpdateLessonStatus(attendanceId: string) {
  const { mutate } = useSWRConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateLessonStatus = useCallback(
    async (
      lessonAttendanceId: number,
      status: LessonStatus,
    ): Promise<UpdateLessonStatusResult> => {
      setIsSubmitting(true);

      try {
        await Axios.patch(
          `/api/v1/lesson-attendances/${encodeURIComponent(lessonAttendanceId)}`,
          {
            status: mapLessonStatusToApi(status),
          },
        );

        // レッスン一覧と進捗のキャッシュを再検証
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
                error: data?.message ?? 'レッスンの状態更新に失敗しました',
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
    },
    [attendanceId, mutate],
  );

  return { updateLessonStatus, isSubmitting };
}
