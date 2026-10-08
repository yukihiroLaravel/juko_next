export const routes = {
  attendance: {
    /** 講座一覧 */
    list: () => '/attendance',
    /** 講座詳細（チャプター＆レッスン一覧） */
    detail: (attendanceId: string | number) =>
      `/attendance/${encodeURIComponent(attendanceId)}`,
    /** レッスン */
    lesson: (attendanceId: string | number, lessonId: string | number) =>
      `/attendance/${encodeURIComponent(attendanceId)}/lessons/${encodeURIComponent(lessonId)}`,
  },

  instructor: {
    courses: {
      /** 講座一覧 */
      list: () => '/instructor/courses',
      /** 講座編集 */
      edit: (courseId: string | number) =>
        `/instructor/courses/${encodeURIComponent(courseId)}/edit`,
      /** 講座登録 */
      create: () => '/instructor/courses/create',
      /** 受講期限一括変更 */
      bulkDeadline: (courseIds: Array<string | number>) =>
        `/instructor/courses/deadline?course_ids=${courseIds.map(encodeURIComponent).join(',')}`,
      /** 定員一括変更 */
      bulkCapacity: (courseIds: Array<string | number>) =>
        `/instructor/courses/capacity?course_ids=${courseIds.map(encodeURIComponent).join(',')}`,
    },
    tags: {
      /** 講座分類登録 */
      create: () => '/instructor/tags/new',
      /** 講座分類編集 */
      edit: (tagId: string | number) =>
        `/instructor/tags/${encodeURIComponent(tagId)}/edit`,
    },
  },
} as const;
