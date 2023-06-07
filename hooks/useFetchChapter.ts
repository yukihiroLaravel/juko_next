import { Axios } from '@/lib/api';
import { Chapter } from '@/types/Chapter';
import { Lesson } from '@/types/Lesson';
import { LessonAttendance } from '@/types/LessonAttendance';
import { useEffect, useState } from 'react';

type Data = Chapter & {
  lessons: (Lesson & {
    lessonAttendance: LessonAttendance;
  })[];
};

type Args = {
  attendanceId: string | undefined;
  chapterId: string | undefined;
};

export const useFetchChapter = ({ attendanceId, chapterId }: Args) => {
  const [chapter, setChapter] = useState<Data | null>(null);

  useEffect(() => {
    if (attendanceId === undefined || chapterId === undefined) return;
    Axios.get('/api/v1/course/chapter?attendance_id=' + attendanceId + '&chapter_id=' + chapterId).then((res) => {
      setChapter(res.data.data);
    });
  }, [attendanceId, chapterId]);

  return [chapter as Data] as const;
};
