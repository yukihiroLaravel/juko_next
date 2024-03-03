import { InstructorLayout } from '@/components/organisms/header/InstructorLayout';
import { EditForm } from '@/features/instructor/components/EditForm';
import { InstructorAuthWrapper } from '@/features/login/components/Auth/InstructorAuthWrapper';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <InstructorAuthWrapper>
      <InstructorLayout>
        <EditForm />
      </InstructorLayout>
    </InstructorAuthWrapper>
  );
};

export default Index;
