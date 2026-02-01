import { useState } from 'react';
import type { SignupSchema } from '@/features/student/validation/SignupSchema';
import { signupStudent } from '../api/signupStudent';

export function useStudentSignup() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const signup = async (data: SignupSchema) => {
    setIsSubmitting(true);
    try {
      return await signupStudent(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { signup, isSubmitting };
}
