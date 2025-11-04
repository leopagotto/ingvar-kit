import React, { useState } from "react";
import type { AccordionProps } from "./Accordion.types";
import styles from "./Accordion.module.css";

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  return (
    <div className={`${styles.accordion} ${className || ""}`}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id);
        return (
          <div key={item.id} className={styles.item}>
            <button
              type="button"
              className={`${styles.header} ${isOpen ? styles.open : ""}`}
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
            >
              <span className={styles.title}>{item.title}</span>
              <span className={styles.icon}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className={styles.content}>{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
};

Accordion.displayName = "Accordion";
