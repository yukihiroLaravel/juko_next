import { z } from 'zod';

// 認証コードは英大文字・英小文字・数字が混ざった4文字で、大文字と小文字を区別して照合される。
// 文字の種類を絞ったり大文字に揃えたりせず、入力のまま扱う
export const verificationSchema = z
  .object({
    code: z
      .string()
      .trim()
      .min(1, '認証コードは必須です')
      .length(4, '認証コードは4文字で入力してください'),
    password: z
      .string()
      .min(1, 'パスワードは必須です')
      .min(8, 'パスワードは8文字以上で入力してください'),
    passwordConfirmation: z.string().min(1, 'パスワード再入力は必須です'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'パスワードが一致しません',
    path: ['passwordConfirmation'],
  });

export type VerificationSchema = z.infer<typeof verificationSchema>;
