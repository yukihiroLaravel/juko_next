import { Axios } from '@/lib/api';

/**
 * SWR 用の共通 fetcher
 * Axios を利用して GET リクエストを行い、response.data を返す
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await Axios.get<T>(url);
  return res.data;
};