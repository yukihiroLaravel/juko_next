import { Button } from '../elements/Button';

type Props = {
  currentPage: number;
  total: number;
  goToPage: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({
  currentPage,
  total,
  goToPage,
}) => {
  const totalPages = Math.ceil(total / 10);
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => i + startPage
  );

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Button
          isDisabled={currentPage === 1}
          size="sm"
          clickHandler={() => {
            goToPage(currentPage - 1);
          }}
        >
          前へ
        </Button>
        {pages.map((page) => (
          <Button
            key={page}
            className={`${
              page === currentPage
                ? 'bg-primary text-white'
                : 'border-gray-200 bg-white text-black'
            }`}
            size="sm"
            clickHandler={() => {
              goToPage(page);
            }}
          >
            {page}
          </Button>
        ))}
        <Button
          isDisabled={currentPage === totalPages}
          size="sm"
          clickHandler={() => {
            goToPage(currentPage + 1);
          }}
        >
          次へ
        </Button>
      </div>
    </div>
  );
};
