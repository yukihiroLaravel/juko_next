import { z } from 'zod';

export const signupSchema = z.object({
  nickName: z
    .string()
    .min(1, '講師名は必須です')
    .max(50, '講師名は50文字以内で入力してください'),
  lastName: z
    .string()
    .min(1, '姓は必須です')
    .max(50, '姓は50文字以内で入力してください'),
  firstName: z
    .string()
    .min(1, '名は必須です')
    .max(50, '名は50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスは必須です')
    .email('メールアドレスの形式が正しくありません')
    .max(255, 'メールアドレスは255文字以内で入力してください'),
});

export type SignupSchema = z.infer<typeof signupSchema>;
