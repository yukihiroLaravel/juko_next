import type { TagSchema } from '@/features/instructor-tag/validation/TagSchema';

type CreateInstructorTagResult =
  | { success: true }
  | { success: false; error: string };

export function useCreateInstructorTag() {
  const createInstructorTag = async (
    data: TagSchema,
  ): Promise<CreateInstructorTagResult> => {
    console.log('講座分類を登録', data);
    return { success: true };
  };

  return { createInstructorTag };
}
