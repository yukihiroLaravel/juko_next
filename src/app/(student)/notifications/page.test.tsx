import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import NotificationsPage from './page';

const { mockNotificationList } = vi.hoisted(() => ({
  mockNotificationList: vi.fn(),
}));

vi.mock(
  '@/features/notification/components/NotificationList/NotificationList',
  () => ({
    NotificationList: mockNotificationList,
  }),
);

beforeEach(() => {
  mockNotificationList.mockReset();
  mockNotificationList.mockImplementation(() => {
    throw new Error('APIエラー');
  });
});

describe('お知らせ一覧ページ', () => {
  it('エラーが発生した場合、エラーメッセージを表示する', () => {
    // Act
    render(<NotificationsPage />);

    // Assert
    expect(
      screen.getByText('エラーが発生しました'),
    ).toBeInTheDocument();
  });
  
  it('読み込み中はスケルトンを表示する', async () => {
    // Arrange
    mockNotificationList.mockImplementation(() => {
        throw new Promise<void>(() => {});
    });

    // Act
    render(<NotificationsPage />);

    // Assert
    expect(
        await screen.findByTestId('notification-list-skeleton'),
    ).toBeInTheDocument();
    });

});