import React, { FC, useState } from 'react';
import clsx from 'clsx';
import { UserIcon } from '../../../icons/UserIcon';

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
        <UserIcon />
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
