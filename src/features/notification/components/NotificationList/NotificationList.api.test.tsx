import { Suspense } from 'react';
import {
  act,
  configure,
  getConfig,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SWRConfig } from 'swr';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { Axios } from '@/lib/api';
import { NotificationList } from './NotificationList';

vi.mock('@/lib/api', () => ({ Axios: { get: vi.fn(), post: vi.fn() } }));

const item = {
  notification_id: 4,
  course_id: 1,
  instructor_id: 1,
  course_title: 'PHP入門講座',
  title: 'お知らせの一覧タイトル',
  type: 'once',
  read_status: 'unread',
  content: '一覧の本文',
  instructor_nick_name: null,
  start_date: '2026-10-01 10:00:00',
  end_date: '2026-12-31 23:59:59',
};
const detail = {
  ...item,
  title: 'お知らせの詳細タイトル',
  content: '詳細の本文',
  attendance_deadline: null,
};
const listing = {
  data: { notifications: [item], pagination: { page: 1, total: 1 } },
};

async function renderList() {
  return await act(async () =>
    render(
      <SWRConfig
        value={{
          provider: () => new Map(),
          shouldRetryOnError: false,
          revalidateOnFocus: false,
        }}
      >
        <Suspense fallback="一覧を読み込み中">
          <NotificationList />
        </Suspense>
      </SWRConfig>,
    ),
  );
}

// Suspense を起こす操作は非同期 act で完了まで待つ。
// user-event の既定ラッパーによる環境フラグの切り替えと重ねない。
async function performUserAction(action: () => Promise<void>) {
  const { asyncWrapper } = getConfig();
  configure({ asyncWrapper: (callback) => callback() });
  try {
    await act(async () => {
      await action();
    });
  } finally {
    configure({ asyncWrapper });
  }
}

beforeAll(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  vi.mocked(Axios.get).mockReset();
  vi.mocked(Axios.post).mockReset();
  vi.mocked(Axios.get).mockImplementation(async (url) => ({
    data: url.startsWith('/api/v1/notifications/index?')
      ? listing
      : { data: detail },
  }));
  vi.mocked(Axios.post).mockResolvedValue({ data: { result: true } });
});

// 一覧の取得件数（取り直したかどうかを確かめる）
function countListRequests() {
  return vi
    .mocked(Axios.get)
    .mock.calls.filter(([url]) =>
      url.startsWith('/api/v1/notifications/index?'),
    ).length;
}

// 詳細の取得件数（取り直したかどうかを確かめる）
function countDetailRequests() {
  return vi
    .mocked(Axios.get)
    .mock.calls.filter(([url]) => url === '/api/v1/notifications/4').length;
}

