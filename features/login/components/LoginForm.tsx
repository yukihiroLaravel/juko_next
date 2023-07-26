import { FC, useState } from 'react';
import { LoginFormSchema } from '@/features/login/schema/LoginFormSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Axios } from '@/lib/api';
import { useRouter } from 'next/router';
import { Button } from '@/components/elements/Button';

export const LoginForm: FC = () => {
  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    setIsLoading(true);
    Axios.get('/sanctum/csrf-cookie').then(() => {
      Axios.post('/login', data)
        .then((res) => {
          setIsLoading(false);
          if (res.data.result === true) {
            router.push('/courses');
          }
          setValue('password', '');
        })
        .catch((error) => {
          setIsLoading(false);
          setValue('password', '');
          if (error.response.status === 401) {
            setIsUnauthorized(true);
          }
        });
    });
  };

  return (
    <form className="md:w-1/3 md:border mx-auto min-h-full my-10 bg-white" onSubmit={handleSubmit(submitHandler)}>
      <h2 className="text-center mt-10 text-2xl">ログイン画面</h2>
      <div className="w-4/5 mx-auto">
        {isUnauthorized && <div className="text-red-600 mt-2">ログインに失敗しました</div>}
        <div className="mt-10">
          <label htmlFor="email">
            <p>メールアドレス</p>
            <input
              id="email"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              {...register('email')}
            />
            <span className="text-red-600">{errors?.email?.message}</span>
          </label>
        </div>
        <div className="mt-10">
          <label htmlFor="password">
            <p>パスワード</p>
            <input
              id="password"
              className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
              type="password"
              {...register('password')}
            />
            <span className="text-red-600">{errors?.password?.message}</span>
          </label>
        </div>
      </div>
      <div className="text-center my-10">
        {isLoading ? (
          <Button type="button" className="w-4/5 py-2 text-lg" isDisabled={true}>
            ログイン中...
          </Button>
        ) : (
          <Button type="submit" className="w-4/5 py-2 hover:opacity-75 text-lg">
            ログイン
          </Button>
        )}
      </div>
    </form>
  );
};
