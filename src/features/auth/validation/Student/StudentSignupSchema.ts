import { z } from "zod";

export const studentSignupSchema = z.object({
  userName: z.string().min(1, "ユーザー名は必須です"),
  lastName: z.string().min(1, "姓は必須です"),
  firstName: z.string().min(1, "名は必須です"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("メールアドレスの形式が正しくありません"),

  occupation: z.string().optional(),
  purpose: z.string().optional(),

  birthday: z
    .string()
    .min(1, "誕生日は必須です")
    .refine((value) => {
      const selected = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selected <= today;
    }, "誕生日に未来の日付は指定できません"),

  gender: z.enum(["male", "female"], {
    message: "性別を選択してください",
  }),

  address: z.string().min(1, "住所は必須です"),
});

export type StudentSignupSchema = z.infer<
  typeof studentSignupSchema
>;
