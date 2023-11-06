import { Axios } from '@/lib/api';
import { Chapter } from '@/features/chapter/types/Chapter';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { Instructor } from '@/features/Instructor/types/Instructor';
import { Course } from '@/features/Course/types/Course';
import useSWR from 'swr';

type Data = {
  attendance_id: number;
  progress: number;
  course: (Course & {
    instructor: (Instructor & {
    chapter: (Chapter & {
      lessons: (Lesson & {
        lessonAttendance: LessonAttendance;
        })[];
      });
    });
  });
};

type Args = {
  attendanceId: string | undefined;
  chapterId: string | undefined;
};

export const useFetchChapter = ({ attendanceId, chapterId }: Args) => {
  const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
  const { data: attendance, mutate } = useSWR<Data | null>(
    // テスト表示のためURL仮指定
    '/api/v1/attendance/1/course/1/chapter/2',
    fetcher
  );

  return [attendance?.data, mutate] as const;
};
