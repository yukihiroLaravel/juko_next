import { render, screen, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseList } from './InstructorCourseList';

const push = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

async function selectCourse(user: UserEvent, courseTitle: string) {
  await user.click(
    screen.getByRole('checkbox', { name: `${courseTitle}を選択` }),
  );
}

async function selectBulkAction(user: UserEvent, menuItemName: string) {
  await user.click(screen.getByRole('button', { name: '一括変更' }));
  await user.click(screen.getByRole('menuitem', { name: menuItemName }));
}

describe('講師側講座一覧', () => {
  beforeEach(() => {
    push.mockReset();
    vi.restoreAllMocks();
  });

  // AC-ICLIST-001
  it('講座を1つも選んでいないとき、一括変更のメニューが押せない', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('button', { name: '一括変更' }));

    // Assert
    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems).toHaveLength(7);
    menuItems.forEach((menuItem) => {
      expect(menuItem).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // AC-ICLIST-002
  it('一括変更の操作を選ぶと、確認ダイアログに操作の内容と対象の件数が表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);
    await selectCourse(user, 'Laravel入門講座');
    await selectCourse(user, 'React基礎講座');

    // Act
    await selectBulkAction(user, '選択済み講座を削除');

    // Assert
    const dialog = screen.getByRole('dialog', { name: '講座を削除' });
    expect(
      within(dialog).getByText(
        '選択した2件の講座を削除します。本当に実行しますか？',
      ),
    ).toBeInTheDocument();
    expect(
      within(dialog).getByRole('button', { name: '削除する' }),
    ).toBeInTheDocument();
  });

  // AC-ICLIST-003
  it('確認ダイアログでキャンセルを押すと、実行されない', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseList />);
    await selectCourse(user, 'Laravel入門講座');
    await selectBulkAction(user, '選択済み講座を公開');

    // Act
    await user.click(screen.getByRole('button', { name: 'キャンセル' }));

    // Assert
    expect(log).not.toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // AC-ICLIST-003
  it('確認ダイアログで実行のボタンを押すと、選んだ講座に実行される', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseList />);
    await selectCourse(user, 'Laravel入門講座');
    await selectBulkAction(user, '選択済み講座を公開');

    // Act
    await user.click(screen.getByRole('button', { name: '公開する' }));

    // Assert
    expect(log).toHaveBeenCalledWith('選択済み講座を公開', [1]);
  });

  // AC-ICLIST-004
  it('受講期限一括変更を選ぶと、確認を挟まず、選んだ講座を引き継いで画面を移る', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);
    await selectCourse(user, 'Laravel入門講座');

    // Act
    await selectBulkAction(user, '受講期限一括変更');

    // Assert
    expect(push).toHaveBeenCalledWith(
      '/instructor/courses/deadline?course_ids=1',
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // AC-ICLIST-005
  it('選んだあとに検索で表示されなくなった講座は、一括変更の対象にならない', async () => {
    // Arrange
    const user = userEvent.setup();
    const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
    render(<InstructorCourseList />);
    await selectCourse(user, 'Laravel入門講座');
    await selectCourse(user, 'React基礎講座');
    await user.type(
      screen.getByRole('searchbox', { name: '講座検索' }),
      'React',
    );

    // Act
    await selectBulkAction(user, '選択済み講座を公開');
    await user.click(screen.getByRole('button', { name: '公開する' }));

    // Assert
    expect(log).toHaveBeenCalledWith('選択済み講座を公開', [2]);
  });

  // AC-ICLIST-006
  it('検索に合う講座がないとき、その旨が表示される', async () => {
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

  // AC-ICLIST-007
  it('分類表示をオンにすると、分類ごとの見出しで講座がまとまる', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(
      within(screen.getByRole('region', { name: 'Laravel' })).getByText(
        'Laravel入門講座',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: 'React' })).getByText(
        'React基礎講座',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: '未分類' })).getByText(
        '新任講師向け講座',
      ),
    ).toBeInTheDocument();
  });
});
