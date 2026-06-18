'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EditFormUI } from './EditForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editSchema,
  EditSchema,
} from '@/features/student/validation/EditSchema';
import { useStudent } from '@/features/student/hooks/useStudent';
import { useUpdateStudent } from '@/features/student/hooks/useUpdateStudent';
import { toInputDate } from '@/utils/date';

// APIのgender文字列をフォームのenumに変換（想定外の値はundefinedにする）
function toGender(value?: string): EditSchema['gender'] | undefined {
  return value === 'man' || value === 'woman' ? value : undefined;
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
      gender: toGender(student?.gender),
      address: student?.address ?? '',
      profileImage: undefined,
    },
  });

  const handleSubmit = form.handleSubmit(async (data: EditSchema) => {
    setSuccessMessage(null);
    form.clearErrors('root');

    const result = await updateStudent(data);

    if (result.success) {
      setSuccessMessage('ユーザー情報を更新しました');
      // 送信値を新しい初期値として確定し、dirty 状態と選択済み画像をクリアする
      // （同じ画像の再アップロードや、未変更フィールドの再送信を防ぐ）
      form.reset({ ...data, profileImage: undefined });
      return;
    }

    if (result.error) {
      form.setError('root', {
        type: 'server',
        message: result.error,
      });
    }
  });

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
