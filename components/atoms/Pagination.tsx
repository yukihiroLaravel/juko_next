type Props = {
  currentPage: number;
  count: number;
};

export const Pagination: React.FC<Props> = ({ currentPage, count }) => {
  // 最初と最後と現在のページの前後を表示する
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(count, currentPage + 2);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <button
          className="rounded bg-gray-200 px-3 py-1"
          disabled={currentPage === 1}
        >
          前へ
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 ${
              page === currentPage
                ? 'rounded bg-gray-200'
                : 'border border-gray-200 bg-white'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className="rounded bg-gray-200 px-3 py-1"
          disabled={currentPage === count}
        >
          次へ
        </button>
      </div>
    </div>
  );
};
