'use client';

import { useForm } from 'react-hook-form';
import { SignupFormUI } from './SignupForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signupSchema,
  SignupSchema,
} from '@/features/student/validation/SignupSchema';

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

  const onSubmit = (data: SignupSchema) => {
    console.log('submit data:', data);
  };
  const onError = (errors: any) => {
    console.log('submit errors:', errors);
  };

  return <SignupFormUI form={form} onSubmit={onSubmit} onError={onError} />;
}
