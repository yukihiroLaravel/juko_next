import { Axios } from '@/lib/api';
import { Chapter } from '@/types/Chapter';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import useSWR from 'swr';

type Data = Chapter & {
  lessons: (Lesson & {
    lessonAttendance: LessonAttendance;
  })[];
  data: Data;
};

type Args = {
  attendanceId: string | undefined;
  chapterId: string | undefined;
};

export const useFetchChapter = ({ attendanceId, chapterId }: Args) => {
  const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
  const { data: chapter, mutate } = useSWR<Data | null>(
    '/api/v1/course/chapter?attendance_id=' + attendanceId + '&chapter_id=' + chapterId,
    fetcher
  );

  return [chapter?.data, mutate] as const;
};
