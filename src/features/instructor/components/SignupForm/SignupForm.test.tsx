import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SignupForm } from './SignupForm';
import { useRegisterInstructor } from '@/features/instructor/hooks/useRegisterInstructor';

vi.mock('@/features/instructor/hooks/useRegisterInstructor');

const registerInstructor = vi.fn();

// 1つのラベルが63文字以内に収まるようにして、指定した長さのメールアドレスを作る
function emailOfLength(length: number) {
  const local = 'a'.repeat(64);
  const domain = `${'b'.repeat(63)}.${'c'.repeat(63)}.`;
  const tld = 'com';
  const rest = length - local.length - 1 - domain.length - tld.length - 1;
  return `${local}@${domain}${'d'.repeat(rest)}.${tld}`;
}

async function fill(values: {
  nickName: string;
  lastName: string;
  firstName: string;
  email: string;
}) {
  const user = userEvent.setup();
  const entries: Array<[string, string]> = [
    ['講師名', values.nickName],
    ['姓', values.lastName],
    ['名', values.firstName],
    ['メールアドレス', values.email],
  ];
  for (const [label, value] of entries) {
    if (value === '') continue;
    await user.click(screen.getByLabelText(label));
    await user.paste(value);
  }
  await user.click(screen.getByRole('button', { name: '登録' }));
}

const valid = {
  nickName: 'やまだ先生',
  lastName: '山田',
  firstName: '太郎',
  email: 'teacher@example.com',
};

const nameFields = [
  ['講師名', 'nickName'],
  ['姓', 'lastName'],
  ['名', 'firstName'],
] as const;

const sentNotice = /宛てに認証コードを送信しました/;

