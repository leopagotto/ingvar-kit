import React from "react";
import IngkaPill from "@ingka/pill";
import type { PillProps } from "./Pill.types";
import styles from "./Pill.module.css";

/**
 * Pill Component - Compact button for filters, tags, and badges
 * Wraps @ingka/pill for official IKEA compliance
 *
 * Pills are used in filtering interfaces, tag selections, and as status badges.
 * The active state indicates selection in filter contexts.
 *
 * Based on: docs/ai-agents/skapa-design-system/09-DESIGN-PATTERNS.md (Filtering Pattern)
 *
 * @example
 * ```tsx
 * // Filter pills (e-commerce)
 * <Pill variant="filter" active>All</Pill>
 * <Pill variant="filter">Living Room</Pill>
 * ```
 */
export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  (
    {
      size = "medium",
      active = false,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaPill
          ref={ref}
          label={children}
          selected={active}
          disabled={disabled}
          size={size === "large" ? "medium" : size}
          onClick={onClick}
          className={styles.pill}
          {...props}
        />
      </div>
    );
  }
);

Pill.displayName = "SkapaPill";
