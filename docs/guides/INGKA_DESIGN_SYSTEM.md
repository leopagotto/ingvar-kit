# 🇸🇪 Ingka Skapa Design System Integration Guide

> **Official IKEA Design System for Ingvar Kit**
>
> This guide covers how to use the official IKEA Ingka Skapa Design System with Ingvar Kit's Spark generator and AI-assisted development workflows.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Quick Start](#quick-start)
3. [Available Packages](#available-packages)
4. [Registry Setup](#registry-setup)
5. [Using with Spark](#using-with-spark)
6. [Component Usage](#component-usage)
7. [Design Tokens](#design-tokens)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The **Ingka Skapa Design System** is IKEA's official design system, providing:

- ✅ **Production-ready React components** - Battle-tested across IKEA's digital products
- 🎨 **Official brand colors & typography** - Authentic IKEA aesthetic
- ♿ **WCAG 2.1 AA accessibility** - Compliant by default
- 📱 **Responsive design** - Mobile-first approach
- 🔒 **Internal use only** - Available to IKEA employees

**Why Use Ingka with Ingvar Kit?**

Ingvar Kit's AI-powered generators automatically use Ingka components when generating new applications, ensuring:

- Consistent design across all generated apps
- Faster development (no need to build components from scratch)
- Automatic compliance with IKEA brand guidelines
- Accessibility built-in from day one

---

## Quick Start

### 1. Verify Registry Access

Ensure you're authenticated to access the Ingka registry:

```bash
# This should already be configured in .npmrc
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"
```

### 2. Create an App with Ingka Design System

Using Ingvar Kit's natural language detection:

```bash
# Simple command - AI will detect intent and use Ingka components
ingvar spark --prompt "create a todo app" --name my-ikea-app

# Or be explicit about using Ingka
ingvar spark --prompt "create a todo app with Ingka design system" --name my-ikea-app --style ingka
```

### 3. Start Building

Your generated app will automatically include:

- ✅ Ingka design system packages installed
- ✅ Design tokens configured
- ✅ Component imports ready to use
- ✅ Official IKEA styling applied

---

## Available Packages

### Core Design System

```bash
npm i @ingka/design-tokens    # Design tokens (colors, spacing, etc.)
npm i @ingka/colours           # Official color palette
npm i @ingka/typography        # Typography system
npm i @ingka/animations        # Animation utilities
```

### Layout Components

```bash
npm i @ingka/grid              # Responsive grid system
npm i @ingka/aspect-ratio-box  # Aspect ratio containers
npm i @ingka/divider           # Visual dividers
npm i @ingka/expander          # Expandable sections
```

### Display Components

```bash
npm i @ingka/card              # Content cards
npm i @ingka/compact-card      # Compact cards
npm i @ingka/image             # Optimized images
npm i @ingka/text              # Typography components
npm i @ingka/list              # Lists
npm i @ingka/table             # Data tables
npm i @ingka/tabs              # Tab navigation
```

### Button Components

```bash
npm i @ingka/button            # Primary buttons
npm i @ingka/icon-button       # Icon-only buttons
npm i @ingka/dual-button       # Dual action buttons
npm i @ingka/jumbo-button      # Large prominent buttons
```

### Form Components

```bash
npm i @ingka/input-field       # Text inputs
npm i @ingka/text-area         # Multi-line text
npm i @ingka/checkbox          # Checkboxes
npm i @ingka/radio-button      # Radio buttons
npm i @ingka/select            # Dropdowns
npm i @ingka/search            # Search inputs
npm i @ingka/slider            # Range sliders
npm i @ingka/switch            # Toggle switches
```

### Feedback Components

```bash
npm i @ingka/badge             # Status badges
npm i @ingka/toast             # Toast notifications
npm i @ingka/banner            # Banner messages
npm i @ingka/loading           # Loading indicators
npm i @ingka/skeleton          # Skeleton loaders
```

### Modal Components

```bash
npm i @ingka/modal-prompt      # Prompt modals
npm i @ingka/modal-sheets      # Sheet modals
npm i @ingka/tooltip           # Tooltips
```

### E-commerce Components

```bash
npm i @ingka/price             # Price display
npm i @ingka/product-identifier # Product IDs
npm i @ingka/rating            # Star ratings
npm i @ingka/tag               # Product tags
```

### **Install All at Once:**

```bash
npm i @ingka/animations @ingka/browserslist-config @ingka/colours @ingka/design-tokens @ingka/grid @ingka/icon @ingka/logos @ingka/typography @ingka/accordion @ingka/avatar @ingka/card @ingka/compact-card @ingka/divider @ingka/image @ingka/list @ingka/member-card @ingka/rating @ingka/shoppable-image @ingka/simple-video @ingka/table @ingka/tabs @ingka/teaser @ingka/text @ingka/text-overlay-card @ingka/thumbnail-grid @ingka/commercial-messages @ingka/price @ingka/price-module @ingka/product-identifier @ingka/hyperlink @ingka/tag @ingka/button @ingka/dual-button @ingka/expanding-button @ingka/icon-pill @ingka/icon-button @ingka/jumbo-button @ingka/pill @ingka/checkbox @ingka/choice @ingka/combobox @ingka/input-field @ingka/quantity-stepper @ingka/radio-button @ingka/search @ingka/segmented-control @ingka/select @ingka/slider @ingka/switch @ingka/text-area @ingka/toggle @ingka/badge @ingka/loading @ingka/progress-indicator @ingka/skeleton @ingka/status @ingka/banner @ingka/helper-text @ingka/inline-message @ingka/toast @ingka/aspect-ratio-box @ingka/carousel @ingka/endorsement-label @ingka/expander @ingka/list-box @ingka/list-view @ingka/modal-prompt @ingka/modal-sheets @ingka/modal-theatre @ingka/payment-logo @ingka/skip-content @ingka/tooltip
```

---

## Registry Setup

### For New Projects

The registry is automatically configured when using Spark:

```bash
ingvar spark --prompt "create a dashboard app" --name my-app
```

### For Existing Projects

Add to your project's `.npmrc`:

```bash
echo "@ingka:registry=https://npm.m2.blue.cdtapps.com" >> .npmrc
```

Then install the packages you need:

```bash
npm i @ingka/design-tokens @ingka/button @ingka/card @ingka/input-field
```

---

## Using with Spark

### Automatic Detection

Ingvar Kit's AI can automatically detect when you want to use IKEA design:

```bash
# These all trigger Ingka component usage:
ingvar spark --prompt "create an IKEA-style dashboard"
ingvar spark --prompt "build a Swedish design app"
ingvar spark --prompt "app with Ingka components"
```

### Explicit Style Flag

Be explicit about using Ingka:

```bash
ingvar spark --prompt "todo app" --name my-todo --style ingka
```

### Spec-First for Complex Apps

For complex applications, Ingvar follows a **spec-first workflow**:

```bash
# Step 1: Generate spec (for review)
ingvar spark --prompt "complex e-commerce dashboard with product management" --name shop-admin --style ingka

# Ingvar creates: docs/specs/shop-admin-spec.md
# ⚠️ Review the spec first!

# Step 2: After approval, generate the app
# Ingvar will ask for confirmation, then generate with Ingka components
```

**When does spec-first trigger?**

- Apps with multiple features (> 3 distinct sections)
- E-commerce applications
- Admin dashboards
- Data management systems
- Any app described as "complex" or "advanced"

---

## Component Usage

### Basic Button

```tsx
import { Button } from "@ingka/button";

function MyComponent() {
  return (
    <Button variant="primary" onClick={handleSubmit}>
      Submit
    </Button>
  );
}
```

### Form with Input Field

```tsx
import { InputField } from "@ingka/input-field";
import { Button } from "@ingka/button";

function LoginForm() {
  return (
    <form onSubmit={handleLogin}>
      <InputField
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
      />

      <InputField label="Password" type="password" required />

      <Button variant="primary" type="submit">
        Log In
      </Button>
    </form>
  );
}
```

### Card Layout

```tsx
import { Card } from "@ingka/card";
import { Text } from "@ingka/text";

function ProductCard({ product }) {
  return (
    <Card>
      <Card.Media src={product.image} alt={product.name} />
      <Card.Content>
        <Text variant="heading3">{product.name}</Text>
        <Text variant="body">{product.description}</Text>
        <Text variant="price">${product.price}</Text>
      </Card.Content>
    </Card>
  );
}
```

### Grid Layout

```tsx
import { Grid } from "@ingka/grid";
import { Card } from "@ingka/card";

function ProductGrid({ products }) {
  return (
    <Grid cols={3} gap="md">
      {products.map((product) => (
        <Grid.Item key={product.id}>
          <Card>{/* ... */}</Card>
        </Grid.Item>
      ))}
    </Grid>
  );
}
```

---

## Design Tokens

### Using Colors

```tsx
import { colors } from "@ingka/colours";

const styles = {
  primary: colors.blue.primary, // IKEA blue
  secondary: colors.yellow.primary, // IKEA yellow
  text: colors.neutral[900],
  background: colors.neutral[50],
};
```

### Using Design Tokens

```tsx
import { tokens } from "@ingka/design-tokens";

const containerStyle = {
  padding: tokens.spacing.lg,
  borderRadius: tokens.borderRadius.md,
  boxShadow: tokens.shadows.md,
};
```

### Typography Tokens

```tsx
import { typography } from "@ingka/typography";

const headingStyle = {
  fontFamily: typography.fontFamily.heading,
  fontSize: typography.fontSize.xl,
  fontWeight: typography.fontWeight.bold,
  lineHeight: typography.lineHeight.tight,
};
```

---

## Best Practices

### ✅ DO

1. **Always check Ingka first** before building custom components

   ```tsx
   // ✅ Good - Use Ingka component
   import { Button } from "@ingka/button";

   // ❌ Bad - Custom button when Ingka exists
   const CustomButton = () => {
     /* ... */
   };
   ```

2. **Use design tokens** instead of hardcoded values

   ```tsx
   // ✅ Good - Design token
   import { tokens } from "@ingka/design-tokens";
   padding: tokens.spacing.md;

   // ❌ Bad - Hardcoded value
   padding: "16px";
   ```

3. **Follow Ingka's component patterns**

   ```tsx
   // ✅ Good - Ingka pattern
   <Button variant="primary" size="large">Click</Button>

   // ❌ Bad - Non-standard props
   <Button isPrimary bigButton>Click</Button>
   ```

4. **Let Ingvar's AI use Ingka automatically**

   ```bash
   # ✅ Good - Natural language, AI detects Ingka usage
   ingvar spark --prompt "create a dashboard"

   # ⚠️ Unnecessary - But works if you want to be explicit
   ingvar spark --prompt "create a dashboard" --style ingka
   ```

### ❌ DON'T

1. **Don't create custom components when Ingka has them**
2. **Don't use random colors** - Use `@ingka/colours`
3. **Don't skip accessibility** - Ingka components have it built-in
4. **Don't bypass the spec-first workflow** for complex apps

---

## Troubleshooting

### Issue: "Cannot find module '@ingka/button'"

**Solution:**

```bash
# 1. Verify registry is configured
cat .npmrc
# Should show: @ingka:registry=https://npm.m2.blue.cdtapps.com

# 2. Install the package
npm i @ingka/button

# 3. Verify authentication (if needed)
# Contact IKEA IT support for registry access
```

### Issue: "Registry returns 404"

**Cause:** Not authenticated or no access to internal registry

**Solution:**

- Ensure you're an IKEA employee with proper access
- Check VPN connection if required
- Contact IKEA IT support for authentication

### Issue: "AI not using Ingka components"

**Solution:**

```bash
# Be explicit in your prompt
ingvar spark --prompt "create a todo app with IKEA Ingka components"

# Or use the style flag
ingvar spark --prompt "todo app" --style ingka
```

### Issue: "Spec not generated for complex app"

**Cause:** Ingvar didn't detect complexity

**Solution:**

```bash
# Be explicit about complexity
ingvar spark --prompt "complex dashboard with user management, analytics, and reporting"

# Or request spec generation explicitly
ingvar spec create "dashboard-app" --description "Complex e-commerce admin panel"
```

---

## Additional Resources

- **Ingka Registry:** `https://npm.m2.blue.cdtapps.com`
- **Internal Documentation:** Available on IKEA intranet
- **Ingvar Kit Docs:** `/docs/README.md`
- **Support:** IKEA IT Support for registry access issues

---

## Example: Complete Todo App with Ingka

```tsx
// src/App.tsx
import { Grid } from "@ingka/grid";
import { Card } from "@ingka/card";
import { Button } from "@ingka/button";
import { InputField } from "@ingka/input-field";
import { Checkbox } from "@ingka/checkbox";
import { Text } from "@ingka/text";
import { Toast } from "@ingka/toast";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo("");
  };

  return (
    <div className="container">
      <Text variant="heading1">My Todo App</Text>

      <Card>
        <Card.Content>
          <Grid cols={1} gap="md">
            <InputField
              label="New Todo"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
            />

            <Button
              variant="primary"
              onClick={addTodo}
              disabled={!newTodo.trim()}
            >
              Add Todo
            </Button>
          </Grid>
        </Card.Content>
      </Card>

      <Grid cols={1} gap="sm">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <Card.Content>
              <Checkbox
                label={todo.text}
                checked={todo.done}
                onChange={(checked) => {
                  setTodos(
                    todos.map((t) =>
                      t.id === todo.id ? { ...t, done: checked } : t
                    )
                  );
                }}
              />
            </Card.Content>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

export default TodoApp;
```

---

**🎉 You're ready to build with the official IKEA Ingka Skapa Design System!**

Use Ingvar Kit's AI-powered generators to automatically create apps with Ingka components, ensuring consistent, accessible, and brand-compliant applications every time.
