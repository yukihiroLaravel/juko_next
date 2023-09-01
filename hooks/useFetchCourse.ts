import { Axios } from '@/lib/api';
import { Chapter } from '@/features/chapter/types/Chapter';
import { Course } from '@/features/course/types/Course';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { Instructor } from '@/types/Instructor';
import { Attendance } from '@/features/attendance/types/Attendance';
import useSWR from 'swr';
import { fetcher } from '@/lib/Fetcher';

type Data = Course & {
  instructor: Instructor;
  attendance: Attendance;
  chapters: (Chapter & {
    lessons: (Lesson & {
      lessonAttendance: LessonAttendance;
    })[];
  })[];
};

type Args = {
  attendanceId: string | string[] | undefined;
};

export const useFetchCourse = ({ attendanceId }: Args) => {
  const shouldFetch = attendanceId !== undefined;
  const fetchUrl = shouldFetch ? `/api/v1/course?attendance_id=${attendanceId}` : null;
  const {
    data: course,
    isLoading,
    error,
  } = useSWR<{
    data: Data;
  }>(fetchUrl, fetcher);

  return {
    course: course?.data,
    isLoading,
    error,
  };
};
