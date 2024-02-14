import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import AttendanceStatusCard from '@/features/dashboard/components/AttendanceStatusCard';
import Card from '@/features/dashboard/components/Card';
import CourseDashboard from '@/features/dashboard/components/CourseDashboard';
import CourseTagList from '@/features/dashboard/components/CourseTagList';
import LoginPieChart from '@/features/dashboard/components/LoginPieChart';
import MainContainer from '@/features/dashboard/components/MainContainer';

export default function Dashboard() {
  return (
    <main className="h-full min-h-screen">
      <InstructorHeader />
      <CourseDashboard>
        <CourseTagList />
        <MainContainer>
          <div className="my-4">
            <h2 className="text-xl font-bold">受講状況</h2>
          </div>
          <AttendanceStatusCard />
          <div className="my-4">
            <h2 className="text-xl font-bold">受講生ログイン率</h2>
          </div>
          <Card>
            {Array.from({ length: 3 }).map((_, index) => (
              <LoginPieChart key={index} />
            ))}
          </Card>
        </MainContainer>
      </CourseDashboard>
    </main>
  );
}
