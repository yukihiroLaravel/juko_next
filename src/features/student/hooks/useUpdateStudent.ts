import { useCallback, useState } from 'react';
import axios from 'axios';
import { Axios } from '@/lib/api';
import { useStudent } from './useStudent';
import type { EditSchema } from '../validation/EditSchema';

type UpdateResult = {
  success: boolean;
  error?: string;
};

export function useUpdateStudent() {
  const { mutate } = useStudent();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateStudent = useCallback(
    async (data: EditSchema): Promise<UpdateResult> => {
      setIsSubmitting(true);

      try {
        const formData = new FormData();
        formData.append('nick_name', data.userName);
        formData.append('last_name', data.lastName);
        formData.append('first_name', data.firstName);
        formData.append('email', data.email);
        formData.append('occupation', data.occupation);
        formData.append('purpose', data.purpose);
        formData.append('birth_date', data.birthday);
        formData.append('gender', data.gender);
        formData.append('address', data.address);
        if (data.profileImage) {
          formData.append('profile_image', data.profileImage);
        }

        // フォームデータを送信
        await Axios.post('/api/v1/students/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // キャッシュを再検証
        await mutate();

        return { success: true };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;
          const data = error.response?.data;

          switch (status) {
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
                error: data?.message ?? 'ユーザー情報の更新に失敗しました',
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
    [mutate],
  );

  return { updateStudent, isSubmitting };
}
