import { StudentHeader } from '@/components/layouts/StudentHeader';
import { StudentLayout } from '@/components/layouts/StudentLayout';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';
import { StudentEditForm } from '@/features/student/components/StudentEditForm';

export default function Signup() {
  return (
    <AuthWrapper>
      <StudentLayout>
        <StudentEditForm />
      </StudentLayout>
    </AuthWrapper>
  );
}
