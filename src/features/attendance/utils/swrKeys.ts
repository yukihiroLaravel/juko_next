/**
 * 受講関連APIのSWRキー。
 * 未指定時に null を返すことで、SWR側のフェッチ停止条件を兼ねる。
 */
export function attendanceDetailKey(attendanceId: string) {
  return attendanceId ? `/api/v1/attendances/${attendanceId}` : null;
}

export function attendanceProgressKey(attendanceId: string) {
  return attendanceId ? `/api/v1/attendances/${attendanceId}/progress` : null;
}
