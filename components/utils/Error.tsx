export const Error = () => {
  return (
    <div
      id="alert-2"
      className="mb-4 flex rounded-lg bg-red-100 p-4 dark:bg-red-200"
      role="alert"
    >
      <svg
        aria-hidden="true"
        className="size-5 shrink-0 text-red-700 dark:text-red-800"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="sr-only">Info</span>
      <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
        予期せぬエラーが発生しました。恐れ入りますが、時間を置いて再度お試しください。
      </div>
      <button
        type="button"
        className="-m-1.5 ml-auto inline-flex size-8 rounded-lg bg-red-100 p-1.5 text-red-500 hover:bg-red-200 focus:ring-2 focus:ring-red-400 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
        data-dismiss-target="#alert-2"
        aria-label="Close"
      >
        <span className="sr-only">閉じる</span>
        <svg
          className="size-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};
