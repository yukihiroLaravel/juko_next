'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tagSchema,
  TagSchema,
} from '@/features/instructor-tag/validation/TagSchema';
import { useCreateInstructorTag } from '@/features/instructor-tag/hooks/useCreateInstructorTag';
import { routes } from '@/lib/routes';
import { TagFormUI } from './TagForm.ui';

export function TagForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { createInstructorTag } = useCreateInstructorTag();

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      content: '',
    },
  });

  const handleSubmit = form.handleSubmit((data: TagSchema) => {
    // 前回のエラー枠を消してから送る
    form.clearErrors('root');
    startTransition(async () => {
      const result = await createInstructorTag(data);
      if (result.success) {
        router.push(routes.instructor.courses.list());
        return;
      }
      if (result.fieldErrors?.content) {
        form.setError('content', {
          type: 'server',
          message: result.fieldErrors.content,
        });
        return;
      }
      form.setError('root', { type: 'server', message: result.error });
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
