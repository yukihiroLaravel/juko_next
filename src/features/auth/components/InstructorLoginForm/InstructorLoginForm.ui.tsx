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
import { InstructorLoginFormValues } from './InstructorLoginForm';
import { Eye, EyeOff } from 'lucide-react';

type InstructorLoginFormUIProps = {
  form: UseFormReturn<InstructorLoginFormValues>;
  onSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
};

export function InstructorLoginFormUI({
  form,
  onSubmit,
  showPassword,
  onTogglePassword,
}: InstructorLoginFormUIProps) {
  const { register } = form;
  const { errors } = useFormState({ control: form.control });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">講師用ログイン</CardTitle>
        <CardDescription>
          講師専用のログイン画面です。<br />
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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onTogglePassword}
                aria-label={
                  showPassword
                    ? 'パスワードを非表示にする'
                    : 'パスワードを表示する'
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-0 bg-transparent hover:bg-transparent focus:ring-0"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
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
