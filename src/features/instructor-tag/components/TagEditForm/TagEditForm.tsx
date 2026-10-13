'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  tagSchema,
  TagSchema,
} from '@/features/instructor-tag/validation/TagSchema';
import { useInstructorTag } from '@/features/instructor-tag/hooks/useInstructorTag';
import { useUpdateInstructorTag } from '@/features/instructor-tag/hooks/useUpdateInstructorTag';
import { useDeleteInstructorTag } from '@/features/instructor-tag/hooks/useDeleteInstructorTag';
import { TagFormUI } from '@/features/instructor-tag/components/TagForm/TagForm.ui';
import { routes } from '@/lib/routes';

type Props = {
  tagId: string;
};

export function TagEditForm({ tagId }: Props) {
  const router = useRouter();
  const { instructorTag } = useInstructorTag(tagId);
  const { updateInstructorTag } = useUpdateInstructorTag();
  const { deleteInstructorTag } = useDeleteInstructorTag();
  const [isPending, startTransition] = useTransition();

  const form = useForm<TagSchema>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      content: instructorTag?.content ?? '',
    },
  });

  const handleSubmit = form.handleSubmit((data: TagSchema) => {
    // 前回のエラー枠を消してから送る
    form.clearErrors('root');
    startTransition(async () => {
      const result = await updateInstructorTag({
        tagId,
        content: data.content,
      });
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

  const handleDelete = () => {
    // 削除は handleSubmit を通らないので、前回のエラー枠を自分で消す
    form.clearErrors('root');
    startTransition(async () => {
      const result = await deleteInstructorTag({ tagId });
      if (result.success) {
        router.push(routes.instructor.courses.list());
        return;
      }
      form.setError('root', { type: 'server', message: result.error });
    });
  };

  return (
    <TagFormUI
      form={form}
      onSubmit={handleSubmit}
      isPending={isPending}
      title="講座分類編集"
      savedContent={instructorTag?.content}
      onDelete={handleDelete}
    />
  );
}
