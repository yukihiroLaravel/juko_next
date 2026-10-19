import axios from 'axios';
import { Axios } from '@/lib/api';
import type { VerificationSchema } from '@/features/instructor/validation/VerificationSchema';

export type VerifyInstructorResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<'code' | 'password', string>>;
      needsRestart?: true;
    };

type ErrorResponse = {
  message?: string;
  errors?: { code?: string[]; password?: string[]; token?: string[] };
};

const NOT_FOUND_ERROR =
  'この URL の仮登録が見つかりません。無効になったか、URL が誤っている可能性があります。仮登録からやり直してください';

// 400 の message は InstructorController の文言をそのまま写す（不一致だけ authentication と綴りが違う）
function toBadRequestResult(
  message: string | undefined,
): VerifyInstructorResult | null {
  switch (message) {
    case 'Not match authentication code.':
      return {
        success: false,
        error:
          '認証コードが正しくありません。メールに記載の認証コードを確かめて、もう一度入力してください',
      };
    case 'Not match authorization code three times.':
      return {
        success: false,
        error:
          '認証コードの誤りが上限を超えたため、この仮登録は無効になりました。お手数ですが、仮登録からやり直してください',
        needsRestart: true,
      };
    case 'Expired authorization period.':
      return {
        success: false,
        error:
          '認証コードの有効期限（60分）が切れたため、この仮登録は無効になりました。お手数ですが、仮登録からやり直してください',
        needsRestart: true,
      };
    default:
      return null;
  }
}

export function useVerifyInstructor() {
  const verifyInstructor = async (
    token: string,
    data: VerificationSchema,
  ): Promise<VerifyInstructorResult> => {
    try {
      await Axios.get('/sanctum/csrf-cookie');
      await Axios.post(`/api/v1/instructors/verification/${token}`, {
        code: data.code,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError<ErrorResponse>(error)) {
        const status = error.response?.status;
        const body = error.response?.data;
        if (status === 400) {
          const result = toBadRequestResult(body?.message);
          if (result) return result;
        }
        // token の誤りは入力し直しても通らないので、仮登録が見つからないときと同じに扱う
        if (status === 404 || (status === 422 && body?.errors?.token)) {
          return { success: false, error: NOT_FOUND_ERROR, needsRestart: true };
        }
        if (status === 422) {
          const fieldErrors = {
            code: body?.errors?.code?.[0],
            password: body?.errors?.password?.[0],
          };
          const firstError = fieldErrors.code ?? fieldErrors.password;
          if (firstError) {
            return { success: false, error: firstError, fieldErrors };
          }
        }
        return { success: false, error: '本登録に失敗しました' };
      }
      return { success: false, error: '予期しないエラーが発生しました' };
    }
  };

  return { verifyInstructor };
}
