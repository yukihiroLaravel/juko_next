import React, { FC, useState } from 'react';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  logoutHandler: () => void;
  renderUserEditLink: () => JSX.Element;
};

export const UserDropDown: FC<Props> = ({
  isOpen,
  setIsOpen,
  logoutHandler,
  renderUserEditLink,
}) => {
  return (
    <div className="relative top-5 mr-5 inline-block">
      <button onClick={() => setIsOpen(!isOpen)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          width="60"
          height="60"
          fill="#cacaca"
        >
          <path d="M480-484.065q-63.587 0-107.859-44.272-44.272-44.272-44.272-107.859 0-63.587 44.272-107.739T480-788.087q63.587 0 107.859 44.152 44.272 44.152 44.272 107.739t-44.272 107.859Q543.587-484.065 480-484.065ZM183.869-179.804v-104.609q0-25.224 13.743-47.589 13.742-22.365 37.801-37.346 55.717-32.239 118.164-49.478Q416.024-436.065 480-436.065q64.435 0 126.891 17.119 62.457 17.12 117.696 49.359 24.059 13.947 37.801 36.745 13.743 22.799 13.743 48.416v104.622H183.869Z" />
        </svg>
      </button>

      <div
        className={clsx(
          isOpen ? 'block' : 'hidden',
          'absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black'
        )}
      >
        <div className="py-1">
          {renderUserEditLink()}
          <button
            className="w-full px-4 py-2 text-start text-sm text-gray-700"
            onClick={logoutHandler}
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
};
