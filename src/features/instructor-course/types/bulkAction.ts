export type BulkAction =
  | 'publish'
  | 'unpublish'
  | 'clearDeadline'
  | 'delete'
  | 'deadline'
  | 'clearCapacity'
  | 'capacity';

export const bulkActionLabels: Record<BulkAction, string> = {
  publish: '選択済み講座を公開',
  unpublish: '選択済み講座を非公開',
  clearDeadline: '選択して受講期限をなくす',
  delete: '選択済み講座を削除',
  deadline: '受講期限一括変更',
  clearCapacity: '選択して定員をなくす',
  capacity: '定員一括変更',
};
