import React from "react";

/**
 * Text Component
 *
 * Typography component with comprehensive style control.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/text
 */

export interface TextProps {
  /** Text content */
  children: React.ReactNode;

  /** Typography variant */
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body"
    | "caption"
    | "label";

  /** Text size */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";

  /** Font weight */
  weight?: "light" | "normal" | "medium" | "semibold" | "bold";

  /** Text color */
  color?: "primary" | "secondary" | "success" | "warning" | "error" | "muted";

  /** Text alignment */
  align?: "left" | "center" | "right" | "justify";

  /** Text decoration */
  decoration?: "none" | "underline" | "line-through";

  /** Italic text */
  italic?: boolean;

  /** Truncate text with ellipsis */
  truncate?: boolean;

  /** Line clamp (max lines before truncating) */
  lines?: number;

  /** HTML element to render */
  as?: "p" | "span" | "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "label";

  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  display: "text-5xl font-bold leading-tight",
  h1: "text-4xl font-bold leading-tight",
  h2: "text-3xl font-semibold leading-snug",
  h3: "text-2xl font-semibold leading-snug",
  h4: "text-xl font-medium leading-normal",
  body: "text-base font-normal leading-relaxed",
  caption: "text-sm font-normal leading-normal",
  label: "text-sm font-medium leading-none",
};

const sizeStyles = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
};

const weightStyles = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const colorStyles = {
  primary: "text-gray-900",
  secondary: "text-gray-600",
  success: "text-green-600",
  warning: "text-yellow-600",
  error: "text-red-600",
  muted: "text-gray-400",
};

const alignStyles = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const decorationStyles = {
  none: "no-underline",
  underline: "underline",
  "line-through": "line-through",
};

/**
 * Text component for typography
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant,
  size,
  weight,
  color = "primary",
  align = "left",
  decoration = "none",
  italic = false,
  truncate = false,
  lines,
  as,
  className = "",
}) => {
  // Determine element type
  const Element =
    as ||
    (variant && ["h1", "h2", "h3", "h4"].includes(variant)
      ? (variant as keyof JSX.IntrinsicElements)
      : "p");

  // Build class names
  const classes = [
    variant && variantStyles[variant],
    size && sizeStyles[size],
    weight && weightStyles[weight],
    colorStyles[color],
    alignStyles[align],
    decorationStyles[decoration],
    italic && "italic",
    truncate && "truncate",
    lines && `line-clamp-${lines}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return React.createElement(Element, { className: classes }, children);
};
