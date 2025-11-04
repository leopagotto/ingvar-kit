import React, { useState } from "react";
import clsx from "clsx";
import type { ColorPickerProps } from "./ColorPicker.types";
import styles from "./ColorPicker.module.css";

/**
 * ColorPicker component for color selection
 * Uses native HTML5 color input for simplicity
 *
 * @example
 * // Basic color picker
 * <ColorPicker />
 *
 * @example
 * // With label
 * <ColorPicker label="Brand Color" />
 *
 * @example
 * // Controlled
 * <ColorPicker
 *   value={color}
 *   onChange={(e) => setColor(e.target.value)}
 *   label="Select Color"
 * />
 *
 * @example
 * // Without value display
 * <ColorPicker
 *   label="Pick a color"
 *   showValue={false}
 * />
 */
export const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      showValue = true,
      required,
      disabled,
      fullWidth = false,
      value,
      defaultValue = "#0058A3",
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      (value || defaultValue || "#0058A3").toString()
    );

    const currentValue = value !== undefined ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (value === undefined) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleSwatchClick = () => {
      // Trigger the hidden color input
      const input = document.getElementById(
        "color-input-hidden"
      ) as HTMLInputElement;
      input?.click();
    };

    const labelClasses = clsx(styles.label, styles[size]);

    const pickerWrapperClasses = clsx(styles.pickerWrapper, {
      [styles.fullWidth]: fullWidth,
    });

    const colorInputWrapperClasses = clsx(styles.colorInputWrapper, {
      [styles.disabled]: disabled,
      [styles.error]: Boolean(error),
    });

    const swatchClasses = clsx(styles.swatch, styles[size]);

    const valueClasses = clsx(styles.value, styles[size]);

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
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <div className={pickerWrapperClasses}>
          <div className={colorInputWrapperClasses} onClick={handleSwatchClick}>
            <div
              className={swatchClasses}
              style={{ backgroundColor: currentValue.toString() }}
            />
            {showValue && <span className={valueClasses}>{currentValue}</span>}
            <input
              ref={ref}
              id="color-input-hidden"
              type="color"
              className={styles.input}
              value={currentValue.toString()}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              {...props}
            />
          </div>
        </div>

        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
