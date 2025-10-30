import React from "react";

export interface BadgeProps {
  /** Badge content */
  children: React.ReactNode;
  /** Variant style */
  variant?: "success" | "warning" | "error" | "info" | "neutral";
  /** Size */
  size?: "small" | "medium" | "large";
  /** Show as dot indicator */
  dot?: boolean;
  /** Numeric count (replaces children) */
  count?: number;
  /** Maximum count to display (shows {max}+ when exceeded) */
  max?: number;
  /** Additional className */
  className?: string;
}

/**
 * Badge Component - Status indicators and counts (IKEA Ingka Skapa)
 *
 * Specification: docs/guides/Skapa-components/Badge.pdf
 * Package equivalent: @ingka/badge
 *
 * Features:
 * - Status indicators (success, error, warning, info)
 * - Numeric counters
 * - Dot indicators
 * - Multiple sizes
 *
 * @example
 * ```tsx
 * <Badge variant="success">In Stock</Badge>
 * <Badge count={5} max={99} />
 * <Badge dot variant="error"><NotificationIcon /></Badge>
 * ```
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "neutral",
  size = "medium",
  dot = false,
  count,
  max = 99,
  className = "",
}) => {
  const variantClasses = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    error: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    neutral: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const sizeClasses = {
    small: "text-xs px-2 py-0.5",
    medium: "text-sm px-2.5 py-1",
    large: "text-base px-3 py-1.5",
  };

  // Handle count display
  const displayCount =
    count !== undefined ? (count > max ? `${max}+` : count) : null;

  // Dot badge
  if (dot) {
    return (
      <div className={`relative inline-flex ${className}`}>
        {children}
        <span
          className={`
            absolute top-0 right-0 block w-2.5 h-2.5 rounded-full border-2 border-white
            ${variantClasses[variant].split(" ")[0]}
          `}
          aria-label={`${variant} indicator`}
        />
      </div>
    );
  }

  // Count badge
  if (displayCount !== null) {
    return (
      <span
        className={`
          inline-flex items-center justify-center
          min-w-[1.25rem] h-5 px-1.5
          text-xs font-semibold leading-none
          rounded-full
          ${variantClasses[variant]}
          ${className}
        `}
        aria-label={`${count} notifications`}
      >
        {displayCount}
      </span>
    );
  }

  // Standard badge
  return (
    <span
      className={`
        inline-flex items-center
        font-medium rounded-full border
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
