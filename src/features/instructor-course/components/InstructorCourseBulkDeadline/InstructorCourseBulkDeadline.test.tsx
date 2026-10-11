import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseBulkDeadline } from './InstructorCourseBulkDeadline';

Object.defineProperty(HTMLElement.prototype, 'hasPointerCapture', {
  configurable: true,
  value: () => false,
});
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  configurable: true,
  value: () => {},
});

if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

const navigation = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  search: 'course_ids=11,22',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push, replace: navigation.replace }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

describe('受講期限一括変更', () => {
  beforeEach(() => {
    navigation.push.mockReset();
    navigation.replace.mockReset();
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
    expect(navigation.replace).toHaveBeenCalledWith('/instructor/courses');
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
      within(dialog).getByText(
        '2件の講座の受講期限をなくします。本当に実行しますか？',
      ),
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
    await user.click(screen.getByLabelText('開始日から○日後'));
    await user.click(
      screen.getByRole('combobox', { name: '開始日からの日数' }),
    );
    await user.click(screen.getByRole('option', { name: '10日' }));
    await user.click(screen.getByRole('button', { name: '削除' }));

    // Act
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText(
        '2件の講座の受講期限をなくします。本当に実行しますか？',
      ),
    ).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /削除|実行/ }));

    // Assert
    expect(log).toHaveBeenCalledWith('bulk deadline delete', ['11', '22']);
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
  });
});

describe('受講期限の入力修正', () => {
  it('日付を選択すると未入力エラーが消える', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkDeadline />);
    await user.click(screen.getByLabelText('一括日程'));
    await user.click(screen.getByRole('button', { name: '更新' }));
    expect(
      await screen.findByText('日付を選択してください'),
    ).toBeInTheDocument();
    // Act
    await user.click(screen.getByRole('button', { name: '年月日を選択' }));
    await user.click(
      screen.getByRole('button', { name: 'Go to the Next Month' }),
    );
    await user.click(screen.getByRole('button', { name: /15th/ }));
    // Assert
    await waitFor(() =>
      expect(
        screen.queryByText('日付を選択してください'),
      ).not.toBeInTheDocument(),
    );
    // Act
    const selectedDate = screen.getByRole('button', {
      name: /^\d{4}-\d{2}-\d{2}$/,
    }).textContent;
    await user.click(screen.getByRole('button', { name: '更新' }));
    // Assert
    expect(
      await screen.findByText(
        `2件の講座の受講期限を${selectedDate}に変更します。本当に実行しますか？`,
      ),
    ).toBeInTheDocument();
  });
});

describe('受講期限の入力修正', () => {
  it('日数を選択すると未入力エラーが消える', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkDeadline />);
    await user.click(screen.getByLabelText('開始日から○日後'));
    await user.click(screen.getByRole('button', { name: '更新' }));
    expect(
      await screen.findByText('日数を選択してください'),
    ).toBeInTheDocument();
    // Act
    await user.click(
      screen.getByRole('combobox', { name: '開始日からの日数' }),
    );
    await user.click(screen.getByRole('option', { name: '10日' }));
    // Assert
    await waitFor(() =>
      expect(
        screen.queryByText('日数を選択してください'),
      ).not.toBeInTheDocument(),
    );
    // Act
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    await user.click(screen.getByRole('button', { name: '更新' }));
    // Assert
    expect(
      await screen.findByText(
        '2件の講座の受講期限を開始日から10日後に変更します。本当に実行しますか？',
      ),
    ).toBeInTheDocument();
    // Act
    await user.click(screen.getByRole('button', { name: '更新する' }));
    // Assert
    expect(log).toHaveBeenCalledWith('bulk deadline update', ['11', '22'], {
      deadline_type: 'relative_days',
      fixed_date: '',
      relative_days: 10,
    });
  });
});

describe('確認ダイアログの操作', () => {
  it('更新の確認でフォーカスが移り、キャンセルとEscで閉じられる', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkDeadline />);
    // Act
    await user.click(screen.getByRole('button', { name: '更新' }));
    // Assert
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toContainElement(
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null,
    );
    expect(
      within(dialog).getByRole('button', { name: '更新する' }),
    ).toHaveAttribute('data-variant', 'default');
    // Act
    await user.click(
      within(dialog).getByRole('button', { name: 'キャンセル' }),
    );
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
    // Act
    await user.click(screen.getByRole('button', { name: '更新' }));
    await user.keyboard('{Escape}');
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });
});

describe('確認ダイアログの操作', () => {
  it('削除の確認でフォーカスが移り、キャンセルとEscで閉じられる', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkDeadline />);
    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    // Assert
    const dialog = await screen.findByRole('dialog');
    expect(dialog).toContainElement(
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null,
    );
    expect(
      within(dialog).getByRole('button', { name: '削除する' }),
    ).toHaveAttribute('data-variant', 'destructive');
    // Act
    await user.click(
      within(dialog).getByRole('button', { name: 'キャンセル' }),
    );
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.keyboard('{Escape}');
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });
});
