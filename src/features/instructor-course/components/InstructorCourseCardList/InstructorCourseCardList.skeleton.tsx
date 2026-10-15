import { Skeleton } from '@/components/atoms/Skeleton';

export function InstructorCourseCardListSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-3 rounded-lg border p-4">
          <Skeleton className="h-40 w-full rounded" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-full" />
        </div>
      ))}
    </div>
  );
}
