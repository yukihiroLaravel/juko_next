'use client';

import { StudentSignupSchema } from '@/features/auth/validation/Student/StudentSignupSchema';
import { UseFormReturn, FieldErrors } from 'react-hook-form';
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

type Props = {
  form: UseFormReturn<StudentSignupSchema>;
  onSubmit: (data: StudentSignupSchema) => void;
  onError: (errors: FieldErrors<StudentSignupSchema>) => void;
};

export function StudentSignupFormUI({ form, onSubmit, onError }: Props) {
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

        {/* ユーザー名 */}
        <div>
          <label className="block text-sm">ユーザー名</label>
          <Input {...register('userName')} />
          {errors.userName && (
            <p className="text-sm text-red-500">
              {errors.userName.message as string}
            </p>
          )}
        </div>

        {/* 姓 */}
        <div>
          <label className="block text-sm">姓</label>
          <Input {...register('lastName')} />
          {errors.lastName && (
            <p className="text-sm text-red-500">
              {errors.lastName.message as string}
            </p>
          )}
        </div>

        {/* 名 */}
        <div>
          <label className="block text-sm">名</label>
          <Input {...register('firstName')} />
          {errors.firstName && (
            <p className="text-sm text-red-500">
              {errors.firstName.message as string}
            </p>
          )}
        </div>

        {/* メール */}
        <div>
          <label className="block text-sm">メールアドレス</label>
          <Input type="email" {...register('email')} />
          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message as string}
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
                      className="pr-10 cursor-pointer"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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

          {errors.birthday && (
            <p className="text-sm text-red-500">
              {errors.birthday.message as string}
            </p>
          )}
        </div>

        {/* 性別 */}
        <div>
          <label className="block text-sm">性別</label>
          <Controller
            control={form.control}
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
          {errors.gender && (
            <p className="text-sm text-red-500">
              {errors.gender.message as string}
            </p>
          )}
        </div>

        {/* 住所 */}
        <div>
          <label className="block text-sm">住所</label>
          <Input {...register('address')} />
          {errors.address && (
            <p className="text-sm text-red-500">
              {errors.address.message as string}
            </p>
          )}
        </div>

        {/* 登録ボタン */}
        <Button type="submit" className="w-full">
          登録
        </Button>
      </form>
    </div>
  );
}
