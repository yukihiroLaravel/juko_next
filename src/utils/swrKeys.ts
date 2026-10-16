// ドメインをまたいで使う SWR のキーを置く（別のドメインの features/ を参照しないため）

const INSTRUCTOR_COURSES_KEY_PREFIX = '/api/v1/instructor/courses/index';

// 講師側の講座一覧のデータの名前かどうか。講座分類の更新のあとに取り直すために使う
export function isInstructorCoursesKey(key: unknown): boolean {
  return (
    typeof key === 'string' && key.startsWith(INSTRUCTOR_COURSES_KEY_PREFIX)
  );
}
