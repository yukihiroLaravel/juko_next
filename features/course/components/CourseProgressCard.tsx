import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';
import { useFetchProgress } from '../hooks/useFetchProgress';

type Props = {
  courseId: string | string[] | undefined;
};

export const CourseProgressCard: React.FC<Props> = ({ courseId }) => {
  const { data: progress } = useFetchProgress({ courseId });

  const numberOfTotalChapters = progress?.number_of_total_chapters ?? 0;
  const numberOfCompletedChapters = progress?.number_of_completed_chapters ?? 0;
  const uncopletedChapters = numberOfTotalChapters - numberOfCompletedChapters;

  // 進捗率
  const chapterProgress = Math.round((numberOfCompletedChapters / numberOfTotalChapters) * 100);

  const data = [
    {
      index: 1,
      name: '未完了',
      value: uncopletedChapters,
    },
    {
      index: 2,
      name: '完了',
      value: numberOfCompletedChapters,
    },
  ];

  const label = ({ name, value, cx, x, y }: { name: string; value: string; cx: number; x: number; y: number }) => {
    return (
      <>
        <Text x={x} y={y} fill="#2c2c2c">
          {name}
        </Text>
        <Text x={x} y={y} dominantBaseline="hanging" fill="#2c2c2c">
          {value}
        </Text>
      </>
    );
  };

  const COLORS = ['#e6e5e4', '#00A5D4'];

  return (
    <>
      <h2 className="font-semibold text-xl md:text-2xl">進捗</h2>
      <div className="bg-yellow-100 rounded mt-2 hidden md:block">
        <div className="flex justify-between items-center mb-4">
          <div className="p-3">
            <div>
              <p className="text-blue-600 text-center text-2xl">{chapterProgress}%完了</p>
            </div>
            <PieChart width={300} height={300}>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#00A5D4" label={label}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="p-3">
            <div className="text-center">
              <p className="text-4xl">完了チャプター数</p>
              <p className="text-3xl">
                {progress?.number_of_completed_chapters} / {progress?.number_of_total_chapters}
              </p>
            </div>
            <div className="text-center mt-3">
              <p className="text-4xl">完了レッスン数</p>
              <p className="text-3xl">
                {progress?.number_of_completed_lessons} / {progress?.number_of_total_lessons}
              </p>
            </div>
          </div>
          <div className="p-5">
            <button className="bg-blue-500 text-white rounded py-1 px-3">続きからはじめる</button>
          </div>
        </div>
      </div>
      <div className="bg-yellow-100 rounded mt-2  md:hidden">
        <div className="p-3">
          <div>
            <p className="text-blue-600 text-center text-2xl">{chapterProgress}%完了</p>
          </div>
          <ResponsiveContainer width="95%" height={300}>
            <PieChart width={300} height={300}>
              <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#00A5D4" label={label}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-3">
          <div className="text-center">
            <p className="text-2xl">完了チャプター数</p>
            <p className="text-xl">
              {progress?.number_of_completed_chapters} / {progress?.number_of_total_chapters}
            </p>
          </div>
          <div className="text-center mt-3">
            <p className="text-2xl">完了レッスン数</p>
            <p className="text-xl">
              {progress?.number_of_completed_lessons} / {progress?.number_of_total_lessons}
            </p>
          </div>
        </div>
        <div className="p-5 text-center">
          <button className="bg-blue-500 text-white rounded py-1 px-3 w-full">続きからはじめる</button>
        </div>
      </div>
    </>
  );
};
