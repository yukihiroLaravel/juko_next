export function instructorTagKey(tagId: string) {
  return tagId ? `/api/v1/instructor/tags/${tagId}` : null;
}
