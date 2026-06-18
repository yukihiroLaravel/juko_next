import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { EditForm } from '@/features/student/components/EditForm/EditForm';

export default function StudentEditPage() {
  return (
    <ErrorBoundary fallback={<div>エラーが発生しました</div>}>
      <Suspense fallback={<div>読み込み中...</div>}>
        <EditForm />
      </Suspense>
    </ErrorBoundary>
  );
}
