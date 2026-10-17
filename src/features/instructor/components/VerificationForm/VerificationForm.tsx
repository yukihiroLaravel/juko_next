'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerificationFormUI } from './VerificationForm.ui';
import {
  verificationSchema,
  VerificationSchema,
} from '@/features/instructor/validation/VerificationSchema';

type Props = {
  token: string;
};

export function VerificationForm({ token }: Props) {
  const form = useForm<VerificationSchema>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  // API とつなぐまでは token と入力値を出すだけにする
  const handleSubmit = form.handleSubmit((data: VerificationSchema) => {
    console.log('submit data:', { token, ...data });
  });

  // 送信の失敗の文言は API とつなぐときに入れる
  const submitError: string | null = null;

  return (
    <VerificationFormUI
      form={form}
      onSubmit={handleSubmit}
      submitError={submitError}
    />
  );
}
