import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseBulkDeadline } from './InstructorCourseBulkDeadline';

if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

const navigation = vi.hoisted(() => ({
  push: vi.fn(),
  search: 'course_ids=11,22',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

describe('受講期限一括変更', () => {
  beforeEach(() => {
    navigation.push.mockReset();
    navigation.search = 'course_ids=11,22';
    vi.restoreAllMocks();
  });

  // AC-ICDEAD-001
  it('選択された講座がないとき、講座一覧へ戻る', () => {
    // Arrange
    navigation.search = '';

    // Act
    render(<InstructorCourseBulkDeadline />);

    // Assert
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
  });

  // AC-ICDEAD-001
  it('対象の講座数を表示する', () => {
    // Arrange

    // Act
    render(<InstructorCourseBulkDeadline />);

    // Assert
    expect(screen.getByText(/2件/)).toBeInTheDocument();
  });

  // AC-ICDEAD-002
  it('日付指定を選んで日付なしで更新すると、日付の入力を促す', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkDeadline />);

    // Act
    await user.click(screen.getByLabelText('一括日程'));
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText('日付を選択してください'),
    ).toBeInTheDocument();
  });

  // AC-ICDEAD-002
  it('日数指定を選んで日数なしで更新すると、日数の入力を促す', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkDeadline />);

    // Act
    await user.click(screen.getByLabelText('開始日から○日後'));
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText('日数を選択してください'),
    ).toBeInTheDocument();
  });

  // AC-ICDEAD-002
  it('期限なしで更新を確認すると、処理を記録して講座一覧へ戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkDeadline />);
    await user.click(screen.getByLabelText('なし'));
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Act
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('本当に実行しますか？'),
    ).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /更新|実行/ }));

    // Assert
    expect(log).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
  });

  // AC-ICDEAD-003
  it('受講期限の削除を確認すると、処理を記録して講座一覧へ戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkDeadline />);
    await user.click(screen.getByRole('button', { name: '削除' }));

    // Act
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText('本当に実行しますか？'),
    ).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /削除|実行/ }));

    // Assert
    expect(log).toHaveBeenCalled();
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
  });
});
