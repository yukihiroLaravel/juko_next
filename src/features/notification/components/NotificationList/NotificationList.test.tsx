import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NotificationList } from './NotificationList';

const { mockUseNotifications, mockUseNotification, mockMarkNotificationRead } =
  vi.hoisted(() => ({
    mockUseNotifications: vi.fn(),
    mockUseNotification: vi.fn(),
    mockMarkNotificationRead: vi.fn(),
  }));

vi.mock('../../hooks/useNotifications', () => ({
  useNotifications: mockUseNotifications,
}));

vi.mock('../../hooks/useNotification', () => ({
  useNotification: mockUseNotification,
  useRetryNotification: () => ({
    retryNotification: async () => ({ success: true }),
    clearNotificationError: vi.fn(),
  }),
}));

vi.mock('../../hooks/useMarkNotificationRead', () => ({
  useMarkNotificationRead: () => ({
    markNotificationRead: mockMarkNotificationRead,
  }),
}));

const detail = {
  notification_id: 1,
  course_id: 1,
  course_title: 'PHP入門講座',
  title: '詳細から取得したタイトル',
  content: '詳細から取得した本文です。',
  instructor_nick_name: null,
  start_date: '2026-10-01 10:00:00',
  end_date: '2026-10-18 17:30:25',
  attendance_deadline: '2026-12-31',
};

beforeEach(() => {
  mockMarkNotificationRead.mockReset();
  mockMarkNotificationRead.mockResolvedValue({ success: true });
  mockUseNotification.mockReset();
  mockUseNotification.mockReturnValue({ notification: detail });
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
  });
});

describe('受講生側お知らせ一覧', () => {
  // AC-SNLIST-008
  it('お知らせの行をクリックすると、詳細で取得したタイトルと本文が表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));

    // Assert
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('詳細から取得したタイトル'),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByText('詳細から取得した本文です。'),
    ).toBeInTheDocument();
  });

  // AC-SNLIST-001
  // AC-SNLIST-006
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

  // AC-SNLIST-010
  it('受講期限がnullの場合、受講期限のラベルも値も表示しない', async () => {
    // Arrange
    mockUseNotification.mockReturnValue({
      notification: { ...detail, attendance_deadline: null },
    });
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));

    // Assert
    const dialog = screen.getByRole('dialog');
    expect(within(dialog).queryByText(/受講期限/)).not.toBeInTheDocument();
  });

  // AC-SNLIST-009
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
    });

    // Act
    render(<NotificationList />);

    // Assert
    expect(
      screen.getByText('現在、お知らせはありません。'),
    ).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: '2' })).not.toBeInTheDocument();
  });

  it('お知らせが0件の場合、ページ送りを表示しない', () => {
    // Arrange
    mockUseNotifications.mockReturnValue({
      notifications: [],
      pagination: {
        page: 1,
        total: 0,
      },
    });

    // Act
    render(<NotificationList />);

    // Assert
    expect(screen.queryByRole('button', { name: '<' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '>' })).not.toBeInTheDocument();
  });

  // AC-SNLIST-002
  it('タイトル列をクリックすると、タイトルの昇順でデータを取得する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByRole('button', { name: /タイトル/ }));

    // Assert
    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 1,
      perPage: 5,
      sortBy: 'title',
      order: 'asc',
    });
  });

  // AC-SNLIST-002
  it('講座名列をクリックすると、講座名の昇順でデータを取得する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByRole('button', { name: /講座名/ }));

    // Assert
    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 1,
      perPage: 5,
      sortBy: 'course_id',
      order: 'asc',
    });
  });

  // AC-SNLIST-002
  it('開始日付列をクリックすると、昇順でデータを取得する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    // Act
    await user.click(screen.getByRole('button', { name: /開始日付/ }));

    // Assert
    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 1,
      perPage: 5,
      sortBy: 'start_date',
      order: 'asc',
    });
  });

  // AC-SNLIST-003
  it('同じ列を2回クリックすると、降順に戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);

    const titleSortButton = screen.getByRole('button', {
      name: /タイトル/,
    });

    // Act
    await user.click(titleSortButton);
    await user.click(titleSortButton);

    // Assert
    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 1,
      perPage: 5,
      sortBy: 'title',
      order: 'desc',
    });
  });

  // AC-SNLIST-007
  it('総件数が減って現在のページが存在しなくなったら、最後のページに戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    const { rerender } = render(<NotificationList />);

    // 2ページ目に移動
    await user.click(screen.getByRole('button', { name: '2' }));

    expect(mockUseNotifications).toHaveBeenLastCalledWith({
      page: 2,
      perPage: 5,
      sortBy: 'start_date',
      order: 'desc',
    });

    // Act：総件数が10件から5件に減った状態を再現
    mockUseNotifications.mockReturnValue({
      notifications: [],
      pagination: {
        page: 2,
        total: 5,
      },
    });

    rerender(<NotificationList />);

    // Assert：最後のページ（1ページ目）に戻る
    await waitFor(() => {
      expect(mockUseNotifications).toHaveBeenLastCalledWith({
        page: 1,
        perPage: 5,
        sortBy: 'start_date',
        order: 'desc',
      });
    });

    expect(
      screen.getByText('現在、お知らせはありません。'),
    ).toBeInTheDocument();
  });
});

