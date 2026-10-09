import { CourseForm } from '@/features/instructor-course/components/CourseForm/CourseForm';

type Props = { params: Promise<{ courseId: string }> };

export default async function EditInstructorCoursePage({ params }: Props) {
  const { courseId } = await params;
  return <CourseForm mode="edit" courseId={courseId} />;
}
