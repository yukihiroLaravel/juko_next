import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import { isInstructorTagsKey } from '../utils/swrKeys';

type UpdateInstructorTagResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: { content?: string };
    };

type ErrorResponse = {
  errors?: { content?: string[] };
};

export function useUpdateInstructorTag() {
  const { mutate } = useSWRConfig();

  const updateInstructorTag = async ({
    tagId,
    content,
  }: {
    tagId: string;
    content: string;
  }): Promise<UpdateInstructorTagResult> => {
    try {
      await Axios.put(`/api/v1/instructor/tags/${tagId}`, { content });
      await mutate(isInstructorTagsKey);
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        switch (error.response?.status) {
          case 401:
            return {
              success: false,
              error: '認証の有効期限が切れました。再度ログインしてください',
            };
          case 403:
            return { success: false, error: 'この操作を行う権限がありません' };
          case 422: {
            const contentError = error.response?.data?.errors?.content?.[0];
            if (contentError) {
              return {
                success: false,
                error: contentError,
                fieldErrors: { content: contentError },
              };
            }
            break;
          }
        }
      }
      return { success: false, error: '講座分類の更新に失敗しました' };
    }
  };

  return { updateInstructorTag };
}
