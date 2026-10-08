export function useUpdateInstructorTag() {
  const updateInstructorTag = async ({
    tagId,
    content,
  }: {
    tagId: string;
    content: string;
  }) => {
    console.log('講座分類を更新', { tagId, content });
    return { success: true };
  };

  return { updateInstructorTag };
}
