'use client';

import { useParams } from 'next/navigation';
import { TagForm } from '@/features/instructor-tag/components/TagForm/TagForm';

export default function Page() {
  const params = useParams();
  const tagId = params.tagId as string;

  return <TagForm tagId={tagId} />;
}
