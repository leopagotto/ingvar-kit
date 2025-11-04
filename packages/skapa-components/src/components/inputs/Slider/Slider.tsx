import React from "react";
import IngkaSlider from "@ingka/slider";
import type { SliderProps } from "./Slider.types";
import styles from "./Slider.module.css";

/**
 * Slider component for range input
 * Wraps @ingka/slider for official IKEA compliance
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      helperText,
      error,
      min = 0,
      max = 100,
      step = 1,
      defaultValue,
      value,
      disabled,
      className,
      id,
      onChange,
      ...props
    },
    ref
  ) => {
    const sliderId = id || `slider-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    // Convert to @ingka/slider format
    const startValue =
      value !== undefined
        ? value
        : defaultValue !== undefined
        ? defaultValue
        : min;

    const handleChange = (values: number[]) => {
      if (onChange) {
        // Create a synthetic event-like object
        const syntheticEvent = {
          target: { value: values[0] },
        } as any;
        onChange(syntheticEvent);
      }
    };

    // Filter incompatible props
    const { size, showValue, fullWidth, marks, ...compatibleProps } =
      props as any;

    return (
      <div className={`${styles.wrapper} ${className || ""}`}>
        {label && <label className={styles.label}>{label}</label>}
        <IngkaSlider
          id={sliderId}
          start={startValue}
          range={{ min, max }}
          step={step}
          disabled={disabled}
          ariaFormat={{ to: (v) => String(v) }}
          ariaLabels={label || "Slider"}
          onChange={handleChange}
          className={styles.slider}
          {...compatibleProps}
        />
        {(error || helperText) && (
          <span className={hasError ? styles.error : styles.helperText}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Slider.displayName = "SkapaSlider";
