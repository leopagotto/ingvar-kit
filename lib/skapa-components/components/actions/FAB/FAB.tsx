import React from "react";
import clsx from "clsx";
import type { FABProps } from "./FAB.types";
import styles from "./FAB.module.css";

/**
 * FAB (Floating Action Button) Component - Primary mobile action button
 *
 * Used for the primary action on mobile interfaces. Floats above content
 * with high visibility. Common for actions like "Add", "Create", "Compose".
 *
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 *
 * @example
 * ```tsx
 * // Simple FAB
 * <FAB icon={<PlusIcon />} onClick={handleAdd} />
 *
 * // Extended FAB with label
 * <FAB
 *   icon={<CartIcon />}
 *   label="Add to cart"
 *   extended
 *   onClick={handleAddToCart}
 * />
 *
 * // Fixed position FAB
 * <FAB
 *   icon={<EditIcon />}
 *   position="bottom-right"
 *   size="large"
 *   onClick={handleEdit}
 * />
 * ```
 */
export const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      size = "medium",
      position = "bottom-right",
      icon,
      label,
      extended = false,
      loading = false,
      disabled = false,
      className,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isFixed =
      position &&
      !className?.includes("relative") &&
      !className?.includes("absolute");

    const positionClass =
      position === "bottom-right"
        ? styles.bottomRight
        : position === "bottom-left"
        ? styles.bottomLeft
        : styles.bottomCenter;

    const fabClasses = clsx(
      styles.fab,
      styles[size],
      {
        [styles.extended]: extended || label,
        [styles.loading]: loading,
        [styles.fixed]: isFixed,
        [positionClass]: isFixed,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        className={fabClasses}
        disabled={disabled || loading}
        aria-label={label || "Action button"}
        aria-busy={loading}
        title={label}
        {...props}
      >
        {!loading && <span className={styles.icon}>{icon}</span>}
        {(extended || label) && !loading && (
          <span className={styles.label}>{label}</span>
        )}
      </button>
    );
  }
);

FAB.displayName = "SkapaFAB";
