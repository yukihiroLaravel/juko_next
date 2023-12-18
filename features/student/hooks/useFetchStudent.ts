import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';
import { Student } from '../types/Student';

export const useFetchStudent = () => {
  const { data, isLoading, error, mutate } = useSWR<{
    data: {
      studnet_id: number;
      nick_name: string;
      last_name: string;
      first_name: string;
      email: string;
      occupation: string;
      purpose: string;
      birth_date: string;
      sex: 'man' | 'woman';
      address: string;
      profile_image: string | null;
    };
  }>('/api/v1/student/edit', fetcher, {
    revalidateOnFocus: false,
  });

  const student: Student | undefined = data?.data
    ? {
        studentId: data?.data.studnet_id,
        nickName: data?.data.nick_name,
        lastName: data?.data.last_name,
        firstName: data?.data.first_name,
        email: data?.data.email,
        occupation: data?.data.occupation,
        purpose: data?.data.purpose,
        birthDate: data?.data.birth_date,
        sex: data?.data.sex,
        address: data?.data.address,
        profileImage: data?.data.profile_image,
      }
    : undefined;

  return {
    student,
    isLoading,
    error,
    mutate,
  };
};
