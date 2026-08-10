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
} as const;
