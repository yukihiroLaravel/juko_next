import { InstructorLayout } from '@/components/organisms/header';
import { InstructorLoginForm } from '@/features/login/components/Form/InstructorLoginForm';
import { NextPage } from 'next';
import { InstructorAuthWrapper } from '@/features/login/components/Auth';

const Index: NextPage = () => {
  return (
    <InstructorAuthWrapper>
      <InstructorLayout isLogin={false}>
        <InstructorLoginForm />
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
