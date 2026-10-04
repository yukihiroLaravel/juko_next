'use client';

import { UseFormReturn, useFormState } from 'react-hook-form';
import { Input } from '@/components/atoms/Input';
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
import { TagSchema } from '../../validation/TagSchema';

type Props = {
  form: UseFormReturn<TagSchema>;
  onSubmit: (e: React.FormEvent) => void;
  isPending?: boolean;
  title: string;
  onDelete?: () => void;
};

export function TagFormUI({
  form,
  onSubmit,
  isPending,
  title,
  onDelete,
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
        <h1 className="text-center text-lg font-bold">{title}</h1>

        {/* 分類タイトル */}
        <div>
          <label htmlFor="content" className="block text-sm">
            分類タイトル
          </label>
          <Input id="content" {...register('content')} />
          {errors.content && (
            <p className="text-sm text-red-500">{errors.content.message}</p>
          )}
        </div>

        {/* ボタン：削除の処理が渡されたら「削除」と「更新」、なければ「登録」 */}
        {onDelete ? (
          <div className="flex justify-between">
            {/* 削除は確認ダイアログで「実行」を押したときだけ行う */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isPending}
                >
                  削除
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>本当に実行しますか？</AlertDialogTitle>
                  <AlertDialogDescription>
                    この操作は取り消せません。
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>キャンセル</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>実行</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button type="submit" disabled={isPending}>
              {isPending ? '更新中...' : '更新'}
            </Button>
          </div>
        ) : (
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '登録中...' : '登録'}
          </Button>
        )}
      </form>
    </div>
  );
}
