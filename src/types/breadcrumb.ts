export type BreadcrumbItemData = {
  label: string;
  href?: string; // 省略 = 現在地（リンクにしない）
  isLoading?: boolean; // trueの場合、Skeletonを表示する
};
