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

/** 実行前に確認ダイアログを出す操作。画面を移る受講期限一括変更と定員一括変更は含めない */
export type ConfirmableBulkAction = Exclude<
  BulkAction,
  'deadline' | 'capacity'
>;

type BulkActionConfirmation = {
  title: string;
  describe: (courseCount: number) => string;
  confirmLabel: string;
  isDestructive: boolean;
};

export const bulkActionConfirmations: Record<
  ConfirmableBulkAction,
  BulkActionConfirmation
> = {
  publish: {
    title: '講座を公開',
    describe: (courseCount) => `選択した${courseCount}件の講座を公開します。`,
    confirmLabel: '公開する',
    isDestructive: false,
  },
  unpublish: {
    title: '講座を非公開にする',
    describe: (courseCount) =>
      `選択した${courseCount}件の講座を非公開にします。`,
    confirmLabel: '非公開にする',
    isDestructive: false,
  },
  clearDeadline: {
    title: '受講期限をなくす',
    describe: (courseCount) =>
      `選択した${courseCount}件の講座の受講期限をなくします。`,
    confirmLabel: '受講期限をなくす',
    isDestructive: false,
  },
  delete: {
    title: '講座を削除',
    describe: (courseCount) => `選択した${courseCount}件の講座を削除します。`,
    confirmLabel: '削除する',
    isDestructive: true,
  },
  clearCapacity: {
    title: '定員をなくす',
    describe: (courseCount) =>
      `選択した${courseCount}件の講座の定員をなくします。`,
    confirmLabel: '定員をなくす',
    isDestructive: false,
  },
};
