import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: ImageProps["src"] | null;
  fallback?: true | string;
}

export function ImageWithFallback({
  fallback = true,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const onError = useCallback(() => setError(true), []);

  useEffect(() => {
    setError(false);
  }, [src]);

  if (!src || (error && fallback === true)) {
    return <div {...props} />;
  }

  return (
    <Image
      alt={alt}
      onError={onError}
      src={(error && (fallback as string)) || src}
      {...props}
    />
  );
}
