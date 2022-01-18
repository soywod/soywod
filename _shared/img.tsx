import {FC} from "react";
import NextImg, {ImageProps as NextImageProps, ImageLoader} from "next/image";

const loader: ImageLoader = ({src}) => {
  return src;
};

export type ImgProps = Omit<NextImageProps, "loader">;

export const Img: FC<ImgProps> = props => {
  return <NextImg loader={loader} layout="fill" objectFit="cover" unoptimized {...props} />;
};

export default Img;
