import { useFetchCourseAttendance } from '../hooks/useFetchCourseAttendance';
import LoginPieChart from './LoginPieChart';

interface Props {
  courseId: number;
}

export default function WeeklyLoginChart({ courseId }: Props) {
  const { loginRate } = useFetchCourseAttendance({ courseId, type: 'week' });

  const loginRateValue = loginRate ?? 0;

  return <LoginPieChart title="直近7日間" loginRateValue={loginRateValue} />;
}
