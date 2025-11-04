import React from "react";
import IngkaBadge from "@ingka/badge";
import type { BadgeProps } from "./Badge.types";

/**
 * Badge component for status indicators and labels
 * Wraps @ingka/badge for official IKEA compliance
 *
 * @example
 * // Basic badge
 * <Badge label="New" />
 *
 * @example
 * // With variant
 * <Badge label="Success" variant="success" />
 *
 * @example
 * // Small badge
 * <Badge label="Beta" size="small" variant="info" />
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = "neutral",
  size = "medium",
  className,
}) => {
  // Map our variant to Ingka colour
  const colourMap = {
    info: "blue",
    success: "green",
    warning: "yellow",
    error: "red",
    neutral: "grey",
  } as const;

  return (
    <IngkaBadge
      label={label}
      colour={colourMap[variant]}
      size={size}
      className={className}
    />
  );
};

Badge.displayName = "Badge";
