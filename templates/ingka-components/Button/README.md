# Button Component

> **IKEA Ingka Skapa Button** - Official IKEA Design System Button Component

Built with `@ingka/button` and following IKEA's design principles and accessibility standards (WCAG 2.1 AA).

## 📦 Installation

```bash
# Set up IKEA Ingka Skapa registry
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"

# Install required packages
npm install @ingka/button @ingka/colours @ingka/design-tokens
```

## 🎨 Component Overview

The Button component provides consistent, accessible button interactions following IKEA's design system.

### Key Features

- ✅ **Official IKEA Design Tokens** - Colors, spacing, typography
- ✅ **5 Variants** - Primary, secondary, tertiary, ghost, danger
- ✅ **3 Sizes** - Small (32px), medium (40px), large (48px)
- ✅ **Accessibility** - WCAG 2.1 AA compliant
- ✅ **Loading States** - Built-in spinner and disabled state
- ✅ **Icon Support** - Start and end icon positions
- ✅ **Responsive** - Works on all screen sizes

## 🚀 Usage

### Basic Examples

```tsx
import { Button } from './Button';

// Primary button (default)
<Button onClick={handleSubmit}>
  Submit Order
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Learn More
</Button>

// Button with icons
<Button startIcon={<ShoppingCartIcon />}>
  Add to Cart
</Button>

// Loading state
<Button loading disabled>
  Processing...
</Button>

// Danger/destructive action
<Button variant="danger">
  Delete Item
</Button>
```

### Advanced Examples

```tsx
// Full width button
<Button fullWidth variant="primary">
  Continue to Checkout
</Button>

// Custom styling
<Button
  variant="secondary"
  style={{ borderRadius: '20px' }}
  className="custom-button"
>
  Custom Styled
</Button>

// With both icons
<Button
  startIcon={<SearchIcon />}
  endIcon={<ArrowRightIcon />}
  variant="tertiary"
>
  Search Products
</Button>
```

## 📋 Props API

| Prop        | Type                                                            | Default      | Description            |
| ----------- | --------------------------------------------------------------- | ------------ | ---------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger'` | `'primary'`  | Button style variant   |
| `size`      | `'sm' \| 'md' \| 'lg'`                                          | `'md'`       | Button size            |
| `loading`   | `boolean`                                                       | `false`      | Show loading spinner   |
| `fullWidth` | `boolean`                                                       | `false`      | Make button full width |
| `startIcon` | `ReactNode`                                                     | -            | Icon before text       |
| `endIcon`   | `ReactNode`                                                     | -            | Icon after text        |
| `disabled`  | `boolean`                                                       | `false`      | Disable button         |
| `onClick`   | `(event: MouseEvent) => void`                                   | -            | Click handler          |
| `children`  | `ReactNode`                                                     | **required** | Button content         |
| `className` | `string`                                                        | -            | Custom CSS class       |

## 🎨 Design Specifications

### Variants

**Primary** - Main call-to-action

- Background: `#0051BA` (IKEA Blue)
- Text: `#FFFFFF` (White)
- Usage: Submit forms, primary actions

**Secondary** - Supporting actions

- Background: `#FFFFFF` (White)
- Border: `#0051BA` (IKEA Blue)
- Text: `#0051BA` (IKEA Blue)
- Usage: Cancel, secondary actions

**Tertiary** - Subtle actions

- Background: Transparent
- Text: `#0051BA` (IKEA Blue)
- Usage: Links, minimal actions

**Ghost** - Minimal emphasis

- Background: Transparent
- Text: `#000000` (Black)
- Usage: Navigation, subtle actions

**Danger** - Destructive actions

- Background: `#D32F2F` (Red)
- Text: `#FFFFFF` (White)
- Usage: Delete, remove, destructive actions

### Sizes

**Small (sm)** - 32px height

- Padding: `8px 16px`
- Font: 14px medium
- Usage: Compact interfaces, tables

**Medium (md)** - 40px height (default)

- Padding: `12px 24px`
- Font: 16px medium
- Usage: Standard buttons, forms

**Large (lg)** - 48px height

- Padding: `16px 32px`
- Font: 18px medium
- Usage: Hero sections, prominent CTAs

### Spacing & Layout

- **Gap between icon and text:** 8px (`tokens.spacing.xs`)
- **Border radius:** 8px (`tokens.borderRadius.md`)
- **Focus ring:** 3px with 20% opacity
- **Grid system:** All measurements follow 8px grid

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance

- **Color Contrast:** All variants meet 4.5:1 contrast ratio
- **Keyboard Navigation:** Full keyboard support with proper focus indicators
- **Screen Readers:** Proper ARIA labels and state announcements
- **Touch Targets:** Minimum 44px touch area on mobile
- **Motion:** Respects `prefers-reduced-motion` setting

### ARIA Attributes

```tsx
// Automatically applied
aria-busy={loading}           // When loading is true
aria-disabled={disabled}      // When disabled is true
aria-label="Loading..."       // When loading is true
```

### Keyboard Support

- **Enter/Space:** Activates button
- **Tab:** Focuses button
- **Escape:** Removes focus (when applicable)

## 🎯 Best Practices

### ✅ Do

- Use primary variant sparingly (1-2 per page)
- Place primary button at the end of forms
- Use consistent sizing within the same context
- Provide clear, action-oriented labels
- Use loading states for async operations
- Group related buttons with consistent spacing

### ❌ Don't

- Use more than one primary button per section
- Make buttons too small for touch devices
- Use vague labels like "Click Here" or "Submit"
- Disable buttons without explanation
- Use danger variant for non-destructive actions

## 🔗 Related Components

- **[Icon Button](../IconButton/README.md)** - For icon-only buttons
- **[Button Group](../ButtonGroup/README.md)** - For grouped button actions
- **[Link](../Link/README.md)** - For navigation
- **[Card](../Card/README.md)** - Often contains buttons

## 📱 Responsive Behavior

```tsx
// Mobile-first responsive button
<Button
  size="sm" // Small on mobile
  className="md:size-md" // Medium on tablet+
  fullWidth // Full width on mobile
>
  Responsive Button
</Button>
```

## 🧪 Testing

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

test("renders button with text", () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
});

test("calls onClick when clicked", () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click me</Button>);
  fireEvent.click(screen.getByRole("button"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("shows loading state", () => {
  render(<Button loading>Loading</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
});
```

---

**🇸🇪 Built with IKEA Ingka Skapa Design System for professional, accessible, and consistent user interfaces.**
