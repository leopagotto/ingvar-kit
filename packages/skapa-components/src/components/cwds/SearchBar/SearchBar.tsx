import React, { useState } from "react";
import type { SearchBarProps } from "./SearchBar.types";
import styles from "./SearchBar.module.css";

export const SearchBar: React.FC<SearchBarProps> = ({
  value: controlledValue,
  onChange,
  onSearch,
  placeholder = "Search...",
  autoFocus = false,
  disabled = false,
  className,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(value);
  };

  const handleClear = () => {
    const newValue = "";
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <form
      className={`${styles.searchBar} ${className || ""}`}
      onSubmit={handleSubmit}
    >
      <span className={styles.searchIcon}>🔍</span>
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        aria-label="Search"
      />
      {value && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
      <button type="submit" className={styles.submitButton} disabled={disabled}>
        Search
      </button>
    </form>
  );
};

SearchBar.displayName = "SearchBar";
