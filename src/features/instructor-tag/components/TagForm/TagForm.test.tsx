import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TagForm } from './TagForm';
import { useInstructorTag } from '@/features/instructor-tag/hooks/useInstructorTag';

vi.mock('@/features/instructor-tag/hooks/useInstructorTag');

afterEach(() => {
  vi.restoreAllMocks();
});

describe('講座分類登録フォーム', () => {
  // AC-ITAG-001
  it('分類タイトルが空のまま登録すると、入力を促すエラーが出て登録されない', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルが未入力です'),
    ).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ITAG-001
  it('分類タイトルが51文字のとき、文字数のエラーが出て登録されない', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText('分類タイトル'), 'あ'.repeat(51));
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルは50文字以内で入力してください'),
    ).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ITAG-002
  it('分類タイトルがちょうど50文字のとき、エラーが出ずに登録される', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText('分類タイトル'), 'あ'.repeat(50));
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    await waitFor(() => expect(log).toHaveBeenCalled());
    expect(
      screen.queryByText('分類タイトルは50文字以内で入力してください'),
    ).not.toBeInTheDocument();
  });
});

describe('講座分類編集フォーム', () => {
  // AC-ITAG-003
  it('編集画面を開くと、APIから取得した分類名が入力されている', () => {
    // Arrange
    vi.mocked(useInstructorTag).mockReturnValue({
      instructorTag: { tag_id: 1, content: 'APIから取得した分類名' },
      error: undefined,
      isLoading: false,
    });

    // Act
    render(<TagForm tagId="1" />);

    // Assert
    expect(screen.getByLabelText('分類タイトル')).toHaveValue(
      'APIから取得した分類名',
    );
  });

  // AC-ITAG-004
  it('削除を押すと、削除する分類の名前と元に戻せないことが確認ダイアログに出る', async () => {
    // Arrange
    render(<TagForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));

    // Assert
    expect(
      await screen.findByText(
        '「バックエンドマスター講座」を削除します。削除すると元に戻せません。',
      ),
    ).toBeInTheDocument();
  });

  // AC-ITAG-005
  it('削除を押して確認ダイアログで削除するを選ぶと、削除される', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.click(await screen.findByRole('button', { name: '削除する' }));

    // Assert
    expect(log).toHaveBeenCalledWith('講座分類を削除', { tagId: '1' });
  });

  // AC-ITAG-005
  it('削除を押して確認ダイアログでキャンセルを選ぶと、削除されない', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.click(await screen.findByRole('button', { name: 'キャンセル' }));

    // Assert
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ITAG-002
  it('分類タイトルを書き換えて更新を押すと、書き換えた内容で更新される', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    const input = screen.getByLabelText('分類タイトル');
    await user.clear(input);
    await user.type(input, 'フロントエンドマスター講座');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    await waitFor(() =>
      expect(log).toHaveBeenCalledWith('講座分類を更新', {
        tagId: '1',
        content: 'フロントエンドマスター講座',
      }),
    );
  });
});
