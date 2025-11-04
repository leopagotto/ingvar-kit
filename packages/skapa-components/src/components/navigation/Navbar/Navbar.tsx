import React from "react";
import type { NavbarProps } from "./Navbar.types";
import styles from "./Navbar.module.css";

export const Navbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ children, position = "static", className, ...props }, ref) => (
    <nav
      ref={ref}
      className={`${styles.navbar} ${styles[position]} ${className || ""}`}
      {...props}
    >
      {children}
    </nav>
  )
);

Navbar.displayName = "Navbar";
