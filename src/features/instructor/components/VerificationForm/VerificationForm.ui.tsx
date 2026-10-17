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
import { VerificationSchema } from '@/features/instructor/validation/VerificationSchema';

type VerificationFormUIProps = {
  form: UseFormReturn<VerificationSchema>;
  onSubmit: (e: React.FormEvent) => void;
  submitError: string | null;
};

export function VerificationFormUI({
  form,
  onSubmit,
  submitError,
}: VerificationFormUIProps) {
  const { register } = form;
  const { errors } = useFormState({ control: form.control });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">新規登録画面</CardTitle>
        <CardDescription>
          ご登録のメールアドレスに認証コードを送付しました。下記認証コード欄に、メールに記載の認証コードを入力の上、ログインパスワードを設定願います。
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} noValidate>
        <CardContent className="space-y-4 pb-4">
          {submitError && (
            <p role="alert" className="text-destructive text-sm">
              {submitError}
            </p>
          )}
          <div className="space-y-2">
            <Label htmlFor="code">認証コード</Label>
            {/* 大文字と小文字を区別するため、端末による自動の変換を止める */}
            <Input
              id="code"
              type="text"
              autoComplete="one-time-code"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              {...register('code')}
              aria-invalid={!!errors.code}
            />
            {errors.code && (
              <p className="text-destructive text-sm">{errors.code.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="text-destructive text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="passwordConfirmation">パスワード再入力</Label>
            <Input
              id="passwordConfirmation"
              type="password"
              autoComplete="new-password"
              {...register('passwordConfirmation')}
              aria-invalid={!!errors.passwordConfirmation}
            />
            {errors.passwordConfirmation && (
              <p className="text-destructive text-sm">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            登録
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
