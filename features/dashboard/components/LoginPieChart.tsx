import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  title: string;
  loginRateValue: number;
}

export default function LoginPieChart({ title, loginRateValue }: Props) {
  const notLoginRateValue = 100 - loginRateValue;

  const data = [
    { name: 'ログイン', value: loginRateValue },
    { name: '未ログイン', value: notLoginRateValue },
  ];

  const COLORS = ['#00A5D4', '#b0b0b0'];

  return (
    <div className="h-64 w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-center">{title}</h2>
          <p className="text-2xl">{loginRateValue}%</p>
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
