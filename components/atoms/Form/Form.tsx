import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const Form: React.FC<Props> = ({ children, className }) => {
  const classes = clsx(className);
  return <form className={classes}>{children}</form>;
};
