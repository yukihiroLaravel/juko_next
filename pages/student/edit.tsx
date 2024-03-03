import { StudentLayout } from '@/components/organisms/header/StudentLayout';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { StudentEditForm } from '@/features/student/components/StudentEditForm';

export default function Edit() {
  return (
    <AuthWrapper>
      <StudentLayout>
        <StudentEditForm />
      </StudentLayout>
    </AuthWrapper>
  );
}
