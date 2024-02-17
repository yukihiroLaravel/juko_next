import { InstructorHeader } from '@/components/layouts/InstructorHeader';
import { Course } from '@/features/course/types/Course';
import AttendanceStatusCard from '@/features/dashboard/components/AttendanceStatusCard';
import Card from '@/features/dashboard/components/Card';
import CourseDashboard from '@/features/dashboard/components/CourseDashboard';
import CourseTabList from '@/features/dashboard/components/CourseTabList';
import MainContainer from '@/features/dashboard/components/MainContainer';
import MonthlyLoginChart from '@/features/dashboard/components/MonthlyLoginChart';
import WeeklyLoginChart from '@/features/dashboard/components/WeeklyLoginChart';
import YearlyLoginChart from '@/features/dashboard/components/YearlyLoginChart';
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
        <CourseTabList
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
            {selectedCourse && (
              <WeeklyLoginChart courseId={selectedCourse.course_id} />
            )}
            {selectedCourse && (
              <MonthlyLoginChart courseId={selectedCourse.course_id} />
            )}
            {selectedCourse && (
              <YearlyLoginChart courseId={selectedCourse.course_id} />
            )}
          </Card>
        </MainContainer>
      </CourseDashboard>
    </main>
  );
}
