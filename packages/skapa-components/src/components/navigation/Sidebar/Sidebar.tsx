import React from "react";
import type { SidebarProps } from "./Sidebar.types";
import styles from "./Sidebar.module.css";

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      children,
      width = "250px",
      position = "left",
      collapsed = false,
      className,
      ...props
    },
    ref
  ) => (
    <aside
      ref={ref}
      className={`${styles.sidebar} ${styles[position]} ${
        collapsed ? styles.collapsed : ""
      } ${className || ""}`}
      style={{ width: collapsed ? "60px" : width }}
      {...props}
    >
      {children}
    </aside>
  )
);

Sidebar.displayName = "Sidebar";
