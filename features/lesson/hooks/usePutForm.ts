import { useForm } from 'react-hook-form';
import { Lesson } from '../types/Lesson';
import { PutLesson } from '../types/PutLesson';
import { yupResolver } from '@hookform/resolvers/yup';
import { PutSchema } from '../schemas/PutSchema';

type Params = {
  lesson: Lesson;
};

export const usePutForm = ({ lesson }: Params) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PutLesson>({
    mode: 'onSubmit',
    resolver: yupResolver(PutSchema),
    defaultValues: {
      title: lesson.title,
      remarks: lesson.remarks,
      url: lesson.url,
      status: lesson.status,
    },
  });

  const updateValue = (
    key: keyof PutLesson,
    value: PutLesson[keyof PutLesson]
  ) => {
    setValue(key, value);
  };

  return {
    register,
    handleSubmit,
    updateValue,
    errors,
  };
};
