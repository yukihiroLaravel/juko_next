import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { SignupForm } from './SignupForm';

// 登録は API とつなぐまで console.log に出すだけなので、出たかどうかで登録の実行を見る
let log: ReturnType<typeof vi.spyOn>;

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

describe('講師の新規登録（仮登録）', () => {
  beforeEach(() => {
    log = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    expect(log).not.toHaveBeenCalled();
  });

  // AC-ISIGNUP-001
  it.each([
    ['講師名', 'nickName'],
    ['姓', 'lastName'],
    ['名', 'firstName'],
  ] as const)(
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
      expect(log).not.toHaveBeenCalled();
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
    expect(log).not.toHaveBeenCalled();
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
    expect(log).not.toHaveBeenCalled();
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
    expect(log).toHaveBeenCalled();
  });
});
