import { Axios } from '@/lib/api';
import { Chapter } from '@/features/chapter/types/Chapter';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { Instructor } from '@/features/instructor/types/Instructor';
import { Course } from '@/features/course/types/Course';
import { fetcher } from '@/lib/Fetcher';
import useSWR from 'swr';

type Data = {
  data: {
    attendance_id: number;
    progress: number;
    course: Course & {
      instructor: Instructor;
      chapter: Chapter & {
        lessons: (Lesson & {
          lessonAttendance: LessonAttendance;
        })[];
      };
    };
  };
};

type Args = {
  attendanceId: string | undefined;
  courseId: string | undefined;
  chapterId: string | undefined;
};

export const useFetchChapter = ({ attendanceId, courseId, chapterId }: Args) => {
  const fetcher = (url: string) => Axios.get(url).then((res) => res.data);
  const { data: attendance, mutate } = useSWR<Data | null>(
    attendanceId && courseId && chapterId
      ? `/api/v1/attendance/${attendanceId}/course/${courseId}/chapter/${chapterId}`
      : null,
    fetcher
  );

  return [attendance?.data, mutate] as const;
};
