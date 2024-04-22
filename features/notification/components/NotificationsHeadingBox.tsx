import { Typography } from '@/components/atoms/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { CirclePlusIcon } from '@/components/icons/CirclePlusIcon';
import Link from 'next/link';

type Props = {
  children: React.ReactNode;
};

export const NotificationsHeadingBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full items-center justify-between p-2">
      <Typography variant="h1">{children}</Typography>
      <div className="mr-5">
        <Link
            href={{
              pathname: '/instructor/notification/register'
            }}
          >
          <a>
            <Button>
              <div className="flex items-center gap-1">
                <CirclePlusIcon strokeWidth={1} />
                お知らせ登録
              </div>
            </Button>
          </a>
        </Link>
        
      </div>
    </div>
  );
};
