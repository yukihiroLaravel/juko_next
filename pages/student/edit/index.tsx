import { StudentLayout } from '@/components/organisms/header/StudentLayout';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { StudentEditForm } from '@/features/student/components/StudentEditForm';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <AuthWrapper>
      <StudentLayout>
        <StudentEditForm />
      </StudentLayout>
    </AuthWrapper>
  );
};

export default Index;
