import NextImage from "next/image";
import { useEffect, useState } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
}

function getImageSize(url: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = (err) => reject(err);
  });
}

export function Photo({ src, alt, className = "" }: Props) {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  useEffect(() => {
    getImageSize(src).then(({ width, height }) => {
      setWidth(width);
      setHeight(height);
    });
  }, [src]);
  return (
    <NextImage
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      priority
    ></NextImage>
  );
}
