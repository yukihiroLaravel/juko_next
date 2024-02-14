import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function LoginPieChart() {
  const data = [
    { name: 'ログイン', value: 80 },
    { name: '未ログイン', value: 20 },
  ];

  const COLORS = ['#00A5D4', '#E5E5E5'];

  return (
    <div className="h-64 w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-center">Your Chart Title</h2>
          <p className="text-2xl">80%</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
