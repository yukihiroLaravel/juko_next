import { useFetchCourseAttendance } from '../hooks/useFetchCourseAttendance';
import LoginPieChart from './LoginPieChart';

interface Props {
  courseId: number;
}

export default function YearlyLoginChart({ courseId }: Props) {
  const { loginRate } = useFetchCourseAttendance({ courseId, type: 'year' });

  const loginRateValue = loginRate ?? 0;

  return <LoginPieChart title="直近1年間" loginRateValue={loginRateValue} />;
}
