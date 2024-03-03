import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';
import { useFetchProgress } from '../hooks/useFetchProgress';
import { Button } from '@/components/atoms/Button/Button';
import Link from 'next/link';

type Props = {
  attendanceId: string | string[] | undefined;
  courseId: number;
};

export const CourseProgressCard: React.FC<Props> = ({
  attendanceId,
  courseId,
}) => {
  const { data: progress } = useFetchProgress({
    attendanceId: Number(attendanceId),
  });

  const numberOfTotalChapters = progress?.number_of_total_chapters ?? 0;
  const numberOfCompletedChapters = progress?.number_of_completed_chapters ?? 0;
  const uncopletedChapters = numberOfTotalChapters - numberOfCompletedChapters;

  // 進捗率
  const chapterProgress =
    numberOfCompletedChapters !== 0
      ? Math.round((numberOfCompletedChapters / numberOfTotalChapters) * 100)
      : 0;

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

  const label = ({
    name,
    value,
    x,
    y,
  }: {
    name: string;
    value: string;
    x: number;
    y: number;
  }) => {
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
      <h2 className="text-xl font-semibold md:text-2xl">進捗</h2>
      <div className="mt-2 hidden rounded bg-yellow-100 md:block">
        <div className="mb-4 flex items-center justify-between">
          <div className="p-3">
            <div className="mt-3">
              <p className="text-center text-4xl text-blue-600">
                {chapterProgress}%完了
              </p>
            </div>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#00A5D4"
                label={label}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="p-3">
            <div className="text-center">
              <p className="text-5xl">完了チャプター数</p>
              <div className="mt-5">
                <span className="text-7xl">
                  {progress?.number_of_completed_chapters}
                </span>
                <span className="text-5xl">
                  {' '}
                  / {progress?.number_of_total_chapters}
                </span>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p className="text-5xl">
                完了レッスン数 {progress?.number_of_completed_lessons} /{' '}
                {progress?.number_of_total_lessons}
              </p>
            </div>
          </div>
          <div className="p-5">
            {progress?.continue_lesson_id && (
              <Button size="lg">続きからはじめる</Button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 rounded bg-yellow-100  md:hidden">
        <div className="p-3">
          <div>
            <p className="text-center text-2xl text-blue-600">
              {chapterProgress}%完了
            </p>
          </div>
          <ResponsiveContainer width="95%" height={300}>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#00A5D4"
                label={label}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="p-3">
          <div className="text-center">
            <p className="text-2xl">完了チャプター数</p>
            <p className="text-xl">
              {progress?.number_of_completed_chapters} /{' '}
              {progress?.number_of_total_chapters}
            </p>
          </div>
          <div className="mt-3 text-center">
            <p className="text-2xl">完了レッスン数</p>
            <p className="text-xl">
              {progress?.number_of_completed_lessons} /{' '}
              {progress?.number_of_total_lessons}
            </p>
          </div>
        </div>
        <div className="p-5 text-center">
          {progress?.continue_lesson_id && (
            <Link
              href={{
                pathname: '/student/chapter',
                query: {
                  attendanceId,
                  courseId: courseId,
                  lessonIndex: progress?.continue_lesson_id,
                },
              }}
              as={`/studet/chapter?attendanceId=${attendanceId}&courseId=${courseId}`}
            >
              <Button size="lg">続きからはじめる</Button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
