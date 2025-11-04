# Skapa Design System: Overview and Foundations

> **For AI Agents:** This is a comprehensive reference guide for IKEA's Skapa Design System. Use this documentation to understand design principles, implement components, and maintain consistency across IKEA digital products.

## 📋 Table of Contents

- [What is Skapa?](#what-is-skapa)
- [Design Philosophy](#design-philosophy)
- [Foundation System](#foundation-system)
- [Typography](#typography)
- [Spacing Scale](#spacing-scale)
- [Color System](#color-system)
- [Layout & Grids](#layout--grids)
- [Iconography](#iconography)

---

## What is Skapa?

**Skapa** (Swedish for "create") is IKEA's comprehensive design system that provides:

- **75+ Production-Ready Components** for web and mobile
- **Unified Design Language** across all IKEA digital touchpoints
- **Accessibility-First Approach** (WCAG 2.1 AA compliance)
- **Multi-Platform Support:** React, Vue, Web Components, Android, iOS
- **IKEA Brand Consistency** with Swedish design principles

### Available Platforms

```javascript
{
  web: ["React", "Preact", "Vue", "Web Components"],
  mobile: ["Android", "iOS"],
  design: ["Figma"]
}
```

---

## Design Philosophy

### Core Principles

1. **Democratic Design**

   - Accessible to everyone
   - Affordable solutions
   - Sustainable choices
   - Beautiful simplicity

2. **Swedish Heritage**

   - Clean, minimalist aesthetics
   - Functional over decorative
   - Natural materials and colors
   - "Lagom" - just the right amount

3. **User-Centered**
   - Clear affordances
   - Predictable behaviors
   - Inclusive by default
   - Performance-optimized

---

## Foundation System

### Design Tokens Architecture

Skapa uses a **three-tier token system**:

```
Global Tokens → Semantic Tokens → Component Tokens
```

**Example Flow:**

```javascript
// Global Token
--color-blue-500: #0058A3;

// Semantic Token
--color-primary: var(--color-blue-500);

// Component Token
--button-background-primary: var(--color-primary);
```

---

## Typography

### Type Scale

Skapa uses **Noto IKEA** as the primary typeface, with a modular scale:

```css
/* Display Sizes (Marketing & Hero) */
--text-display-large: 56px / 64px (line-height)
--text-display-medium: 48px / 56px
--text-display-small: 40px / 48px

/* Heading Sizes (Page Structure) */
--text-heading-xl: 32px / 40px
--text-heading-large: 28px / 36px
--text-heading-medium: 24px / 32px
--text-heading-small: 20px / 28px
--text-heading-xs: 18px / 24px

/* Body Sizes (Content) */
--text-body-large: 16px / 24px
--text-body-medium: 14px / 20px
--text-body-small: 12px / 16px

/* Utility Sizes */
--text-caption: 11px / 16px
--text-overline: 10px / 16px (uppercase, letter-spacing: 0.5px)
```

### Font Weights

```css
--font-weight-regular: 400
--font-weight-medium: 500
--font-weight-bold: 700
```

### Usage Guidelines

**✅ DO:**

- Use heading hierarchy (h1 → h2 → h3)
- Maintain consistent line-height ratios (1.4-1.5 for body text)
- Use bold weight sparingly for emphasis
- Keep line length between 45-75 characters

**❌ DON'T:**

- Skip heading levels
- Use all caps for large bodies of text
- Mix multiple font families
- Use font sizes outside the scale

---

## Spacing Scale

### Base-8 System

Skapa uses an **8-point grid system** for consistent spacing:

```css
--spacing-4: 4px    /* Half step */
--spacing-8: 8px    /* Base unit */
--spacing-12: 12px  /* 1.5x base */
--spacing-13: 13px  /* Special case for optical alignment */
--spacing-16: 16px  /* 2x base */
--spacing-20: 20px  /* 2.5x base */
--spacing-24: 24px  /* 3x base */
--spacing-32: 32px  /* 4x base */
--spacing-40: 40px  /* 5x base */
--spacing-48: 48px  /* 6x base */
--spacing-64: 64px  /* 8x base */
--spacing-88: 88px  /* 11x base */
--spacing-120: 120px /* 15x base */
```

### Application

```javascript
// Component spacing (internal padding/gaps)
padding: var(--spacing-16);
gap: var(--spacing-12);

// Layout spacing (between sections)
margin-bottom: var(--spacing-40);

// Micro spacing (icon-text gaps)
gap: var(--spacing-8);
```

### Responsive Spacing

```css
/* Mobile: Use smaller spacing */
@media (max-width: 768px) {
  --section-spacing: var(--spacing-32);
}

/* Desktop: Use larger spacing */
@media (min-width: 769px) {
  --section-spacing: var(--spacing-64);
}
```

---

## Color System

### Primary Colors (IKEA Brand)

```css
/* IKEA Blue (Primary) */
--color-blue-ikea: #0058A3
--color-blue-dark: #003D82
--color-blue-light: #0077C8

/* IKEA Yellow (Accent) */
--color-yellow-ikea: #FFDB00
--color-yellow-dark: #FFC600
--color-yellow-light: #FFEB3B
```

### Neutral Palette

```css
--color-neutral-1: #FFFFFF  /* Pure white */
--color-neutral-2: #F5F5F5  /* Background grey */
--color-neutral-3: #DFDFDF  /* Border grey */
--color-neutral-4: #929292  /* Disabled grey */
--color-neutral-5: #484848  /* Text grey */
--color-neutral-6: #111111  /* Pure black */
```

### Semantic Colors

```css
/* Success */
--color-success: #00A300
--color-success-background: #E8F5E9

/* Error/Danger */
--color-error: #E00751
--color-error-background: #FEEBEE

/* Warning */
--color-warning: #FF8C00
--color-warning-background: #FFF3E0

/* Info */
--color-info: #0077C8
--color-info-background: #E3F2FD
```

### Special Theme Colors

```css
/* Wayfinding (Navigation) */
--color-wayfinding: #0058A3

/* Lowest Price (BTI) */
--color-lowest-price: #FFDB00

/* Important Message (Time-sensitive) */
--color-important: #E00751
```

### Usage Rules

**Primary Actions:**

```css
background: var(--color-blue-ikea);
color: var(--color-neutral-1);
```

**Secondary Actions:**

```css
border: 1px solid var(--color-neutral-3);
color: var(--color-neutral-5);
background: transparent;
```

**Disabled States:**

```css
background: var(--color-neutral-3);
color: var(--color-neutral-4);
cursor: not-allowed;
```

---

## Layout & Grids

### Breakpoint System

```css
/* Mobile First Approach */
--breakpoint-xs: 0px      /* Phone portrait */
--breakpoint-sm: 600px    /* Phone landscape / Small tablet */
--breakpoint-md: 900px    /* Tablet portrait */
--breakpoint-lg: 1200px   /* Tablet landscape / Desktop */
--breakpoint-xl: 1440px   /* Large desktop */
--breakpoint-xxl: 1920px  /* Extra large screens */
```

### Grid System

**12-Column Grid** with responsive behavior:

```javascript
// Mobile (< 600px)
columns: 4
gutter: 16px
margin: 16px

// Tablet (600px - 900px)
columns: 8
gutter: 24px
margin: 24px

// Desktop (> 900px)
columns: 12
gutter: 32px
margin: 40px
```

### Container Max-Widths

```css
--container-sm: 600px
--container-md: 900px
--container-lg: 1200px
--container-xl: 1440px
```

### Aspect Ratios

Supported aspect ratios for images/media:

```javascript
aspectRatios: [
  "1:1", // Square (profile images, product thumbnails)
  "3:4", // Portrait (product cards)
  "4:3", // Landscape (content images)
  "4:5", // Tall portrait (lifestyle images)
  "6:7", // Product cards (special)
  "9:16", // Vertical video (stories, mobile)
  "16:9", // Horizontal video (desktop, hero)
];
```

---

## Iconography

### Icon System

**Over 1000+ icons** organized by categories:

```javascript
categories: [
  "Actions", // Common UI actions (edit, delete, save)
  "Navigation", // Arrows, chevrons, menus
  "Objects", // Products, furniture, items
  "Status", // Checkmarks, errors, warnings
  "Social", // Share, like, comment
  "Commerce", // Cart, payment, delivery
  "IKEA Specific", // Product categories, services
];
```

### Icon Sizes

```css
--icon-xs: 16px   /* Small inline icons */
--icon-sm: 20px   /* Default icon size */
--icon-md: 24px   /* Medium prominence */
--icon-lg: 32px   /* Large hero icons */
--icon-xl: 48px   /* Feature icons */
```

### Icon Usage

```jsx
// Leading Icon (before text)
<Button>
  <Icon name="add" size="sm" />
  Add to cart
</Button>

// Trailing Icon (after text)
<Button>
  Continue
  <Icon name="arrow-right" size="sm" />
</Button>

// Icon-only Button
<IconButton
  icon="close"
  label="Close"  // For accessibility
  size="md"
/>
```

### Icon Colors

```css
/* Default (Inherit from parent) */
fill: currentColor;

/* Semantic Colors */
--icon-color-success: var(--color-success);
--icon-color-error: var(--color-error);
--icon-color-warning: var(--color-warning);
--icon-color-info: var(--color-info);

/* Neutral States */
--icon-color-primary: var(--color-neutral-6);
--icon-color-secondary: var(--color-neutral-4);
--icon-color-disabled: var(--color-neutral-3);
```

---

## Accessibility Standards

### WCAG 2.1 AA Compliance

All Skapa components meet **WCAG 2.1 Level AA** standards:

**Color Contrast:**

```
Large Text (18px+): Minimum 3:1 ratio
Normal Text (< 18px): Minimum 4.5:1 ratio
UI Components: Minimum 3:1 ratio
```

**Keyboard Navigation:**

- All interactive elements are keyboard accessible
- Visible focus indicators (3px outline)
- Logical tab order
- Skip links for navigation

**Screen Readers:**

- Semantic HTML elements
- ARIA labels and roles
- Alt text for images
- Status announcements

### Focus States

```css
:focus-visible {
  outline: 3px solid var(--color-blue-ikea);
  outline-offset: 2px;
  border-radius: 4px;
}
```

---

## Motion & Animation

### Motion Principles

1. **Purposeful** - Every animation serves a function
2. **Efficient** - Quick and responsive (< 300ms)
3. **Natural** - Follows physics-based easing
4. **Respectful** - Respects prefers-reduced-motion

### Easing Curves

```css
--ease-standard: cubic-bezier(0.4, 0.0, 0.2, 1)   /* Default */
--ease-decelerate: cubic-bezier(0.0, 0.0, 0.2, 1) /* Exit */
--ease-accelerate: cubic-bezier(0.4, 0.0, 1, 1)   /* Enter */
--ease-sharp: cubic-bezier(0.4, 0.0, 0.6, 1)      /* Snappy */
```

### Duration Scale

```css
--duration-instant: 100ms   /* Micro-interactions */
--duration-quick: 200ms     /* UI feedback */
--duration-standard: 300ms  /* Default transitions */
--duration-slow: 500ms      /* Complex animations */
```

### Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Internationalization (i18n)

### RTL Support

All components support **Right-to-Left** languages (Arabic, Hebrew):

```css
/* Automatic mirroring */
[dir="rtl"] {
  /* Padding/margin flip */
  padding-left: auto;
  padding-right: var(--spacing-16);

  /* Transform flip */
  transform: scaleX(-1);
}
```

### Text Direction

```jsx
// Leading/trailing icons swap in RTL
<Button dir="rtl">
  <Icon name="arrow-left" /> {/* Becomes trailing in RTL */}
  Back
</Button>
```

---

## Browser Support

### Supported Browsers

```javascript
browsers: {
  chrome: ">= 90",
  firefox: ">= 88",
  safari: ">= 14",
  edge: ">= 90",
  ios: ">= 14",
  android: ">= 10"
}
```

### Progressive Enhancement

```css
/* Modern browsers with CSS Grid */
@supports (display: grid) {
  .layout {
    display: grid;
  }
}

/* Fallback for older browsers */
@supports not (display: grid) {
  .layout {
    display: flex;
  }
}
```

---

## Best Practices Summary

### For AI Agents Implementing Skapa

1. **Always use design tokens** - Never hardcode values
2. **Follow spacing scale** - Use the 8-point grid
3. **Maintain color contrast** - Test with accessibility tools
4. **Support keyboard navigation** - All interactive elements need focus states
5. **Respect motion preferences** - Honor prefers-reduced-motion
6. **Test RTL layouts** - Ensure components work in both directions
7. **Use semantic HTML** - Buttons are `<button>`, links are `<a>`
8. **Provide alt text** - All images need descriptive alternatives
9. **Keep hierarchy clear** - Use proper heading levels
10. **Test on real devices** - Don't rely on browser DevTools alone

---

## Quick Reference

### Component Installation

```bash
# React
npm install @ingka/skapa-react

# Vue
npm install @ingka/skapa-vue

# Web Components
npm install @ingka/skapa-web-components
```

### Basic Usage

```jsx
import { Button, Card, Icon } from "@ingka/skapa-react";

function App() {
  return (
    <Card>
      <Card.Title>Welcome to IKEA</Card.Title>
      <Card.Body>Find everything you need for your home.</Card.Body>
      <Button variant="primary">
        <Icon name="cart" />
        Shop now
      </Button>
    </Card>
  );
}
```

---

## Additional Resources

- **Official Documentation:** https://skapa.ikea.net
- **Figma Library:** Available to IKEA designers
- **GitHub:** Internal IKEA repositories
- **Support:** Contact IKEA design team

---

**Next:** [02-ACTION-COMPONENTS.md](./02-ACTION-COMPONENTS.md) - Buttons, Links, and Interactive Elements
