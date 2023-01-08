import { FC } from 'react';
import YouTube from 'react-youtube';
type Props = {
  videoId: string;
  height: number;
  width: number;
};
export const Movie: FC<Props> = ({ videoId, height, width }) => {
  const option = {
    height,
    width,
  };
  return <YouTube videoId={videoId} opts={option} />;
};
