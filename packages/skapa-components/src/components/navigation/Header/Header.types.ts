import React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Logo or brand element
   */
  logo?: React.ReactNode;

  /**
   * Navigation items
   */
  children?: React.ReactNode;

  /**
   * Actions (e.g., buttons, user menu)
   */
  actions?: React.ReactNode;

  /**
   * Sticky header
   * @default false
   */
  sticky?: boolean;
}
