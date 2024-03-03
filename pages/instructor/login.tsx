import { InstructorLayout } from '@/components/organisms/header';
import { InstructorLoginForm } from '@/features/login/components/InstructorLoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <InstructorLayout isLogin={false}>
      <InstructorLoginForm />
    </InstructorLayout>
  );
};

export default Login;
