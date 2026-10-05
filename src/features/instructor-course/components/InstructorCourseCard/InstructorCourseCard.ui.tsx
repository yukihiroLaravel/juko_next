import { Card } from '@/components/atoms/Card';

type InstructorCourseCardUIProps = {
  title: string;
  deadline: string | null;
  isInProgress: boolean;
  currentStudents: number;
  capacity: number | null;
  isFull: boolean;
  tags: string[];
};

export function InstructorCourseCardUI({
  title,
  deadline,
  isInProgress,
  currentStudents,
  capacity,
  isFull,
  tags,
}: InstructorCourseCardUIProps) {
  return (
    <Card className="overflow-hidden rounded-md border bg-white p-0 hover:opacity-80">
      <div
        aria-label={`${title}のサムネイル`}
        role="img"
        className="flex aspect-[16/9] items-center justify-center bg-gray-200"
      >
        <span className="text-sm font-semibold">サムネイル</span>
      </div>
      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold">{title}</p>
          {deadline && (
            <span className="shrink-0 text-xs text-gray-600">{deadline}</span>
          )}
        </div>
        {isInProgress && (
          <span className="inline-block rounded bg-green-100 px-2 py-1 text-xs">
            受講中
          </span>
        )}
        {capacity !== null && (
          <p
            className={`text-sm ${isFull ? 'font-semibold text-red-600' : 'text-gray-700'}`}
          >
            定員：{currentStudents}／{capacity}
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="rounded bg-gray-100 px-2 py-1 text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
