import React from "react";
import { InputField } from "@ingka/input-field";
import { colors } from "@ingka/colours";
import { tokens } from "@ingka/design-tokens";
import type { InputFieldProps } from "@ingka/input-field";

/**
 * IKEA Ingka Skapa Input Component
 *
 * Built with official IKEA design system components and follows
 * WCAG 2.1 AA accessibility standards.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/input-field
 */

export interface InputProps extends Omit<InputFieldProps, "size"> {
  /** Input field label */
  label?: string;

  /** Helper text displayed below input */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Input size */
  size?: "sm" | "md" | "lg";

  /** Input variant */
  variant?: "outlined" | "filled";

  /** Required field indicator */
  required?: boolean;

  /** Icon displayed at start of input */
  startIcon?: React.ReactNode;

  /** Icon displayed at end of input */
  endIcon?: React.ReactNode;

  /** Input placeholder text */
  placeholder?: string;

  /** Input value */
  value?: string;

  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** Custom class name */
  className?: string;
}

/**
 * Input component using IKEA Ingka Skapa design system.
 *
 * Features:
 * - Official IKEA design tokens
 * - WCAG 2.1 AA accessibility
 * - Multiple sizes and variants
 * - Error handling and validation
 * - Icon support
 * - Responsive design
 *
 * @example
 * ```tsx
 * <Input
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   required
 *   type="email"
 * />
 *
 * <Input
 *   label="Search"
 *   placeholder="Search products..."
 *   startIcon={<SearchIcon />}
 *   variant="filled"
 * />
 *
 * <Input
 *   label="Password"
 *   type="password"
 *   error="Password must be at least 8 characters"
 *   required
 * />
 * ```
 */
export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  size = "md",
  variant = "outlined",
  required = false,
  startIcon,
  endIcon,
  placeholder,
  value,
  onChange,
  className,
  disabled,
  style,
  ...props
}) => {
  const inputId = React.useId();
  const helperTextId = React.useId();
  const errorId = React.useId();

  // Size mappings
  const sizeMap = {
    sm: {
      height: "32px",
      fontSize: tokens.typography.size.sm,
      padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
    },
    md: {
      height: "40px",
      fontSize: tokens.typography.size.md,
      padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    },
    lg: {
      height: "48px",
      fontSize: tokens.typography.size.lg,
      padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
    },
  };

  // Custom styles using IKEA design tokens
  const containerStyles: React.CSSProperties = {
    width: "100%",
    ...style,
  };

  const labelStyles: React.CSSProperties = {
    display: "block",
    fontSize: tokens.typography.size.sm,
    fontWeight: tokens.typography.weight.medium,
    color: error ? colors.feedback.error : colors.neutral.black,
    marginBottom: tokens.spacing.xs,
    fontFamily: tokens.typography.family.body,
  };

  const inputContainerStyles: React.CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
  };

  const inputStyles: React.CSSProperties = {
    width: "100%",
    height: sizeMap[size].height,
    fontSize: sizeMap[size].fontSize,
    padding: sizeMap[size].padding,
    paddingLeft: startIcon
      ? `${tokens.spacing.xl}`
      : sizeMap[size].padding.split(" ")[1],
    paddingRight: endIcon
      ? `${tokens.spacing.xl}`
      : sizeMap[size].padding.split(" ")[1],
    border:
      variant === "outlined"
        ? `1px solid ${error ? colors.feedback.error : colors.neutral.gray300}`
        : "none",
    borderRadius: tokens.borderRadius.md,
    backgroundColor:
      variant === "filled" ? colors.neutral.gray50 : colors.neutral.white,
    color: colors.neutral.black,
    fontFamily: tokens.typography.family.body,
    transition: "all 0.2s ease-in-out",
    outline: "none",
  };

  const iconStyles: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: disabled ? colors.neutral.gray400 : colors.neutral.gray600,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
  };

  const helperTextStyles: React.CSSProperties = {
    fontSize: tokens.typography.size.xs,
    color: error ? colors.feedback.error : colors.neutral.gray600,
    marginTop: tokens.spacing.xs,
    fontFamily: tokens.typography.family.body,
  };

  return (
    <div className={`ingka-input ${className || ""}`} style={containerStyles}>
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {required && (
            <span
              style={{ color: colors.feedback.error, marginLeft: "2px" }}
              aria-label="required"
            >
              *
            </span>
          )}
        </label>
      )}

      <div style={inputContainerStyles}>
        {startIcon && (
          <div
            style={{ ...iconStyles, left: tokens.spacing.sm }}
            aria-hidden="true"
          >
            {startIcon}
          </div>
        )}

        <InputField
          id={inputId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          style={inputStyles}
          aria-invalid={!!error}
          aria-describedby={
            error ? errorId : helperText ? helperTextId : undefined
          }
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = error
              ? colors.feedback.error
              : colors.blue.primary;
            e.target.style.boxShadow = `0 0 0 3px ${
              error ? `${colors.feedback.error}20` : `${colors.blue.primary}20`
            }`;
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
            e.target.style.borderColor = error
              ? colors.feedback.error
              : colors.neutral.gray300;
            e.target.style.boxShadow = "none";
          }}
          {...props}
        />

        {endIcon && (
          <div
            style={{ ...iconStyles, right: tokens.spacing.sm }}
            aria-hidden="true"
          >
            {endIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <div
          id={error ? errorId : helperTextId}
          style={helperTextStyles}
          role={error ? "alert" : "description"}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
};

// Export types for consumers
export type { InputProps };

// Default export
export default Input;
