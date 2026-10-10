import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TagEditForm } from './TagEditForm';
import { useInstructorTag } from '@/features/instructor-tag/hooks/useInstructorTag';
import { useUpdateInstructorTag } from '@/features/instructor-tag/hooks/useUpdateInstructorTag';
import { useDeleteInstructorTag } from '@/features/instructor-tag/hooks/useDeleteInstructorTag';

vi.mock('@/features/instructor-tag/hooks/useInstructorTag');
vi.mock('@/features/instructor-tag/hooks/useUpdateInstructorTag');
vi.mock('@/features/instructor-tag/hooks/useDeleteInstructorTag');

const updateInstructorTag = vi.fn();
const deleteInstructorTag = vi.fn();

function mockUseInstructorTag(content: string) {
  vi.mocked(useInstructorTag).mockReturnValue({
    instructorTag: { tag_id: 1, content },
  });
}

beforeEach(() => {
  updateInstructorTag.mockReset();
  updateInstructorTag.mockResolvedValue({ success: true });
  deleteInstructorTag.mockReset();
  deleteInstructorTag.mockResolvedValue({ success: true });
  vi.mocked(useUpdateInstructorTag).mockReturnValue({ updateInstructorTag });
  vi.mocked(useDeleteInstructorTag).mockReturnValue({ deleteInstructorTag });
});

describe('講座分類編集フォーム', () => {
  // AC-ITAG-003
  it('編集画面を開くと、APIから取得した分類名が入力されている', () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');

    // Act
    render(<TagEditForm tagId="1" />);

    // Assert
    expect(screen.getByLabelText('分類タイトル')).toHaveValue(
      'APIから取得した分類名',
    );
  });

  // AC-ITAG-004
  it('削除を押すと、取得した分類名と元に戻せないことが確認ダイアログに出る', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));

    // Assert
    expect(
      await screen.findByText(
        '「APIから取得した分類名」を削除します。削除すると元に戻せません。',
      ),
    ).toBeInTheDocument();
  });

  // AC-ITAG-005
  it('削除を押して確認ダイアログで削除するを選ぶと、削除される', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.click(await screen.findByRole('button', { name: '削除する' }));

    // Assert
    await waitFor(() =>
      expect(deleteInstructorTag).toHaveBeenCalledWith({ tagId: '1' }),
    );
  });

  // AC-ITAG-005
  it('削除を押して確認ダイアログでキャンセルを選ぶと、削除されない', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.click(await screen.findByRole('button', { name: 'キャンセル' }));

    // Assert
    expect(deleteInstructorTag).not.toHaveBeenCalled();
  });

  // AC-ITAG-002
  it('分類タイトルを書き換えて更新を押すと、書き換えた内容で更新される', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    const input = screen.getByLabelText('分類タイトル');
    await user.clear(input);
    await user.type(input, 'フロントエンドマスター講座');
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    await waitFor(() =>
      expect(updateInstructorTag).toHaveBeenCalledWith({
        tagId: '1',
        content: 'フロントエンドマスター講座',
      }),
    );
  });

  // AC-ITAG-001
  it('分類タイトルを空にして更新を押すと、入力を促すエラーが出て更新されない', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.clear(screen.getByLabelText('分類タイトル'));
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルが未入力です'),
    ).toBeInTheDocument();
    expect(updateInstructorTag).not.toHaveBeenCalled();
  });

  // AC-ITAG-001
  it('分類タイトルが51文字のとき、文字数のエラーが出て更新されない', async () => {
    // Arrange
    mockUseInstructorTag('APIから取得した分類名');
    render(<TagEditForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    const input = screen.getByLabelText('分類タイトル');
    await user.clear(input);
    await user.type(input, 'あ'.repeat(51));
    await user.click(screen.getByRole('button', { name: '更新' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルは50文字以内で入力してください'),
    ).toBeInTheDocument();
    expect(updateInstructorTag).not.toHaveBeenCalled();
  });
});
