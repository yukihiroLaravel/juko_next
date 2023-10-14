import { StudentHeader } from '@/components/layouts/StudentHeader';
import { StudentSignupForm } from '@/features/student/components/StudentSignupForm';

export default function Signup() {
  return (
    <>
      <StudentHeader isLogin={false} />
      <StudentSignupForm />
    </>
  );
}
