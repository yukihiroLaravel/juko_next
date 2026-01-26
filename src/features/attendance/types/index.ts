export type Lesson = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type Chapter = {
  id: string;
  title: string;
  lessons: Lesson[];
};