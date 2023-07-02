import { FC, useState } from 'react';
import { LoginFormSchema } from '@/features/login/schema/LoginFormSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Axios } from '@/lib/api';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

export const LoginForm: FC = () => {
  const defaultValues = {
    email: '',
    password: '',
  };

  const { cache } = useSWRConfig();

  const [isUnauthorized, setIsUnauthorized] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
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
            cache.delete('/api/user');
            router.push('/courses');
          }
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.status === 401) {
            setIsUnauthorized(true);
          }
        });
    });
  };

  return (
    <form
      className="md:w-1/3 md:border mx-auto min-h-[80vh] mt-10 mb-10 bg-white"
      onSubmit={handleSubmit(submitHandler)}
    >
      <h2 className="text-center mt-[50px] text-[40px]">ログイン画面</h2>

      <div className="w-4/5 mx-auto">
        {isUnauthorized && (
          <>
            <p className="text-red-600">認証情報が正しくありません。</p>
            <p className="text-red-600">もう一度、お試しください。</p>
          </>
        )}
        <div className="mt-[40px]">
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
        <div className="mt-[50px]">
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
      {isLoading ? (
        <button
          className="block rounded mt-[50px] bg-[#00A5D4] w-4/5 mx-auto text-center text-white font-semibold text-[25px] py-2 opacity-75"
          disabled
        >
          ログイン中...
        </button>
      ) : (
        <button className="block rounded mt-[50px] bg-[#00A5D4] w-4/5 mx-auto text-center text-white font-semibold text-[25px] py-2 hover:opacity-75">
          ログイン
        </button>
      )}
    </form>
  );
};
