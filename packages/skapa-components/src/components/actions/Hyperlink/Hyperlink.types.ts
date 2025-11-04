import React from 'react';

export type HyperlinkVariant = 'regular' | 'subtle';

export interface HyperlinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Visual style variant of the hyperlink
   * @default 'regular'
   */
  variant?: HyperlinkVariant;

  /**
   * Icon to display before the link text
   */
  startIcon?: React.ReactNode;

  /**
   * Icon to display after the link text
   */
  endIcon?: React.ReactNode;

  /**
   * Whether to show external link indicator
   * @default false
   */
  external?: boolean;

  /**
   * Link content
   */
  children: React.ReactNode;
}
