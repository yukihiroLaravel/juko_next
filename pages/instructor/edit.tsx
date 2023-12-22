import { InstructorLayout } from '@/components/layouts/InstructorLayout';
import { EditForm } from '@/features/instructor/components/EditForm';
import { AuthWrapper } from '@/features/login/components/AuthWrapper';

export default function Edit() {
  return (
    <AuthWrapper>
      <InstructorLayout>
        <EditForm />
      </InstructorLayout>
    </AuthWrapper>
  );
}
