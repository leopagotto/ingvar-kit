import React from 'react';
import clsx from 'clsx';
import type { SelectProps } from './Select.types';
import styles from './Select.module.css';

/**
 * Select component for dropdown selection
 * 
 * @example
 * // Basic select
 * <Select 
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 * />
 * 
 * @example
 * // With label and placeholder
 * <Select 
 *   label="Country"
 *   placeholder="Select a country"
 *   options={countries}
 * />
 * 
 * @example
 * // Controlled select
 * <Select 
 *   value={selectedValue}
 *   onChange={(e) => setSelectedValue(e.target.value)}
 *   options={options}
 * />
 * 
 * @example
 * // With error
 * <Select 
 *   label="Size"
 *   error="Please select a size"
 *   options={sizes}
 * />
 * 
 * @example
 * // Different sizes and variants
 * <Select size="small" variant="outlined" options={options} />
 * <Select size="medium" variant="filled" options={options} />
 * <Select size="large" variant="outlined" options={options} />
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      size = 'medium',
      variant = 'outlined',
      label,
      helperText,
      error,
      options,
      placeholder,
      required,
      disabled,
      fullWidth = false,
      className,
      ...props
    },
    ref
  ) => {
    const selectClasses = clsx(
      styles.select,
      styles[size],
      styles[variant],
      {
        [styles.error]: Boolean(error),
      }
    );

    const labelClasses = clsx(
      styles.label,
      styles[size]
    );

    const helperTextClasses = clsx(
      styles.helperText,
      {
        [styles.error]: Boolean(error),
      }
    );

    return (
      <div className={clsx(styles.container, { [styles.fullWidth]: fullWidth }, className)}>
        {label && (
          <label className={labelClasses}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <div className={clsx(styles.selectWrapper, { [styles.fullWidth]: fullWidth })}>
          <select
            ref={ref}
            className={selectClasses}
            disabled={disabled}
            required={required}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <svg
            className={styles.arrow}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        {(error || helperText) && (
          <span className={helperTextClasses}>{error || helperText}</span>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
