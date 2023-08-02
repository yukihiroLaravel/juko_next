import { Axios } from '@/lib/api';
import { Chapter } from '@/types/Chapter';
import { Course } from '@/features/course/types/Course';
import { Lesson } from '@/features/lesson/types/Lesson';
import { LessonAttendance } from '@/features/lessonAttendance/types/LessonAttendance';
import { useEffect, useState } from 'react';
import { Instructor } from '@/types/Instructor';
import { Attendance } from '@/types/Attendance';

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
  attendanceId: number;
};

export const useFetchCourse = ({ attendanceId }: Args) => {
  const [course, setCourse] = useState<Data | null>(null);

  useEffect(() => {
    Axios.get('/api/v1/course?attendance_id=' + attendanceId).then((res) => {
      setCourse(res.data.data);
    });
  }, [attendanceId]);

  return [course as Data] as const;
};
