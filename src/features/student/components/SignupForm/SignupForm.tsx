'use client';

import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import type { FieldErrors } from 'react-hook-form';
import { SignupFormUI } from './SignupForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupSchema,
  SignupSchema,
} from '@/features/student/validation/SignupSchema';
import { useStudentSignup } from '@/features/student/hooks/useStudentSignup';

type ApiErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export function SignupForm() {
  const form = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      lastName: '',
      firstName: '',
      email: '',
      occupation: '',
      purpose: '',
      birthday: '',
      gender: undefined,
      address: '',
    },
  });

  const { setError } = form;
  const {
    formState: { isSubmitting },
  } = form;
  const { signup } = useStudentSignup();

  const onSubmit = form.handleSubmit(
    async (data: SignupSchema) => {
      try {
        await signup(data);
        console.log('signup success');
        // TODO: 完了画面遷移 or toast
      } catch (error) {
        if (error instanceof AxiosError) {
          const response = error.response?.data as ApiErrorResponse | undefined;

          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              setError(field as keyof SignupSchema, {
                type: 'server',
                message: messages[0],
              });
            });
            return;
          }
        }
        console.error('signup error:', error);
      }
    },
    (errors: FieldErrors<SignupSchema>) => {
      console.log('submit errors:', errors);
    },
  );

  return (
    <SignupFormUI
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
