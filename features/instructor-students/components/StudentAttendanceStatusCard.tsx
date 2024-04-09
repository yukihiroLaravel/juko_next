import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import { useFetchAttendanceStatus } from '@/features/attendance/hooks/useFetchAttendanceStatus';
import { Typography } from '@/components/atoms/Typography';

interface Props {
  courseId: number | null;
  studentId: number | null;
}

//TODO:仮データ取得
const studentAttendanceStatus = {
  course_title: 'PHPコース',
  course_progress: 50,
  chapters: [
    { title: 'aaaa', chapter_progress: 30 },
    { title: 'bbbb', chapter_progress: 100 },
  ],
};

export const StudentAttendanceStatusCard: React.FC<Props> = ({ courseId }) => {
  const { attendanceStatus } = useFetchAttendanceStatus({ courseId });

  const data = studentAttendanceStatus.chapters.map((chapter) => ({
    label: chapter.title,
    value: chapter.chapter_progress,
  }));

  const chartWidth = 400;
  const renderCustomizedLabel = (props: any) => {
    const { y, value } = props;
    return (
      <text x={chartWidth - 30} y={y + 15} fill="#666" textAnchor="end">
        {`${value}％`}
      </text>
    );
  };

  return (
    <>
      <Typography variant="h3">学習状況</Typography>
      <div className="flex flex-col items-center rounded bg-yellow-100 sm:items-start">
        <div className="m-4 rounded-3xl bg-red-200 px-8 py-2 text-center text-xl">
          <strong>{studentAttendanceStatus.course_title}</strong>
        </div>
        <div className="flex w-full flex-col md:flex-row">
          <div className="mx-10 grow p-2">
            <p className="text-center text-lg">講座進捗</p>
            <div className="mt-4 flex items-center justify-center">
              <p className="text-6xl font-bold">
                {studentAttendanceStatus.course_progress}
              </p>
              <p className="ml-2 text-2xl">％</p>
            </div>
          </div>
          <div className="ml-2 min-w-0 shrink grow pt-2">
            <p className="text-lg">チャプター進捗</p>
            <div className="mt-4">
              <ResponsiveContainer width="90%" height={200}>
                <BarChart
                  layout="vertical"
                  data={data}
                  margin={{ top: 0, right: 60, left: 30, bottom: 35 }}
                >
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
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
                          <p>{payload[0]?.payload.value}％</p>
                        </div>
                      );
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#00A5D4"
                    barSize={20}
                    data={data}
                    background={{ fill: '#eee' }}
                  >
                    <LabelList
                      dataKey="value"
                      position="center"
                      content={renderCustomizedLabel}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
