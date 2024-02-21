import { Student } from '@/features/student/types/Student';
import { fetcher } from '@/lib/Fetcher';
import { useState } from 'react';
import useSWR from 'swr';

type Params = {
  per_page: number;
  page: number;
  sort_by: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
  order: string;
};

type Args = {
  courseId: string | undefined;
};

export const useFetchInstructorStudents = ({ courseId }: Args) => {
  const [params, setParams] = useState<Params>({
    per_page: 10,
    page: 1,
    sort_by: 'nick_name',
    order: 'desc',
  });

  const updateParams = (newParams: Partial<Params>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
    }));
  };

  const fetchUrl = courseId ? getFetchUrl(courseId, params) : null;

  const { data, isLoading, error, mutate } = useSWR<{
    data: {
      students: Student[];
      pagination: {
        page: number;
        total: number;
      };
    };
  }>(fetchUrl, fetcher, {
    revalidateOnFocus: false,
  });

  return {
    students: data?.data.students,
    pagination: data?.data.pagination,
    params,
    updateParams,
    isLoading,
    error,
    mutate,
  };
};

const getFetchUrl = (
  courseId: string | string[] | undefined,
  params: Params
) => {
  return courseId
    ? `/api/v1/instructor/course/${courseId}/student/index?${new URLSearchParams(
        params as any
      )}`
    : null;
};
