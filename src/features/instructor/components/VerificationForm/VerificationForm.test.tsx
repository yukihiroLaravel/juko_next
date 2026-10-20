import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { VerificationForm } from './VerificationForm';
import { useVerifyInstructor } from '@/features/instructor/hooks/useVerifyInstructor';

const navigation = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: navigation.push }),
}));

vi.mock('@/features/instructor/hooks/useVerifyInstructor');

const verifyInstructor = vi.fn();

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

const restartLink = { name: '仮登録からやり直す' };

const tryCountOverError =
  '認証コードの誤りが上限を超えたため、この仮登録は無効になりました。お手数ですが、仮登録からやり直してください';
const expiredError =
  '認証コードの有効期限（60分）が切れたため、この仮登録は無効になりました。お手数ですが、仮登録からやり直してください';
const notFoundError =
  'この URL の仮登録が見つかりません。無効になったか、URL が誤っている可能性があります。仮登録からやり直してください';

describe('講師の新規登録（認証コード入力）', () => {
  beforeEach(() => {
    navigation.push.mockReset();
    verifyInstructor.mockReset();
    verifyInstructor.mockResolvedValue({ success: true });
    vi.mocked(useVerifyInstructor).mockReturnValue({ verifyInstructor });
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
    expect(verifyInstructor).not.toHaveBeenCalled();
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
      expect(verifyInstructor).not.toHaveBeenCalled();
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
    expect(verifyInstructor).not.toHaveBeenCalled();
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
    expect(verifyInstructor).not.toHaveBeenCalled();
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
      expect(verifyInstructor).toHaveBeenCalledWith(
        token,
        expect.objectContaining({ code: 'aB3x', password: 'abcd1234' }),
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

  // AC-ISIGNUP-010
  it('本登録に成功すると、講師ログインの画面に移る', async () => {
    // Arrange
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith(
        '/instructor/login?registered=1',
      ),
    );
  });

  // AC-ISIGNUP-008
  it('認証コードが正しくないと、その旨がフォームの上に出て、仮登録からやり直すリンクは出ず、入力し直せる', async () => {
    // Arrange
    const message =
      '認証コードが正しくありません。メールに記載の認証コードを確かめて、もう一度入力してください';
    verifyInstructor.mockResolvedValue({ success: false, error: message });
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(message);
    expect(screen.queryByRole('link', restartLink)).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '登録' })).toBeEnabled();
    expect(navigation.push).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-009
  it.each([
    ['認証コードの誤りが上限を超えた', tryCountOverError],
    ['認証コードの有効期限が切れた', expiredError],
    ['URL の仮登録が見つからない', notFoundError],
  ])(
    '%sとき、その旨と、仮登録の画面へ移るリンクが出る',
    async (_situation, message) => {
      // Arrange
      verifyInstructor.mockResolvedValue({
        success: false,
        error: message,
        needsRestart: true,
      });
      render(<VerificationForm token={token} />);

      // Act
      await fill(valid);

      // Assert
      expect(await screen.findByRole('alert')).toHaveTextContent(message);
      expect(screen.getByRole('link', restartLink)).toHaveAttribute(
        'href',
        '/instructor/signup',
      );
      expect(navigation.push).not.toHaveBeenCalled();
    },
  );

  // AC-ISIGNUP-007
  it('サーバーが認証コードの誤りを返すと、認証コードの欄の下に理由が出る', async () => {
    // Arrange
    const message = '認証コードは4文字で入力してください（サーバー）';
    verifyInstructor.mockResolvedValue({
      success: false,
      error: message,
      fieldErrors: { code: message },
    });
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByLabelText('認証コード')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-007
  it('サーバーがパスワードの誤りを返すと、パスワードの欄の下に理由が出る', async () => {
    // Arrange
    const message = 'パスワードとパスワード再入力が一致しません（サーバー）';
    verifyInstructor.mockResolvedValue({
      success: false,
      error: message,
      fieldErrors: { password: message },
    });
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByLabelText('パスワード')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-007
  it('失敗のあとに送り直すと、前回の失敗の表示と仮登録からやり直すリンクが消える', async () => {
    // Arrange
    const message = '認証コードは4文字で入力してください（サーバー）';
    verifyInstructor
      .mockResolvedValueOnce({
        success: false,
        error: tryCountOverError,
        needsRestart: true,
      })
      .mockResolvedValueOnce({
        success: false,
        error: message,
        fieldErrors: { code: message },
      });
    render(<VerificationForm token={token} />);
    await fill(valid);
    // 1回目の失敗とリンクが出ていることを、送り直す前に確かめておく
    expect(await screen.findByRole('link', restartLink)).toBeInTheDocument();

    // Act
    await userEvent.setup().click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', restartLink)).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-011
  it('本登録の処理中は、ボタンが「登録中...」になり、もう一度登録を押せない', async () => {
    // Arrange
    // 処理中のまま止めておき、確認が終わったら finish で終わらせる
    let finish: (result: { success: true }) => void = () => {};
    verifyInstructor.mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    render(<VerificationForm token={token} />);

    // Act
    await fill(valid);

    // Assert
    expect(
      await screen.findByRole('button', { name: '登録中...' }),
    ).toBeDisabled();

    // 後片付け: 処理を終わらせ、処理中の状態を次のテストに持ち越さない
    finish({ success: true });
    await waitFor(() => expect(navigation.push).toHaveBeenCalled());
  });
});
