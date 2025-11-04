import React from "react";
import clsx from "clsx";
import type { RadioProps } from "./Radio.types";
import styles from "./Radio.module.css";

/**
 * Radio component for exclusive selection within a group
 *
 * @example
 * // Basic radio
 * <Radio name="option" value="1" label="Option 1" />
 *
 * @example
 * // Controlled radio group
 * <div>
 *   <Radio
 *     name="size"
 *     value="small"
 *     checked={size === 'small'}
 *     onChange={(e) => setSize(e.target.value)}
 *     label="Small"
 *   />
 *   <Radio
 *     name="size"
 *     value="medium"
 *     checked={size === 'medium'}
 *     onChange={(e) => setSize(e.target.value)}
 *     label="Medium"
 *   />
 * </div>
 *
 * @example
 * // With helper text
 * <Radio
 *   label="Express shipping"
 *   helperText="Arrives in 1-2 business days"
 * />
 *
 * @example
 * // With error
 * <Radio
 *   error="Please select an option"
 *   label="I agree to the terms"
 * />
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = "medium",
      label,
      helperText,
      error,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const radioClasses = clsx(styles.radio, styles[size], {
      [styles.error]: Boolean(error),
      [styles.disabled]: disabled,
    });

    const labelClasses = clsx(styles.label, styles[size], {
      [styles.disabled]: disabled,
    });

    const helperTextClasses = clsx(styles.helperText, styles[size], {
      [styles.error]: Boolean(error),
    });

    return (
      <div className={clsx(styles.container, className)}>
        <label
          className={clsx(styles.wrapper, { [styles.disabled]: disabled })}
        >
          <input
            ref={ref}
            type="radio"
            className={styles.input}
            disabled={disabled}
            {...props}
          />
          <span className={radioClasses}>
            <span className={styles.dot} />
          </span>
          {label && <span className={labelClasses}>{label}</span>}
        </label>
        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Radio.displayName = "Radio";
