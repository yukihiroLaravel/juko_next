import { DotsIcon } from '@/components/icons/DotsIcon';
import { LESSON_STATUS, Lesson } from '@/features/lesson/types/Lesson';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment } from 'react';

type Props = {
  lesson: Lesson;
  changeNameHandler: () => void;
  changeStatusHandler: () => void;
  deleteHandler: () => void;
};

export const DotIconDropDown: FC<Props> = ({
  lesson,
  changeNameHandler,
  changeStatusHandler,
  deleteHandler,
}) => {
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
    'text-white',
    'px-3',
    'py-2',
    'shadow-sm',
    'flex'
  );

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={buttonClassName}>
          <DotsIcon />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Menu.Items className={itemsClassName}>
          <div className="py-1">
            <Menu.Item>
              <div className={listClassName} onClick={changeNameHandler}>
                名前変更
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className={listClassName} onClick={changeStatusHandler}>
                {lesson.status === LESSON_STATUS.PUBLIC ? '非公開' : '公開'}
              </div>
            </Menu.Item>
            <Menu.Item>
              <div className={listClassName} onClick={deleteHandler}>
                削除
              </div>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
