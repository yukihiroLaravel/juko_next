import type { VerificationSchema } from '@/features/instructor/validation/VerificationSchema';

export type VerifyInstructorResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<'code' | 'password', string>>;
      needsRestart?: true;
    };

export function useVerifyInstructor() {
  const verifyInstructor = async (
    _token: string,
    _data: VerificationSchema,
  ): Promise<VerifyInstructorResult> => {
    return { success: false, error: '' };
  };

  return { verifyInstructor };
}
