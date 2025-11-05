import React from "react";
import type { HeaderProps } from "./Header.types";
import styles from "./Header.module.css";

/**
 * Header component for page navigation
 *
 * @example
 * <Header
 *   logo={<Logo />}
 *   actions={<Button>Login</Button>}
 * >
 *   <nav>Nav items</nav>
 * </Header>
 */
export const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ logo, children, actions, sticky = false, className, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`${styles.header} ${sticky ? styles.sticky : ""} ${
          className || ""
        }`}
        {...props}
      >
        {logo && <div className={styles.logo}>{logo}</div>}
        {children && <div className={styles.nav}>{children}</div>}
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
    );
  }
);

Header.displayName = "Header";
