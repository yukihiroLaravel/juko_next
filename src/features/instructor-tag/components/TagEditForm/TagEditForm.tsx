'use client';

import { useTransition } from 'react';
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

type Props = {
  tagId: string;
};

export function TagEditForm({ tagId }: Props) {
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
    startTransition(async () => {
      await updateInstructorTag({ tagId, content: data.content });
    });
  });

  const handleDelete = () => {
    startTransition(async () => {
      await deleteInstructorTag({ tagId });
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
