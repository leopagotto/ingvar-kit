import React from "react";
import type { AppBarProps } from "./AppBar.types";
import styles from "./AppBar.module.css";

export const AppBar = React.forwardRef<HTMLElement, AppBarProps>(
  ({ title, children, position = "static", className, ...props }, ref) => (
    <header
      ref={ref}
      className={`${styles.appBar} ${styles[position]} ${className || ""}`}
      {...props}
    >
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
    </header>
  )
);

AppBar.displayName = "AppBar";
