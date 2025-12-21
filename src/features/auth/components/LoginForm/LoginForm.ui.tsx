'use client';

import { UseFormReturn, useFormState } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/atoms/Card';
import { LoginFormValues } from './LoginForm';

type LoginFormUIProps = {
  form: UseFormReturn<LoginFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
};

export function LoginFormUI({
    form,
    onSubmit,
    showPassword,
    onTogglePassword,
  }: LoginFormUIProps) 
{
  const { register } = form;
  const { errors } = useFormState({ control: form.control });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">ログイン</CardTitle>
        <CardDescription>
          メールアドレスとパスワードを入力してください
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register('email')}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                aria-invalid={!!errors.password}
                className="pr-10"
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                aria-label={showPassword ? 'パスワードを非表示にする' : 'パスワードを表示する'}
              >
                {showPassword ? '🚫👁️' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'ログイン中...' : 'ログイン'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
