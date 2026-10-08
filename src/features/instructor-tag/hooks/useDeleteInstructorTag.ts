export function useDeleteInstructorTag() {
  const deleteInstructorTag = async ({ tagId }: { tagId: string }) => {
    console.log('講座分類を削除', { tagId });
    return { success: true };
  };

  return { deleteInstructorTag };
}
