import * as yup from 'yup';

export const LoginFormSchema: yup.Schema<{ email: string; password: string }> = yup.object().shape({
  email: yup.string().email('正しいメールアドレスを入力してください。').required('メールアドレスは必須項目です。'),
  password: yup.string().min(8, '最低8文字含めてください。').required('パスワードは必須項目です。'),
});
