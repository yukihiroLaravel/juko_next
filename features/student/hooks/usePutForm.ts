import { useForm } from 'react-hook-form';
import { Student } from '../types/Student';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateStoreSchema } from '../schemas/UpdateStoreSchema';
import { useEffect, useState } from 'react';

type Params = {
  student: Student | undefined;
};

export const usePutForm = ({ student }: Params) => {
  const [isDefaultValues, setIsDefaultValues] = useState(false);

  const { setValue, handleSubmit, control } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(UpdateStoreSchema),
  });

  useEffect(() => {
    if (student === undefined) return;
    setValue('studentId', student?.studentId);
    setValue('nickName', student?.nickName);
    setValue('lastName', student?.lastName);
    setValue('firstName', student?.firstName);
    setValue('email', student?.email);
    setValue('occupation', student?.occupation);
    setValue('purpose', student?.purpose);
    setValue('birthDate', student?.birthDate);
    setValue('sex', student?.sex);
    setValue('address', student?.address);
    setIsDefaultValues(true);
  }, [student]);

  return {
    handleSubmit,
    control,
    isDefaultValues,
  };
};
