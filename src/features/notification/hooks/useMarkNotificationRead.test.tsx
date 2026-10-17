import { act, renderHook } from '@testing-library/react';
import { AxiosError, AxiosHeaders } from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Axios } from '@/lib/api';
import { useMarkNotificationRead } from './useMarkNotificationRead';
import { notificationsKey } from '../utils/swrKeys';

const { mutate } = vi.hoisted(() => ({ mutate: vi.fn() }));
vi.mock('@/lib/api', () => ({ Axios: { post: vi.fn() } }));
vi.mock('swr', () => ({ useSWRConfig: () => ({ mutate }) }));

function httpError(status: number, data: unknown = {}) {
  return new AxiosError('失敗', undefined, undefined, undefined, {
    status,
    data,
    statusText: 'Error',
    headers: {},
    config: { headers: new AxiosHeaders() },
  });
}

beforeEach(() => {
  vi.mocked(Axios.post).mockReset();
  vi.mocked(Axios.post).mockResolvedValue({ data: { result: true } });
  mutate.mockReset();
  mutate.mockResolvedValue([]);
});

describe('お知らせの既読登録', () => {
  it('数値のお知らせIDを送信し、成功後に一覧の全条件を再検証する', async () => {
    // Arrange
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/notifications/mark-read', {
      notification_id: 7,
    });
    expect(response).toEqual({ success: true });
    expect(mutate).toHaveBeenCalledTimes(1);
    const matches = mutate.mock.calls[0][0];
    expect(
      matches(
        notificationsKey({
          page: 1,
          perPage: 5,
          sortBy: 'title',
          order: 'asc',
        }),
      ),
    ).toBe(true);
    expect(
      matches(
        notificationsKey({
          page: 2,
          perPage: 5,
          sortBy: 'start_date',
          order: 'desc',
        }),
      ),
    ).toBe(true);
    expect(matches('/api/v1/notifications/7')).toBe(false);
    expect(matches('/api/v1/students')).toBe(false);
    expect(matches(undefined)).toBe(false);
  });

  it('認証切れでは再ログインを促す結果を返し、再検証しない', async () => {
    // Arrange
    vi.mocked(Axios.post).mockRejectedValue(httpError(401));
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(response).toEqual({
      success: false,
      error: '認証の有効期限が切れました。再度ログインしてください',
    });
    expect(mutate).not.toHaveBeenCalled();
  });

  it('入力エラーでは返された理由を結果に含める', async () => {
    // Arrange
    vi.mocked(Axios.post).mockRejectedValue(
      httpError(422, {
        errors: { notification_id: ['指定されたお知らせが存在しません。'] },
      }),
    );
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(response).toEqual({
      success: false,
      error: '指定されたお知らせが存在しません。',
    });
    expect(mutate).not.toHaveBeenCalled();
  });

  it('その他の通信エラーでも例外を投げず失敗の理由を返す', async () => {
    // Arrange
    vi.mocked(Axios.post).mockRejectedValue(httpError(500));
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(response).toEqual({
      success: false,
      error: '既読登録に失敗しました',
    });
    expect(mutate).not.toHaveBeenCalled();
  });

  it('通信以外の例外も失敗の結果として返す', async () => {
    // Arrange
    vi.mocked(Axios.post).mockRejectedValue(new Error('予期しない例外'));
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(response).toEqual({
      success: false,
      error: '予期しないエラーが発生しました',
    });
  });

  it('一覧の再検証に失敗しても登録は成功とし、お知らせIDと失敗理由を警告に記録する', async () => {
    // Arrange
    const failure = new Error('一覧の通信失敗');
    mutate.mockRejectedValue(failure);
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { result } = renderHook(() => useMarkNotificationRead());
    // Act
    const response = await act(() => result.current.markNotificationRead(7));
    // Assert
    expect(response).toEqual({ success: true });
    expect(warning).toHaveBeenCalledWith('お知らせ一覧の再検証に失敗しました', {
      notificationId: 7,
      reason: failure,
    });
    expect(errorLog).not.toHaveBeenCalled();
    expect(Axios.post).toHaveBeenCalledTimes(1);
  });
});
