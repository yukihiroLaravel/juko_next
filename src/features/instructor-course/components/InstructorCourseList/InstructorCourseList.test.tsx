import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseList } from './InstructorCourseList';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

describe('講師側講座一覧', () => {
  beforeEach(() => {
    push.mockReset();
    vi.restoreAllMocks();
  });

  it('講座を1つも選んでいないとき、一括変更のメニューが押せない', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('button', { name: '一括変更' }));

    // Assert
    expect(
      screen.getByRole('menuitem', { name: '選択済み講座を公開' }),
    ).toHaveAttribute('aria-disabled', 'true');
    expect(
      screen.getByRole('menuitem', { name: '定員一括変更' }),
    ).toHaveAttribute('aria-disabled', 'true');
  });

  it('確認ダイアログでOKを押したときだけ実行される', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseList />);
    await user.click(
      screen.getByRole('checkbox', { name: 'Laravel入門講座を選択' }),
    );

    // Act
    await user.click(screen.getByRole('button', { name: '一括変更' }));
    await user.click(
      screen.getByRole('menuitem', { name: '選択済み講座を公開' }),
    );
    expect(screen.getByText('本当に実行しますか？')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    // Assert
    expect(log).not.toHaveBeenCalled();

    // Act
    await user.click(screen.getByRole('button', { name: '一括変更' }));
    await user.click(
      screen.getByRole('menuitem', { name: '選択済み講座を公開' }),
    );
    await user.click(screen.getByRole('button', { name: 'OK' }));

    // Assert
    expect(log).toHaveBeenCalledWith('選択済み講座を公開', [1]);
  });

  it('検索して該当する講座がないとき、該当する講座がないことが表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.type(
      screen.getByRole('searchbox', { name: '講座検索' }),
      '存在しない講座',
    );

    // Assert
    expect(screen.getByText('該当する講座はありません。')).toBeInTheDocument();
  });

  it('分類表示をオンにすると、分類ごとの見出しで講座がまとまる', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(
      screen.getByRole('heading', { name: 'Laravel' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'React' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '未分類' })).toBeInTheDocument();
  });
});
