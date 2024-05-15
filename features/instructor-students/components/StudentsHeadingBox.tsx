import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';

type Props = {
  children: React.ReactNode;
};

export const StudentsHeadingBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-between p-2">
      <Typography variant="h1">{children}</Typography>
      <div className="mr-5">
        <Button>
          <div className="flex items-center gap-1">
            <CirclePlusIcon strokeWidth={1} />
            受講生登録
          </div>
        </Button>
      </div>
    </div>
  );
};
