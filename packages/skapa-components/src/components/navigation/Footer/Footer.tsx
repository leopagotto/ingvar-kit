import React from 'react';
import type { FooterProps } from './Footer.types';
import styles from './Footer.module.css';

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ children, className, ...props }, ref) => (
    <footer ref={ref} className={`${styles.footer} ${className || ''}`} {...props}>
      {children}
    </footer>
  )
);

Footer.displayName = 'Footer';
