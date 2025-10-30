import React, { useState, useEffect } from "react";

/**
 * Image Component
 *
 * Optimized image component with loading states, fallback, and lazy loading.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/image
 */

export interface ImageProps {
  /** Image source URL */
  src: string;

  /** Alternative text for accessibility */
  alt: string;

  /** Image aspect ratio (e.g., "16:9", "4:3", "1:1") */
  aspectRatio?: string;

  /** Object fit property */
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";

  /** Loading strategy */
  loading?: "eager" | "lazy";

  /** Placeholder image URL (shown while loading) */
  placeholder?: string;

  /** Fallback image URL (shown on error) */
  fallback?: string;

  /** Border radius */
  rounded?: "none" | "sm" | "md" | "lg" | "full";

  /** Additional CSS classes */
  className?: string;

  /** Callback when image loads successfully */
  onLoadSuccess?: () => void;

  /** Callback when image fails to load */
  onLoadError?: (error: Event) => void;
}

const roundedStyles = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const objectFitStyles = {
  contain: "object-contain",
  cover: "object-cover",
  fill: "object-fill",
  none: "object-none",
  "scale-down": "object-scale-down",
};

/**
 * Image component with loading states
 */
export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  aspectRatio,
  objectFit = "cover",
  loading = "lazy",
  placeholder,
  fallback,
  rounded = "none",
  className = "",
  onLoadSuccess,
  onLoadError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(placeholder || src);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setCurrentSrc(placeholder || src);

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      setCurrentSrc(src);
      setIsLoading(false);
      onLoadSuccess?.();
    };

    img.onerror = (error) => {
      setIsLoading(false);
      setHasError(true);
      if (fallback) {
        setCurrentSrc(fallback);
      }
      onLoadError?.(error);
    };
  }, [src, placeholder, fallback, onLoadSuccess, onLoadError]);

  const aspectRatioStyle = aspectRatio
    ? { aspectRatio: aspectRatio.replace(":", "/") }
    : undefined;

  const classes = [
    "inline-block",
    roundedStyles[rounded],
    objectFitStyles[objectFit],
    isLoading && "animate-pulse bg-gray-200",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (hasError && !fallback) {
    // Show error placeholder
    return (
      <div
        className={`${classes} flex items-center justify-center bg-gray-100`}
        style={aspectRatioStyle}
        role="img"
        aria-label={`Failed to load: ${alt}`}
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={loading}
      className={classes}
      style={aspectRatioStyle}
    />
  );
};
