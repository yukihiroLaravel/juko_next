import { format } from 'date-fns';

/**
 * 'yyyy-MM-dd' を含む文字列をローカルタイムの Date に変換する。
 *
 * `new Date('yyyy-MM-dd')` は UTC 深夜として解釈されるため、UTC からずれた
 * タイムゾーンでは日付が前後にずれてしまう。これを避けるため、先頭の
 * 日付部分(yyyy-MM-dd)を取り出してローカルタイムの Date を生成する。
 */
export function parseInputDate(value?: string): Date | undefined {
  if (!value) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return undefined;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? undefined : date;
}

/** Date をフォーム入力用の 'yyyy-MM-dd'（ローカル）に変換する。 */
export function formatInputDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/** API 等の日付文字列をフォーム入力用の 'yyyy-MM-dd' に正規化する（不正値は ''）。 */
export function toInputDate(value?: string): string {
  const date = parseInputDate(value);
  return date ? formatInputDate(date) : '';
}
