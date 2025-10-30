# @ingvar/ikea-design-system

> Unofficial IKEA-inspired design system with Swedish minimalist aesthetic

[![npm version](https://badge.fury.io/js/%40ingvar%2Fikea-design-system.svg)](https://badge.fury.io/js/%40ingvar%2Fikea-design-system)

**⚠️ Disclaimer:** This is an unofficial recreation inspired by IKEA's design principles. It is not affiliated with, endorsed by, or connected to IKEA in any way.

## ✨ Features

- 🇸🇪 **Swedish Minimalist Design** - Clean, functional, accessible
- 🎨 **Authentic Color Palette** - Swedish Blue (#0046be) & Yellow (#fdc935)
- ⚡ **React Components** - TypeScript-first with full type safety
- 🎯 **Tailwind Integration** - Pre-configured with IKEA design tokens
- 📱 **Responsive** - Mobile-first design principles
- ♿ **Accessible** - WCAG 2.1 AA compliant components

## 📦 Installation

```bash
npm install @ingvar/ikea-design-system
```

Or with Yarn:

```bash
yarn add @ingvar/ikea-design-system
```

## 🚀 Quick Start

### 1. Setup Tailwind Config

```javascript
// tailwind.config.js
const { ikeaTailwindConfig } = require("@ingvar/ikea-design-system/tailwind");

module.exports = {
  ...ikeaTailwindConfig,
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@ingvar/ikea-design-system/dist/**/*.js",
  ],
  // ... your other config
};
```

### 2. Import Styles

```css
/* In your main CSS file */
@import "@ingvar/ikea-design-system/dist/styles.css";
```

### 3. Use Components

```tsx
import { Button, Card, Badge } from "@ingvar/ikea-design-system";

function App() {
  return (
    <div className="bg-white p-8">
      <Card className="max-w-md">
        <Card.Header>
          <h2 className="text-ikea-blue text-xl font-semibold">Welcome</h2>
          <Badge variant="ikea">Swedish Design</Badge>
        </Card.Header>
        <Card.Content>
          <p className="text-gray-600 mb-4">
            Experience the beauty of Swedish minimalism.
          </p>
          <Button variant="ikea-primary">Get Started</Button>
        </Card.Content>
      </Card>
    </div>
  );
}
```

## 🎨 Design Tokens

### Colors

```css
/* Swedish Brand Colors */
--ikea-blue: #0046be;
--ikea-yellow: #fdc935;

/* Neutral Palette */
--ikea-white: #ffffff;
--ikea-gray-50: #f8f9fa;
--ikea-gray-100: #f1f3f4;
--ikea-gray-200: #e8eaed;
--ikea-gray-300: #dadce0;
--ikea-gray-400: #bdc1c6;
--ikea-gray-500: #9aa0a6;
--ikea-gray-600: #80868b;
--ikea-gray-700: #5f6368;
--ikea-gray-800: #3c4043;
--ikea-gray-900: #202124;
```

### Typography

```css
/* Clean, readable fonts */
font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
```

### Spacing

```css
/* Consistent spacing scale */
--spacing-xs: 0.25rem; /* 4px */
--spacing-sm: 0.5rem; /* 8px */
--spacing-md: 1rem; /* 16px */
--spacing-lg: 1.5rem; /* 24px */
--spacing-xl: 2rem; /* 32px */
--spacing-2xl: 3rem; /* 48px */
```

## 🧩 Components

### Button

```tsx
import { Button } from '@ingvar/ikea-design-system';

// Primary IKEA button (Swedish Blue)
<Button variant="ikea-primary">Primary Action</Button>

// Secondary button (Swedish Yellow)
<Button variant="ikea-secondary">Secondary Action</Button>

// Outline button
<Button variant="ikea-outline">Outline Button</Button>

// Ghost button
<Button variant="ikea-ghost">Ghost Button</Button>
```

### Card

```tsx
import { Card } from "@ingvar/ikea-design-system";

<Card variant="ikea">
  <Card.Header>
    <Card.Title>IKEA Card</Card.Title>
    <Card.Description>Swedish minimalist design</Card.Description>
  </Card.Header>
  <Card.Content>Card content goes here</Card.Content>
  <Card.Footer>
    <Button variant="ikea-primary">Action</Button>
  </Card.Footer>
</Card>;
```

### Badge

```tsx
import { Badge } from '@ingvar/ikea-design-system';

<Badge variant="ikea">Swedish Design</Badge>
<Badge variant="ikea-yellow">Accent Badge</Badge>
<Badge variant="ikea-outline">Outline Badge</Badge>
```

## 🎯 Usage with Ingvar Spark

Generate apps with IKEA design system:

```bash
# Using Ingvar CLI with natural language
ingvar "create an app with IKEA design"

# Or with Spark command
ingvar spark create --ikea --prompt "todo app"
```

## 🎨 Customization

### Extending Colors

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Add your custom colors alongside IKEA tokens
        brand: {
          primary: "#your-color",
          secondary: "#your-color",
        },
      },
    },
  },
};
```

### Custom Components

```tsx
import { cn } from "@ingvar/ikea-design-system/utils";

function CustomCard({ className, ...props }) {
  return (
    <div
      className={cn(
        "bg-white border border-ikea-gray-200 rounded-lg shadow-sm",
        "p-6 space-y-4",
        className
      )}
      {...props}
    />
  );
}
```

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/your-org/ingvar-kit
cd ingvar-kit/packages/ikea-design-system

# Install dependencies
npm install

# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## 📖 Design Principles

This design system follows IKEA's core principles:

1. **Democratic Design** - Good design should be accessible to everyone
2. **Functional** - Form follows function, every element has a purpose
3. **Minimalist** - Clean, uncluttered interfaces with lots of whitespace
4. **Swedish Heritage** - Inspired by Swedish design traditions
5. **Sustainable** - Designed for longevity and reusability

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Legal Notice

This project is not affiliated with, endorsed by, or connected to IKEA. IKEA® is a registered trademark of Inter IKEA Systems B.V. This is an independent, unofficial recreation inspired by publicly available design principles.

---

Built with ❤️ by the [Ingvar Workflow Kit](https://github.com/your-org/ingvar-kit) team.
