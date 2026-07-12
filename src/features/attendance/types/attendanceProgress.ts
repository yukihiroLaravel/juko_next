export type ContinueFrom = {
  chapter_id: number;
  chapter_title: string;
  lesson_id: number;
  lesson_title: string;
};

export type AttendanceProgress = {
  attendance: {
    attendance_id: number;
    course: {
      course_id: number;
      title: string;
      image: string;
    };
  };
  number_of_completed_chapters: number;
  number_of_total_chapters: number;
  number_of_completed_lessons: number;
  number_of_total_lessons: number;
  /** 全レッスン完了時は null が返る */
  continue_from: ContinueFrom | null;
};

export type AttendanceProgressResponse = {
  data: AttendanceProgress;
};
