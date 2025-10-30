# Ingka Component Dependencies

## Required Dependencies

To use these production-ready IKEA-styled components, install:

```bash
npm install react react-dom
npm install --save-dev @types/react @types/react-dom typescript
```

## No External IKEA Packages Required

These components are **standalone** and **production-ready**. They:

✅ Follow IKEA Ingka Skapa design specifications
✅ Use official IKEA colors (#0051BA Swedish Blue, #FFDA1A Swedish Yellow)
✅ Implement WCAG 2.1 AA accessibility standards
✅ Support mobile-first responsive design (44x44px minimum touch targets)
✅ Include proper TypeScript types
✅ Work without IKEA's internal npm registry

## Component Features

### Button

- 5 variants: primary, secondary, tertiary, ghost, danger
- 3 sizes: sm (40px), md (48px), lg (56px)
- Loading states with accessible spinner
- Icon support (start/end)
- Full keyboard navigation
- WCAG AA contrast ratios (4.5:1)

### Card

- Elevation levels (0-3)
- Clickable variants with hover effects
- Sub-components: Header, Content, Title, Description, Media, Actions
- Responsive images with aspect ratio control
- Keyboard accessible

### Input

- Multiple types: text, email, password, number, tel, url
- Error states with messages
- Helper text support
- Required field indicators
- Labels properly associated

### All Components

- 8px grid system spacing
- Noto Sans typography
- Mobile-first breakpoints (320px, 768px, 1024px, 1440px)
- CSS-in-JS inline styles (no external dependencies)
- Production-ready and tested

## Usage Example

```tsx
import { Button } from "./ingka-components/Button";
import { Card } from "./ingka-components/Card";

function ProductCard() {
  return (
    <Card elevation={2}>
      <Card.Media src="/product.jpg" alt="POÄNG Armchair" aspectRatio="4:3" />
      <Card.Content>
        <Card.Title>POÄNG</Card.Title>
        <Card.Description>
          Armchair, birch veneer, Knisa light beige
        </Card.Description>
      </Card.Content>
      <Card.Actions>
        <Button variant="primary" size="md">
          Add to Cart
        </Button>
      </Card.Actions>
    </Card>
  );
}
```

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

## Accessibility

All components meet WCAG 2.1 AA standards:

- Keyboard navigation (Tab, Enter, Space, Arrow keys)
- Screen reader support (ARIA labels, roles, states)
- Focus indicators (2px visible outline)
- Color contrast ratios (minimum 4.5:1)
- Touch target sizes (minimum 44x44px on mobile)

## Design Tokens Reference

### Colors

```typescript
IKEA_BLUE = "#0051BA"; // Primary actions
IKEA_YELLOW = "#FFDA1A"; // Accents
ERROR_RED = "#C8102E"; // Error states
```

### Spacing (8px Grid)

```typescript
xs = 8px
sm = 16px
md = 24px
lg = 32px
```

### Typography

```typescript
Family: 'Noto Sans'
Sizes: 14px (sm), 16px (md), 18px (lg)
Weights: 400 (regular), 500 (medium), 600 (semibold)
```

### Breakpoints

```typescript
mobile: 320px
tablet: 768px
laptop: 1024px
desktop: 1440px
```

## For IKEA Internal Projects

If you have access to IKEA's internal npm registry (`npm.m2.blue.cdtapps.com`), you can use the official `@ingka/*` packages directly:

```bash
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"
npm install @ingka/button @ingka/card @ingka/design-tokens
```

However, these standalone components work perfectly for both internal and external projects without requiring registry access.
