import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from './Card';
import { useFetchAttendanceStatus } from '@/features/attendance/hooks/useFetchAttendanceStatus';

interface Props {
  courseId: number | undefined;
}

export default function AttendanceStatusCard({ courseId }: Props) {
  const { attendanceStatus } = useFetchAttendanceStatus({ courseId });

  const data = attendanceStatus?.chapters.map((chapter) => ({
    label: chapter.title,
    value: chapter.completed_count,
  }));

  return (
    <Card>
      <div className="flex flex-col justify-center sm:w-1/3">
        <p className="text-center text-lg">受講人数</p>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-6xl font-bold">
            {attendanceStatus?.students_count}
          </p>
          <p className="ml-2 text-2xl">人</p>
        </div>
      </div>
      <div className="sm:w-2/3">
        <p className="text-lg">チャプターごとの完了人数</p>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart layout="vertical" data={data}>
              <XAxis
                type="number"
                tick={{ fontSize: '0.8rem' }}
                label={{
                  value: '人数',
                  position: 'insideBottomRight',
                  offset: 0,
                  fontSize: '0.8rem',
                }}
              />
              <YAxis
                dataKey="label"
                type="category"
                tickFormatter={(value) => {
                  return value.length > 3 ? `${value.slice(0, 3)}...` : value;
                }}
                tick={{
                  fontSize: '0.8rem',
                }}
              />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  return (
                    <div className="rounded-lg bg-white p-2 shadow-md">
                      <p>{payload[0]?.payload.label}</p>
                      <p>{payload[0]?.payload.value}人</p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="value" fill="#00A5D4" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
