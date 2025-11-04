import React, { useEffect } from "react";
import type { DrawerProps } from "./Drawer.types";
import styles from "./Drawer.module.css";

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  children,
  position = "right",
  width = "320px",
  className,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div
        className={`${styles.drawer} ${styles[position]} ${className || ""}`}
        style={{ width }}
      >
        {children}
      </div>
    </>
  );
};

Drawer.displayName = "Drawer";
