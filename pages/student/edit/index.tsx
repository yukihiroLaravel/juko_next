import { StudentLayout } from '@/components/organisms/header/StudentLayout';
import { StudentAuthWrapper } from '@/features/login/components/Auth/StudentAuthWrapper';
import { StudentEditForm } from '@/features/student/components/StudentEditForm';
import { NextPage } from 'next';

const Index: NextPage = () => {
  return (
    <StudentAuthWrapper>
      <StudentLayout>
        <StudentEditForm />
      </StudentLayout>
    </StudentAuthWrapper>
  );
};

export default Index;
