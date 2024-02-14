import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import CourseDashboard from '@/features/instructor/components/CourseDashboard';
import CourseTagList from '@/features/instructor/components/CourseTagList';

export default function Dashboard() {
  return (
    <main>
      <InstructorHeader />
      <CourseDashboard>
        <CourseTagList />
      </CourseDashboard>
    </main>
  );
}
