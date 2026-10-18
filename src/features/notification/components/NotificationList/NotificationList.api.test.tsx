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
  const cache = new Map<string, { data?: unknown; error?: unknown }>();
  const view = await act(async () =>
    render(
      <SWRConfig
        value={{
          provider: () => cache,
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
  return { ...view, cache };
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

describe('お知らせ詳細のAPI連携', () => {
  // AC-SNLIST-013
  it('既読登録の送信中に開き直しても数値IDの送信は1回で、成功後に一覧を取り直す', async () => {
    // Arrange
    let finish!: (value: unknown) => void;
    vi.mocked(Axios.post).mockReturnValue(
      new Promise((resolve) => {
        finish = resolve;
      }),
    );
    const user = userEvent.setup();
    await renderList();
    // Act
    await screen.findByText(item.title);
    await performUserAction(() => user.click(screen.getByText(item.title)));
    expect(await screen.findByText(detail.content)).toBeInTheDocument();
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(Axios.post).toHaveBeenCalledTimes(1);
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/notifications/mark-read', {
      notification_id: 4,
    });
    const listRequestsBeforeSuccess = vi
      .mocked(Axios.get)
      .mock.calls.filter(([url]) =>
        url.startsWith('/api/v1/notifications/index?'),
      ).length;
    // Act
    await act(async () => {
      finish({ data: { result: true } });
    });
    // Assert
    await waitFor(() =>
      expect(
        vi
          .mocked(Axios.get)
          .mock.calls.filter(([url]) =>
            url.startsWith('/api/v1/notifications/index?'),
          ).length,
      ).toBeGreaterThan(listRequestsBeforeSuccess),
    );
    expect(
      await within(screen.getByRole('dialog')).findByText(detail.content),
    ).toBeInTheDocument();
  });

  // AC-SNLIST-014
  it('既読登録に失敗しても詳細を表示し、開き直しても再送せず一覧を再検証しない', async () => {
    // Arrange
    const log = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.mocked(Axios.post).mockRejectedValue(new Error('通信失敗'));
    const user = userEvent.setup();
    await renderList();
    // Act
    await screen.findByText(item.title);
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(await screen.findByText(detail.content)).toBeInTheDocument();
    await waitFor(() =>
      expect(log).toHaveBeenCalledWith('既読登録に失敗しました', {
        notificationId: item.notification_id,
        reason: '予期しないエラーが発生しました',
      }),
    );
    expect(errorLog).not.toHaveBeenCalled();
    expect(
      within(screen.getByRole('dialog')).queryByRole('alert'),
    ).not.toBeInTheDocument();
    // Act
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(Axios.post).toHaveBeenCalledTimes(1);
    expect(errorLog).not.toHaveBeenCalled();
    expect(
      vi
        .mocked(Axios.get)
        .mock.calls.filter(([url]) =>
          url.startsWith('/api/v1/notifications/index?'),
        ),
    ).toHaveLength(1);
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
  it('詳細の取得に失敗したあと、再試行すると実際に詳細を取得し直せる', async () => {
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
    expect(
      vi
        .mocked(Axios.get)
        .mock.calls.filter(([url]) => url === '/api/v1/notifications/4'),
    ).toHaveLength(2);
    expect(Axios.post).toHaveBeenCalledTimes(1);
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
    expect(
      vi
        .mocked(Axios.get)
        .mock.calls.filter(([url]) => url === '/api/v1/notifications/4'),
    ).toHaveLength(2);
  });

  // AC-SNLIST-012
  it('正常取得した詳細は閉じてもキャッシュを保持し、開き直しても表示できる', async () => {
    // Arrange
    const user = userEvent.setup();
    const { cache } = await renderList();
    await performUserAction(() => user.click(screen.getByText(item.title)));
    await screen.findByText(detail.content);
    const cachedData = cache.get('/api/v1/notifications/4')?.data;
    expect(cachedData).toEqual({ data: detail });
    // Act
    await performUserAction(() =>
      user.click(screen.getAllByRole('button', { name: '閉じる' })[0]),
    );
    // Assert
    expect(cache.get('/api/v1/notifications/4')?.data).toBe(cachedData);
    // Act
    await performUserAction(() => user.click(screen.getByText(item.title)));
    // Assert
    expect(
      await within(screen.getByRole('dialog')).findByText(detail.content),
    ).toBeInTheDocument();
    expect(
      vi
        .mocked(Axios.get)
        .mock.calls.filter(([url]) => url === '/api/v1/notifications/4'),
    ).toHaveLength(1);
    expect(Axios.post).toHaveBeenCalledTimes(1);
  });
});
