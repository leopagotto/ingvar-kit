import React from "react";
import IngkaSkeleton from "@ingka/skeleton";
import type { SkeletonProps } from "./Skeleton.types";

/**
 * Skeleton loading placeholder
 * Wraps @ingka/skeleton for official IKEA compliance
 *
 * @example
 * // Text skeleton
 * <Skeleton variant="text" width="200px" />
 *
 * @example
 * // Circular avatar skeleton
 * <Skeleton variant="circular" width={40} height={40} />
 *
 * @example
 * // Rectangular card skeleton
 * <Skeleton variant="rectangular" width="100%" height="200px" />
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  className,
}) => {
  // Convert number to px string for Ingka
  const widthStr = typeof width === "number" ? `${width}px` : width;
  const heightStr = typeof height === "number" ? `${height}px` : height;

  return (
    <IngkaSkeleton width={widthStr} height={heightStr} className={className} />
  );
};

Skeleton.displayName = "Skeleton";
