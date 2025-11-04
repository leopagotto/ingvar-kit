# 10: Foundations - Extended Reference

> **For AI Agents:** Deep dive into Skapa Design System foundations. Use these specifications to ensure consistent, accessible, and on-brand implementations.

**Last Updated:** 2025-11-04
**Status:** Complete
**Based on:** Skapa Design System Official Specifications

---

## Quick Reference

| Foundation                          | Key Specs                 | Usage                                   |
| ----------------------------------- | ------------------------- | --------------------------------------- |
| [Typography](#1-typography-system)  | Noto Sans, 8px increments | All text content                        |
| [Color System](#2-color-system)     | Brand + Extended palette  | Backgrounds, text, interactive elements |
| [Spacing](#3-spacing-system)        | 4px base unit             | Layout, component spacing               |
| [Corner Radius](#4-corner-radius)   | 2px, 4px, 8px, 16px       | Component borders                       |
| [Elevation](#5-elevation)           | 4 levels                  | Layering, modals, cards                 |
| [Motion](#6-motion-and-animation)   | 200-400ms easing          | Transitions, animations                 |
| [Iconography](#7-iconography)       | 16px, 24px, 32px          | Icons, UI elements                      |
| [Grid & Layout](#8-grid-and-layout) | 12-column, responsive     | Page layouts                            |

---

## 1. Typography System

### Font Family

**Primary Typeface:** Noto Sans

```css
:root {
  --font-family-base: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Helvetica, Arial, sans-serif;
  --font-family-mono: "SF Mono", Monaco, "Cascadia Code", "Courier New",
    monospace;
}
```

### Type Scale

Base font size: **16px** (1rem)
Scale ratio: **1.125** (Major Second)

| Token       | Size            | Line Height | Usage                 |
| ----------- | --------------- | ----------- | --------------------- |
| `text-xs`   | 12px (0.75rem)  | 16px (1.33) | Helper text, labels   |
| `text-sm`   | 14px (0.875rem) | 20px (1.43) | Body small, captions  |
| `text-base` | 16px (1rem)     | 24px (1.5)  | Body text, paragraphs |
| `text-lg`   | 18px (1.125rem) | 28px (1.56) | Large body, emphasis  |
| `text-xl`   | 20px (1.25rem)  | 28px (1.4)  | Subheadings           |
| `text-2xl`  | 24px (1.5rem)   | 32px (1.33) | H3 headings           |
| `text-3xl`  | 30px (1.875rem) | 36px (1.2)  | H2 headings           |
| `text-4xl`  | 36px (2.25rem)  | 40px (1.11) | H1 headings           |
| `text-5xl`  | 48px (3rem)     | 52px (1.08) | Display large         |
| `text-6xl`  | 60px (3.75rem)  | 64px (1.07) | Hero text             |

### Font Weights

```css
:root {
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

| Weight | Token      | Usage                     |
| ------ | ---------- | ------------------------- |
| 400    | `regular`  | Body text, paragraphs     |
| 500    | `medium`   | Emphasized text, labels   |
| 600    | `semibold` | Subheadings, UI labels    |
| 700    | `bold`     | Headings, strong emphasis |

### Typography Components

```tsx
// Heading hierarchy
<h1 className="text-4xl font-bold">Page Title</h1>
<h2 className="text-3xl font-semibold">Section Title</h2>
<h3 className="text-2xl font-semibold">Subsection</h3>

// Body text
<p className="text-base">
  Regular paragraph text with good readability.
</p>

// Small text
<span className="text-sm text-neutral-600">
  Helper text or secondary information
</span>

// Emphasized text
<strong className="font-semibold">Important information</strong>
<em className="italic">Emphasized content</em>
```

### Responsive Typography

```css
/* Mobile-first approach */
.heading-responsive {
  font-size: 24px; /* Mobile */
  line-height: 32px;
}

@media (min-width: 768px) {
  .heading-responsive {
    font-size: 30px; /* Tablet */
    line-height: 36px;
  }
}

@media (min-width: 1024px) {
  .heading-responsive {
    font-size: 36px; /* Desktop */
    line-height: 40px;
  }
}
```

### Text Styles Best Practices

**DO:**

- ✅ Maintain 1.5 line height minimum for body text (WCAG)
- ✅ Use semantic HTML (`<h1>`, `<p>`, `<strong>`)
- ✅ Limit line length to 60-80 characters for readability
- ✅ Use proper heading hierarchy (no skipping levels)

**DON'T:**

- ❌ Use font sizes smaller than 12px
- ❌ Set line-height below 1.2
- ❌ Use more than 3 font weights per page
- ❌ Rely solely on color for emphasis

---

## 2. Color System

### Brand Colors

**Primary (IKEA Blue):**

```css
:root {
  --color-brand-blue: #0058a3;
  --color-brand-blue-dark: #004580;
  --color-brand-blue-light: #0077cc;
}
```

**Secondary (IKEA Yellow):**

```css
:root {
  --color-brand-yellow: #fbd914;
  --color-brand-yellow-dark: #ffcc00;
  --color-brand-yellow-light: #ffe566;
}
```

### Neutral Colors

**Light Mode:**

```css
:root {
  --color-neutral-0: #ffffff; /* White */
  --color-neutral-50: #f9fafb; /* Background subtle */
  --color-neutral-100: #f3f4f6; /* Background */
  --color-neutral-200: #e5e7eb; /* Border light */
  --color-neutral-300: #d1d5db; /* Border */
  --color-neutral-400: #9ca3af; /* Border strong */
  --color-neutral-500: #6b7280; /* Text subtle */
  --color-neutral-600: #4b5563; /* Text secondary */
  --color-neutral-700: #374151; /* Text primary */
  --color-neutral-800: #1f2937; /* Text strong */
  --color-neutral-900: #111827; /* Text emphasis */
}
```

**Dark Mode:**

```css
[data-theme="dark"] {
  --color-neutral-0: #111827; /* Background */
  --color-neutral-50: #1f2937; /* Background subtle */
  --color-neutral-100: #374151; /* Background elevated */
  --color-neutral-200: #4b5563; /* Border light */
  --color-neutral-300: #6b7280; /* Border */
  --color-neutral-400: #9ca3af; /* Border strong */
  --color-neutral-500: #d1d5db; /* Text subtle */
  --color-neutral-600: #e5e7eb; /* Text secondary */
  --color-neutral-700: #f3f4f6; /* Text primary */
  --color-neutral-800: #f9fafb; /* Text strong */
  --color-neutral-900: #ffffff; /* Text emphasis */
}
```

### Semantic Colors

**Success (Green):**

```css
:root {
  --color-success-50: #ecfdf5;
  --color-success-100: #d1fae5;
  --color-success-500: #10b981;
  --color-success-600: #059669;
  --color-success-700: #047857;
}
```

**Warning (Orange):**

```css
:root {
  --color-warning-50: #fff7ed;
  --color-warning-100: #ffedd5;
  --color-warning-500: #f59e0b;
  --color-warning-600: #d97706;
  --color-warning-700: #b45309;
}
```

**Error (Red):**

```css
:root {
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-500: #ef4444;
  --color-error-600: #dc2626;
  --color-error-700: #b91c1c;
}
```

**Info (Blue):**

```css
:root {
  --color-info-50: #eff6ff;
  --color-info-100: #dbeafe;
  --color-info-500: #3b82f6;
  --color-info-600: #2563eb;
  --color-info-700: #1d4ed8;
}
```

### Color Usage

**Text Colors:**

```tsx
// Primary text
<p className="text-neutral-900">Main content</p>

// Secondary text
<p className="text-neutral-600">Supporting information</p>

// Muted text
<p className="text-neutral-500">Helper text</p>

// Brand text
<span className="text-brand-blue">IKEA branded element</span>
```

**Background Colors:**

```tsx
// Page background
<div className="bg-neutral-0">

// Card/container
<div className="bg-neutral-50">

// Elevated surface
<div className="bg-neutral-100">

// Interactive hover
<button className="bg-brand-blue hover:bg-brand-blue-dark">
```

**Border Colors:**

```tsx
// Subtle border
<div className="border border-neutral-200">

// Strong border
<div className="border-2 border-neutral-300">

// Focus state
<input className="focus:ring-2 focus:ring-brand-blue">
```

### Color Contrast Guidelines

**WCAG AA Requirements:**

- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px or ≥ 14px bold): 3:1 minimum
- UI components: 3:1 minimum

**Approved Combinations:**

| Background     | Text          | Contrast | Pass   |
| -------------- | ------------- | -------- | ------ |
| `neutral-0`    | `neutral-900` | 19.4:1   | ✅ AAA |
| `neutral-0`    | `neutral-700` | 10.7:1   | ✅ AAA |
| `neutral-0`    | `neutral-600` | 7.2:1    | ✅ AA  |
| `neutral-0`    | `neutral-500` | 4.6:1    | ✅ AA  |
| `brand-blue`   | `neutral-0`   | 7.5:1    | ✅ AA  |
| `brand-yellow` | `neutral-900` | 12.1:1   | ✅ AAA |

### Dark Mode Color Tokens

**Elevation Backgrounds:**

```css
[data-theme="dark"] {
  --elevation-1: #1f2937; /* Cards, modals */
  --elevation-2: #374151; /* Dropdowns, popovers */
  --elevation-3: #4b5563; /* Tooltips, highest layer */
}
```

**Static Colors (Same in Both Modes):**

```css
:root {
  --static-white: #ffffff;
  --static-black: #000000;
  --static-ikea-blue: #0058a3;
  --static-ikea-yellow: #fbd914;
}
```

---

## 3. Spacing System

### Base Unit

**Base:** 4px (0.25rem)

All spacing values are multiples of 4px for consistent rhythm.

### Spacing Scale

```css
:root {
  --space-0: 0;
  --space-1: 4px; /* 0.25rem */
  --space-2: 8px; /* 0.5rem */
  --space-3: 12px; /* 0.75rem */
  --space-4: 16px; /* 1rem */
  --space-5: 20px; /* 1.25rem */
  --space-6: 24px; /* 1.5rem */
  --space-8: 32px; /* 2rem */
  --space-10: 40px; /* 2.5rem */
  --space-12: 48px; /* 3rem */
  --space-16: 64px; /* 4rem */
  --space-20: 80px; /* 5rem */
  --space-24: 96px; /* 6rem */
  --space-32: 128px; /* 8rem */
}
```

### Spacing Usage

**Component Internal Spacing:**

```tsx
// Button padding
<Button className="px-4 py-2">
  Click me
</Button>

// Card padding
<Card className="p-6">
  Content
</Card>

// Form field spacing
<div className="space-y-4">
  <InputField />
  <InputField />
  <InputField />
</div>
```

**Layout Spacing:**

```tsx
// Section margins
<section className="my-12">

// Grid gaps
<div className="grid grid-cols-3 gap-6">

// Stack spacing
<div className="flex flex-col gap-8">
```

### Responsive Spacing

```css
/* Mobile-first */
.container {
  padding: 16px; /* space-4 */
}

@media (min-width: 768px) {
  .container {
    padding: 24px; /* space-6 */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px; /* space-8 */
  }
}
```

---

## 4. Corner Radius

### Radius Scale

```css
:root {
  --radius-none: 0;
  --radius-sm: 2px;
  --radius-base: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px; /* Circular */
}
```

### Usage Guidelines

| Component    | Radius | Token         |
| ------------ | ------ | ------------- |
| Buttons      | 4px    | `radius-base` |
| Cards        | 8px    | `radius-md`   |
| Modals       | 16px   | `radius-lg`   |
| Pills/Tags   | Full   | `radius-full` |
| Avatar       | Full   | `radius-full` |
| Input fields | 4px    | `radius-base` |
| Images       | 8px    | `radius-md`   |

```tsx
// Examples
<Button className="rounded">Primary action</Button>
<Card className="rounded-md">Content</Card>
<Avatar className="rounded-full" />
<Pill className="rounded-full">Filter</Pill>
```

---

## 5. Elevation

### Shadow Scale

**4 Elevation Levels:**

```css
:root {
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}
```

### Elevation Usage

| Level | Shadow        | Usage                          |
| ----- | ------------- | ------------------------------ |
| **0** | None          | Page background, flat surfaces |
| **1** | `shadow-sm`   | Cards, subtle elevation        |
| **2** | `shadow-base` | Buttons, interactive elements  |
| **3** | `shadow-md`   | Dropdowns, popovers            |
| **4** | `shadow-lg`   | Modals, dialogs                |
| **5** | `shadow-xl`   | Tooltips, highest layer        |

```tsx
// Examples
<Card className="shadow-sm">Basic card</Card>
<Button className="shadow-base hover:shadow-md">Action</Button>
<Dropdown className="shadow-md">Menu items</Dropdown>
<Modal className="shadow-lg">Dialog content</Modal>
```

### Dark Mode Elevation

In dark mode, use background color changes instead of shadows:

```css
[data-theme="dark"] {
  .elevated-1 {
    background: var(--elevation-1);
    box-shadow: none;
  }

  .elevated-2 {
    background: var(--elevation-2);
    box-shadow: none;
  }
}
```

---

## 6. Motion and Animation

### Duration Scale

```css
:root {
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
}
```

### Easing Functions

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### Motion Guidelines

**Micro-interactions (100-200ms):**

- Button hover states
- Focus indicators
- Checkbox/radio toggles

**Standard transitions (200-300ms):**

- Dropdown open/close
- Tab switching
- Accordion expand/collapse

**Page transitions (300-400ms):**

- Modal open/close
- Slide-in panels
- Page route changes

### Implementation

```tsx
// CSS transitions
.button {
  transition: all var(--duration-fast) var(--ease-out);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

// React Spring example
import { useSpring, animated } from '@react-spring/web';

function Modal({ isOpen }) {
  const animation = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    config: { duration: 300 }
  });

  return (
    <animated.div style={animation}>
      Modal content
    </animated.div>
  );
}
```

### Accessibility

**Respect reduced motion:**

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

## 7. Iconography

### Icon Sizes

```css
:root {
  --icon-xs: 12px;
  --icon-sm: 16px;
  --icon-base: 20px;
  --icon-md: 24px;
  --icon-lg: 32px;
  --icon-xl: 48px;
}
```

### Usage Guidelines

| Context               | Size | Token       |
| --------------------- | ---- | ----------- |
| Inline with text-sm   | 16px | `icon-sm`   |
| Inline with text-base | 20px | `icon-base` |
| Button icons          | 20px | `icon-base` |
| Icon buttons          | 24px | `icon-md`   |
| Large UI elements     | 32px | `icon-lg`   |
| Hero/feature icons    | 48px | `icon-xl`   |

### Implementation

```tsx
import { Icon } from '@ingvar-kit/skapa-components';

// Inline with text
<p className="flex items-center gap-2">
  <Icon name="info" size="sm" />
  <span>Information text</span>
</p>

// Icon button
<IconButton icon="search" size="md" aria-label="Search" />

// Decorative icon
<Icon name="check" size="lg" className="text-success-600" />
```

---

## 8. Grid and Layout

### Container Widths

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
}
```

### Breakpoints

```css
/* Mobile-first breakpoints */
:root {
  --screen-sm: 640px; /* Tablet */
  --screen-md: 768px; /* Small desktop */
  --screen-lg: 1024px; /* Desktop */
  --screen-xl: 1280px; /* Large desktop */
  --screen-2xl: 1536px; /* Extra large */
}
```

### Grid System

**12-column responsive grid:**

```tsx
// Full width on mobile, 2 columns on tablet, 3 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>

// Responsive container
<div className="container mx-auto px-4 md:px-6 lg:px-8">
  <h1>Page content</h1>
</div>
```

### Layout Patterns

**Sidebar Layout:**

```tsx
<div className="flex flex-col lg:flex-row gap-8">
  <aside className="lg:w-64">Sidebar</aside>
  <main className="flex-1">Main content</main>
</div>
```

**Hero Section:**

```tsx
<section className="container mx-auto py-12 md:py-20 lg:py-32">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Hero Title</h1>
  </div>
</section>
```

---

## Foundation Checklist

When implementing designs, ensure:

- [ ] Typography uses Noto Sans with proper scale
- [ ] All spacing is 4px multiples
- [ ] Colors meet WCAG AA contrast (4.5:1 minimum)
- [ ] Dark mode uses elevation backgrounds
- [ ] Corner radius follows scale (2px, 4px, 8px, 16px)
- [ ] Shadows appropriate for elevation level
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Icons sized appropriately for context
- [ ] Layout responsive across breakpoints
- [ ] Focus states visible and accessible

---

**Next Steps:**

- Review [09-DESIGN-PATTERNS.md](./09-DESIGN-PATTERNS.md) for pattern implementations
- See component files (02-08) for detailed component specs
- Check [README.md](./README.md) for navigation

**Questions?** Reference the official Skapa Design System at skapa.ikea.net
