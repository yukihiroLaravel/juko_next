import { Button } from '@/components/atoms/Button';
import type { Course } from '../../types/course';
import { InstructorCourseCard } from '../InstructorCourseCard/InstructorCourseCard';

type InstructorCourseCardListUIProps = {
  courses: Course[];
  groupedCourses: Array<{ tag: string; courses: Course[] }>;
  isClassificationEnabled: boolean;
  selectedCourseIds: number[];
  onCourseSelectionChange: (courseId: number, checked: boolean) => void;
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
};

export function InstructorCourseCardListUI({
  courses,
  groupedCourses,
  isClassificationEnabled,
  selectedCourseIds,
  onCourseSelectionChange,
  currentPage,
  lastPage,
  onPageChange,
}: InstructorCourseCardListUIProps) {
  const pageNumbers = Array.from({ length: lastPage }, (_, index) => index + 1);

  const renderCards = (items: Course[]) => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((course) => (
        <InstructorCourseCard
          key={course.id}
          {...course}
          isSelected={selectedCourseIds.includes(course.id)}
          onSelectionChange={onCourseSelectionChange}
        />
      ))}
    </div>
  );

  if (courses.length === 0) {
    return (
      <p className="text-muted-foreground py-12 text-center">
        該当する講座はありません。
      </p>
    );
  }

  return (
    <>
      {isClassificationEnabled ? (
        <div className="space-y-8">
          {groupedCourses.map(({ tag, courses: tagCourses }, index) => (
            <section key={tag} aria-labelledby={`course-tag-${index}`}>
              <h2
                id={`course-tag-${index}`}
                className="mb-4 text-xl font-semibold"
              >
                {tag}
              </h2>

              {renderCards(tagCourses)}
            </section>
          ))}
        </div>
      ) : (
        renderCards(courses)
      )}

      <nav
        aria-label="ページネーション"
        className="flex items-center justify-center gap-2 pt-4"
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          前へ
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'secondary' : 'outline'}
            size="sm"
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage >= lastPage}
          onClick={() => onPageChange(Math.min(lastPage, currentPage + 1))}
        >
          次へ
        </Button>
      </nav>
    </>
  );
}
