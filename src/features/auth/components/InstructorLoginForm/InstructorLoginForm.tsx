'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LoginFormUI } from '@/features/auth/components/LoginForm/LoginForm.ui';
import { useLogin } from '@/features/auth/hooks/useLogin';

const loginSchema = z.object({
  email: z.email('有効なメールアドレスを入力してください'),
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(8, 'パスワードは8文字以上で入力してください'),
});

export type InstructorLoginFormValues = z.infer<typeof loginSchema>;

export function InstructorLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isSubmitting } = useLogin();

  const form = useForm<InstructorLoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(
    async (data: InstructorLoginFormValues) => {
      const result = await login(data);

      if (!result.success && result.error) {
        form.resetField('password');
        form.setError('password', {
          type: 'server',
          message: result.error,
        });
      }
    },
  );

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
