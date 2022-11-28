import YouTube from 'react-youtube';

export const Movie = ({ videoId, height, width }) => {
  const option = {
    height,
    width,
  };
  return <YouTube videoId={videoId} opts={option} />;
};
