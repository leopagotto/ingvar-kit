import React from "react";
import type { MenuProps } from "./Menu.types";
import styles from "./Menu.module.css";

export const Menu: React.FC<MenuProps> = ({
  items,
  isOpen = false,
  onClose,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={`${styles.menu} ${className || ""}`} role="menu">
        {items.map((item, index) =>
          item.divider ? (
            <div key={index} className={styles.divider} role="separator" />
          ) : (
            <button
              key={index}
              type="button"
              className={styles.item}
              onClick={() => {
                item.onClick?.();
                onClose?.();
              }}
              disabled={item.disabled}
              role="menuitem"
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </button>
          )
        )}
      </div>
    </>
  );
};

Menu.displayName = "Menu";
