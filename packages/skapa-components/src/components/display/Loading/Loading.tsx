import React from "react";
import IngkaLoading from "@ingka/loading";
import type { LoadingProps } from "./Loading.types";

/**
 * Loading indicator
 * Wraps @ingka/loading for official IKEA compliance
 *
 * @example
 * <Loading />
 *
 * @example
 * <Loading size="large" label="Loading content..." />
 */
export const Loading: React.FC<LoadingProps> = ({
  label = "Loading...",
  className,
}) => {
  return <IngkaLoading text={label} className={className} aria-label={label} />;
};

Loading.displayName = "Loading";
