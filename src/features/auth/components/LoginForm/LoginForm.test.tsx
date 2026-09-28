import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { LoginForm } from './LoginForm';

vi.mock('@/features/auth/hooks/useLogin');

const login = vi.fn();

function mockUseLogin(state: { isSubmitting: boolean }) {
  vi.mocked(useLogin).mockReturnValue({ login, ...state });
}

async function submit(email: string, password: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText('メールアドレス'), email);
  await user.type(screen.getByLabelText('パスワード'), password);
  await user.click(screen.getByRole('button', { name: 'ログイン' }));
}

describe('ログインフォーム', () => {
  beforeEach(() => {
    login.mockReset();
    mockUseLogin({ isSubmitting: false });
  });

  it('ログインに失敗したとき、失敗の理由が表示されパスワードが空に戻る', async () => {
    // Arrange
    login.mockResolvedValue({
      success: false,
      error: 'メールアドレスまたはパスワードが正しくありません',
    });
    render(<LoginForm />);

    // Act
    await submit('student@example.com', 'wrong-password');

    // Assert
    expect(
      await screen.findByText(
        'メールアドレスまたはパスワードが正しくありません',
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toHaveValue('');
  });

  it('パスワードが8文字に満たないとき、ログインを試みずに入力を促す', async () => {
    // Arrange
    render(<LoginForm />);

    // Act
    await submit('student@example.com', '1234567');

    // Assert
    expect(
      await screen.findByText('パスワードは8文字以上で入力してください'),
    ).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  it('ログインの処理中は、もう一度ログインを押せない', () => {
    // Arrange
    mockUseLogin({ isSubmitting: true });

    // Act
    render(<LoginForm />);

    // Assert
    expect(
      screen.getByRole('button', { name: 'ログイン中...' }),
    ).toBeDisabled();
  });
});
