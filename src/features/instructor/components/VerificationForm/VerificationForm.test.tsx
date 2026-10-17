import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { VerificationForm } from './VerificationForm';

// 登録は API とつなぐまで console.log に出すだけなので、出たかどうかで登録の実行を見る
let log: ReturnType<typeof vi.spyOn>;

const token = 'abcDEF1234';

async function fill(values: {
  code: string;
  password: string;
  passwordConfirmation: string;
}) {
  const user = userEvent.setup();
  const entries: Array<[string, string]> = [
    ['認証コード', values.code],
    ['パスワード', values.password],
    ['パスワード再入力', values.passwordConfirmation],
  ];
  for (const [label, value] of entries) {
    if (value === '') continue;
    await user.type(screen.getByLabelText(label), value);
  }
  await user.click(screen.getByRole('button', { name: '登録' }));
}

const valid = {
  code: 'aB3x',
  password: 'abcd1234',
  passwordConfirmation: 'abcd1234',
};

describe('講師の新規登録（認証コード入力）', () => {
  beforeEach(() => {
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // AC-ISIGNUP-003
  it('何も入力せずに登録を押すと、3項目それぞれに入力を促し、登録しない', async () => {
    // Arrange
    render(<VerificationForm token={token} />);

    // Act
    await fill({ code: '', password: '', passwordConfirmation: '' });

    // Assert
    expect(await screen.findByText('認証コードは必須です')).toBeInTheDocument();
    expect(screen.getByText('パスワードは必須です')).toBeInTheDocument();
    expect(screen.getByText('パスワード再入力は必須です')).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-003
  it.each(['aB3', 'aB3xY'])(
    '認証コードが4文字でない（%s）とき、4文字で入力するよう促し、登録しない',
    async (code) => {
      // Arrange
      render(<VerificationForm token={token} />);

      // Act
      await fill({ ...valid, code });

      // Assert
      expect(
        await screen.findByText('認証コードは4文字で入力してください'),
      ).toBeInTheDocument();
      expect(log).not.toHaveBeenCalled();
    },
  );

  // AC-ISIGNUP-003
  it('パスワードが7文字のとき、8文字以上で入力するよう促し、登録しない', async () => {
    // Arrange
    render(<VerificationForm token={token} />);

    // Act
    await fill({
      ...valid,
      password: 'abcd123',
      passwordConfirmation: 'abcd123',
    });

    // Assert
    expect(
      await screen.findByText('パスワードは8文字以上で入力してください'),
    ).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-003
  it('パスワード再入力がパスワードと一致しないとき、その旨を示し、登録しない', async () => {
    // Arrange
    render(<VerificationForm token={token} />);

    // Act
    await fill({ ...valid, passwordConfirmation: 'abcd1235' });

    // Assert
    expect(
      await screen.findByText('パスワードが一致しません'),
    ).toBeInTheDocument();
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-004
  it('大文字と小文字が混ざった4文字の認証コードとちょうど8文字のパスワードなら、認証コードを入力したままの形で登録する', async () => {
    // Arrange
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    expect(screen.getByLabelText('認証コード')).toHaveValue('aB3x');
    await waitFor(() =>
      expect(log).toHaveBeenCalledWith(
        'submit data:',
        expect.objectContaining({ token, code: 'aB3x', password: 'abcd1234' }),
      ),
    );
  });

  // AC-ISIGNUP-005
  it('URL の token は画面に表示しない', () => {
    // Arrange
    // Act
    render(<VerificationForm token={token} />);

    // Assert
    expect(screen.getByLabelText('認証コード')).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(token))).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-006
  it('パスワードとパスワード再入力は、入力した文字を伏せて表示する', () => {
    // Arrange
    // Act
    render(<VerificationForm token={token} />);

    // Assert
    expect(screen.getByLabelText('パスワード')).toHaveAttribute(
      'type',
      'password',
    );
    expect(screen.getByLabelText('パスワード再入力')).toHaveAttribute(
      'type',
      'password',
    );
  });
});
