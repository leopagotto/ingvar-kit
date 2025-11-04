import React, { useState } from "react";
import clsx from "clsx";
import type { SliderProps } from "./Slider.types";
import styles from "./Slider.module.css";

/**
 * Slider component for range input
 *
 * @example
 * // Basic slider
 * <Slider min={0} max={100} defaultValue={50} />
 *
 * @example
 * // With label and value display
 * <Slider
 *   label="Volume"
 *   min={0}
 *   max={100}
 *   defaultValue={75}
 *   showValue
 * />
 *
 * @example
 * // Controlled slider
 * <Slider
 *   label="Price"
 *   value={price}
 *   onChange={(e) => setPrice(Number(e.target.value))}
 *   min={0}
 *   max={1000}
 *   step={10}
 * />
 *
 * @example
 * // Different sizes
 * <Slider size="small" label="Small" min={0} max={100} />
 * <Slider size="medium" label="Medium" min={0} max={100} />
 * <Slider size="large" label="Large" min={0} max={100} />
 *
 * @example
 * // With error
 * <Slider
 *   label="Age"
 *   error="Value must be between 18 and 65"
 *   min={0}
 *   max={100}
 * />
 */
export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      showValue = true,
      fullWidth = false,
      required,
      disabled,
      className,
      value,
      defaultValue,
      min = 0,
      max = 100,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      (value !== undefined
        ? value
        : defaultValue !== undefined
        ? defaultValue
        : min
      ).toString()
    );

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const sliderClasses = clsx(styles.slider, styles[size], {
      [styles.error]: Boolean(error),
    });

    const labelClasses = clsx(styles.label, styles[size]);

    const valueClasses = clsx(styles.value, styles[size], {
      [styles.error]: Boolean(error),
    });

    const helperTextClasses = clsx(styles.helperText, {
      [styles.error]: Boolean(error),
    });

    return (
      <div
        className={clsx(
          styles.container,
          { [styles.fullWidth]: fullWidth },
          className
        )}
      >
        {(label || showValue) && (
          <div className={styles.header}>
            {label && (
              <label className={labelClasses}>
                {label}
                {required && <span className={styles.required}>*</span>}
              </label>
            )}
            {showValue && <span className={valueClasses}>{currentValue}</span>}
          </div>
        )}
        <div className={styles.sliderWrapper}>
          <input
            ref={ref}
            type="range"
            className={sliderClasses}
            value={currentValue}
            min={min}
            max={max}
            onChange={handleChange}
            disabled={disabled}
            required={required}
            {...props}
          />
        </div>
        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";
