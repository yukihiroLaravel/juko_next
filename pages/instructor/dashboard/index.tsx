import { InstructorLayout } from '@/components/organisms/header';
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
    <InstructorLayout>
      <CourseDashboard>
        <CourseTabList
          selectedCourse={selectedCourse}
          updateSelectedCourse={updateSelectedCourse}
        />
        <MainContainer>
          <div className="pt-5">
            <h2 className="text-xl font-bold">受講状況</h2>
            <AttendanceStatusCard courseId={selectedCourse?.course_id} />
          </div>
          <div className="pb-5">
            <h2 className="text-xl font-bold">受講生ログイン率</h2>
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
          </div>
        </MainContainer>
      </CourseDashboard>
    </InstructorLayout>
  );
}
