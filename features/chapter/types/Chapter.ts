export type Chapter = {
  chapter_id: number;
  title: string;
  status: CHAPTER_STATUS;
};

export const CHAPTER_STATUS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
} as const;

export type CHAPTER_STATUS =
  (typeof CHAPTER_STATUS)[keyof typeof CHAPTER_STATUS];
