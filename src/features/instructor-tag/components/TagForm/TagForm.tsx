'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tagSchema,
  TagSchema,
} from '@/features/instructor-tag/validation/TagSchema';
import { useCreateInstructorTag } from '@/features/instructor-tag/hooks/useCreateInstructorTag';
import { TagFormUI } from './TagForm.ui';

export function TagForm() {
  const [isPending, startTransition] = useTransition();
  const { createInstructorTag } = useCreateInstructorTag();

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = form.handleSubmit((data: TagSchema) => {
    startTransition(async () => {
      await createInstructorTag(data);
    });
  });

  return (
    <TagFormUI
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="講座分類登録"
    />
  );
}
