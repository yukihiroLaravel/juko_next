'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  courseCreateSchema,
  courseFormSchema,
  type CourseFormSchema,
} from '../../validation/CourseFormSchema';
import { CourseFormUI } from './CourseForm.ui';

type Props = { mode: 'create' | 'edit'; courseId?: string };

export function CourseForm({ mode, courseId }: Props) {
  const form = useForm<CourseFormSchema>({
    resolver: zodResolver(mode === 'create' ? courseCreateSchema : courseFormSchema),
    defaultValues: mode === 'create'
      ? {
          title: '', image: undefined, tag_id: '', status: 'private',
          deadline_type: 'none', fixed_date: '', relative_days: undefined,
          capacity: undefined,
        }
      : {
          title: 'React入門講座', image: undefined, tag_id: '', status: 'public',
          deadline_type: 'relative_days', relative_days: 14, capacity: 30,
        },
  });

  const onSubmit = (data: CourseFormSchema) => {
    console.log(mode === 'create' ? 'create course:' : 'update course:', {
      ...data,
      courseId,
    });
  };

  const onDelete = () => {
     console.log('delete course:', courseId);
  };

  return (
    <CourseFormUI
      form={form}
      mode={mode}
      onSubmit={form.handleSubmit(onSubmit)}
      onDelete={onDelete}
    />
  );
}
