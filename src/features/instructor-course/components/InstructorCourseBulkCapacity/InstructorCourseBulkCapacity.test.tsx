import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseBulkCapacity } from './InstructorCourseBulkCapacity';

const navigation = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  search: 'course_ids=11,22',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push, replace: navigation.replace }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

describe('講座定員一括変更', () => {
  beforeEach(() => {
    navigation.push.mockReset();
    navigation.replace.mockReset();
    navigation.search = 'course_ids=11,22';
    vi.restoreAllMocks();
  });

  // AC-ICCAP-001
  it('選択された講座がないとき、講座一覧へ戻る', () => {
    // Arrange
    navigation.search = '';

    // Act
    render(<InstructorCourseBulkCapacity />);

    // Assert
    expect(navigation.replace).toHaveBeenCalledWith('/instructor/courses');
  });

  // AC-ICCAP-001
  it('対象の講座数を表示する', () => {
    // Arrange

    // Act
    render(<InstructorCourseBulkCapacity />);

    // Assert
    expect(screen.getByText(/2件/)).toBeInTheDocument();
  });

  // AC-ICCAP-002
  it('定員に0を入力して更新すると、1以上の入力を促す', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkCapacity />);
    const capacityInput = screen.getByLabelText(/定員/);

    // Act
    await user.type(capacityInput, '0');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(await screen.findByText(/1以上/)).toBeInTheDocument();
  });

  // AC-ICCAP-002
  it('定員に小数を入力して更新すると、整数の入力を促す', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkCapacity />);
    const capacityInput = screen.getByLabelText(/定員/);

    // Act
    await user.type(capacityInput, '1.5');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(await screen.findByText(/整数/)).toBeInTheDocument();
  });

  // AC-ICCAP-002
  it('定員を空欄にして更新すると、定員なしとして確認を求める', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkCapacity />);

    // Act
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText(
        '2件の講座の定員をなくします。本当に実行しますか？',
      ),
    ).toBeInTheDocument();
  });

  // AC-ICCAP-002
  it('定員に101を入力して更新すると、100以下の入力を促して確認へ進まない', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkCapacity />);
    const capacityInput = screen.getByLabelText(/定員/);

    // Act
    await user.type(capacityInput, '101');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText('定員は100以下で入力してください'),
    ).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // AC-ICCAP-003
  it('定員設定の削除を確認すると、処理を記録して講座一覧へ戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkCapacity />);
    await user.type(screen.getByLabelText(/定員/), '10');
    await user.click(screen.getByRole('button', { name: '削除' }));

    // Act
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByText(
        '2件の講座の定員をなくします。本当に実行しますか？',
      ),
    ).toBeInTheDocument();
    await user.click(within(dialog).getByRole('button', { name: /削除|実行/ }));

    // Assert
    expect(log).toHaveBeenCalledWith('bulk capacity delete', ['11', '22']);
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
  });
});

describe('確認ダイアログの操作', () => {
  it('更新の確認でフォーカスが移り、キャンセルとEscで閉じられる', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkCapacity />);
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
    render(<InstructorCourseBulkCapacity />);
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

describe('定員更新の確認', () => {
  it.each([10, 100])(
    '定員%dへの変更内容と件数を確認して更新できる',
    async (capacity) => {
      // Arrange
      const user = userEvent.setup();
      const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
      render(<InstructorCourseBulkCapacity />);
      // Act
      await user.type(screen.getByLabelText(/定員/), String(capacity));
      await user.click(screen.getByRole('button', { name: '更新' }));
      // Assert
      const dialog = await screen.findByRole('dialog');
      expect(
        within(dialog).getByText(
          `2件の講座の定員を${capacity}に変更します。本当に実行しますか？`,
        ),
      ).toBeInTheDocument();
      // Act
      await user.click(
        within(dialog).getByRole('button', { name: '更新する' }),
      );
      // Assert
      expect(log).toHaveBeenCalledWith(
        'bulk capacity update',
        ['11', '22'],
        capacity,
      );
      expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
    },
  );
});
