'use client';

import { useForm, type FieldErrors } from 'react-hook-form';
import { EditFormUI } from './EditForm.ui';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  editSchema,
  EditSchema,
} from '@/features/student/validation/EditSchema';

export function EditForm() {
  const form = useForm<EditSchema>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      userName: '',
      lastName: '',
      firstName: '',
      email: '',
      occupation: '',
      purpose: '',
      birthday: '',
      gender: undefined,
      address: '',
      profileImage: undefined,
    },
  });

  const onSubmit = (data: EditSchema) => {
    console.log('submit data:', data);
  };
  const onError = (errors: FieldErrors<EditSchema>) => {
    console.log('submit errors:', errors);
  };

  return <EditFormUI form={form} onSubmit={onSubmit} onError={onError} />;
}
