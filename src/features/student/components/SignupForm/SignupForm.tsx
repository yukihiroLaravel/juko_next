'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import type { FieldErrors } from 'react-hook-form';
import { SignupFormUI } from './SignupForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupSchema,
  SignupSchema,
} from '@/features/student/validation/SignupSchema';
import { signupStudent } from '@/features/student/api/signupStudent';

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

  const onSubmit = form.handleSubmit(
    async (data: SignupSchema) => {
      form.clearErrors();

      try {
        await signupStudent(data);
        console.log('signup success');
        // TODO: 完了画面遷移 or toast
      } catch (error) {
        if (axios.isAxiosError<ApiErrorResponse>(error)) {
          const response = error.response?.data;
          if (response?.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              setError(field as keyof SignupSchema, {
                type: 'server',
                message: messages[0],
              });
            });
            return;
          }

          setError('root', {
            type: 'server',
            message:
              response?.message ??
              '登録に失敗しました。時間をおいて再度お試しください。',
          });
          return;
        }

        setError('root', {
          type: 'server',
          message: '予期しないエラーが発生しました。',
        });

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
