export type Student = {
  studentId: number;
  nickName: string;
  lastName: string;
  firstName: string;
  email: string;
  occupation: string;
  purpose: string;
  birthDate: string;
  sex: 'man' | 'woman';
  address: string;
  profileImage: string | null;
};
