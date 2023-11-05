import { Axios } from '@/lib/api';
import { Chapter } from '@/features/chapter/types/Chapter';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import useSWR from 'swr';

type Data = {
  attendance_id: number;
  progress: number;
  course: {
    course_id: number;
    title: string;
    image: string;
    instructor: {
      instructor_id: number;
      nick_name: string;
      last_name: string;
      first_name: string;
      email: string;
    };
    chapter: {
      chapter_id: number;
      title: string;
      lessons: {
        lesson_id: number;
        title: string;
        url: string;
        remarks: string;
        lesson_attendance: {
          lesson_attendance_id: number;
          status: string;
        }[];
      };
    };
  };
};

type Args = {
  attendanceId: string | undefined;
  chapterId: string | undefined;
};

export const useFetchChapter = ({ attendanceId, chapterId }: Args) => {
  const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
  const { data: chapter, mutate } = useSWR<Data | null>(
    // テスト表示のためURL仮指定
    '/api/v1/attendance/1/course/1/chapter/2',
    fetcher
  );

  return [chapter?.data, mutate] as const;
};
