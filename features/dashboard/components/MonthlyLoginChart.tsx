import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFetchCourseAttendance } from '../hooks/useFetchCourseAttendance';
import LoginPieChart from './LoginPieChart';

interface Props {
  courseId: number;
}

export default function MonthlyLoginChart({ courseId }: Props) {
  const { loginRate } = useFetchCourseAttendance({ courseId, type: 'month' });

  const loginRateValue = loginRate ?? 0;

  return <LoginPieChart title="直近30日間" loginRateValue={loginRateValue} />;
}
