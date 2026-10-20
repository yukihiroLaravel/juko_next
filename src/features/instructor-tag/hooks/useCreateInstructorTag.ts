import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import type { TagSchema } from '@/features/instructor-tag/validation/TagSchema';
import { isInstructorTagsKey } from '../utils/swrKeys';

type CreateInstructorTagResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: { content?: string };
    };

type ErrorResponse = {
  errors?: { content?: string[] };
};

export function useCreateInstructorTag() {
  const { mutate } = useSWRConfig();

  const createInstructorTag = async (
    data: TagSchema,
  ): Promise<CreateInstructorTagResult> => {
    try {
      await Axios.post('/api/v1/instructor/tags', { content: data.content });
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
      return { success: false, error: '講座分類の登録に失敗しました' };
    }
  };

  return { createInstructorTag };
}
