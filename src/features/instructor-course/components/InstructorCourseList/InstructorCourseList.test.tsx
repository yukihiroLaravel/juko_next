import { render, screen, within } from '@testing-library/react';
import userEvent, { type UserEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import InstructorCoursesPage from '@/app/(instructor)/instructor/courses/page';
import type {
  InstructorCourseApiItem,
  InstructorCoursesMeta,
} from '../../types/instructorCourse';
import { InstructorCourseList } from './InstructorCourseList';

const { mockUseInstructorCourses, push } = vi.hoisted(() => ({
  mockUseInstructorCourses: vi.fn(),
  push: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@/features/instructor-course/hooks/useInstructorCourses', () => ({
  useInstructorCourses: (...args: unknown[]) =>
    mockUseInstructorCourses(...args),
}));

const PER_PAGE = 3;

const courses: InstructorCourseApiItem[] = [
  {
    course_id: 1,
    title: 'PHPコース',
    image: 'course/php.png',
    status: 'public',
    has_active_students: true,
    tags: [
      { tag_id: 1, content: 'バックエンド' },
      { tag_id: 2, content: 'PHP' },
    ],
    course_deadline: null,
  },
  {
    course_id: 2,
    title: 'React入門',
    image: 'course/react.png',
    status: 'public',
    has_active_students: false,
    tags: [{ tag_id: 3, content: 'フロントエンド' }],
    course_deadline: null,
  },
  {
    course_id: 3,
    title: '未分類の講座',
    image: 'course/empty.png',
    status: 'draft',
    has_active_students: false,
    tags: [],
    course_deadline: null,
  },
  {
    course_id: 4,
    title: 'Laravel応用',
    image: 'course/laravel.png',
    status: 'public',
    has_active_students: false,
    tags: [{ tag_id: 1, content: 'バックエンド' }],
    course_deadline: null,
  },
];

function buildHookResponse(
  pageCourses: InstructorCourseApiItem[],
  meta: InstructorCoursesMeta = {
    current_page: 1,
    last_page: 1,
    per_page: PER_PAGE,
    total: pageCourses.length,
  },
) {
  return { courses: pageCourses, meta };
}

// 講座名か分類名で検索し、PER_PAGE 件ずつに分けて返す一覧の API の代わり
function respondLikeCourseIndex({
  page = 1,
  search_word = '',
}: {
  page?: number;
  search_word?: string;
}) {
  const matched = courses.filter(
    (course) =>
      course.title.includes(search_word) ||
      course.tags.some((tag) => tag.content.includes(search_word)),
  );
  const start = (page - 1) * PER_PAGE;

  return buildHookResponse(matched.slice(start, start + PER_PAGE), {
    current_page: page,
    last_page: Math.max(1, Math.ceil(matched.length / PER_PAGE)),
    per_page: PER_PAGE,
    total: matched.length,
  });
}

async function selectCourse(user: UserEvent, courseTitle: string) {
  await user.click(
    screen.getByRole('checkbox', { name: `${courseTitle}を選択` }),
  );
}

async function selectBulkAction(user: UserEvent, menuItemName: string) {
  await user.click(screen.getByRole('button', { name: '一括変更' }));
  await user.click(screen.getByRole('menuitem', { name: menuItemName }));
}

async function search(user: UserEvent, searchWord: string) {
  await user.type(
    screen.getByRole('searchbox', { name: '講座検索' }),
    `${searchWord}{Enter}`,
  );
}

describe('講師側講座一覧', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_STORAGE_URL = 'http://localhost:8080/storage';
    push.mockReset();
    vi.restoreAllMocks();
    mockUseInstructorCourses.mockReset();
    mockUseInstructorCourses.mockImplementation(respondLikeCourseIndex);
  });

  it('講座のカードに、講座名・分類・サムネイルが表示される', () => {
    // Arrange
    render(<InstructorCourseList />);

    // Act

    // Assert
    expect(screen.getByText('PHPコース')).toBeInTheDocument();
    expect(screen.getByText('バックエンド')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'PHPコースのサムネイル' }),
    ).toHaveAttribute('src', 'http://localhost:8080/storage/course/php.png');
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
    await selectCourse(user, 'PHPコース');
    await selectCourse(user, 'React入門');

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
    await selectCourse(user, 'PHPコース');
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
    await selectCourse(user, 'PHPコース');
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
    await selectCourse(user, 'PHPコース');

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
    await selectCourse(user, 'PHPコース');
    await selectCourse(user, 'React入門');
    await search(user, 'React');

    // Act
    await selectBulkAction(user, '選択済み講座を公開');
    await user.click(screen.getByRole('button', { name: '公開する' }));

    // Assert
    expect(log).toHaveBeenCalledWith('選択済み講座を公開', [2]);
  });

  // AC-ICLIST-005
  it('検索で表示されなくなった講座の選択は、検索を戻すと残っている', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);
    await selectCourse(user, 'PHPコース');
    await search(user, 'React');

    // Act
    await user.clear(screen.getByRole('searchbox', { name: '講座検索' }));
    await user.keyboard('{Enter}');

    // Assert
    expect(
      screen.getByRole('checkbox', { name: 'PHPコースを選択' }),
    ).toBeChecked();
  });

  // AC-ICLIST-006
  it('検索欄に入力している間は、まだ検索しない', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.type(
      screen.getByRole('searchbox', { name: '講座検索' }),
      'React',
    );

    // Assert
    expect(screen.getByText('PHPコース')).toBeInTheDocument();
  });

  // AC-ICLIST-006
  it('検索欄で Enter を押すと、講座名か分類名に検索語を含む講座だけが表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await search(user, 'React');

    // Assert
    expect(screen.getByText('React入門')).toBeInTheDocument();
    expect(screen.queryByText('PHPコース')).not.toBeInTheDocument();
  });

  // AC-ICLIST-006
  it('検索に合う講座がないとき、その旨が表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await search(user, '存在しない検索語');

    // Assert
    expect(screen.getByText('該当する講座はありません。')).toBeInTheDocument();
  });

  // AC-ICLIST-007
  it('分類表示をオンにすると、表示中のページの講座が分類の見出しごとにまとまり、分類のない講座は「未分類」に入る', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(
      within(screen.getByRole('region', { name: 'フロントエンド' })).getByText(
        'React入門',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: '未分類' })).getByText(
        '未分類の講座',
      ),
    ).toBeInTheDocument();
  });

  // AC-ICLIST-007
  it('分類表示では、複数の分類が付いた講座がそれぞれの見出しに表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(
      within(screen.getByRole('region', { name: 'バックエンド' })).getByText(
        'PHPコース',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: 'PHP' })).getByText(
        'PHPコース',
      ),
    ).toBeInTheDocument();
  });

  // AC-ICLIST-010
  it('2ページ目を見ているときに検索すると、検索結果の1ページ目が表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);
    await user.click(screen.getByRole('button', { name: '2' }));

    // Act
    await search(user, 'バックエンド');

    // Assert
    expect(screen.getByText('PHPコース')).toBeInTheDocument();
    expect(screen.getByText('Laravel応用')).toBeInTheDocument();
  });

  // AC-ICLIST-011
  it('ページネーションでページを選ぶと、そのページの講座が表示され、今のページとして示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('button', { name: '2' }));

    // Assert
    expect(screen.getByText('Laravel応用')).toBeInTheDocument();
    expect(screen.queryByText('PHPコース')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  // AC-ICLIST-011
  it('分類表示をオンにしても、ページネーションでページを移動できる', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);
    await user.click(screen.getByRole('switch'));

    // Act
    await user.click(screen.getByRole('button', { name: '2' }));

    // Assert
    expect(
      within(screen.getByRole('region', { name: 'バックエンド' })).getByText(
        'Laravel応用',
      ),
    ).toBeInTheDocument();
  });

  it('講座が1件もないとき、該当する講座がない旨が表示される', () => {
    // Arrange
    mockUseInstructorCourses.mockImplementation(() => buildHookResponse([]));

    // Act
    render(<InstructorCourseList />);

    // Assert
    expect(screen.getByText('該当する講座はありません。')).toBeInTheDocument();
  });

  it('講座の取得に失敗すると、エラーの表示が出る', () => {
    // Arrange
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    mockUseInstructorCourses.mockImplementation(() => {
      throw new Error('network error');
    });

    // Act
    render(<InstructorCoursesPage />);

    // Assert
    expect(screen.getByText('エラーが発生しました')).toBeInTheDocument();
  });

  it('受講期限は、特定の日なら「〜まで」、日数なら「開始日から〜日後」と表示し、期限のない講座には出さない', () => {
    // Arrange
    mockUseInstructorCourses.mockImplementation(() =>
      buildHookResponse([
        {
          ...courses[0],
          course_deadline: {
            course_deadline_id: 21,
            fixed_date: '2026-12-31',
            relative_days: null,
          },
        },
        {
          ...courses[1],
          course_deadline: {
            course_deadline_id: 22,
            fixed_date: null,
            relative_days: 30,
          },
        },
        courses[2],
      ]),
    );

    // Act
    render(<InstructorCourseList />);

    // Assert
    expect(screen.getByText('2026/12/31まで')).toBeInTheDocument();
    expect(screen.getByText('開始日から30日後')).toBeInTheDocument();
    expect(screen.getAllByText(/まで$|日後$/)).toHaveLength(2);
  });

  it('講座のカードに定員を表示しない', () => {
    // Arrange
    render(<InstructorCourseList />);

    // Act

    // Assert
    expect(screen.queryByText(/定員：/)).not.toBeInTheDocument();
  });
});
