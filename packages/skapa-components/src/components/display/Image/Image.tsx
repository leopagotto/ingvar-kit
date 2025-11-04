import React from "react";
import IngkaImage from "@ingka/image";
import type { ImageProps } from "./Image.types";

/**
 * Image component with optimized loading
 * Wraps @ingka/image for official IKEA compliance
 *
 * @example
 * <Image src="/photo.jpg" alt="Description" />
 *
 * @example
 * <Image
 *   src="/photo.jpg"
 *   alt="Description"
 *   fit="contain"
 *   lazy={false}
 * />
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  lazy = true,
  fit = "cover",
  className,
  ...props
}) => {
  return (
    <IngkaImage
      src={src}
      alt={alt}
      loading={lazy ? "lazy" : "eager"}
      className={className}
      style={{ objectFit: fit, ...props.style }}
      {...props}
    />
  );
};

Image.displayName = "Image";
