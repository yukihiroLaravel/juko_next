"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginFormUI } from "./LoginForm.ui";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .min(1, "パスワードを入力してください")
    .min(8, "パスワードは8文字以上で入力してください"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

type LoginFormProps = {
  onLogin?: (values: LoginFormValues) => Promise<void>;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values: LoginFormValues) => {
    if (onLogin) {
      await onLogin(values);
    } else {
      // デモ用: 実際のAPI呼び出しに置き換える
      console.log("Login attempt:", values);
    }
  });

  return (
    <LoginFormUI
      form={form}
      onSubmit={handleSubmit}
    />
  );
}
