import { z } from 'zod';

const MAX_COURSE_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_COURSE_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const courseFormFields = {
  title: z.string().trim().min(1, '講座タイトルは必須です'),
  // TODO: API連携時にバックエンドの画像形式・サイズ制限に合わせてバリデーションを追加する。
  image: z
    .instanceof(File)
    .refine(
      (file) => ALLOWED_COURSE_IMAGE_TYPES.includes(file.type),
      '画像はJPEG、PNG、WebP形式で選択してください',
    )
    .refine(
      (file) => file.size <= MAX_COURSE_IMAGE_SIZE,
      '画像サイズは2MB以下にしてください',
    )
    .optional(),
  tag_id: z.string().optional(),
  status: z.enum(['public', 'private']),
  deadline_type: z.enum(['none', 'fixed_date', 'relative_days']),
  fixed_date: z.string().optional(),
  relative_days: z
    .number()
    .int('日数は整数で入力してください')
    .min(1, '日数は1日以上で入力してください')
    .max(31, '日数は31日以内で入力してください')
    .optional(),

  capacity: z
    .number()
    .int('定員は整数で入力してください')
    .min(1, '定員は1以上で入力してください')
    .max(100, '定員は100以下で入力してください')
    .optional(),
};

const sharedValidation = (
  data: z.infer<z.ZodObject<typeof courseFormFields>>,
  ctx: z.RefinementCtx,
) => {
  if (data.deadline_type === 'fixed_date' && !data.fixed_date) {
    ctx.addIssue({
      code: 'custom',
      path: ['fixed_date'],
      message: '日付を選択してください',
    });
  }
  if (
    data.deadline_type === 'relative_days' &&
    data.relative_days === undefined
  ) {
    ctx.addIssue({
      code: 'custom',
      path: ['relative_days'],
      message: '日数を選択してください',
    });
  }
};

export const courseFormSchema = z
  .object(courseFormFields)
  .superRefine(sharedValidation);

export const courseCreateSchema = z
  .object(courseFormFields)
  .superRefine((data, ctx) => {
    sharedValidation(data, ctx);
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
