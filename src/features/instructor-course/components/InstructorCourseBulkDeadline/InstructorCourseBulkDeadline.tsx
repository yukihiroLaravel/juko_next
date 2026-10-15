'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { routes } from '@/lib/routes';
import {
  bulkDeadlineSchema,
  type BulkDeadlineSchema,
} from '../../validation/BulkCourseSettingsSchema';
import { InstructorCourseBulkDeadlineUI } from './InstructorCourseBulkDeadline.ui';

export function InstructorCourseBulkDeadline() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseIds =
    searchParams.get('course_ids')?.split(',').filter(Boolean) ?? [];
  const [confirmAction, setConfirmAction] = useState<
    'update' | 'delete' | null
  >(null);
  const form = useForm<BulkDeadlineSchema>({
    resolver: zodResolver(bulkDeadlineSchema),
    defaultValues: {
      deadline_type: 'none',
      fixed_date: '',
      relative_days: undefined,
    },
  });

  useEffect(() => {
    if (courseIds.length === 0)
      router.replace(routes.instructor.courses.list());
  }, [courseIds.length, router]);

  const onSubmit = form.handleSubmit(() => setConfirmAction('update'));
  const onDeadlineTypeChange = (value: BulkDeadlineSchema['deadline_type']) => {
    form.clearErrors(['fixed_date', 'relative_days']);
    if (value !== 'fixed_date') form.setValue('fixed_date', '');
    if (value !== 'relative_days') form.setValue('relative_days', undefined);
  };
  const onDelete = () => setConfirmAction('delete');
  const onConfirm = () => {
    if (confirmAction === 'delete') {
      console.log('bulk deadline delete', courseIds);
    } else {
      console.log('bulk deadline update', courseIds, form.getValues());
    }
    router.push(routes.instructor.courses.list());
  };

  if (courseIds.length === 0) return null;
  return (
    <InstructorCourseBulkDeadlineUI
      courseCount={courseIds.length}
      form={form}
      onDeadlineTypeChange={onDeadlineTypeChange}
      onSubmit={onSubmit}
      onDelete={onDelete}
      confirmAction={confirmAction}
      onConfirm={onConfirm}
      onCancel={() => setConfirmAction(null)}
    />
  );
}
