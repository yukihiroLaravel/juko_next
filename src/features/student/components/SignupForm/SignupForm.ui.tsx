'use client';

import type { UseFormReturn } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useFormState } from 'react-hook-form';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/atoms/Calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/atoms/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup';
import { SignupSchema } from '../../validation/SignupSchema';
import { errorMessage } from '@/utils/errorMessage';

type Props = {
  form: UseFormReturn<SignupSchema>;
  onSubmit: () => void;
  isSubmitting: boolean;
};

export function SignupFormUI({
  form,
  onSubmit,
  isSubmitting,
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
        <h1 className="text-center text-lg font-bold">新規登録画面</h1>

        {errors.root?.message && (
          <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-500">
            {errors.root.message}
          </p>
        )}

        {/* ユーザー名 */}
        <div>
          <label className="block text-sm">ユーザー名</label>
          <Input {...register('userName')} />
          {errorMessage(errors.userName) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.userName)}
            </p>
          )}
        </div>

        {/* 姓 */}
        <div>
          <label className="block text-sm">姓</label>
          <Input {...register('lastName')} />
          {errorMessage(errors.lastName) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.lastName)}
            </p>
          )}
        </div>

        {/* 名 */}
        <div>
          <label className="block text-sm">名</label>
          <Input {...register('firstName')} />
          {errorMessage(errors.firstName) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.firstName)}
            </p>
          )}
        </div>

        {/* メール */}
        <div>
          <label className="block text-sm">メールアドレス</label>
          <Input type="email" {...register('email')} />
          {errorMessage(errors.email) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.email)}
            </p>
          )}
        </div>

        {/* 職業 */}
        <div>
          <label className="block text-sm">職業</label>
          <Input {...register('occupation')} />
        </div>

        {/* 目的 */}
        <div>
          <label className="block text-sm">目的</label>
          <Input {...register('purpose')} />
        </div>

        {/* 誕生日 */}
        <div>
          <label className="block text-sm">誕生日</label>
          <Controller
            control={control}
            name="birthday"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      readOnly
                      value={field.value ?? ''}
                      placeholder=""
                      className="cursor-pointer pr-10"
                    />
                    <CalendarIcon className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) =>
                      field.onChange(
                        date ? date.toISOString().split('T')[0] : '',
                      )
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errorMessage(errors.birthday) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.birthday)}
            </p>
          )}
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm">性別</label>
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <RadioGroup
                className="flex gap-6"
                value={field.value ?? ''}
                onValueChange={field.onChange}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="male" />
                  <span className="text-sm">男性</span>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="female" />
                  <span className="text-sm">女性</span>
                </div>
              </RadioGroup>
            )}
          />
          {errorMessage(errors.gender) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.gender)}
            </p>
          )}
        </div>

        {/* 住所 */}
        <div>
          <label className="block text-sm">住所</label>
          <Input {...register('address')} />
          {errorMessage(errors.address) && (
            <p className="text-sm text-red-500">
              {errorMessage(errors.address)}
            </p>
          )}
        </div>

        {/* 登録ボタン */}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? '登録中...' : '登録'}
        </Button>
      </form>
    </div>
  );
}
