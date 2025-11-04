import React from 'react';
import clsx from 'clsx';
import type { HyperlinkProps } from './Hyperlink.types';
import styles from './Hyperlink.module.css';

/**
 * Hyperlink Component - Text links for navigation
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
      variant = 'regular',
      startIcon,
      endIcon,
      external = false,
      className,
      children,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const linkClasses = clsx(
      styles.hyperlink,
      styles[variant],
      {
        [styles.external]: external,
      },
      className
    );

    // Automatically add security attributes for external links
    const linkTarget = external ? '_blank' : target;
    const linkRel = external ? 'noopener noreferrer' : rel;

    return (
      <a
        ref={ref}
        className={linkClasses}
        target={linkTarget}
        rel={linkRel}
        {...props}
      >
        {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
        {children}
        {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
      </a>
    );
  }
);

Hyperlink.displayName = 'SkapaHyperlink';
