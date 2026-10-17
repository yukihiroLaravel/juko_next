'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormUI } from './SignupForm.ui';
import {
  signupSchema,
  SignupSchema,
} from '@/features/instructor/validation/SignupSchema';

export function SignupForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickName: '',
      lastName: '',
      firstName: '',
      email: '',
    },
  });

  // API とつなぐまでは入力値を出すだけにし、送信は成功したものとみなす
  const handleSubmit = form.handleSubmit((data: SignupSchema) => {
    console.log('submit data:', data);
    setSubmittedEmail(data.email);
  });

  // 送信の失敗の文言は API とつなぐときに入れる
  const submitError: string | null = null;

  return (
    <SignupFormUI
      form={form}
      onSubmit={handleSubmit}
      submittedEmail={submittedEmail}
      submitError={submitError}
    />
  );
}
