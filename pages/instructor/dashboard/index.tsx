import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import AttendanceStatusCard from '@/features/dashboard/components/AttendanceStatusCard';
import CourseDashboard from '@/features/dashboard/components/CourseDashboard';
import CourseTagList from '@/features/dashboard/components/CourseTagList';
import MainContainer from '@/features/dashboard/components/MainContainer';

export default function Dashboard() {
  return (
    <main>
      <InstructorHeader />
      <CourseDashboard>
        <CourseTagList />
        <MainContainer>
          <div className="my-4">
            <h2 className="text-xl font-bold">受講状況</h2>
          </div>
          <AttendanceStatusCard />
        </MainContainer>
      </CourseDashboard>
    </main>
  );
}
