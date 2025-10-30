import React from "react";

/**
 * List Component
 *
 * Lists with interactive items using composite pattern.
 * Based on IKEA Ingka Skapa design system.
 *
 * @see https://npm.m2.blue.cdtapps.com/@ingka/list
 */

export interface ListProps {
  /** List items */
  children: React.ReactNode;

  /** List density variant */
  variant?: "default" | "compact" | "comfortable";

  /** Show dividers between items */
  dividers?: boolean;

  /** Show border around list */
  bordered?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export interface ListItemProps {
  /** Item content */
  children: React.ReactNode;

  /** Content at start (icon, avatar, etc.) */
  startContent?: React.ReactNode;

  /** Content at end (icon, chevron, badge, etc.) */
  endContent?: React.ReactNode;

  /** Click handler (makes item interactive) */
  onClick?: () => void;

  /** Selected state */
  selected?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

const variantStyles = {
  default: "py-3 px-4",
  compact: "py-2 px-3",
  comfortable: "py-4 px-5",
};

/**
 * List component
 */
export const List: React.FC<ListProps> & { Item: React.FC<ListItemProps> } = ({
  children,
  variant = "default",
  dividers = false,
  bordered = false,
  className = "",
}) => {
  const classes = [
    "w-full",
    bordered && "border border-gray-200 rounded-lg overflow-hidden",
    dividers &&
      "[&>*:not(:last-child)]:border-b [&>*:not(:last-child)]:border-gray-200",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={classes} role="list">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === ListItem) {
          return React.cloneElement(child, { variant } as any);
        }
        return child;
      })}
    </ul>
  );
};

/**
 * ListItem component
 */
const ListItem: React.FC<
  ListItemProps & { variant?: ListProps["variant"] }
> = ({
  children,
  startContent,
  endContent,
  onClick,
  selected = false,
  disabled = false,
  variant = "default",
  className = "",
}) => {
  const isInteractive = !!onClick;
  const Element = isInteractive ? "button" : "div";

  const classes = [
    "w-full flex items-center gap-3",
    variantStyles[variant],
    isInteractive &&
      "hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer text-left",
    selected && "bg-blue-50 hover:bg-blue-100",
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const elementProps = {
    className: classes,
    ...(isInteractive && {
      onClick,
      type: "button" as const,
      role: "button",
      "aria-selected": selected,
      "aria-disabled": disabled,
    }),
  };

  return (
    <li>
      {React.createElement(
        Element,
        elementProps,
        <>
          {startContent && (
            <span className="flex-shrink-0">{startContent}</span>
          )}
          <span className="flex-1">{children}</span>
          {endContent && <span className="flex-shrink-0">{endContent}</span>}
        </>
      )}
    </li>
  );
};

List.Item = ListItem;

export { ListItem };
