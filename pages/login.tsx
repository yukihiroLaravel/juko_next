import { StudentHeader } from '@/components/organisms/header/StudentHeader';
import { StudentLoginForm } from '@/features/login/components/StudentLoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <>
      <StudentHeader isLogin={false} />
      <StudentLoginForm />
    </>
  );
};

export default Login;
