import axios from 'axios';
import { Axios } from '@/lib/api';
import type { SignupSchema } from '@/features/instructor/validation/SignupSchema';

export type RegisterInstructorResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof SignupSchema, string>>;
    };

type ErrorResponse = {
  errors?: {
    nick_name?: string[];
    last_name?: string[];
    first_name?: string[];
    email?: string[];
  };
};

export function useRegisterInstructor() {
  const registerInstructor = async (
    data: SignupSchema,
  ): Promise<RegisterInstructorResult> => {
    try {
      await Axios.get('/sanctum/csrf-cookie');
      await Axios.post('/api/v1/instructors', {
        nick_name: data.nickName,
        last_name: data.lastName,
        first_name: data.firstName,
        email: data.email,
      });
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const errors = error.response?.data?.errors;
        if (error.response?.status === 422 && errors) {
          const fieldErrors = {
            nickName: errors.nick_name?.[0],
            lastName: errors.last_name?.[0],
            firstName: errors.first_name?.[0],
            email: errors.email?.[0],
          };
          const firstError = Object.values(fieldErrors).find(Boolean);
          if (firstError) {
            return { success: false, error: firstError, fieldErrors };
          }
        }
        // 400 を含め、サーバーの message は英語の固定文言なので画面に出さない
        return { success: false, error: '仮登録に失敗しました' };
      }
      return { success: false, error: '予期しないエラーが発生しました' };
    }
  };

  return { registerInstructor };
}
