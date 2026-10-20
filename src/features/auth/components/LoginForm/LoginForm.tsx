'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormUI } from './LoginForm.ui';
import { useLogin } from '@/features/auth/hooks/useLogin';
import type { UserRole } from '@/features/auth/types';

const loginSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上で入力してください'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export type LoginFormProps = {
  role?: UserRole;
};

export function LoginForm({ role = 'student' }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isSubmitting } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (data: LoginFormValues) => {
    const result = await login({ ...data, role });

    if (!result.success && result.error) {
      form.resetField('password');
      form.setError('password', {
        type: 'server',
        message: result.error,
      });
    }
  });

  return (
    <LoginFormUI
      form={form}
      onSubmit={handleSubmit}
      showPassword={showPassword}
      onTogglePassword={() => setShowPassword((prev) => !prev)}
      isSubmitting={isSubmitting}
    />
  );
}
