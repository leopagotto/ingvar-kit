import React from "react";
import QuantityStepper from "@ingka/quantity-stepper";
import type { NumberFieldProps } from "./NumberField.types";
import styles from "./NumberField.module.css";

/**
 * NumberField component for numeric input with optional steppers
 * Wraps @ingka/quantity-stepper for official IKEA compliance
 *
 * @example
 * // Basic number field
 * <NumberField min={0} max={100} defaultValue={1} />
 *
 * @example
 * // With label
 * <NumberField
 *   label="Quantity"
 *   min={1}
 *   max={10}
 *   defaultValue={1}
 * />
 *
 * @example
 * // Controlled
 * <NumberField
 *   value={quantity}
 *   onChange={(e) => setQuantity(Number(e.target.value))}
 *   min={0}
 *   max={100}
 * />
 *
 * @example
 * // With error
 * <NumberField
 *   label="Age"
 *   error="Must be 18 or older"
 *   min={18}
 *   max={120}
 * />
 */
export const NumberField = React.forwardRef<HTMLInputElement, NumberFieldProps>(
  (
    {
      label,
      helperText,
      error,
      min = 0,
      max = 100,
      defaultValue = 1,
      onChange,
      disabled,
      required,
    },
    _ref
  ) => {
    const handleQuantityChange = (newValue: number | string) => {
      if (onChange) {
        // Create synthetic event to match our API
        const syntheticEvent = {
          target: { value: newValue.toString() },
          currentTarget: { value: newValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <QuantityStepper
          defaultValue={Number(defaultValue)}
          minVal={Number(min)}
          maxVal={Number(max)}
          onQuantityChange={handleQuantityChange}
          disabled={disabled}
          ariaDescribedBy={error || helperText || ""}
          ariaDescribedById="number-field-help"
        />
        {(error || helperText) && (
          <span
            id="number-field-help"
            className={error ? styles.errorText : styles.helperText}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

NumberField.displayName = "NumberField";
