import { z } from 'zod';

export const deadlineFields = {
  deadline_type: z.enum(['none', 'fixed_date', 'relative_days']),
  fixed_date: z.string().optional(),
  relative_days: z
    .number()
    .int('日数は整数で入力してください')
    .min(1, '日数は1日以上で入力してください')
    .max(31, '日数は31日以内で入力してください')
    .optional(),
};

export const withDeadlineValidation = (
  data: z.infer<z.ZodObject<typeof deadlineFields>>,
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

export const capacitySchema = z
  .number()
  .int('定員は整数で入力してください')
  .min(1, '定員は1以上で入力してください')
  .max(100, '定員は100以下で入力してください')
  .optional();
