import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: React.FC<Props> = ({ children, className, onSubmit }) => {
  const classes = clsx(className);
  return <form className={classes} onSubmit={onSubmit}>{children}</form>;
};
