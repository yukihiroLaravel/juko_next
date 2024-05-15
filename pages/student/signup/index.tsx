import { StudentHeader } from '@/components/organisms/header/StudentHeader';
import { StudentSignupForm } from '@/features/student/components/StudentSignupForm';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <>
      <StudentHeader isLogin={false} />
      <StudentSignupForm />
    </>
  );
};

export default Index;
