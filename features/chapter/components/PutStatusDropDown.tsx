import { Axios } from '@/lib/api';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment } from 'react';
import { CHAPTER_STATUS } from '../types/Chapter';
import { ChevronDown } from '@/components/icons/ChevronDown';

type Props = {
  courseId: number;
  mutate: () => void;
};

export const PutStatusDropDown: FC<Props> = ({ courseId, mutate }) => {
  const itemsClassName = clsx(
    'absolute',
    'right-0',
    'z-10',
    'mt-2',
    'w-28',
    'rounded-md',
    'bg-white',
    'shadow-lg',
    'focus:outline-none'
  );

  const listClassName = clsx(
    'block',
    'px-4',
    'py-2',
    'text-sm',
    'text-gray-700',
    'hover:bg-gray-100',
    'cursor-pointer'
  );

  const buttonClassName = clsx(
    'w-full',
    'justify-center',
    'rounded-md',
    'bg-primary',
    'text-white',
    'px-3',
    'py-2',
    'shadow-sm',
    'flex'
  );

  const handlePutStatus = async (status: CHAPTER_STATUS) => {
    if (confirm('一括変更しますか？') === false) {
      return;
    }

    await Axios.get('/sanctum/csrf-cookie').then(async () => {
      await Axios.put(`/api/v1/instructor/course/${courseId}/chapter/status`, {
        status,
      })
        .then(() => {
          mutate();
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClassName}>
          一括変更
          <ChevronDown />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={itemsClassName}>
          <div className="py-1">
            <Menu.Item>
              <div
                className={listClassName}
                onClick={() => handlePutStatus(CHAPTER_STATUS.PUBLIC)}
              >
                公開
              </div>
            </Menu.Item>
            <Menu.Item>
              <div
                className={listClassName}
                onClick={() => handlePutStatus(CHAPTER_STATUS.PRIVATE)}
              >
                非公開
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
