'use client';

import { UseFormReturn, Controller, useFormState } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { EditSchema } from '../../validation/EditSchema';
import { ImageUploader } from './ImageUploader';
import { StudentFormFields } from '../StudentFormFields/StudentFormFields';

type Props = {
  form: UseFormReturn<EditSchema>;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  defaultProfileImageUrl?: string;
  successMessage?: string | null;
};

export function EditFormUI({
  form,
  onSubmit,
  isSubmitting,
  defaultProfileImageUrl,
  successMessage,
}: Props) {
  const { register, control } = form;

  const { errors } = useFormState({
    control,
  });

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 pt-10">
      <form
        onSubmit={onSubmit}
        noValidate
        className="w-1/2 space-y-4 rounded-md bg-white p-6 shadow"
      >
        <h1 className="text-center text-lg font-bold">ユーザー情報編集</h1>

        {/* 成功・失敗メッセージ */}
        {successMessage && (
          <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}
        {errors.root && (
          <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
            {errors.root.message as string}
          </p>
        )}

        <StudentFormFields
          register={register}
          control={control}
          errors={errors}
        />

        {/* プロフィール画像 */}
        <div>
          <label className="block text-sm">プロフィール画像</label>
          <Controller
            control={control}
            name="profileImage"
            render={({ field }) => (
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                defaultImageUrl={defaultProfileImageUrl}
              />
            )}
          />
        </div>

        {/* 更新ボタン */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '更新中...' : '更新'}
        </Button>
      </form>
    </div>
  );
}
