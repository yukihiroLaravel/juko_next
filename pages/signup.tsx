import { StudentHeader } from '@/components/organisms/header/StudentHeader';
import { StudentSignupForm } from '@/features/student/components/StudentSignupForm';

export default function Signup() {
  return (
    <>
      <StudentHeader isLogin={false} />
      <StudentSignupForm />
    </>
  );
}
