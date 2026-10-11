import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TagForm } from './TagForm';
import { useCreateInstructorTag } from '@/features/instructor-tag/hooks/useCreateInstructorTag';

vi.mock('@/features/instructor-tag/hooks/useCreateInstructorTag');

const createInstructorTag = vi.fn();

beforeEach(() => {
  createInstructorTag.mockReset();
  createInstructorTag.mockResolvedValue({ success: true });
  vi.mocked(useCreateInstructorTag).mockReturnValue({ createInstructorTag });
});

describe('講座分類登録フォーム', () => {
  // AC-ITAG-001
  it('分類タイトルが空のまま登録すると、入力を促すエラーが出て登録されない', async () => {
    // Arrange
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルが未入力です'),
    ).toBeInTheDocument();
    expect(createInstructorTag).not.toHaveBeenCalled();
  });

  // AC-ITAG-001
  it('分類タイトルが51文字のとき、文字数のエラーが出て登録されない', async () => {
    // Arrange
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText('分類タイトル'), 'あ'.repeat(51));
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(
      await screen.findByText('分類タイトルは50文字以内で入力してください'),
    ).toBeInTheDocument();
    expect(createInstructorTag).not.toHaveBeenCalled();
  });

  // AC-ITAG-002
  it('分類タイトルがちょうど50文字のとき、エラーが出ずに登録される', async () => {
    // Arrange
    render(<TagForm />);
    const user = userEvent.setup();

    // Act
    await user.type(screen.getByLabelText('分類タイトル'), 'あ'.repeat(50));
    await user.click(screen.getByRole('button', { name: '登録' }));

    // Assert
    await waitFor(() =>
      expect(createInstructorTag).toHaveBeenCalledWith({
        content: 'あ'.repeat(50),
      }),
    );
    expect(
      screen.queryByText('分類タイトルは50文字以内で入力してください'),
    ).not.toBeInTheDocument();
  });
});
