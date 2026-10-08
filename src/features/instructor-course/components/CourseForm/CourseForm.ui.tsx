'use client';

import { Controller, useWatch, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/atoms/AlertDialog';
import { Calendar } from '@/components/atoms/Calendar';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/atoms/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/Select';
import { Switch } from '@/components/atoms/Switch';
import type { CourseFormSchema } from '../../validation/CourseFormSchema';
import { ImageUploader } from './ImageUploader';

type Props = {
  form: UseFormReturn<CourseFormSchema>;
  mode: 'create' | 'edit';
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
};

const errorClass = 'text-sm text-red-600';

export function CourseFormUI({ form, mode, onSubmit, onDelete }: Props) {
  const { register, watch, setValue, control, formState: { errors, isSubmitting } } = form;
  const deadlineType = useWatch({
    control,
    name: 'deadline_type',
  });
  const status = useWatch({
  control,
  name: 'status',
});

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">{mode === 'create' ? '講座登録' : '講座編集'}</h1>
      <form onSubmit={onSubmit} noValidate className="space-y-6 rounded-md border bg-white p-6">
        {mode === 'edit' && (
          <div className="flex items-center gap-3">
            <Switch checked={status === 'public'} onCheckedChange={(checked) => setValue('status', checked ? 'public' : 'private', { shouldDirty: true })} />
            <Label>{status === 'public' ? '公開' : '非公開'}</Label>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">講座タイトル <span aria-hidden="true">*</span></Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>講座画像 {mode === 'create' && <span aria-hidden="true">*</span>}</Label>
          <Controller control={control} name="image" render={({ field }) => (
            <ImageUploader value={field.value} onChange={field.onChange} defaultImageUrl={mode === 'edit' ? '/course-placeholder.svg' : undefined} />
          )} />
          {errors.image && <p className={errorClass}>{errors.image.message}</p>}
        </div>

        {mode === 'create' && (
          <div className="space-y-2">
            <Label>講座分類名 <span aria-hidden="true">*</span></Label>
            <Controller control={control} name="tag_id" render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue placeholder="講座分類を選択" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">バックエンド</SelectItem>
                  <SelectItem value="2">フロントエンド</SelectItem>
                  <SelectItem value="3">その他</SelectItem>
                </SelectContent>
              </Select>
            )} />
            {errors.tag_id && <p className={errorClass}>{errors.tag_id.message}</p>}
          </div>
        )}

        <fieldset className="space-y-3">
  <legend className="text-sm font-medium">受講期限</legend>

  <Controller
    control={control}
    name="deadline_type"
    render={({ field }) => (
      <RadioGroup
        value={field.value}
        onValueChange={(value) => {
          field.onChange(value);

          if (value !== 'fixed_date') {
            setValue('fixed_date', '');
          }

          if (value !== 'relative_days') {
            setValue('relative_days', undefined);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value="none" />
          <span className="text-sm">なし</span>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem value="fixed_date" />
          <span className="text-sm">一括日程</span>
        </div>

        <div className="flex items-center gap-2">
          <RadioGroupItem value="relative_days" />
          <span className="text-sm">開始日から○日後</span>
        </div>
      </RadioGroup>
    )}
  />

  {deadlineType === 'fixed_date' && (
    <Controller
      control={control}
      name="fixed_date"
      render={({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                value={field.value ?? ''}
                        placeholder="年月日を選択"
                        className="cursor-pointer"
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                field.value
                  ? new Date(`${field.value}T00:00:00`)
                  : undefined
              }
              onSelect={(date) =>
                field.onChange(
                  date
                    ? `${date.getFullYear()}-${String(
                        date.getMonth() + 1,
                      ).padStart(2, '0')}-${String(
                        date.getDate(),
                      ).padStart(2, '0')}`
                    : '',
                )
              }
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
              captionLayout="dropdown"
            />
          </PopoverContent>
        </Popover>
      )}
    />
  )}

  {deadlineType === 'relative_days' && (
    <Controller
      control={control}
      name="relative_days"
      render={({ field }) => (
        <Select
          value={field.value?.toString() ?? ''}
          onValueChange={(value) => field.onChange(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="日数を選択" />
          </SelectTrigger>

          <SelectContent>
            {Array.from({ length: 31 }, (_, index) => index + 1).map(
              (day) => (
                <SelectItem key={day} value={String(day)}>
                  {day}日
                </SelectItem>
              ),
            )}
          </SelectContent>
        </Select>
      )}
    />
  )}

  {errors.fixed_date && (
    <p className={errorClass}>{errors.fixed_date.message}</p>
  )}

  {errors.relative_days && (
    <p className={errorClass}>{errors.relative_days.message}</p>
  )}
</fieldset>

        <div className="space-y-2">
          <Label htmlFor="capacity">講座定員</Label>
          <Input id="capacity" type="number" min={1} max={100} step={1} placeholder="上限なし" {...register('capacity', { setValueAs: (value) => value === '' ? undefined : Number(value) })} />
          {errors.capacity && <p className={errorClass}>{errors.capacity.message}</p>}
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          {mode === 'edit' && (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button type="button" variant="destructive" disabled={isSubmitting}>
        削除
      </Button>
    </AlertDialogTrigger>

    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>本当に実行しますか？</AlertDialogTitle>
        <AlertDialogDescription>
          この操作を実行すると講座を削除します。
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel>キャンセル</AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>
          削除
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)}
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? '処理中...' : mode === 'create' ? '登録' : '更新'}</Button>
        </div>
      </form>
    </main>
  );
}
