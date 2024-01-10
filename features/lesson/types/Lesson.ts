export type Lesson = {
  lesson_id: number;
  remarks: string;
  title: string;
  url: string;
  status: LESSON_STATUS;
};

export const LESSON_STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export type LESSON_STATUS = typeof LESSON_STATUS[keyof typeof LESSON_STATUS];
