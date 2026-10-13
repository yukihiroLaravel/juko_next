const INSTRUCTOR_TAGS_KEY_PREFIX = '/api/v1/instructor/tags';

export function instructorTagKey(tagId: string) {
  return tagId ? `${INSTRUCTOR_TAGS_KEY_PREFIX}/${tagId}` : null;
}

// 講座分類のデータ(一覧・プルダウン・編集画面)の名前かどうか
export function isInstructorTagsKey(key: unknown): boolean {
  return typeof key === 'string' && key.startsWith(INSTRUCTOR_TAGS_KEY_PREFIX);
}
