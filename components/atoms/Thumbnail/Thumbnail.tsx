import Image from 'next/image';
import { FC } from 'react';

type Props = {
  src: string;
  alt: string;
  height: number;
  width: number;
};
export const Thumbnail: FC<Props> = ({ src, alt, height, width }) => {
  return <Image src={src} alt={alt} height={height} width={width} />;
};
