'use client';

import { useForm } from 'react-hook-form';
import type { FieldErrors } from 'react-hook-form';
import { SignupFormUI } from './SignupForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupSchema,
  SignupSchema,
} from '@/features/student/validation/SignupSchema';
import { useStudentSignup } from '@/features/student/hooks/useStudentSignup';

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

  const { signup, isSubmitting } = useStudentSignup();

  const onSubmit = async (data: SignupSchema) => {
    try {
      await signup(data);
      console.log('signup success');
      // TODO: 完了画面遷移 or toast（次タスク）
    } catch (error) {
      console.error('signup error:', error);
    }
  };

  const onError = (errors: FieldErrors<SignupSchema>) => {
    console.log('submit errors:', errors);
  };

  return (
    <SignupFormUI
      form={form}
      onSubmit={onSubmit}
      onError={onError}
      isSubmitting={isSubmitting}
    />
  );
}
