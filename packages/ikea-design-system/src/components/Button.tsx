import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "ikea-primary" | "ikea-secondary" | "ikea-outline" | "ikea-ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "ikea-primary",
      size = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variantClasses = {
      "ikea-primary":
        "bg-ikea-blue text-white hover:bg-ikea-blue-dark focus-visible:ring-ikea-blue",
      "ikea-secondary":
        "bg-ikea-yellow text-ikea-blue hover:bg-ikea-yellow-dark focus-visible:ring-ikea-yellow",
      "ikea-outline":
        "border-2 border-ikea-blue text-ikea-blue hover:bg-ikea-blue hover:text-white focus-visible:ring-ikea-blue",
      "ikea-ghost":
        "text-ikea-blue hover:bg-ikea-gray-50 focus-visible:ring-ikea-blue",
    };

    const sizeClasses = {
      sm: "h-9 px-3 text-sm",
      md: "h-10 px-4 py-2",
      lg: "h-11 px-8 text-lg",
    };

    const classes =
      `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
