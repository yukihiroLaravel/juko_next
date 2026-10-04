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

  instructorTag: {
      /** 講座分類登録 */
      create: () => '/instructor/tags/new',
      /** 講座分類編集 */
      edit: (tagId: string | number) =>
        `/instructor/tags/${encodeURIComponent(tagId)}/edit`,
  },
} as const;