'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tagSchema,
  TagSchema,
} from '@/features/instructor-tag/validation/TagSchema';
import { TagFormUI } from './TagForm.ui';

type Props = {
  // 渡されたら編集画面、渡されなければ登録画面
  tagId?: string;
};

// API連携までの仮の初期値（API連携は別Issueで対応する）
const DUMMY_TAG_CONTENT = 'バックエンドマスター講座';

export function TagForm({ tagId }: Props) {
  const isEdit = tagId !== undefined;
  const [isPending, startTransition] = useTransition();

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      content: isEdit ? DUMMY_TAG_CONTENT : '',
    },
  });

  const handleSubmit = form.handleSubmit((data: TagSchema) => {
    startTransition(() => {
      console.log(isEdit ? '講座分類を更新' : '講座分類を登録', {
        tagId,
        ...data,
      });
    });
  });

  const handleDelete = () => {
    console.log('講座分類を削除', { tagId });
  };

  return (
    <TagFormUI
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title={isEdit ? '講座分類編集' : '講座分類登録'}
      savedContent={isEdit ? DUMMY_TAG_CONTENT : undefined}
      onDelete={isEdit ? handleDelete : undefined}
    />
  );
}
