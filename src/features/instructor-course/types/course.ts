export type Course = {
  id: number;
  title: string;
  deadline: string | null;
  isInProgress: boolean;
  currentStudents: number;
  capacity: number | null;
  tags: string[];
};
