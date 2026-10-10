type DeleteInstructorTagResult =
  | { success: true }
  | { success: false; error: string };

export function useDeleteInstructorTag() {
  const deleteInstructorTag = async ({
    tagId,
  }: {
    tagId: string;
  }): Promise<DeleteInstructorTagResult> => {
    console.log('講座分類を削除', { tagId });
    return { success: true };
  };

  return { deleteInstructorTag };
}
