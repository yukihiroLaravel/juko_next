'use client';

import { UseFormReturn, FieldErrors, useFormState } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { SignupSchema } from '../../validation/SignupSchema';
import { StudentFormFields } from '../StudentFormFields/StudentFormFields';

type Props = {
  form: UseFormReturn<SignupSchema>;
  onSubmit: (data: SignupSchema) => void;
  onError: (errors: FieldErrors<SignupSchema>) => void;
};

export function SignupFormUI({ form, onSubmit, onError }: Props) {
  const { register, handleSubmit, control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 pt-10">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="w-1/2 space-y-4 rounded-md bg-white p-6 shadow"
      >
        <h1 className="text-center text-lg font-bold">新規登録画面</h1>

        <StudentFormFields
          register={register}
          control={control}
          errors={errors}
        />

        {/* 登録ボタン */}
        <Button type="submit" className="w-full">
          登録
        </Button>
      </form>
    </div>
  );
}
