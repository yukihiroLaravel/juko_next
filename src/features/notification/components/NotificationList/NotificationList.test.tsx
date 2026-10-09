import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NotificationList } from './NotificationList';

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
});
