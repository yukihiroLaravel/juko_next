import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CourseForm } from './CourseForm';

if (typeof ResizeObserver === 'undefined') {
  globalThis.ResizeObserver = class implements ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('講座登録フォーム', () => {
  it('空のまま登録すると、タイトル・画像・分類のエラーが表示される', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    render(<CourseForm mode="create" />);

    await userEvent.setup().click(screen.getByRole('button', { name: '登録' }));

    expect(
      await screen.findByText('講座タイトルは必須です'),
    ).toBeInTheDocument();
    expect(screen.getByText('講座画像は必須です')).toBeInTheDocument();
    expect(screen.getByText('講座分類を選択してください')).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  it('一括日程を選んで日付なしで送信すると、日付のエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<CourseForm mode="create" />);

    await user.click(screen.getByLabelText('一括日程'));
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(
      await screen.findByText('日付を選択してください'),
    ).toBeInTheDocument();
  });

  it('開始日からの日数を選んで未選択のまま送信すると、日数のエラーが表示される', async () => {
    const user = userEvent.setup();
    render(<CourseForm mode="create" />);

    await user.click(screen.getByLabelText('開始日から○日後'));
    await user.click(screen.getByRole('button', { name: '登録' }));

    expect(
      await screen.findByText('日数を選択してください'),
    ).toBeInTheDocument();
  });

  it('受講期限を「なし」にすると、日付と日数のエラーが消える', async () => {
    const user = userEvent.setup();
    render(<CourseForm mode="create" />);

    await user.click(screen.getByLabelText('一括日程'));
    await user.click(screen.getByRole('button', { name: '登録' }));
    expect(
      await screen.findByText('日付を選択してください'),
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText('開始日から○日後'));
    await user.click(screen.getByRole('button', { name: '登録' }));
    expect(
      await screen.findByText('日数を選択してください'),
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText('なし'));
    expect(
      screen.queryByText('日付を選択してください'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('日数を選択してください'),
    ).not.toBeInTheDocument();
  });

  it.each([
    { capacity: 1, valid: true },
    { capacity: 100, valid: true },
    { capacity: 0, valid: false },
    { capacity: 101, valid: false },
  ])('定員$capacity の入力を正しく検証する', async ({ capacity, valid }) => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    const user = userEvent.setup();
    render(<CourseForm mode="edit" courseId="1" />);

    const capacityInput = screen.getByLabelText('講座定員');
    await user.clear(capacityInput);
    await user.type(capacityInput, String(capacity));
    await user.click(screen.getByRole('button', { name: '更新' }));

    if (valid) {
      await waitFor(() => expect(log).toHaveBeenCalled());
      expect(screen.queryByText(/定員は/)).not.toBeInTheDocument();
    } else {
      expect(await screen.findByText(/定員は/)).toBeInTheDocument();
      expect(log).not.toHaveBeenCalled();
    }
  });
});

describe('講座編集フォーム', () => {
  it('分類欄を表示せず、公開切り替えと削除ボタンを表示する', async () => {
    const user = userEvent.setup();
    render(<CourseForm mode="edit" courseId="1" />);

    expect(screen.queryByText(/講座分類名/)).not.toBeInTheDocument();
    const statusSwitch = screen.getByRole('switch', { name: '公開' });
    expect(statusSwitch).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '削除' })).toBeInTheDocument();

    await user.click(statusSwitch);
    expect(screen.getByRole('switch', { name: '非公開' })).toBeInTheDocument();
  });

  it('削除を押すと確認ダイアログが表示される', async () => {
    const user = userEvent.setup();
    render(<CourseForm mode="edit" courseId="1" />);

    await user.click(screen.getByRole('button', { name: '削除' }));

    expect(await screen.findByText('本当に実行しますか？')).toBeInTheDocument();
  });
});
