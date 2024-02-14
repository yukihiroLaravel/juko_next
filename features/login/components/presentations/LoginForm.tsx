import { FC } from 'react';
import { Button } from '@/components/elements/Button';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type Props = {
  isUnauthorized: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  errors: FieldErrors<{
    email: string;
    password: string;
  }>;
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
};
export const LoginForm: FC<Props> = ({
  isUnauthorized,
  isLoading,
  onSubmit,
  errors,
  register,
}) => {
  return (
    <form
      className="md:w-1/3 md:border mx-auto min-h-full my-10 py-10 bg-white"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl">ログイン画面</h2>
      <div className="w-4/5 mx-auto">
        {isUnauthorized && (
          <div className="text-red-600 mt-2 text-center">
            ログインに失敗しました
          </div>
        )}
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
          <Button
            type="button"
            className="w-4/5 py-2 text-lg"
            isDisabled={true}
          >
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
