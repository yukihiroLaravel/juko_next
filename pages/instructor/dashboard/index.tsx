import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { Course } from '@/features/course/types/Course';
import AttendanceStatusCard from '@/features/dashboard/components/AttendanceStatusCard';
import Card from '@/features/dashboard/components/Card';
import CourseDashboard from '@/features/dashboard/components/CourseDashboard';
import CourseTagList from '@/features/dashboard/components/CourseTagList';
import LoginPieChart from '@/features/dashboard/components/LoginPieChart';
import MainContainer from '@/features/dashboard/components/MainContainer';
import { useState } from 'react';

export default function Dashboard() {
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>(
    undefined
  );
  const updateSelectedCourse = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <main className="h-full min-h-screen">
      <InstructorHeader />
      <CourseDashboard>
        <CourseTagList
          selectedCourse={selectedCourse}
          updateSelectedCourse={updateSelectedCourse}
        />
        <MainContainer>
          <div className="my-4">
            <h2 className="text-xl font-bold">受講状況</h2>
          </div>
          <AttendanceStatusCard courseId={selectedCourse?.course_id} />
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
