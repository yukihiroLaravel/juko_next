import { useForm } from 'react-hook-form';
import { Student } from '../types/Student';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PutStudent } from '../types/PutStudent';
import { PutSchema } from '../schemas/PutSchema';

type Params = {
  student: Student | undefined;
};

export const usePutForm = ({ student }: Params) => {
  const [isDefaultValues, setIsDefaultValues] = useState(false);

  const {
    setValue,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PutStudent>({
    mode: 'onSubmit',
    resolver: yupResolver(PutSchema),
  });

  useEffect(() => {
    if (student === undefined) return;
    if (isDefaultValues) return;

    const birthDate = new Date(student?.birthDate);
    setValue('nickName', student?.nickName);
    setValue('lastName', student?.lastName);
    setValue('firstName', student?.firstName);
    setValue('email', student?.email);
    setValue('occupation', student?.occupation);
    setValue('purpose', student?.purpose);
    setValue('birthDate', birthDate);
    setValue('sex', student?.sex);
    setValue('address', student?.address);
    setValue('image', null);
    setIsDefaultValues(true);
  }, [student]);

  const uploadImage = (file: File | null) => {
    if (file === null) {
      setValue('image', null);
    } else {
      setValue('image', file);
    }
  };

  return {
    register,
    handleSubmit,
    control,
    isDefaultValues,
    uploadImage,
    errors,
  };
};
