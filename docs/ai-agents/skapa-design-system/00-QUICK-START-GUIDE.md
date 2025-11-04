# Skapa Design System: Quick Start Guide for AI Agents

> **Fast Reference:** Essential information to start implementing Skapa components immediately.

## 🚀 Installation

```bash
# React
npm install @ingka/skapa-react

# Vue
npm install @ingka/skapa-vue

# Web Components
npm install @ingka/skapa-web-components
```

## 📚 Documentation Structure

This documentation is organized into 10 focused files:

1. **[01-OVERVIEW-AND-FOUNDATIONS.md](./01-OVERVIEW-AND-FOUNDATIONS.md)** - Design system overview, typography, spacing, colors, grids
2. **[02-ACTION-COMPONENTS.md](./02-ACTION-COMPONENTS.md)** - Buttons, links, interactive elements
3. **[03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md)** - Forms, text fields, selections
4. **[04-DISPLAY-COMPONENTS.md](./04-DISPLAY-COMPONENTS.md)** - Cards, lists, tables, content display
5. **[05-FEEDBACK-COMPONENTS.md](./05-FEEDBACK-COMPONENTS.md)** - Toasts, modals, alerts, loading states
6. **[06-NAVIGATION-COMPONENTS.md](./06-NAVIGATION-COMPONENTS.md)** - Tabs, menus, breadcrumbs, pagination
7. **[07-MEDIA-COMPONENTS.md](./07-MEDIA-COMPONENTS.md)** - Images, videos, carousels, galleries
8. **[08-SPECIALTY-COMPONENTS.md](./08-SPECIALTY-COMPONENTS.md)** - Commerce, pricing, ratings, badges
9. **[09-LAYOUT-PATTERNS.md](./09-LAYOUT-PATTERNS.md)** - Page layouts, responsive patterns, composition
10. **[10-CWDS-SUBSYSTEM.md](./10-CWDS-SUBSYSTEM.md)** - Coworker Design System (internal IKEA apps)

## ⚡ Quick Component Reference

### Most Common Components

```jsx
// Button
<Button variant="primary">Add to cart</Button>

// Input Field
<InputField label="Email" type="email" required />

// Card
<Card>
  <CardImage src="..." aspectRatio="4:3" />
  <CardTitle>Product name</CardTitle>
  <CardBody>Description text...</CardBody>
  <Button>Learn more</Button>
</Card>

// Select
<Select label="Country">
  <option value="se">Sweden</option>
</Select>

// Checkbox
<Checkbox label="I agree to terms" />

// Toast
<Toast variant="success">Item added to cart</Toast>
```

## 🎨 Design Tokens Quick Reference

### Colors
```javascript
primary: "#0058A3"      // IKEA Blue
accent: "#FFDB00"       // IKEA Yellow
success: "#00A300"      // Green
error: "#E00751"        // Red
warning: "#FF8C00"      // Orange
```

### Spacing (Base-8)
```javascript
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
```

### Typography
```javascript
"Noto IKEA" font family
Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 28px, 32px, 40px, 48px, 56px
Weights: 400 (regular), 500 (medium), 700 (bold)
```

### Breakpoints
```javascript
xs: 0px       // Mobile portrait
sm: 600px     // Mobile landscape
md: 900px     // Tablet
lg: 1200px    // Desktop
xl: 1440px    // Large desktop
```

## 🔍 Component Selection Guide

### User Needs to...

**Trigger an action** → Button, Icon Button, Hyperlink
**Enter text** → Input Field, Text Area, Search
**Select one option** → Radio Button, Select
**Select multiple options** → Checkbox
**Toggle a setting** → Switch
**Choose from a range** → Slider, Quantity Stepper
**Display grouped content** → Card, Compact Card
**Show a list** → List, Table
**Navigate sections** → Tabs, App Bar
**Show feedback** → Toast, Banner, Inline Message
**Display media** → Image, Simple Video, Carousel
**Show price** → Price component
**Rate something** → Rating component

## 📱 Platform-Specific Notes

### React
```jsx
import { Button, Card, InputField } from '@ingka/skapa-react';
```

### Vue
```vue
<script setup>
import { SkapaButton, SkapaCard } from '@ingka/skapa-vue';
</script>
```

### Web Components
```html
<skapa-button variant="primary">Click me</skapa-button>
```

### Android
```kotlin
import com.ingka.skapa.Button
import com.ingka.skapa.Card
```

### iOS
```swift
import SkapaKit

let button = SkapaButton(variant: .primary)
```

## ♿ Accessibility Checklist

Essential checks for every component:

- [ ] Semantic HTML elements used
- [ ] All images have alt text
- [ ] All inputs have associated labels
- [ ] Keyboard navigation works (Tab, Enter, Arrows)
- [ ] Focus states are visible (3px blue outline)
- [ ] Color contrast meets WCAG 2.1 AA (4.5:1 minimum)
- [ ] ARIA labels provided where needed
- [ ] Error messages are clear and linked to inputs
- [ ] Screen reader tested

## 🌍 Internationalization

### RTL Languages

All components automatically support RTL (Arabic, Hebrew):

```jsx
<div dir="rtl">
  <Button>
    <Icon name="arrow-left" /> {/* Automatically flips */}
    Back
  </Button>
</div>
```

### Text Direction

- Leading/trailing icons swap positions
- Layouts mirror horizontally
- Text alignment adjusts automatically
- Number formatting respects locale

## 🎯 Common Patterns

### Form with Validation

