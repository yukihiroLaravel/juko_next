import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { instructorTagKey } from '../utils/swrKeys';
import type { InstructorTag } from '../types/instructorTag';

type InstructorTagResponse = {
  data: InstructorTag;
};

export function useInstructorTag(tagId: string) {
  const { data, error, isLoading } = useSWR<InstructorTagResponse>(
    instructorTagKey(tagId),
    fetcher,
  );

  return {
    instructorTag: data?.data,
    error,
    isLoading,
  };
}