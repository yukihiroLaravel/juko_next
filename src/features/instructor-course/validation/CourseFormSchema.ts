import { z } from 'zod';
import {
  capacitySchema,
  deadlineFields,
  withDeadlineValidation,
} from './CourseSettingsSchema';

const MAX_COURSE_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_COURSE_IMAGE_TYPES = ['image/jpeg', 'image/png'];

const courseFormFields = {
  title: z.string().trim().min(1, '講座タイトルは必須です'),
  // TODO: API連携時にバックエンドの画像形式・サイズ制限に合わせてバリデーションを追加する。
  image: z
    .instanceof(File)
    .refine(
      (file) => ALLOWED_COURSE_IMAGE_TYPES.includes(file.type),
      '画像はJPEG、PNG形式で選択してください',
    )
    .refine(
      (file) => file.size <= MAX_COURSE_IMAGE_SIZE,
      '画像サイズは2MB以下にしてください',
    )
    .optional(),
  tag_id: z.string().optional(),
  status: z.enum(['public', 'private']),
  ...deadlineFields,
  capacity: capacitySchema,
};

export const courseFormSchema = z
  .object(courseFormFields)
  .superRefine(withDeadlineValidation);

export const courseCreateSchema = z
  .object(courseFormFields)
  .superRefine((data, ctx) => {
    withDeadlineValidation(data, ctx);
    if (!data.image) {
      ctx.addIssue({
        code: 'custom',
        path: ['image'],
        message: '講座画像は必須です',
      });
    }
    if (!data.tag_id) {
      ctx.addIssue({
        code: 'custom',
        path: ['tag_id'],
        message: '講座分類を選択してください',
      });
    }
  });

export type CourseFormSchema = z.infer<typeof courseFormSchema>;
