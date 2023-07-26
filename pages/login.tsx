import Header from '@/components/layouts/Header';
import { LoginFormSchema } from '@/features/login/schema/LoginFormSchema';
import { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Axios } from '@/lib/api';

const Login: NextPage = () => {
  const defaultValues = {
    email: '',
    password: '',
  };
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
    Axios.get('api/proxy/sanctum/csrf-cookie').then(() => {
      Axios.post('api/proxy/login', data)
        .then((res) => console.log(res))
        .catch((error) => {});
    });
  };

  return (
    <>
      <Header isLogin={false} />
      <form
        className="md:w-1/3 md:border mx-auto min-h-[80vh] mt-10 mb-10 bg-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="text-center mt-[50px] text-[40px]">ログイン画面</h2>
        <div className="w-4/5 mx-auto">
          <div className="mt-[40px]">
            <label htmlFor="email">
              <p>メールアドレス</p>
              <input
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
                className="p-1 rounded border-b-2 w-full focus:outline-none focus:border-[#B0ABAB]"
                type="password"
                {...register('password')}
              />
              <span className="text-red-600">{errors?.password?.message}</span>
            </label>
          </div>
        </div>
        <button className="block rounded mt-[50px] bg-[#00A5D4] w-4/5 mx-auto text-center text-white font-semibold text-[25px] py-2 hover:opacity-75">
          ログイン
        </button>
      </form>
    </>
  );
};

export default Login;
