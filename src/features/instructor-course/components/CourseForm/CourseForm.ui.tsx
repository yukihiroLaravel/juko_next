'use client';

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
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/Select';
import { Switch } from '@/components/atoms/Switch';
import { ImageUploader } from '@/components/molecules/ImageUploader';
import {
  DeadlineFields,
  type DeadlineType,
} from '../DeadlineFields/DeadlineFields';
import type { CourseFormSchema } from '../../validation/CourseFormSchema';

type Props = {
  form: UseFormReturn<CourseFormSchema>;
  mode: 'create' | 'edit';
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete: () => void;
};

const errorClass = 'text-sm text-red-600';

export function CourseFormUI({ form, mode, onSubmit, onDelete }: Props) {
  const { register, setValue, control } = form;
  const { errors, isSubmitting } = useFormState({ control });
  const status = useWatch({ control, name: 'status' });

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

        <DeadlineFields
          control={control}
          deadlineTypeName="deadline_type"
          fixedDateName="fixed_date"
          relativeDaysName="relative_days"
          onDeadlineTypeChange={(value: DeadlineType) => {
            form.clearErrors(['fixed_date', 'relative_days']);
            if (value !== 'fixed_date') setValue('fixed_date', '');
            if (value !== 'relative_days') setValue('relative_days', undefined);
          }}
          fixedDateError={errors.fixed_date?.message}
          relativeDaysError={errors.relative_days?.message}
        />

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
