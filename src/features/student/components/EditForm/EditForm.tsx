'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { EditFormUI } from './EditForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editSchema,
  EditSchema,
} from '@/features/student/validation/EditSchema';
import { useStudent } from '@/features/student/hooks/useStudent';
import { useUpdateStudent } from '@/features/student/hooks/useUpdateStudent';

// 日付をyyyy-MM-dd形式に変換
function toInputDate(value?: string): string {
  if (!value) return '';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '' : format(date, 'yyyy-MM-dd');
}

export function EditForm() {
  const { student } = useStudent();
  const { updateStudent, isSubmitting } = useUpdateStudent();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      userName: student?.nick_name ?? '',
      lastName: student?.last_name ?? '',
      firstName: student?.first_name ?? '',
      email: student?.email ?? '',
      occupation: student?.occupation ?? '',
      purpose: student?.purpose ?? '',
      birthday: toInputDate(student?.birth_date),
      gender: student?.gender as EditSchema['gender'] | undefined,
      address: student?.address ?? '',
      profileImage: undefined,
    },
  });

  const handleSubmit = form.handleSubmit(
    async (data: EditSchema) => {
      setSuccessMessage(null);
      form.clearErrors('root');

      const result = await updateStudent(data);

      if (result.success) {
        setSuccessMessage('ユーザー情報を更新しました');
        return;
      }

      if (result.error) {
        form.setError('root', {
          type: 'server',
          message: result.error,
        });
      }
    },
    (errors) => {
      console.log('submit errors:', errors);
    },
  );

  return (
    <EditFormUI
      form={form}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      defaultProfileImageUrl={student?.profile_image}
      successMessage={successMessage}
    />
  );
}
