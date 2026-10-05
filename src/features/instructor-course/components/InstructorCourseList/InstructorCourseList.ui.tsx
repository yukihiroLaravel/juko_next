import type { ReactNode } from 'react';
import { Button } from '@/components/atoms/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/atoms/DropdownMenu';
import { Input } from '@/components/atoms/Input';
import { Switch } from '@/components/atoms/Switch';
import { bulkActionLabels, type BulkAction } from '../../types/bulkAction';
import type { Course } from '../../types/course';
import { InstructorCourseCard } from '../InstructorCourseCard/InstructorCourseCard';

type InstructorCourseListUIProps = {
  courses: Course[];
  searchKeyword: string;
  onSearchKeywordChange: (value: string) => void;
  isClassificationEnabled: boolean;
  onClassificationChange: (checked: boolean) => void;
  selectedCourseIds: number[];
  onCourseSelectionChange: (courseId: number, checked: boolean) => void;
  onBulkAction: (action: BulkAction) => void;
  onRegister: () => void;
  groupedCourses: Array<{ tag: string; courses: Course[] }>;
  hasVisibleSelection: boolean;
  children?: ReactNode;
};

export function InstructorCourseListUI({
  courses,
  searchKeyword,
  onSearchKeywordChange,
  isClassificationEnabled,
  onClassificationChange,
  selectedCourseIds,
  onCourseSelectionChange,
  onBulkAction,
  onRegister,
  groupedCourses,
  hasVisibleSelection,
  children,
}: InstructorCourseListUIProps) {
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

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">講座一覧</h1>
        <Button onClick={onRegister}>講座を登録</Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Input
          aria-label="講座検索"
          className="max-w-md"
          placeholder="講座名で検索"
          type="search"
          value={searchKeyword}
          onChange={(event) => onSearchKeywordChange(event.target.value)}
        />

        <label className="flex items-center gap-2 text-sm">
          <Switch
            checked={isClassificationEnabled}
            onCheckedChange={onClassificationChange}
          />
          分類表示
        </label>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">一括変更</Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('publish')}
            >
              {bulkActionLabels.publish}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('unpublish')}
            >
              {bulkActionLabels.unpublish}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('clearDeadline')}
            >
              {bulkActionLabels.clearDeadline}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('delete')}
            >
              {bulkActionLabels.delete}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('deadline')}
            >
              {bulkActionLabels.deadline}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('clearCapacity')}
            >
              {bulkActionLabels.clearCapacity}
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={!hasVisibleSelection}
              onSelect={() => onBulkAction('capacity')}
            >
              {bulkActionLabels.capacity}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {courses.length === 0 ? (
        <p className="text-muted-foreground py-12 text-center">
          該当する講座はありません。
        </p>
      ) : isClassificationEnabled ? (
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
        <Button variant="outline" size="sm" disabled>
          前へ
        </Button>

        <Button variant="secondary" size="sm" aria-current="page">
          1
        </Button>

        <Button variant="outline" size="sm">
          2
        </Button>

        <Button variant="outline" size="sm">
          次へ
        </Button>
      </nav>

      {children}
    </div>
  );
}
