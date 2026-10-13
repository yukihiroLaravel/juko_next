import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotificationList } from './NotificationList';

const { mockUseNotifications } = vi.hoisted(() => ({
  mockUseNotifications: vi.fn(),
}));

vi.mock('../../hooks/useNotifications', () => ({
  useNotifications: mockUseNotifications,
}));

beforeEach(() => {
  mockUseNotifications.mockReturnValue({
    notifications: [
      {
        notification_id: 1,
        course_id: 1,
        instructor_id: 1,
        course_title: 'PHP入門講座',
        title: '追加教材のお知らせ',
        type: 'always',
        read_status: null,
        content: '新しい教材を追加しました。',
        instructor_nick_name: 'Yamada',
        start_date: '2026-10-01 10:00:00',
        end_date: '2026-10-18 17:30:25',
      },
    ],
    pagination: {
      page: 1,
      total: 10,
    },
    error: undefined,
  });
});

describe('受講生側お知らせ一覧', () => {
  it('お知らせの行をクリックすると、タイトルと本文が表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));

    // Assert
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('追加教材のお知らせ')).toBeInTheDocument();
    expect(
      within(dialog).getByText(/新しい教材を追加しました。/),
    ).toBeInTheDocument();
  });

  it('次のページをクリックすると、2ページ目のデータを取得する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByRole('button', { name: '2' }));

    // Assert
    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 2,
      perPage: 5,
      sortBy: 'start_date',
      order: 'desc',
    });
  });

  it('「閉じる」を押すとモーダルが閉じる', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);
    await user.click(screen.getByText('追加教材のお知らせ'));

    // Act
    await user.click(screen.getAllByRole('button', { name: '閉じる' })[0]);

    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('受講期限がないお知らせでは「—」と表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));

    // Assert
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).getByText('受講期限: —')).toBeInTheDocument();
  });

  it('モーダルを閉じると、開いたお知らせ行にフォーカスが戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    const notificationRow = screen
      .getByText('追加教材のお知らせ')
      .closest('tr');

    expect(notificationRow).not.toBeNull();

    // Act
    notificationRow!.focus();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: '閉じる' })[0]);

    // Assert
    expect(notificationRow).toHaveFocus();
  });

  it('お知らせが0件の場合、メッセージを表示する', () => {
    // Arrange
    mockUseNotifications.mockReturnValue({
      notifications: [],
      pagination: {
        page: 1,
        total: 0,
      },
      error: undefined,
    });

    // Act
    render(<NotificationList />);

    // Assert
    expect(
      screen.getByText('現在、お知らせはありません。'),
    ).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
  });
});
