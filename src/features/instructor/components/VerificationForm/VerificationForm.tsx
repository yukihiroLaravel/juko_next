'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerificationFormUI } from './VerificationForm.ui';
import {
  verificationSchema,
  VerificationSchema,
} from '@/features/instructor/validation/VerificationSchema';
import { useVerifyInstructor } from '@/features/instructor/hooks/useVerifyInstructor';
import { routes } from '@/lib/routes';

type Props = {
  token: string;
};

export function VerificationForm({ token }: Props) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [needsRestart, setNeedsRestart] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { verifyInstructor } = useVerifyInstructor();

  const form = useForm<VerificationSchema>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      code: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const handleSubmit = form.handleSubmit((data: VerificationSchema) => {
    setSubmitError(null);
    setNeedsRestart(false);
    startTransition(async () => {
      const result = await verifyInstructor(token, data);
      if (result.success) {
        router.push(routes.instructor.login({ registered: true }));
        return;
      }
      // サーバーが項目ごとの誤りを返したときは、該当する入力欄の下にだけ出す
      let hasFieldError = false;
      for (const name of ['code', 'password'] as const) {
        const message = result.fieldErrors?.[name];
        if (message) {
          form.setError(name, { type: 'server', message });
          hasFieldError = true;
        }
      }
      if (!hasFieldError) {
        setSubmitError(result.error);
        setNeedsRestart(result.needsRestart === true);
      }
    });
  });

  return (
    <VerificationFormUI
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      submitError={submitError}
      needsRestart={needsRestart}
    />
  );
}