```jsx
<Form onSubmit={handleSubmit}>
  <InputField 
    label="Email"
    type="email"
    required
    error={errors.email}
  />
  
  <InputField 
    label="Password"
    type="password"
    required
    minLength={8}
    error={errors.password}
  />
  
  <Checkbox 
    label="Remember me"
    checked={rememberMe}
    onChange={setRememberMe}
  />
  
  <ButtonGroup>
    <Button variant="primary" type="submit">
      Sign in
    </Button>
    <Button variant="secondary" type="button">
      Cancel
    </Button>
  </ButtonGroup>
</Form>
```

### Product Card

```jsx
<Card>
  <CardImage 
    src="/product.jpg" 
    alt="STOCKHOLM sofa"
    aspectRatio="4:3"
  />
  <Badge variant="new">New</Badge>
  
  <CardTitle>STOCKHOLM</CardTitle>
  <CardSubtitle>Three-seat sofa</CardSubtitle>
  
  <Price 
    value={1095}
    currency="EUR"
    previousPrice={1295}
  />
  
  <ButtonGroup>
    <Button variant="primary">
      <Icon name="cart" />
      Add to bag
    </Button>
    <IconButton 
      variant="secondary"
      icon="favorite"
      label="Add to favorites"
    />
  </ButtonGroup>
</Card>
```

### Modal Dialog

```jsx
<Modal open={isOpen} onClose={closeModal}>
  <ModalHeader>
    <ModalTitle>Delete item?</ModalTitle>
    <IconButton 
      icon="close"
      label="Close"
      onClick={closeModal}
    />
  </ModalHeader>
  
  <ModalBody>
    This action cannot be undone.
  </ModalBody>
  
  <ModalFooter>
    <Button 
      variant="danger"
      onClick={handleDelete}
    >
      Delete
    </Button>
    <Button 
      variant="secondary"
      onClick={closeModal}
    >
      Cancel
    </Button>
  </ModalFooter>
</Modal>
```

## 🐛 Common Mistakes to Avoid

### ❌ Don't:

1. **Hardcode colors/spacing**
   ```jsx
   {/* ❌ Bad */}
   <div style={{ color: '#0058A3', padding: '16px' }}>
   
   {/* ✅ Good */}
   <div style={{ 
     color: 'var(--color-primary)', 
     padding: 'var(--spacing-16)' 
   }}>
   ```

2. **Skip labels on inputs**
   ```jsx
   {/* ❌ Bad */}
   <input placeholder="Email" />
   
   {/* ✅ Good */}
   <InputField label="Email" placeholder="your@email.com" />
   ```

3. **Multiple primary buttons**
   ```jsx
   {/* ❌ Bad */}
   <Button variant="primary">Save</Button>
   <Button variant="primary">Submit</Button>
   
   {/* ✅ Good */}
   <Button variant="primary">Submit</Button>
   <Button variant="secondary">Save as draft</Button>
   ```

4. **Icon buttons without labels**
   ```jsx
   {/* ❌ Bad */}
   <IconButton icon="close" />
   
   {/* ✅ Good */}
   <IconButton icon="close" label="Close dialog" />
   ```

5. **Using subtle hyperlinks in body text**
   ```jsx
   {/* ❌ Bad: WCAG violation */}
   <p>
     Read our <Hyperlink variant="subtle" href="/terms">terms</Hyperlink>
   </p>
   
   {/* ✅ Good */}
   <p>
     Read our <Hyperlink href="/terms">terms</Hyperlink>
   </p>
   ```

## 🔧 Debugging Tools

### Component Inspector

```jsx
// Enable dev mode to see component boundaries
import { enableDevMode } from '@ingka/skapa-react';

if (process.env.NODE_ENV === 'development') {
  enableDevMode({
    showBoundaries: true,
    showTokens: true,
    logAccessibility: true
  });
}
```

### Accessibility Testing

```bash
# Install axe DevTools browser extension
# Run automatic accessibility audits
```

### Responsive Testing

Test at these breakpoints:
- 375px (iPhone SE)
- 768px (iPad portrait)
- 1024px (iPad landscape)
- 1440px (Desktop)

## 📖 Learning Path

### For New Developers

1. **Day 1:** Read 01-OVERVIEW-AND-FOUNDATIONS.md
2. **Day 2:** Read 02-ACTION-COMPONENTS.md and build a button demo
3. **Day 3:** Read 03-INPUT-COMPONENTS.md and build a form
4. **Day 4:** Read 04-DISPLAY-COMPONENTS.md and build a product card
5. **Day 5:** Combine all to build a mini shopping experience

### For AI Agents

1. **Read 01-OVERVIEW** for design tokens and principles
2. **Read 02-ACTION** for user interactions
3. **Read 03-INPUT** for form handling
4. **Reference others** as needed per component type
5. **Always check** accessibility and responsive requirements

## 🆘 Getting Help

### Official Resources
- Documentation: https://skapa.ikea.net
- Figma Library: Available to IKEA designers
- Support: Internal IKEA design team

### For AI Agents
- Check component-specific .md files for detailed specs
- Reference JSON specs in `/docs/guides/Skapa-json/`
- Validate accessibility with checklist in each component

## 🎓 Key Principles to Remember

1. **Accessibility First** - WCAG 2.1 AA compliance is mandatory
2. **Mobile First** - Design for small screens, enhance for large
3. **Design Tokens** - Never hardcode values, always use tokens
4. **Semantic HTML** - Use proper elements (button, input, nav, etc.)
5. **Keyboard Navigation** - All interactions must work without mouse
6. **Progressive Enhancement** - Core functionality works everywhere
7. **Performance** - Optimize images, lazy load, minimize JS
8. **Consistency** - Follow patterns, don't invent new styles
9. **User Testing** - Validate with real users and devices
10. **Documentation** - Keep code comments and README updated

---

**Ready to build?** Start with [01-OVERVIEW-AND-FOUNDATIONS.md](./01-OVERVIEW-AND-FOUNDATIONS.md) for deep dive into the design system.
