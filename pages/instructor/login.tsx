import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { InstructorLoginForm } from '@/features/login/components/InstructorLoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <>
      <InstructorHeader isLogin={false} />
      <InstructorLoginForm />
    </>
  );
};

export default Login;
