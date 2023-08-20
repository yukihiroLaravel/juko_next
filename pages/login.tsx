import { Header } from '@/components/layouts/Header';
import { LoginForm } from '@/features/login/components/LoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <>
      <Header isLogin={false} />
      <LoginForm />
    </>
  );
};

export default Login;
