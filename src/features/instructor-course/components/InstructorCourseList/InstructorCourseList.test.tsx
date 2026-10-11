import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InstructorCourseList } from './InstructorCourseList';

const { mockUseInstructorCourses, push } = vi.hoisted(() => ({
  mockUseInstructorCourses: vi.fn(),
  push: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}));

vi.mock('@/features/instructor-course/hooks/useInstructorCourses', () => ({
  useInstructorCourses: (...args: unknown[]) => mockUseInstructorCourses(...args),
}));

type ApiCourseTestItem = {
  course_id: number;
  title: string;
  image: string;
  status: string;
  has_active_students: boolean;
  tags: Array<{ tag_id: number; content: string }>;
  course_deadline:
    | null
    | {
        course_deadline_id?: number;
        fixed_date?: string | null;
        relative_days?: number | null;
      };
};

const baseCourses: ApiCourseTestItem[] = [
  {
    course_id: 1,
    title: 'PHPコース',
    image: 'public/course/php.png',
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
    image: 'public/course/react.png',
    status: 'public',
    has_active_students: false,
    tags: [{ tag_id: 3, content: 'フロントエンド' }],
    course_deadline: {
      course_deadline_id: 11,
      fixed_date: '2026-12-31',
      relative_days: null,
    },
  },
  {
    course_id: 3,
    title: '未分類の講座',
    image: 'public/course/empty.png',
    status: 'draft',
    has_active_students: false,
    tags: [],
    course_deadline: null,
  },
];

const buildHookResponse = ({
  courses = baseCourses,
  meta = { current_page: 1, last_page: 2, per_page: 6, total: 8 },
  links = {
    first: 'http://localhost:8080?page=1',
    last: 'http://localhost:8080?page=2',
    prev: null,
    next: 'http://localhost:8080?page=2',
  },
  error,
}: {
  courses?: typeof baseCourses;
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  error?: Error;
} = {}) => ({
  courses,
  meta,
  links,
  error,
});

describe('講師側講座一覧', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_STORAGE_URL = 'http://localhost:8080/storage';
    mockUseInstructorCourses.mockReset();
    mockUseInstructorCourses.mockImplementation((params = {}) =>
      buildHookResponse({
        ...params,
        courses: baseCourses,
      }),
    );
  });

  it('API から取得した講座一覧を表示し、画像と分類が見える', () => {
    // Arrange
    render(<InstructorCourseList />);

    // Act

    // Assert
    expect(screen.getByRole('heading', { name: '講座一覧' })).toBeInTheDocument();
    expect(screen.getByText('PHPコース')).toBeInTheDocument();
    expect(screen.getByText('バックエンド')).toBeInTheDocument();
    expect(screen.getByText('PHP')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: 'PHPコースのサムネイル' }),
    ).toHaveAttribute(
      'src',
      expect.stringContaining(
        'http%3A%2F%2Flocalhost%3A8080%2Fstorage%2Fpublic%2Fcourse%2Fphp.png',
      ),
    );
  });

  it('講座0件時に結果なしの状態を表示する', () => {
    // Arrange
    mockUseInstructorCourses.mockImplementation(() =>
      buildHookResponse({ courses: [] }),
    );

    // Act
    render(<InstructorCourseList />);

    // Assert
    expect(screen.getByText('該当する講座はありません。')).toBeInTheDocument();
  });

  it('検索結果0件時に結果なしの状態を表示する', async () => {
    // Arrange
    const user = userEvent.setup();
    mockUseInstructorCourses.mockImplementation(({ search_word = '' } = {}) =>
      buildHookResponse({
        courses:
          search_word === '存在しない検索語' ? [] : baseCourses,
      }),
    );

    // Act
    render(<InstructorCourseList />);
    await user.type(screen.getByRole('searchbox', { name: '講座検索' }), '存在しない検索語');

    // Assert
    expect(screen.getByText('該当する講座はありません。')).toBeInTheDocument();
  });

  it('API取得エラー時に取得失敗の表示を返す', () => {
    // Arrange
    mockUseInstructorCourses.mockImplementation(() =>
      buildHookResponse({ error: new Error('network error') }),
    );

    // Act
    render(<InstructorCourseList />);

    // Assert
    expect(screen.getByText(/エラー|失敗|取得/)).toBeInTheDocument();
  });

  it('検索実行時に search_word が API 取得条件へ反映される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.type(screen.getByRole('searchbox', { name: '講座検索' }), 'React');

    // Assert
    expect(mockUseInstructorCourses).toHaveBeenCalledWith(
      expect.objectContaining({ search_word: 'React' }),
    );
  });

  it('検索語変更時に page が 1 へ戻る', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.type(screen.getByRole('searchbox', { name: '講座検索' }), 'React');

    // Assert
    expect(mockUseInstructorCourses).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 1, search_word: 'React' }),
    );
  });

  it('ページネーション操作時に page が変わり、API取得条件へ反映される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('button', { name: '2' }));

    // Assert
    expect(mockUseInstructorCourses).toHaveBeenLastCalledWith(
      expect.objectContaining({ page: 2 }),
    );
  });

  it('分類表示をオンにすると、ページ内の講座をタグごとにまとめて表示する', async () => {
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

  it('複数タグを持つ講座が、各分類見出しへ重複表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(screen.getByRole('region', { name: 'バックエンド' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'PHP' })).toBeInTheDocument();
  });

  it('タグなし講座は「未分類」にまとめて表示される', async () => {
    // Arrange
    const user = userEvent.setup();
    render(<InstructorCourseList />);

    // Act
    await user.click(screen.getByRole('switch'));

    // Assert
    expect(screen.getByRole('region', { name: '未分類' })).toBeInTheDocument();
    expect(
      within(screen.getByRole('region', { name: '未分類' })).getByText(
        '未分類の講座',
      ),
    ).toBeInTheDocument();
  });

  it('定員・受講人数の表示は行わない', () => {
    // Arrange
    render(<InstructorCourseList />);

    // Act

    // Assert
    expect(screen.queryByText(/定員：/)).not.toBeInTheDocument();
    expect(screen.queryByText(/受講人数/)).not.toBeInTheDocument();
  });

  it('期限表示は fixed_date / relative_days / 期限なし の3ケースで分岐する', () => {
    // Arrange
    mockUseInstructorCourses.mockImplementation(() =>
      buildHookResponse({
        courses: [
          {
            ...baseCourses[0],
            course_id: 101,
            title: '固定期限講座',
            course_deadline: { fixed_date: '2026-12-31', relative_days: null },
          },
          {
            ...baseCourses[1],
            course_id: 102,
            title: '相対期限講座',
            course_deadline: { fixed_date: null, relative_days: 30 },
          },
          {
            ...baseCourses[2],
            course_id: 103,
            title: '期限なし講座',
            course_deadline: null,
          },
        ],
      }),
    );

    // Act
    render(<InstructorCourseList />);

    // Assert
    expect(screen.getByText('2026-12-31まで')).toBeInTheDocument();
    expect(screen.getByText('開始日から30日後')).toBeInTheDocument();
    expect(screen.queryByText('期限なし')).not.toBeInTheDocument();
  });

  it('ページネーションは meta の current_page / last_page に基づいて表示される', () => {
    // Arrange
    render(<InstructorCourseList />);

    // Act

    // Assert
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByLabelText('ページネーション')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
});
