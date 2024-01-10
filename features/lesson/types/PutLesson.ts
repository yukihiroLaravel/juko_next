import { Lesson } from './Lesson';

export type PutLesson = Pick<Lesson, 'remarks' | 'title' | 'url'> & {
  status: string;
};
