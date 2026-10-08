'use client';

import { useState } from 'react';
import {
  Controller,
  useFormState,
  useWatch,
  UseFormReturn,
} from 'react-hook-form';
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
import { Button } from '@/components/atoms/Button';
import { Calendar } from '@/components/atoms/Calendar';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/atoms/Popover';
import { RadioGroup, RadioGroupItem } from '@/components/atoms/RadioGroup';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/Select';
import { Switch } from '@/components/atoms/Switch';
import { ImageUploader } from '@/components/molecules/ImageUploader';
import { formatInputDate, parseInputDate } from '@/utils/date';
import type { CourseFormSchema } from '../../validation/CourseFormSchema';

type Props = {
  form: UseFormReturn<CourseFormSchema>;
  mode: 'create' | 'edit';
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
};

const errorClass = 'text-sm text-red-600';

export function CourseFormUI({ form, mode, onSubmit, onDelete }: Props) {
  const { register, setValue, clearErrors, control } = form;
  const { errors, isSubmitting } = useFormState({ control });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const deadlineType = useWatch({ control, name: 'deadline_type' });
  const status = useWatch({ control, name: 'status' });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endMonth = new Date(today.getFullYear() + 10, 11, 1);

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">
        {mode === 'create' ? '講座登録' : '講座編集'}
      </h1>
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6 rounded-md border bg-white p-6"
      >
        {mode === 'edit' && (
          <div className="flex items-center gap-3">
            <Switch
              id="course-status"
              checked={status === 'public'}
              onCheckedChange={(checked) =>
                setValue('status', checked ? 'public' : 'private', {
                  shouldDirty: true,
                })
              }
            />
            <Label htmlFor="course-status">
              {status === 'public' ? '公開' : '非公開'}
            </Label>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">
            講座タイトル <span aria-hidden="true">*</span>
          </Label>
          <Input id="title" {...register('title')} />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>
            講座画像 {mode === 'create' && <span aria-hidden="true">*</span>}
          </Label>
          <Controller
            control={control}
            name="image"
            render={({ field }) => (
              <ImageUploader
                value={field.value}
                onChange={field.onChange}
                defaultImageUrl={
                  mode === 'edit' ? '/course-placeholder.svg' : undefined
                }
                alt="講座画像プレビュー"
                emptyMessage="講座画像"
                previewClassName="h-40"
              />
            )}
          />
          {errors.image && <p className={errorClass}>{errors.image.message}</p>}
        </div>

        {mode === 'create' && (
          <div className="space-y-2">
            <Label htmlFor="course-tag">
              講座分類名 <span aria-hidden="true">*</span>
            </Label>
            <Controller
              control={control}
              name="tag_id"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="course-tag">
                    <SelectValue placeholder="講座分類を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* TODO: API連携時に講座分類APIから取得した値へ差し替える */}
                    <SelectItem value="1">バックエンド</SelectItem>
                    <SelectItem value="2">フロントエンド</SelectItem>
                    <SelectItem value="3">その他</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tag_id && (
              <p className={errorClass}>{errors.tag_id.message}</p>
            )}
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
                  clearErrors(['fixed_date', 'relative_days']);
                  if (value !== 'fixed_date') setValue('fixed_date', '');
                  if (value !== 'relative_days')
                    setValue('relative_days', undefined);
                }}
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="none" id="deadline-none" />
                  <Label htmlFor="deadline-none">なし</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="fixed_date" id="deadline-fixed-date" />
                  <Label htmlFor="deadline-fixed-date">一括日程</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="relative_days"
                    id="deadline-relative-days"
                  />
                  <Label htmlFor="deadline-relative-days">
                    開始日から○日後
                  </Label>
                </div>
              </RadioGroup>
            )}
          />

          {deadlineType === 'fixed_date' && (
            <Controller
              control={control}
              name="fixed_date"
              render={({ field }) => {
                const selectedDate = parseInputDate(field.value);
                return (
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline">
                        {selectedDate
                          ? formatInputDate(selectedDate)
                          : '年月日を選択'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(formatInputDate(date));
                            setIsCalendarOpen(false);
                          }
                        }}
                        disabled={(date) => date < today}
                        startMonth={startMonth}
                        endMonth={endMonth}
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
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
          <Input
            id="capacity"
            type="number"
            min={1}
            max={100}
            step={1}
            placeholder="上限なし"
            {...register('capacity', {
              setValueAs: (value) => (value === '' ? undefined : Number(value)),
            })}
          />
          {errors.capacity && (
            <p className={errorClass}>{errors.capacity.message}</p>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t pt-4">
          {mode === 'edit' && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isSubmitting}
                >
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
                  <AlertDialogAction onClick={onDelete}>削除</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '処理中...' : mode === 'create' ? '登録' : '更新'}
          </Button>
        </div>
      </form>
    </div>
  );
}
