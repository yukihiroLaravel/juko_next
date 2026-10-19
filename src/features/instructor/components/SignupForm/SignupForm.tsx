'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupFormUI } from './SignupForm.ui';
import {
  signupSchema,
  SignupSchema,
} from '@/features/instructor/validation/SignupSchema';
import { useRegisterInstructor } from '@/features/instructor/hooks/useRegisterInstructor';

export function SignupForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { registerInstructor } = useRegisterInstructor();

  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      nickName: '',
      lastName: '',
      firstName: '',
      email: '',
    },
  });

  const handleSubmit = form.handleSubmit((data: SignupSchema) => {
    setSubmitError(null);
    startTransition(async () => {
      const result = await registerInstructor(data);
      if (result.success) {
        setSubmittedEmail(data.email);
        return;
      }
      // サーバーが項目ごとの誤りを返したときは、該当する入力欄の下にだけ出す
      let hasFieldError = false;
      for (const name of [
        'nickName',
        'lastName',
        'firstName',
        'email',
      ] as const) {
        const message = result.fieldErrors?.[name];
        if (message) {
          form.setError(name, { type: 'server', message });
          hasFieldError = true;
        }
      }
      if (!hasFieldError) {
        setSubmitError(result.error);
      }
    });
  });

  return (
    <SignupFormUI
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      submittedEmail={submittedEmail}
      submitError={submitError}
    />
  );
}
