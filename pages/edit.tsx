import { StudentHeader } from '@/components/layouts/StudentHeader';
import { StudentEditForm } from '@/features/student/components/StudentEditForm';

export default function Signup() {
  return (
    <>
      <StudentHeader isLogin={false} />
      <StudentEditForm />
    </>
  );
}
