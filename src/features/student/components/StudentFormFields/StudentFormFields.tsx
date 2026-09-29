'use client';

import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { Input } from '@/components/atoms/Input';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/atoms/Calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/atoms/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup';
import { parseInputDate, formatInputDate } from '@/utils/date';

// SignupSchema / EditSchema が共通で持つプロフィール項目
export type StudentProfileFields = {
  userName: string;
  lastName: string;
  firstName: string;
  email: string;
  occupation: string;
  purpose: string;
  birthday: string;
  gender: 'man' | 'woman';
  address: string;
};

type Props<T extends StudentProfileFields & FieldValues> = {
  register: UseFormRegister<T>;
  control: Control<T>;
  errors: FieldErrors<StudentProfileFields>;
};

export function StudentFormFields<
  T extends StudentProfileFields & FieldValues,
>({ register, control, errors }: Props<T>) {
  const path = (name: keyof StudentProfileFields) => name as Path<T>;

  return (
    <>
      {/* ユーザー名 */}
      <div>
        <label className="block text-sm">ユーザー名</label>
        <Input {...register(path('userName'))} />
        {errors.userName && (
          <p className="text-sm text-red-500">{errors.userName.message}</p>
        )}
      </div>

      {/* 姓 */}
      <div>
        <label className="block text-sm">姓</label>
        <Input {...register(path('lastName'))} />
        {errors.lastName && (
          <p className="text-sm text-red-500">{errors.lastName.message}</p>
        )}
      </div>

      {/* 名 */}
      <div>
        <label className="block text-sm">名</label>
        <Input {...register(path('firstName'))} />
        {errors.firstName && (
          <p className="text-sm text-red-500">{errors.firstName.message}</p>
        )}
      </div>

      {/* メール */}
      <div>
        <label className="block text-sm">メールアドレス</label>
        <Input type="email" {...register(path('email'))} />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* 職業 */}
      <div>
        <label className="block text-sm">職業</label>
        <Input {...register(path('occupation'))} />
        {errors.occupation && (
          <p className="text-sm text-red-500">{errors.occupation.message}</p>
        )}
      </div>

      {/* 目的 */}
      <div>
        <label className="block text-sm">目的</label>
        <Input {...register(path('purpose'))} />
        {errors.purpose && (
          <p className="text-sm text-red-500">{errors.purpose.message}</p>
        )}
      </div>

      {/* 誕生日 */}
      <div>
        <label className="block text-sm">誕生日</label>
        <Controller
          control={control}
          name={path('birthday')}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    readOnly
                    value={(field.value as string) ?? ''}
                    placeholder=""
                    className="cursor-pointer pr-10"
                  />
                  <CalendarIcon className="text-muted-foreground absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={parseInputDate(field.value as string)}
                  onSelect={(date) =>
                    field.onChange(date ? formatInputDate(date) : '')
                  }
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
          )}
        />
        {errors.birthday && (
          <p className="text-sm text-red-500">{errors.birthday.message}</p>
        )}
      </div>

      {/* 性別 */}
      <div>
        <label className="block text-sm">性別</label>
        <Controller
          control={control}
          name={path('gender')}
          render={({ field }) => (
            <RadioGroup
              className="flex gap-6"
              value={(field.value as string) ?? ''}
              onValueChange={field.onChange}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="man" />
                <span className="text-sm">男性</span>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="woman" />
                <span className="text-sm">女性</span>
              </div>
            </RadioGroup>
          )}
        />
        {errors.gender && (
          <p className="text-sm text-red-500">{errors.gender.message}</p>
        )}
      </div>

      {/* 住所 */}
      <div>
        <label className="block text-sm">住所</label>
        <Input {...register(path('address'))} />
        {errors.address && (
          <p className="text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>
    </>
  );
}
