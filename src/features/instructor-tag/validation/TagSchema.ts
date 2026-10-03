import { z } from 'zod';

export const tagSchema = z.object({
  content: z
    .string()
    .min(1, '分類タイトルは必須です')
    .max(50, '分類タイトルは50文字以内で入力してください'),
});

export type TagSchema = z.infer<typeof tagSchema>;