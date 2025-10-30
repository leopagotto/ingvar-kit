import React from "react";
import { Button as IngkaButton } from "@ingka/button";
import { colors } from "@ingka/colours";
import { tokens } from "@ingka/design-tokens";
import type { ButtonProps as IngkaButtonProps } from "@ingka/button";

/**
 * IKEA Ingka Skapa Button Component
 *
 * Built with official IKEA design system components and follows
 * WCAG 2.1 AA accessibility standards.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/button
 */

export interface ButtonProps
  extends Omit<IngkaButtonProps, "variant" | "size"> {
  /** Button style variant */
  variant?: "primary" | "secondary" | "tertiary" | "ghost" | "danger";

  /** Button size */
  size?: "sm" | "md" | "lg";

  /** Show loading spinner */
  loading?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Icon before text */
  startIcon?: React.ReactNode;

  /** Icon after text */
  endIcon?: React.ReactNode;

  /** Button content */
  children: React.ReactNode;
}

/**
 * Primary button component using IKEA Ingka Skapa design system.
 *
 * Features:
 * - Official IKEA design tokens
 * - WCAG 2.1 AA accessibility
 * - Responsive design
 * - Loading states
 * - Icon support
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Add to Cart
 * </Button>
 *
 * <Button variant="secondary" startIcon={<SearchIcon />}>
 *   Search Products
 * </Button>
 *
 * <Button variant="primary" loading disabled>
 *   Processing...
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  startIcon,
  endIcon,
  disabled,
  children,
  style,
  className,
  ...props
}) => {
  // Map our variants to Ingka Button variants
  const ingkaVariant = variant === "danger" ? "destructive" : variant;

  // Map our sizes to Ingka Button sizes
  const ingkaSize =
    size === "sm" ? "small" : size === "lg" ? "large" : "medium";

  // Custom styles using IKEA design tokens
  const customStyles: React.CSSProperties = {
    minHeight: tokens.size[`button-${size}`],
    borderRadius: tokens.borderRadius.md,
    fontSize: tokens.typography.size[size],
    fontFamily: tokens.typography.family.body, // Noto Sans
    fontWeight: tokens.typography.weight.medium,
    gap: tokens.spacing.xs,
    transition: "all 0.2s ease-in-out",
    width: fullWidth ? "100%" : "auto",
    ...style,
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <svg
      className="animate-spin"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="32"
        strokeDashoffset="32"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <IngkaButton
      variant={ingkaVariant}
      size={ingkaSize}
      disabled={disabled || loading}
      style={customStyles}
      className={`ingka-button ${className || ""}`}
      aria-busy={loading}
      aria-label={loading ? "Loading..." : undefined}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && startIcon && (
        <span
          className="button-icon start-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          {startIcon}
        </span>
      )}

      <span className="button-text">{children}</span>

      {!loading && endIcon && (
        <span
          className="button-icon end-icon"
          style={{ display: "flex", alignItems: "center" }}
        >
          {endIcon}
        </span>
      )}
    </IngkaButton>
  );
};

// Export types for consumers
export type { ButtonProps };

// Default export
export default Button;
