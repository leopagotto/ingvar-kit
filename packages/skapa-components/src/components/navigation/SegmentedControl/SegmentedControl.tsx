import React from "react";
import IngkaSegmentedControl from "@ingka/segmented-control";
import type { SegmentedControlProps } from "./SegmentedControl.types";
import styles from "./SegmentedControl.module.css";

/**
 * SegmentedControl - Button group for exclusive selection
 * Wraps @ingka/segmented-control for official IKEA compliance
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className,
}) => {
  // Find the active index
  const activeIndex = options.findIndex(opt => opt.value === value);
  
  // Convert our options to Ingka format
  const items = options.map(opt => ({
    label: opt.label,
    disabled: opt.disabled
  }));

  const handleClick = (_e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    onChange(options[index].value);
  };

  return (
    <div className={`${styles.wrapper} ${className || ""}`}>
      <IngkaSegmentedControl
        items={items}
        activeIndex={activeIndex >= 0 ? activeIndex : undefined}
        onClick={handleClick}
        className={styles.segmentedControl}
      />
    </div>
  );
};

SegmentedControl.displayName = "SkapaSegmentedControl";
