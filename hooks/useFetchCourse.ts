import { Chapter } from '@/features/chapter/types/Chapter';
import { Course } from '@/features/course/types/Course';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { Instructor } from '@/features/instructor/types/Instructor';
import { Attendance } from '@/features/attendance/types/Attendance';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Data = {
  data: Attendance & {
    course: Course & {
      instructor: Instructor;
      chapters: (Chapter & {
        lessons: (Lesson & {
          lessonAttendance: LessonAttendance;
        })[];
      })[];
    };
  };
};

type Args = {
  attendanceId: string | string[] | undefined;
};

export const useFetchCourse = ({ attendanceId }: Args) => {
  const shouldFetch = attendanceId !== undefined;
  const fetchUrl = shouldFetch ? `/api/v1/attendance/${attendanceId}` : null;
  const { data: attendance, isLoading, error } = useSWR<Data>(fetchUrl, fetcher);

  return {
    attendance: attendance?.data,
    isLoading,
    error,
  };
};
