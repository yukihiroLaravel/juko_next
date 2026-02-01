import type { SignupSchema } from '@/features/student/validation/SignupSchema';
import { Axios } from '@/lib/api';

export async function signupStudent(data: SignupSchema) {
  const response = await Axios.post('/api/student', data);
  return response.data;
}
