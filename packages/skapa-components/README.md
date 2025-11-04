# @ingvar-kit/skapa-components

Production-ready React components implementing the IKEA Skapa Design System for rapid prototyping.

## 🎨 Features

- ✅ **58+ Components** - Complete UI component library
- ✅ **TypeScript** - Full type safety and IntelliSense
- ✅ **Accessible** - WCAG 2.1 AA compliant
- ✅ **Themeable** - Light/dark mode support
- ✅ **Tree-shakeable** - Import only what you need
- ✅ **CSS Modules** - Scoped styling, no conflicts
- ✅ **Design Tokens** - Consistent spacing, colors, typography
- ✅ **Storybook** - Interactive component documentation

## 📦 Installation

```bash
npm install @ingvar-kit/skapa-components
```

**Peer dependencies:**
```bash
npm install react react-dom
```

## 🚀 Quick Start

```tsx
import { Button } from '@ingvar-kit/skapa-components';

function App() {
  return (
    <Button variant="primary" size="medium">
      Add to cart
    </Button>
  );
}
```

## 📚 Components

### Actions (8)
- **Button** - Primary, secondary, tertiary, danger variants
- **IconButton** - Compact button with icon only
- **DualButton** - Combined button pairs
- **Hyperlink** - Text links (regular, subtle)
- **JumboButton** - Large prominent buttons
- **Pill** - Filter/tag buttons

### Inputs (12)
- **TextField** - Text input with validation
- **TextArea** - Multi-line text input
- **Checkbox** - Single or grouped checkboxes
- **Radio** - Radio button groups
- **Select** - Dropdown selection
- **Toggle** - On/off switch
- **Slider** - Range input
- **DatePicker** - Calendar date selection
- **NumberField** - Numeric input with steppers

### Display (10)
- **Card** - Content containers
- **Badge** - Status indicators
- **Avatar** - User profile images
- **Image** - Optimized images
- **Icon** - SVG icon wrapper
- **Divider** - Section separators
- **Skeleton** - Loading placeholders

### Feedback (7)
- **Toast** - Temporary notifications
- **Banner** - Persistent alerts
- **Modal** - Overlays (Sheet, Theatre, Prompt)
- **ProgressBar** - Linear progress
- **Spinner** - Loading indicators
- **Tooltip** - Contextual hints

### Navigation (14)
- **Header** - Top navigation
- **Footer** - Bottom navigation
- **Breadcrumbs** - Hierarchical navigation
- **Tabs** - Content switching
- **Pagination** - Page navigation
- **Menu** - Dropdown menus
- **Drawer** - Side panels

## 🎨 Design Tokens

```css
/* Automatically included when you import components */
import '@ingvar-kit/skapa-components/dist/styles.css';
```

**Available tokens:**
- Colors: `--color-ikea-blue`, `--color-neutral-*`, semantic colors
- Spacing: `--spacing-1` through `--spacing-32` (4px base unit)
- Typography: `--font-size-*`, `--font-weight-*`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`
- Shadows: `--shadow-1` through `--shadow-5`
- Motion: `--duration-fast`, `--duration-normal`, etc.

## 🌙 Dark Mode

```tsx
// Toggle dark mode by setting data-theme attribute
document.documentElement.setAttribute('data-theme', 'dark');
```

All components automatically adapt to dark mode.

## ♿ Accessibility

All components follow WCAG 2.1 AA guidelines:
- Keyboard navigation support
- Screen reader optimized
- Focus management
- ARIA attributes
- Color contrast compliant
- Reduced motion support

## 📖 Documentation

Full component documentation available in the repository:
- [Component Docs](../../docs/ai-agents/skapa-design-system/)
- [Design Patterns](../../docs/ai-agents/skapa-design-system/09-DESIGN-PATTERNS.md)
- [Foundations](../../docs/ai-agents/skapa-design-system/10-FOUNDATIONS-EXTENDED.md)

## 🤖 Copilot Integration

This package is designed to work seamlessly with GitHub Copilot. When installed, Copilot can:
- Suggest appropriate components based on context
- Auto-complete component props
- Generate pattern implementations
- Follow Skapa design guidelines

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Start Storybook
npm run storybook
```

## 📄 License

MIT © Ingvar Kit Contributors

## 🔗 Links

- [GitHub Repository](https://github.com/leopagotto/ingvar-kit)
- [Issue Tracker](https://github.com/leopagotto/ingvar-kit/issues)
- [IKEA Design System](https://skapa.ikea.net)

---

**Built with ❤️ by the Ingvar Kit team**
