"use client";

import { useForm } from "react-hook-form";
import { StudentSignupFormUI } from "./StudentSignupForm.ui";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  studentSignupSchema,
  StudentSignupSchema,
} from "@/features/auth/validation/Student/StudentSignupSchema";

export function StudentSignupForm() {
  const form = useForm<StudentSignupSchema>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: {
      userName: "",
      lastName: "",
      firstName: "",
      email: "",
      occupation: "",
      purpose: "",
      birthday: "",
      gender: undefined,
      address: "",
    },
  });

  const onSubmit = (data: StudentSignupSchema) => {
    console.log("submit data:", data);
  };
  const onError = (errors: any) => {
    console.log("submit errors:", errors);
  };

  return (
    <StudentSignupFormUI
      form={form}
      onSubmit={onSubmit}
      onError={onError}
    />
  );
}