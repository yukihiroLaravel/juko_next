import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

type Props = {
  title: string;
};

export const useUpdateTitle = ({ title }: Props) => {
  const [isClickedEditTitle, setIsClickedEditTitle] = useState<boolean>(false);
  const updateIsClickedEditTitle = () => {
    setIsClickedEditTitle(!isClickedEditTitle);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{
    title: string;
  }>({
    mode: 'onSubmit',
    defaultValues: {
      title,
    },
    resolver: yupResolver(
      yup.object().shape({
        title: yup
          .string()
          .required('レッスン名を入力してください')
          .max(50, '50文字以内で入力してください'),
      })
    ),
  });

  useEffect(() => {
    reset({ title });
  }, [title]);

  const renderAddLesson = () => {
    return (
      <input
        type="text"
        className="w-2/3 border border-gray-300 rounded-md p-2 text-xl"
        placeholder="レッスン名を入力"
        defaultValue={title}
        {...register('title')}
      />
    );
  };

  return {
    isClickedEditTitle,
    updateIsClickedEditTitle,
    renderAddLesson,
    handleSubmit,
    errors,
    reset,
  };
};
