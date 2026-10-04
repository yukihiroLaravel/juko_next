import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { TagForm } from './TagForm';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('講座分類登録フォーム', () => {
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
  it('編集画面を開くと、今の分類名が入力されている', () => {
    // Arrange
    // （準備なし）

    // Act
    render(<TagForm tagId="1" />);

    // Assert
    expect(screen.getByLabelText('分類タイトル')).toHaveValue(
      'バックエンドマスター講座',
    );
  });

  it('削除を押して確認ダイアログで実行を選ぶと、削除される', async () => {
    // Arrange
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<TagForm tagId="1" />);
    const user = userEvent.setup();

    // Act
    await user.click(screen.getByRole('button', { name: '削除' }));
    await user.click(await screen.findByRole('button', { name: '実行' }));

    // Assert
    expect(log).toHaveBeenCalledWith('講座分類を削除', { tagId: '1' });
  });

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
});