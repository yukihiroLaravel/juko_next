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
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 0, right: 10, left: 30, bottom: 35 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: '1.2rem' }}
                tickFormatter={(value) => {
                  // 小数は表示しない
                  if (value % 1 !== 0) return '';
                  return value;
                }}
                label={{
                  value: '人数',
                  position: 'insideBottomRight',
                  offset: -10,
                }}
              />
              <YAxis
                dataKey="label"
                type="category"
                tickFormatter={(value) => {
                  // ラベルが長い場合は省略
                  if (value.length > 6) return `${value.slice(0, 6)}...`;
                  return value;
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
