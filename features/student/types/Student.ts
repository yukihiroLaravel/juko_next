export type Student = {
  student_id: number;
  nick_name: string;
  last_name: string;
  first_name: string;
  email: string;
  occupation: string;
  purpose: string;
  birth_date: string;
  sex: 'man' | 'woman';
  address: string;
  profile_image: string | null;
  last_login_at: string;
  attendanced_at: string;
};
