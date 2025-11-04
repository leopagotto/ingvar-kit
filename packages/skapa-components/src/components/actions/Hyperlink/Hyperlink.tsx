import React from "react";
import IngkaHyperlink from "@ingka/hyperlink";
import type { HyperlinkProps } from "./Hyperlink.types";
import styles from "./Hyperlink.module.css";

/**
 * Hyperlink Component - Text links for navigation
 * Wraps @ingka/hyperlink for official IKEA compliance
 *
 * Hyperlinks are used for navigation between pages or sections.
 * Use 'regular' variant for prominent links, 'subtle' for inline text links.
 *
 * Based on: docs/ai-agents/skapa-design-system/01-ACTIONS.md
 *
 * @example
 * ```tsx
 * // Regular link
 * <Hyperlink href="/products">View all products</Hyperlink>
 *
 * // Subtle link in text
 * <p>
 *   Read our <Hyperlink variant="subtle" href="/terms">terms and conditions</Hyperlink>
 * </p>
 *
 * // External link
 * <Hyperlink href="https://ikea.com" external>
 *   Visit IKEA.com
 * </Hyperlink>
 * ```
 */
export const Hyperlink = React.forwardRef<HTMLAnchorElement, HyperlinkProps>(
  (
    {
      variant = "regular",
      external = false,
      className,
      children,
      href,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        <IngkaHyperlink
          ref={ref}
          url={href}
          newWindow={external}
          subtle={variant === "subtle"}
          className={styles.hyperlink}
          {...props}
        >
          {children}
        </IngkaHyperlink>
      </div>
    );
  }
);

Hyperlink.displayName = "SkapaHyperlink";
