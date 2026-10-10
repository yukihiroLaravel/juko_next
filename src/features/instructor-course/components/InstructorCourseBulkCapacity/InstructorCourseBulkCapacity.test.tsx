import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseBulkCapacity } from './InstructorCourseBulkCapacity';

const navigation = vi.hoisted(() => ({
  push: vi.fn(),
  search: 'course_ids=11,22',
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

describe('講座定員一括変更', () => {
  beforeEach(() => {
    navigation.push.mockReset();
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
    expect(navigation.push).toHaveBeenCalledWith('/instructor/courses');
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
    expect(await screen.findByText('本当に実行しますか？')).toBeInTheDocument();
  });

  // AC-ICCAP-002
  it('定員に101を入力して更新すると、上限値を設けず確認を求める', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseBulkCapacity />);
    const capacityInput = screen.getByLabelText(/定員/);

    // Act
    await user.type(capacityInput, '101');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(await screen.findByText('本当に実行しますか？')).toBeInTheDocument();
  });

  // AC-ICCAP-003
  it('定員設定の削除を確認すると、処理を記録して講座一覧へ戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseBulkCapacity />);
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
