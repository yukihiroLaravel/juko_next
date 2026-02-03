import type { SignupSchema } from '@/features/student/validation/SignupSchema';
import { signupStudent } from '../api/signupStudent';

export function useStudentSignup() {

  const signup = async (data: SignupSchema) => {
    return signupStudent(data);
  };

  return { signup};
}
