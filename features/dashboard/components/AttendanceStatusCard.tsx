import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function AttendanceStatusCard() {
  const chapters = [
    { label: 'チャプター1', value: 10 },
    { label: 'チャプター2', value: 5 },
    { label: 'チャプター3', value: 7 },
    { label: 'チャプター4', value: 3 },
    { label: 'チャプター5', value: 8 },
  ];

  const data = chapters.map((chapter, index) => ({
    label: chapter.label,
    value: chapter.value,
  }));

  return (
    <div className="flex w-full rounded-lg border border-gray-200 bg-[#FFFDE9] p-4 shadow-md">
      <div className="flex w-1/3 flex-col justify-center">
        <p className="text-center text-lg">受講人数</p>
        <div className="mt-4 flex items-center justify-center">
          <p className="text-6xl font-bold">10</p>
          <p className="ml-2 text-2xl">人</p>
        </div>
      </div>
      <div className="w-2/3">
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
    </div>
  );
}
