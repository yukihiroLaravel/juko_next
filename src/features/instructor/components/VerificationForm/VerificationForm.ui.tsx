'use client';

import Link from 'next/link';
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
import { routes } from '@/lib/routes';

type VerificationFormUIProps = {
  form: UseFormReturn<VerificationSchema>;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  submitError: string | null;
  needsRestart: boolean;
};

export function VerificationFormUI({
  form,
  onSubmit,
  isPending,
  submitError,
  needsRestart,
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
            <div role="alert" className="text-destructive space-y-1 text-sm">
              <p>{submitError}</p>
              {needsRestart && (
                <Button asChild variant="link" className="h-auto p-0">
                  <Link href={routes.instructor.signup()}>
                    仮登録からやり直す
                  </Link>
                </Button>
              )}
            </div>
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
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? '登録中...' : '登録'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