describe('お知らせ詳細とSWRのキャッシュ', () => {
  // AC-SNLIST-016
  it('確認済みの記録の送信に成功すると一覧を取り直し、詳細の表示を続ける', async () => {
    // Arrange
    let finish!: (value: unknown) => void;
    vi.mocked(Axios.post).mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const user = userEvent.setup();
    await renderList();
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText(detail.content);
    const listRequestsBeforeSuccess = countListRequests();
    // Act
    await act(async () => {
      finish({ data: { result: true } });
    });
    // Assert
    await waitFor(() =>
      expect(countListRequests()).toBeGreaterThan(listRequestsBeforeSuccess),
    );
    expect(
      within(screen.getByRole('dialog')).getByText(detail.content),
    ).toBeInTheDocument();
  });

  // AC-SNLIST-016
  it('確認済みの記録の送信に失敗したときは一覧を取り直さない', async () => {
    // Arrange
    const warning = vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.mocked(Axios.post).mockRejectedValue(new Error('通信失敗'));
    const user = userEvent.setup();
    await renderList();
    // Act
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    await screen.findByText(detail.content);
    await waitFor(() => expect(warning).toHaveBeenCalled());
    expect(countListRequests()).toBe(1);
  });

  // AC-SNLIST-008
  it('一覧の再検証で選んだ行が消えても詳細と閉じる操作を維持する', async () => {
    // Arrange
    let finish!: (value: unknown) => void;
    vi.mocked(Axios.post).mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const user = userEvent.setup();
    await renderList();
    await screen.findByText(item.title);
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText(detail.content);
    // Act
    vi.mocked(Axios.get).mockImplementation(async (url) => ({
      data: url.startsWith('/api/v1/notifications/index?')
        ? { data: { notifications: [], pagination: { page: 1, total: 0 } } }
        : { data: detail },
    }));
    await act(async () => {
      finish({ data: { result: true } });
    });
    // Assert
    await screen.findByText('現在、お知らせはありません。');
    expect(
      within(screen.getByRole('dialog')).getByText(detail.content),
    ).toBeInTheDocument();
    // Act
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    // Assert
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  // AC-SNLIST-012
  it('詳細の取得に失敗したあと、再試行すると詳細を表示する', async () => {
    // Arrange
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(Axios.get).mockImplementation(async (url) => {
      if (url.startsWith('/api/v1/notifications/index?'))
        return { data: listing };
      throw new Error('詳細の取得失敗');
    });
    const user = userEvent.setup();
    await renderList();
    // Act
    await screen.findByText(item.title);
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(
      await screen.findByText('お知らせの取得に失敗しました。'),
    ).toBeInTheDocument();
    // Act
    vi.mocked(Axios.get).mockImplementation(async (url) => ({
      data: url.startsWith('/api/v1/notifications/index?')
        ? listing
        : { data: detail },
    }));
    await performUserAction(() =>
      user.click(screen.getByRole('button', { name: '再試行' })),
    );
    // Assert
    expect(await screen.findByText(detail.content)).toBeInTheDocument();
  });

  // AC-SNLIST-012
  it('詳細取得に失敗しても、閉じて開き直すと再取得し詳細を表示する', async () => {
    // Arrange
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(Axios.get).mockImplementation(async (url) => {
      if (url.startsWith('/api/v1/notifications/index?'))
        return { data: listing };
      throw new Error('詳細の取得失敗');
    });
    const user = userEvent.setup();
    await renderList();
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText('お知らせの取得に失敗しました。');
    // Act
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    vi.mocked(Axios.get).mockImplementation(async (url) => ({
      data: url.startsWith('/api/v1/notifications/index?')
        ? listing
        : { data: detail },
    }));
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(
      await within(screen.getByRole('dialog')).findByText(detail.content),
    ).toBeInTheDocument();
    expect(countDetailRequests()).toBe(2);
  });

  // AC-SNLIST-012
  it('読み込み中に閉じたあと詳細取得に失敗しても、開き直すと再取得し詳細を表示する', async () => {
    // Arrange
    vi.spyOn(console, 'error').mockImplementation(() => {});
    let rejectDetail: (error: Error) => void = () => {};
    vi.mocked(Axios.get).mockImplementation(async (url) => {
      if (url.startsWith('/api/v1/notifications/index?'))
        return { data: listing };
      return new Promise((_, reject) => {
        rejectDetail = reject;
      });
    });
    const user = userEvent.setup();
    await renderList();
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText('お知らせを読み込んでいます。');
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    await act(async () => {
      rejectDetail(new Error('詳細の取得失敗'));
    });
    vi.mocked(Axios.get).mockImplementation(async (url) => ({
      data: url.startsWith('/api/v1/notifications/index?')
        ? listing
        : { data: detail },
    }));
    // Act
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(
      await within(screen.getByRole('dialog')).findByText(detail.content),
    ).toBeInTheDocument();
    expect(countDetailRequests()).toBe(2);
  });

  // AC-SNLIST-017
  it('詳細を取得できたお知らせは、閉じて開き直しても取り直さずに表示する', async () => {
    // Arrange
    const user = userEvent.setup();
    await renderList();
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText(detail.content);
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    // Act
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(
      await within(screen.getByRole('dialog')).findByText(detail.content),
    ).toBeInTheDocument();
    expect(countDetailRequests()).toBe(1);
  });
});
