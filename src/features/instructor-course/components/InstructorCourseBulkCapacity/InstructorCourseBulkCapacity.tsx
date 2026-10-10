'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/lib/routes';
import {
  bulkCapacitySchema,
  type BulkCapacitySchema,
} from '../../validation/BulkCourseSettingsSchema';
import { InstructorCourseBulkCapacityUI } from './InstructorCourseBulkCapacity.ui';

export function InstructorCourseBulkCapacity() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIds =
    searchParams.get('course_ids')?.split(',').filter(Boolean) ?? [];
  const [confirmAction, setConfirmAction] = useState<
    'update' | 'delete' | null
  >(null);
  const form = useForm<BulkCapacitySchema>({
    resolver: zodResolver(bulkCapacitySchema),
    defaultValues: { capacity: undefined },
  });

  useEffect(() => {
    if (courseIds.length === 0) router.push(routes.instructor.courses.list());
  }, [courseIds.length, router]);

  const onSubmit = form.handleSubmit(() => setConfirmAction('update'));
  const onDelete = () => setConfirmAction('delete');
  const onConfirm = () => {
    console.log(
      confirmAction === 'delete'
        ? 'bulk capacity delete'
        : 'bulk capacity update',
      courseIds,
      form.getValues('capacity'),
    );
    router.push(routes.instructor.courses.list());
  };

  if (courseIds.length === 0) return null;
  return (
    <InstructorCourseBulkCapacityUI
      courseCount={courseIds.length}
      register={form.register}
      error={form.formState.errors.capacity?.message}
      onSubmit={onSubmit}
      onDelete={onDelete}
      confirmAction={confirmAction}
      onConfirm={onConfirm}
      onCancel={() => setConfirmAction(null)}
    />
  );
}
