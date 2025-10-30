import React from "react";
import { Card as IngkaCard } from "@ingka/card";
import { colors } from "@ingka/colours";
import { tokens } from "@ingka/design-tokens";
import type { CardProps as IngkaCardProps } from "@ingka/card";

/**
 * IKEA Ingka Skapa Card Component
 *
 * Built with official IKEA design system components and follows
 * WCAG 2.1 AA accessibility standards.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/card
 */

export interface CardProps extends Omit<IngkaCardProps, "elevation"> {
  /** Card elevation level */
  elevation?: 0 | 1 | 2 | 3;

  /** Make card interactive (hover effects) */
  clickable?: boolean;

  /** Card variant */
  variant?: "default" | "outlined" | "filled";

  /** Card content */
  children: React.ReactNode;

  /** Custom class name */
  className?: string;

  /** Click handler for interactive cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

/**
 * Card component using IKEA Ingka Skapa design system.
 *
 * Features:
 * - Official IKEA design tokens
 * - WCAG 2.1 AA accessibility
 * - Multiple elevation levels
 * - Interactive states
 * - Responsive design
 *
 * @example
 * ```tsx
 * <Card elevation={2}>
 *   <Card.Header>
 *     <Card.Title>Product Name</Card.Title>
 *   </Card.Header>
 *   <Card.Content>
 *     <Card.Description>Product description</Card.Description>
 *   </Card.Content>
 * </Card>
 *
 * <Card clickable onClick={handleCardClick}>
 *   <Card.Media src="/product.jpg" alt="Product" />
 *   <Card.Content>
 *     <Card.Title>Interactive Card</Card.Title>
 *   </Card.Content>
 * </Card>
 * ```
 */
export const Card: React.FC<CardProps> = ({
  elevation = 1,
  clickable = false,
  variant = "default",
  children,
  className,
  onClick,
  style,
  ...props
}) => {
  // Custom styles using IKEA design tokens
  const customStyles: React.CSSProperties = {
    borderRadius: tokens.borderRadius.lg,
    backgroundColor: colors.neutral.white,
    transition: "all 0.2s ease-in-out",
    cursor: clickable ? "pointer" : "default",
    border:
      variant === "outlined" ? `1px solid ${colors.neutral.gray200}` : "none",
    ...style,
  };

  // Add hover effects for clickable cards
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (clickable) {
      event.currentTarget.style.transform = "translateY(-2px)";
      event.currentTarget.style.boxShadow =
        tokens.elevation[Math.min(elevation + 1, 3)];
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    if (clickable) {
      event.currentTarget.style.transform = "translateY(0)";
      event.currentTarget.style.boxShadow = tokens.elevation[elevation];
    }
  };

  return (
    <IngkaCard
      elevation={elevation}
      style={customStyles}
      className={`ingka-card ${className || ""}`}
      onClick={clickable ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={
        clickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e as any);
              }
            }
          : undefined
      }
      {...props}
    >
      {children}
    </IngkaCard>
  );
};

/**
 * Card Header Component
 */
export const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`card-header ${className || ""}`}
    style={{
      padding: `${tokens.spacing.md} ${tokens.spacing.md} 0`,
    }}
  >
    {children}
  </div>
);

/**
 * Card Content Component
 */
export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={`card-content ${className || ""}`}
    style={{
      padding: tokens.spacing.md,
    }}
  >
    {children}
  </div>
);

/**
 * Card Title Component
 */
export const CardTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <h3
    className={`card-title ${className || ""}`}
    style={{
      fontSize: tokens.typography.size.lg,
      fontWeight: tokens.typography.weight.semibold,
      lineHeight: tokens.typography.lineHeight.tight,
      color: colors.neutral.black,
      margin: 0,
      marginBottom: tokens.spacing.xs,
    }}
  >
    {children}
  </h3>
);

/**
 * Card Description Component
 */
export const CardDescription: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <p
    className={`card-description ${className || ""}`}
    style={{
      fontSize: tokens.typography.size.md,
      lineHeight: tokens.typography.lineHeight.relaxed,
      color: colors.neutral.gray700,
      margin: 0,
    }}
  >
    {children}
  </p>
);

/**
 * Card Media Component
 */
export const CardMedia: React.FC<{
  src: string;
  alt: string;
  aspectRatio?: "16:9" | "4:3" | "1:1" | "3:2";
  className?: string;
}> = ({ src, alt, aspectRatio = "16:9", className }) => {
  const aspectRatioMap = {
    "16:9": "56.25%",
    "4:3": "75%",
    "1:1": "100%",
    "3:2": "66.67%",
  };

  return (
    <div
      className={`card-media ${className || ""}`}
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: aspectRatioMap[aspectRatio],
        overflow: "hidden",
        borderTopLeftRadius: tokens.borderRadius.lg,
        borderTopRightRadius: tokens.borderRadius.lg,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        loading="lazy"
      />
    </div>
  );
};

/**
 * Card Actions Component
 */
export const CardActions: React.FC<{
  children: React.ReactNode;
  className?: string;
  justify?: "start" | "end" | "center" | "between";
}> = ({ children, className, justify = "end" }) => {
  const justifyContentMap = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
  };

  return (
    <div
      className={`card-actions ${className || ""}`}
      style={{
        display: "flex",
        gap: tokens.spacing.sm,
        padding: `0 ${tokens.spacing.md} ${tokens.spacing.md}`,
        justifyContent: justifyContentMap[justify],
      }}
    >
      {children}
    </div>
  );
};

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Media = CardMedia;
Card.Actions = CardActions;

// Export types for consumers
export type { CardProps };

// Default export
export default Card;
