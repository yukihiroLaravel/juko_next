import Link from 'next/link';
import { FC } from 'react';

type Props = {
  links: {
    title: string | undefined;
    href: string;
  }[];
};

const Icon = () => {
  return (
    <svg
      className="mr-2 w-6 h-6 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const Breadcrumb: FC<Props> = ({ links }) => {
  const lastIndex = links.length - 1;
  return (
    <nav className="flex mt-5" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link, index) => {
          if (index === 0) {
            return (
              <li
                key={index}
                className="inline-flex items-center cursor-pointer"
              >
                <div className="flex items-center">
                  <Link
                    href={link.href}
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <span className="underline">{link.title}</span>
                  </Link>
                </div>
              </li>
            );
          } else if (index === lastIndex) {
            return (
              <li key={index} className="inline-flex items-center">
                <div className="flex items-center">
                  <Icon />
                  <span className="font-medium text-gray-500">
                    {link.title}
                  </span>
                </div>
              </li>
            );
          }
          return (
            <li key={index} className="inline-flex items-center cursor-pointer">
              <div className="flex items-center">
                <Icon />
                <Link
                  href={link.href}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  <span className="underline">{link.title}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
