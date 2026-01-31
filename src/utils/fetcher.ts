import { Axios } from '@/lib/api';

/**
 * SWR 用の共通 fetcher
 * 指定された URL に GET リクエストを送り、レスポンスの data を返す
 */
export const fetcher = <T>(url: string): Promise<T> => {
  return Axios.get<T>(url).then((res) => res.data);
};