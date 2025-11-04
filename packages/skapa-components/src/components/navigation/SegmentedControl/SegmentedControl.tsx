import React from "react";
import type { SegmentedControlProps } from "./SegmentedControl.types";
import styles from "./SegmentedControl.module.css";

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className,
}) => (
  <div className={`${styles.segmentedControl} ${className || ""}`} role="group">
    {options.map((option) => (
      <button
        key={option.value}
        type="button"
        className={`${styles.segment} ${
          value === option.value ? styles.active : ""
        }`}
        onClick={() => onChange(option.value)}
        disabled={option.disabled}
        aria-pressed={value === option.value}
      >
        {option.label}
      </button>
    ))}
  </div>
);

SegmentedControl.displayName = "SegmentedControl";
