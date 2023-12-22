import { useForm } from 'react-hook-form';
import { Instructor } from '../types/Instructor';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { PutInstructor } from '../types/PutInstructor';
import { PutSchema } from '../schemas/PutSchema';

type Params = {
  instructor: Instructor | undefined;
};

export const usePutForm = ({ instructor }: Params) => {
  const [isDefaultValues, setIsDefaultValues] = useState(false);

  const {
    setValue,
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<PutInstructor>({
    mode: 'onSubmit',
    resolver: yupResolver(PutSchema),
  });

  useEffect(() => {
    if (instructor === undefined) return;
    if (isDefaultValues) return;

    setValue('nickName', instructor?.nickName);
    setValue('lastName', instructor?.lastName);
    setValue('firstName', instructor?.firstName);
    setValue('email', instructor?.email);
    setValue('image', null);
    setIsDefaultValues(true);
  }, [instructor]);

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
