import { Fragment } from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/atoms/Breadcrumb';
import { Skeleton } from '@/components/atoms/Skeleton';
import type { BreadcrumbItemData } from '@/types/breadcrumb';

// ラベルのクラス（幅を制限）
const LABEL_CLASS = 'inline-block max-w-40 truncate sm:max-w-64';

type BreadcrumbsUIProps = {
  items: BreadcrumbItemData[];
  className?: string;
};

export function BreadcrumbsUI({ items, className }: BreadcrumbsUIProps) {
  // 項目が1つ以下なら描画しない
  if (items.length <= 1) {
    return null;
  }

  const lastIndex = items.length - 1;
  const middleItems = items.slice(1, lastIndex);
  // 1件だけのときは畳まず、そのままリンクとして表示する
  const shouldCollapse = middleItems.length >= 2;

  return (
    <Breadcrumb aria-label="パンくずリスト" className={className}>
      <BreadcrumbList>
        <BreadcrumbItem>
          <ItemLabel item={items[0]} />
        </BreadcrumbItem>

        {/* 狭幅では中間項目を省略記号に畳む */}
        {shouldCollapse && (
          <Fragment>
            <BreadcrumbSeparator className="sm:hidden" />
            <BreadcrumbItem className="sm:hidden">
              <BreadcrumbEllipsis className="size-5" />
              <span className="sr-only">
                {middleItems.map((item) => item.label).join('、')}
              </span>
            </BreadcrumbItem>
          </Fragment>
        )}

        {middleItems.map((item, index) => (
          <Fragment key={`${index}-${item.label}`}>
            <BreadcrumbSeparator
              className={shouldCollapse ? 'hidden sm:block' : undefined}
            />
            <BreadcrumbItem
              className={shouldCollapse ? 'hidden sm:inline-flex' : undefined}
            >
              <ItemLabel item={item} />
            </BreadcrumbItem>
          </Fragment>
        ))}

        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <ItemLabel item={items[lastIndex]} isCurrent />
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

type ItemLabelProps = {
  item: BreadcrumbItemData;
  isCurrent?: boolean;
};

function ItemLabel({ item, isCurrent = false }: ItemLabelProps) {
  if (item.isLoading) {
    return (
      <Skeleton className="h-5 w-28">
        <span className="sr-only">{item.label}を読み込み中</span>
      </Skeleton>
    );
  }

  if (isCurrent) {
    return (
      <BreadcrumbPage className={LABEL_CLASS} title={item.label}>
        {item.label}
      </BreadcrumbPage>
    );
  }

  if (item.href) {
    return (
      <BreadcrumbLink asChild>
        <Link href={item.href} className={LABEL_CLASS} title={item.label}>
          {item.label}
        </Link>
      </BreadcrumbLink>
    );
  }

  return (
    <span className={LABEL_CLASS} title={item.label}>
      {item.label}
    </span>
  );
}
