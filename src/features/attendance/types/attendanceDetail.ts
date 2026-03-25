export type Lesson = {
  lesson_id: string;
  title: string;
  is_completed: boolean;
};

export type Chapter = {
  chapter_id: string;
  title: string;
  lessons: Lesson[];
};