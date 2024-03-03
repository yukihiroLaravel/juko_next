import Box from '@/components/atoms/Box';
import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';

type Props = {
  children: React.ReactNode;
};

export const StudentsHeadingBox: React.FC<Props> = ({ children }) => {
  return (
    <Box className="flex w-full items-center justify-between p-2">
      <Typography variant="h1">{children}</Typography>
      <Box className="mr-5">
        <Button>
          <div className="flex items-center gap-1">
            <CirclePlusIcon strokeWidth={1} />
            受講生登録
          </div>
        </Button>
      </Box>
    </Box>
  );
};
