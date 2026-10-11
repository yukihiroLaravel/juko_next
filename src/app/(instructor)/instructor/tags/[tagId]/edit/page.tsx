'use client';

import { Suspense } from 'react';
import { useParams } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import { TagEditForm } from '@/features/instructor-tag/components/TagEditForm/TagEditForm';

export default function Page() {
  const params = useParams();
  const tagId = params.tagId as string;

  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <Suspense fallback={<div>読み込み中...</div>}>
        <TagEditForm tagId={tagId} />
      </Suspense>
    </ErrorBoundary>
  );
}
