import { FC, useRef, useState } from 'react';
import { LoginFormSchema } from '@/features/login/schema/LoginFormSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Axios } from '@/lib/api';
import Router from 'next/router';
import { LoginForm } from './presentations/LoginForm';

export const InstructorLoginForm: FC = () => {
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  const isSending = useRef<boolean>(false);

  const defaultValues = {
    email: '',
    password: '',
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(LoginFormSchema),
    defaultValues,
  });

  const submitHandler = (data: typeof defaultValues) => {
    isSending.current = true;
    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/login/instructor', data)
        .then((res) => {
          isSending.current = false;
          setValue('password', '');
          if (res.data.result === true) {
            Router.push('/instructor/courses');
          }
        })
        .catch((error) => {
          isSending.current = false;
          setValue('password', '');
          if (error.response.status === 401) {
            setIsUnauthorized(true);
          }
        });
    });
  };

  return (
    <LoginForm
      isUnauthorized={isUnauthorized}
      isLoading={isSending.current}
      onSubmit={handleSubmit(submitHandler)}
      errors={errors}
      register={register}
    />
  );
};