describe('講師の新規登録（仮登録）', () => {
  beforeEach(() => {
    registerInstructor.mockReset();
    registerInstructor.mockResolvedValue({ success: true });
    vi.mocked(useRegisterInstructor).mockReturnValue({ registerInstructor });
  });

  // AC-ISIGNUP-001
  it('何も入力せずに登録を押すと、4項目それぞれに入力を促し、登録しない', async () => {
    // Arrange
    render(<SignupForm />);

    // Act
    await fill({ nickName: '', lastName: '', firstName: '', email: '' });

    // Assert
    expect(await screen.findByText('講師名は必須です')).toBeInTheDocument();
    expect(screen.getByText('姓は必須です')).toBeInTheDocument();
    expect(screen.getByText('名は必須です')).toBeInTheDocument();
    expect(screen.getByText('メールアドレスは必須です')).toBeInTheDocument();
    expect(registerInstructor).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-001
  it.each(nameFields)(
    '%sが51文字のとき、50文字以内で入力するよう促し、登録しない',
    async (label, field) => {
      // Arrange
      render(<SignupForm />);

      // Act
      await fill({ ...valid, [field]: 'あ'.repeat(51) });

      // Assert
      expect(
        await screen.findByText(`${label}は50文字以内で入力してください`),
      ).toBeInTheDocument();
      expect(registerInstructor).not.toHaveBeenCalled();
    },
  );

  // AC-ISIGNUP-001
  it.each(nameFields)(
    '%sに空白だけを入力したとき、入力を促し、登録しない',
    async (label, field) => {
      // Arrange
      render(<SignupForm />);

      // Act
      await fill({ ...valid, [field]: '   ' });

      // Assert
      expect(await screen.findByText(`${label}は必須です`)).toBeInTheDocument();
      expect(registerInstructor).not.toHaveBeenCalled();
    },
  );

  // AC-ISIGNUP-001
  it('メールアドレスの形式が正しくないとき、その旨を示し、登録しない', async () => {
    // Arrange
    render(<SignupForm />);

    // Act
    await fill({ ...valid, email: 'teacher.example.com' });

    // Assert
    expect(
      await screen.findByText('メールアドレスの形式が正しくありません'),
    ).toBeInTheDocument();
    expect(registerInstructor).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-001
  it('メールアドレスが256文字のとき、255文字以内で入力するよう促し、登録しない', async () => {
    // Arrange
    render(<SignupForm />);

    // Act
    await fill({ ...valid, email: emailOfLength(256) });

    // Assert
    expect(
      await screen.findByText('メールアドレスは255文字以内で入力してください'),
    ).toBeInTheDocument();
    expect(registerInstructor).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-002
  it('講師名・姓・名がちょうど50文字、メールアドレスがちょうど255文字なら登録でき、認証コードを送った案内に切り替わる', async () => {
    // Arrange
    const email = emailOfLength(255);
    render(<SignupForm />);

    // Act
    await fill({
      nickName: 'あ'.repeat(50),
      lastName: 'い'.repeat(50),
      firstName: 'う'.repeat(50),
      email,
    });

    // Assert
    expect(
      await screen.findByText(
        new RegExp(`${email} 宛てに認証コードを送信しました`),
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: '登録' }),
    ).not.toBeInTheDocument();
    expect(registerInstructor).toHaveBeenCalledWith(
      expect.objectContaining({
        nickName: 'あ'.repeat(50),
        lastName: 'い'.repeat(50),
        firstName: 'う'.repeat(50),
        email,
      }),
    );
  });

  // AC-ISIGNUP-008
  it('仮登録に失敗すると、フォームの上に失敗した旨が出て、案内に切り替わらない', async () => {
    // Arrange
    registerInstructor.mockResolvedValue({
      success: false,
      error: '仮登録に失敗しました',
    });
    render(<SignupForm />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByRole('alert')).toHaveTextContent(
      '仮登録に失敗しました',
    );
    expect(screen.queryByText(sentNotice)).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-007
  it('すでに登録されているメールアドレスだと、メールアドレスの欄の下に理由が出て、案内に切り替わらない', async () => {
    // Arrange
    const message = 'このメールアドレスはすでに登録されています';
    registerInstructor.mockResolvedValue({
      success: false,
      error: message,
      fieldErrors: { email: message },
    });
    render(<SignupForm />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByLabelText('メールアドレス')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(screen.queryByText(sentNotice)).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-007
  it('サーバーが講師名の誤りを返すと、講師名の欄の下に理由が出る', async () => {
    // Arrange
    const message = '講師名は50文字以内で入力してください';
    registerInstructor.mockResolvedValue({
      success: false,
      error: message,
      fieldErrors: { nickName: message },
    });
    render(<SignupForm />);

    // Act
    await fill(valid);

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.getByLabelText('講師名')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-007
  it('仮登録に失敗したあと、すでに登録されているメールアドレスで送り直すと、上の失敗の表示が消え、メールアドレスの欄の下にだけ理由が出る', async () => {
    // Arrange
    const message = 'このメールアドレスはすでに登録されています';
    registerInstructor
      .mockResolvedValueOnce({ success: false, error: '仮登録に失敗しました' })
      .mockResolvedValueOnce({
        success: false,
        error: message,
        fieldErrors: { email: message },
      });
    render(<SignupForm />);
    await fill(valid);
    // 1回目の失敗が上の枠に出ていることを、送り直す前に確かめておく
    expect(await screen.findByRole('alert')).toHaveTextContent(
      '仮登録に失敗しました',
    );

    // Act
    await userEvent.setup().click(screen.getByRole('button', { name: '登録' }));

    // Assert
    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  // AC-ISIGNUP-011
  it('登録の処理中は、ボタンが「登録中...」になり、もう一度登録を押せない', async () => {
    // Arrange
    // 処理中のまま止めておき、確認が終わったら finish で終わらせる
    let finish: (result: { success: true }) => void = () => {};
    registerInstructor.mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    render(<SignupForm />);

    // Act
    await fill(valid);

    // Assert
    expect(
      await screen.findByRole('button', { name: '登録中...' }),
    ).toBeDisabled();

    // 後片付け: 処理を終わらせ、処理中の状態を次のテストに持ち越さない
    finish({ success: true });
    expect(await screen.findByText(sentNotice)).toBeInTheDocument();
  });
});
