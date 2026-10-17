import { Suspense, type ReactNode } from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { SWRConfig } from 'swr';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Axios } from '@/lib/api';
import { useNotification } from './useNotification';

vi.mock('@/lib/api', () => ({ Axios: { get: vi.fn() } }));

function wrapper({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ provider: () => new Map(), shouldRetryOnError: false }}>
      <Suspense fallback="読み込み中">{children}</Suspense>
    </SWRConfig>
  );
}

beforeEach(() => {
  vi.mocked(Axios.get).mockReset();
});

describe('お知らせ詳細の取得', () => {
  it('選択されたお知らせの詳細を取得し、nullの受講期限と講師名を保持する', async () => {
    // Arrange
    const notification = {
      notification_id: 7,
      course_id: 1,
      course_title: 'PHP入門講座',
      title: '詳細',
      content: '本文',
      instructor_nick_name: null,
      start_date: '2026-10-01 10:00:00',
      end_date: '2026-12-31 23:59:59',
      attendance_deadline: null,
    };
    vi.mocked(Axios.get).mockResolvedValue({ data: { data: notification } });
    // Act
    const { result } = await act(async () =>
      renderHook(() => useNotification(7), { wrapper }),
    );
    // Assert
    await waitFor(() =>
      expect(result.current?.notification).toEqual(notification),
    );
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/notifications/7');
  });

  it('お知らせが選ばれていない間は詳細を取得しない', () => {
    // Arrange
    // Act
    renderHook(() => useNotification(null), { wrapper });
    // Assert
    expect(Axios.get).not.toHaveBeenCalled();
  });
});
