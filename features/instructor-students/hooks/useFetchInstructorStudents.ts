import { Student } from '@/features/student/types/Student';
import { fetcher } from '@/lib/Fetcher';
import { useState } from 'react';
import useSWR from 'swr';

type Params = {
  per_page: number;
  page: number;
  sort_by: 'nick_name' | 'email' | 'last_login_at' | 'attendanced_at';
  order: string;
  input_text?: string;
  start_date?: string;
  end_date?: string;
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
  const { per_page, page, sort_by, order, input_text, start_date, end_date} = params
  const searchParams = new URLSearchParams();
  searchParams.append('per_page', String(per_page));
  searchParams.append('page', String(page));
  searchParams.append('sort_by', sort_by);
  searchParams.append('order', order);
  if (input_text) {
    searchParams.append('input_text', input_text);
  }
  if (start_date) {
    searchParams.append('start_date', `${start_date} 00:00:00`); // YYYY-MM-DD HH:MM:SS形式
  }
  if (end_date) {
    searchParams.append('end_date', `${end_date} 23:59:59`); // YYYY-MM-DD HH:MM:SS形式
  }
  
  return courseId
    ? `/api/v1/instructor/course/${courseId}/student/index?${searchParams}`
    : null;
};
