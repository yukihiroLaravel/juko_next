import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RegisteredNotice } from './RegisteredNotice';

const navigation = vi.hoisted(() => ({
  searchParams: new URLSearchParams(),
}));

vi.mock('next/navigation', () => ({
  useSearchParams: () => navigation.searchParams,
}));

describe('講師ログインの画面の、本登録が完了した旨の案内', () => {
  // AC-ISIGNUP-010
  it('本登録のあとに講師ログインの画面へ移ってきたとき、本登録が完了した旨の案内が出る', () => {
    // Arrange
    navigation.searchParams = new URLSearchParams('registered=1');

    // Act
    render(<RegisteredNotice />);

    // Assert
    expect(
      screen.getByText(
        '本登録が完了しました。登録したメールアドレスとパスワードでログインしてください。',
      ),
    ).toBeInTheDocument();
  });

  // AC-ISIGNUP-010
  it('ふつうに講師ログインの画面を開いたときは、案内が出ない', () => {
    // Arrange
    navigation.searchParams = new URLSearchParams();

    // Act
    render(<RegisteredNotice />);

    // Assert
    expect(screen.queryByText(/本登録が完了しました/)).not.toBeInTheDocument();
  });
});
