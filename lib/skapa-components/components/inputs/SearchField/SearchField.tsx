import React from "react";
import Search from "@ingka/search";
import type { SearchFieldProps } from "./SearchField.types";
import styles from "./SearchField.module.css";

/**
 * SearchField component for search input with autocomplete
 * Wraps @ingka/search for official IKEA compliance
 *
 * @example
 * // Basic search
 * <SearchField placeholder="Search products..." />
 *
 * @example
 * // With label
 * <SearchField
 *   label="Search"
 *   placeholder="Type to search..."
 * />
 *
 * @example
 * // With search handler
 * <SearchField
 *   placeholder="Search..."
 *   onSearch={(value) => console.log('Searching for:', value)}
 * />
 */
export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      label,
      helperText,
      error,
      onSearch,
      placeholder = "Search...",
      disabled,
      required,
    },
    _ref
  ) => {
    const handleSearch = (
      _e:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLInputElement>,
      state: { scope: string | null; value: string | undefined }
    ) => {
      onSearch?.(state.value || "");
    };

    return (
      <div className={styles.container}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <Search
          id="skapa-search"
          placeholder={placeholder}
          disabled={disabled}
          onSearch={handleSearch}
          ariaLabel={label || "Search"}
        />
        {(error || helperText) && (
          <span className={error ? styles.errorText : styles.helperText}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

SearchField.displayName = "SearchField";
