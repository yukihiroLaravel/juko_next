import { useForm } from 'react-hook-form';
import { Lesson } from '../types/Lesson';
import { PutLesson } from '../types/PutLesson';
import { yupResolver } from '@hookform/resolvers/yup';
import { PutSchema } from '../schemas/PutSchema';
import { useEffect, useState } from 'react';

type Params = {
  lesson: Lesson;
};

export const usePutForm = ({ lesson }: Params) => {
  const [isDefaultValues, setIsDefaultValues] = useState(false);

  const { register, handleSubmit } = useForm<PutLesson>({
    mode: 'onSubmit',
    resolver: yupResolver(PutSchema),
  });

  useEffect(() => {
    if (lesson === undefined) return;
    if (isDefaultValues) return;

    register('remarks');
    register('title');
    register('url');
    register('status');
    setIsDefaultValues(true);
  }, [lesson]);

  return {
    register,
    handleSubmit,
    isDefaultValues,
  };
};
