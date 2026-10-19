'use client';

import { UseFormReturn, useFormState } from 'react-hook-form';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/atoms/Card';
import { SignupSchema } from '@/features/instructor/validation/SignupSchema';

type SignupFormUIProps = {
  form: UseFormReturn<SignupSchema>;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  submittedEmail: string | null;
  submitError: string | null;
};

const fields: Array<{
  name: keyof SignupSchema;
  label: string;
  type: 'text' | 'email';
}> = [
  { name: 'nickName', label: '講師名', type: 'text' },
  { name: 'lastName', label: '姓', type: 'text' },
  { name: 'firstName', label: '名', type: 'text' },
  { name: 'email', label: 'メールアドレス', type: 'email' },
];

export function SignupFormUI({
  form,
  onSubmit,
  isPending,
  submittedEmail,
  submitError,
}: SignupFormUIProps) {
  const { register } = form;
  const { errors } = useFormState({ control: form.control });
  // errors[name] だと React Compiler が更新を拾わないため、項目ごとに読み出す
  const fieldErrors = {
    nickName: errors.nickName,
    lastName: errors.lastName,
    firstName: errors.firstName,
    email: errors.email,
  };

  if (submittedEmail !== null) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">新規登録画面</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="break-all">
            {submittedEmail} 宛てに認証コードを送信しました。
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">新規登録画面</CardTitle>
      </CardHeader>
      <form onSubmit={onSubmit} noValidate>
        <CardContent className="space-y-4 pb-4">
          {submitError && (
            <p role="alert" className="text-destructive text-sm">
              {submitError}
            </p>
          )}
          {fields.map(({ name, label, type }) => (
            <div key={name} className="space-y-2">
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                type={type}
                {...register(name)}
                aria-invalid={!!fieldErrors[name]}
              />
              {fieldErrors[name] && (
                <p className="text-destructive text-sm">
                  {fieldErrors[name].message}
                </p>
              )}
            </div>
          ))}
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
