import React from "react";
import { Icon } from "../Icon/Icon";

/**
 * Hyperlink Component
 *
 * Text link component with variants and external link support.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/hyperlink
 */

export interface HyperlinkProps {
  /** Link URL */
  href: string;

  /** Link content */
  children: React.ReactNode;

  /** Link variant */
  variant?: "default" | "primary" | "secondary" | "subtle";

  /** Underline style */
  underline?: "always" | "hover" | "none";

  /** External link (opens in new tab) */
  external?: boolean;

  /** Show external icon indicator */
  showExternalIcon?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Icon at start */
  startIcon?: React.ReactNode;

  /** Icon at end */
  endIcon?: React.ReactNode;

  /** Link size */
  size?: "sm" | "md" | "lg";

  /** Additional CSS classes */
  className?: string;

  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const variantStyles = {
  default: "text-blue-600 hover:text-blue-800",
  primary: "text-blue-700 hover:text-blue-900 font-medium",
  secondary: "text-gray-600 hover:text-gray-900",
  subtle: "text-gray-500 hover:text-gray-700",
};

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const underlineStyles = {
  always: "underline",
  hover: "hover:underline",
  none: "no-underline",
};

/**
 * Hyperlink component
 */
export const Hyperlink: React.FC<HyperlinkProps> = ({
  href,
  children,
  variant = "default",
  underline = "hover",
  external = false,
  showExternalIcon = true,
  disabled = false,
  startIcon,
  endIcon,
  size = "md",
  className = "",
  onClick,
}) => {
  const classes = [
    "inline-flex items-center gap-1 transition-colors",
    variantStyles[variant],
    sizeStyles[size],
    underlineStyles[underline],
    disabled && "opacity-50 pointer-events-none cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a href={href} className={classes} onClick={onClick} {...externalProps}>
      {startIcon && <span className="flex-shrink-0">{startIcon}</span>}
      <span>{children}</span>
      {external && showExternalIcon && (
        <Icon name="link-out" size="xs" decorative />
      )}
      {endIcon && <span className="flex-shrink-0">{endIcon}</span>}
      {external && <span className="sr-only">(opens in new tab)</span>}
    </a>
  );
};
