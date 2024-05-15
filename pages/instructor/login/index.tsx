import { InstructorLayout } from '@/components/organisms/header';
import { InstructorLoginForm } from '@/features/login/components/Form/InstructorLoginForm';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <InstructorLayout isLogin={false}>
      <InstructorLoginForm />
    </InstructorLayout>
  );
};

export default Index;
