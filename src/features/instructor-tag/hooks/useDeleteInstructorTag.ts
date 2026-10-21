import axios from 'axios';
import { useSWRConfig } from 'swr';
import { Axios } from '@/lib/api';
import { instructorTagKey, isInstructorTagsKey } from '../utils/swrKeys';

type DeleteInstructorTagResult =
  { success: true } | { success: false; error: string };

export function useDeleteInstructorTag() {
  const { mutate } = useSWRConfig();

  const deleteInstructorTag = async ({
    tagId,
  }: {
    tagId: string;
  }): Promise<DeleteInstructorTagResult> => {
    try {
      await Axios.delete(`/api/v1/instructor/tags/${tagId}`);
      // 消した講座分類そのものは、もう存在しないので取り直さない
      await mutate(
        (key) => isInstructorTagsKey(key) && key !== instructorTagKey(tagId),
      );
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 401:
            return {
              success: false,
              error: '認証の有効期限が切れました。再度ログインしてください',
            };
          case 403:
            return {
              success: false,
              error: '講座が紐づいている講座分類は削除できません',
            };
        }
      }
      return { success: false, error: '講座分類の削除に失敗しました' };
    }
  };

  return { deleteInstructorTag };
}
