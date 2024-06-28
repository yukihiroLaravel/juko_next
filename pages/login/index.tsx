import { StudentHeader } from '@/components/organisms/header/StudentHeader';
import { StudentAuthWrapper } from '@/features/login/components/Auth';
import { StudentLoginForm } from '@/features/login/components/Form/StudentLoginForm';
import { NextPage } from 'next';

const Login: NextPage = () => {
  return (
    <StudentAuthWrapper>
      <StudentHeader isLogin={false} />
      <StudentLoginForm />
    </StudentAuthWrapper>
  );
};

export default Login;
