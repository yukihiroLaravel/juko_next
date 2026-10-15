import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { instructorTagKey } from '../utils/swrKeys';
import type { InstructorTag } from '../types/instructorTag';

type InstructorTagResponse = {
  data: InstructorTag;
};

export function useInstructorTag(tagId: string) {
  const { data } = useSWR<InstructorTagResponse>(
    instructorTagKey(tagId),
    fetcher,
    { suspense: true },
  );

  return {
    instructorTag: data?.data,
  };
}
