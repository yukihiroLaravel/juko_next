import { FC } from 'react';
import { Button } from '@/components/atoms/Button/Button';
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
      className="mx-auto my-10 min-h-full bg-white py-10 md:w-1/3 md:border"
      onSubmit={onSubmit}
    >
      <h2 className="text-center text-2xl">ログイン画面</h2>
      <div className="mx-auto w-4/5">
        {isUnauthorized && (
          <div className="mt-2 text-center text-red-600">
            ログインに失敗しました
          </div>
        )}
        <div className="mt-10">
          <label htmlFor="email">
            <p>メールアドレス</p>
            <input
              id="email"
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
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
              className="w-full rounded border-b-2 p-1 focus:border-[#B0ABAB] focus:outline-none"
              type="password"
              {...register('password')}
            />
            <span className="text-red-600">{errors?.password?.message}</span>
          </label>
        </div>
      </div>
      <div className="my-10 text-center">
        {isLoading ? (
          <Button type="button" size="lg" isDisabled={true}>
            ログイン中...
          </Button>
        ) : (
          <Button type="submit" size="lg">
            ログイン
          </Button>
        )}
      </div>
    </form>
  );
};
