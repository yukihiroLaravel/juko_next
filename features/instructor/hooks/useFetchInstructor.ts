import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Instructor } from '../types/Instructor';

export const useFetchInstructor = () => {
  const { data, isLoading, error, mutate } = useSWR<{
    data: {
      studnet_id: number;
      nick_name: string;
      last_name: string;
      first_name: string;
      email: string;
      profile_image: string | null;
    };
  }>('/api/v1/instructor/edit', fetcher, {
    revalidateOnFocus: false,
  });

  const instructor: Instructor | undefined = data?.data
    ? {
        instructorId: data?.data.studnet_id,
        nickName: data?.data.nick_name,
        lastName: data?.data.last_name,
        firstName: data?.data.first_name,
        email: data?.data.email,
        profileImage: data?.data.profile_image,
      }
    : undefined;

  return {
    instructor,
    isLoading,
    error,
    mutate,
  };
};
