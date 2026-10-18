import type { SignupSchema } from '@/features/instructor/validation/SignupSchema';

export type RegisterInstructorResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof SignupSchema, string>>;
    };

export function useRegisterInstructor() {
  const registerInstructor = async (
    _data: SignupSchema,
  ): Promise<RegisterInstructorResult> => {
    return { success: false, error: '' };
  };

  return { registerInstructor };
}
