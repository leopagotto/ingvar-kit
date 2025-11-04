import React from "react";
import type { BottomNavProps } from "./BottomNav.types";
import styles from "./BottomNav.module.css";

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeIndex = 0,
  className,
}) => (
  <nav className={`${styles.bottomNav} ${className || ""}`}>
    {items.map((item, index) => (
      <button
        key={index}
        type="button"
        className={`${styles.item} ${
          index === activeIndex ? styles.active : ""
        }`}
        onClick={item.onClick}
      >
        {item.icon && <span className={styles.icon}>{item.icon}</span>}
        <span className={styles.label}>{item.label}</span>
      </button>
    ))}
  </nav>
);

BottomNav.displayName = "BottomNav";