describe('お知らせ詳細の取得状態', () => {
  // AC-SNLIST-010
  it('受講期限がある場合、詳細の受講期限を表示する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    expect(
      within(screen.getByRole('dialog')).getByText('受講期限: 2026/12/31'),
    ).toBeInTheDocument();
  });

  // AC-SNLIST-011
  it('詳細の読み込み中もモーダルを表示し、閉じることができる', async () => {
    // Arrange
    mockUseNotification.mockImplementation(() => {
      throw new Promise(() => {});
    });
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    expect(
      within(screen.getByRole('dialog')).getByText(
        'お知らせを読み込んでいます。',
      ),
    ).toBeInTheDocument();
    // Act
    await user.click(screen.getAllByRole('button', { name: '閉じる' })[0]);
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // AC-SNLIST-012
  it('詳細の取得に失敗した場合、モーダル内にエラーと再試行を表示する', async () => {
    // Arrange
    vi.spyOn(console, 'error').mockImplementation(() => {});
    mockUseNotification.mockImplementation(() => {
      throw new Error('取得失敗');
    });
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('お知らせの取得に失敗しました。'),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole('button', { name: '再試行' }),
    ).toBeInTheDocument();
    // Act
    mockUseNotification.mockReturnValue({ notification: detail });
    await user.click(within(dialog).getByRole('button', { name: '再試行' }));
    // Assert
    expect(
      await within(dialog).findByText('詳細から取得した本文です。'),
    ).toBeInTheDocument();
  });
});

describe('お知らせ詳細の既読登録', () => {
  // AC-SNLIST-013
  it('一度きりのお知らせを開き直しても既読登録を繰り返さない', async () => {
    // Arrange
    const list = mockUseNotifications();
    mockUseNotifications.mockReturnValue({
      ...list,
      notifications: list.notifications.map((item: object) => ({
        ...item,
        type: 'once',
        read_status: 'unread',
      })),
    });
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    await user.click(screen.getAllByRole('button', { name: '閉じる' })[0]);
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    expect(mockMarkNotificationRead).toHaveBeenCalledTimes(1);
  });

  // AC-SNLIST-013
  it('常時表示のお知らせは既読登録せず詳細を表示する', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    expect(mockMarkNotificationRead).not.toHaveBeenCalled();
    expect(
      within(screen.getByRole('dialog')).getByText(
        '詳細から取得した本文です。',
      ),
    ).toBeInTheDocument();
  });

  // AC-SNLIST-014
  it('既読登録に失敗しても詳細を読み続けることができる', async () => {
    // Arrange
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockMarkNotificationRead.mockResolvedValue({
      success: false,
      error: '既読登録に失敗しました',
    });
    const list = mockUseNotifications();
    mockUseNotifications.mockReturnValue({
      ...list,
      notifications: list.notifications.map((item: object) => ({
        ...item,
        type: 'once',
        read_status: 'unread',
      })),
    });
    const user = userEvent.setup();
    render(<NotificationList />);
    // Act
    await user.click(screen.getByText('追加教材のお知らせ'));
    // Assert
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('詳細から取得した本文です。'),
    ).toBeInTheDocument();
    expect(
      within(dialog).queryByText('既読登録に失敗しました'),
    ).not.toBeInTheDocument();
    // Act
    await user.click(screen.getAllByRole('button', { name: '閉じる' })[0]);
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
