import React from "react";
import IngkaCard from "@ingka/card";
import type { CardProps } from "./Card.types";
import styles from "./Card.module.css";

/**
 * Card component for grouping related content
 * Wraps @ingka/card for official IKEA compliance
 *
 * @example
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 *
 * @example
 * // With header and footer
 * <Card
 *   header={<h3>Card Title</h3>}
 *   footer={<button>Action</button>}
 * >
 *   <p>Card content</p>
 * </Card>
 *
 * @example
 * // Interactive card
 * <Card interactive onClick={() => console.log('clicked')}>
 *   <p>Clickable card</p>
 * </Card>
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "elevated",
      header,
      footer,
      interactive = false,
      children,
      className,
      ...props
    },
    _ref
  ) => {
    const cardContent = (
      <>
        {header && <div className={styles.header}>{header}</div>}
        <div className={styles.content}>{children}</div>
        {footer && <div className={styles.footer}>{footer}</div>}
      </>
    );

    return (
      <div
        className={`${styles.card} ${styles[variant]} ${
          interactive ? styles.interactive : ""
        } ${className || ""}`}
        {...props}
      >
        <IngkaCard content={cardContent} />
      </div>
    );
  }
);

Card.displayName = "Card";
