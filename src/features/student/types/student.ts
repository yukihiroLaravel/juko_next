export type Student = {
  student_id: string;
  nick_name: string;
  last_name: string;
  first_name: string;
  email: string;
  occupation: string;
  purpose: string;
  birth_date: string;
  gender: string;
  address: string;
  profile_image: string;
};

export type StudentResponse = {
  data: Student;
};
