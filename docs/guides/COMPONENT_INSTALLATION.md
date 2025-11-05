# IKEA Component Installation Guide

> **Production-ready IKEA Ingka Skapa Design System Components**

Ingvar Kit includes **75 production-ready components** from the official IKEA Ingka Skapa Design System. Components are mobile-first, WCAG AA compliant, and look like IKEA.com.

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [Component Selection Modes](#component-selection-modes)
- [Complete Component List](#complete-component-list)
- [Registry Setup](#registry-setup)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)

---

## 🚀 Quick Start

### During Installation (Automatic)

When you install Ingvar Kit, you'll be prompted to install components:

```bash
npm install ingvar-kit

# Or with auto-initialization
LEO_AUTO_INIT=true npm install ingvar-kit
```

**Prompt:**

```
📦 IKEA Component Library Available

  Ingvar Kit includes 75 production-ready IKEA components
  from the official Ingka Skapa Design System:

  • Buttons, Cards, Forms, Modals, Tables, and more
  • Mobile-first & WCAG AA compliant
  • Looks like IKEA.com

? Install IKEA components now? (y/N)
```

### Manual Installation (Anytime)

You can also install components manually anytime:

```bash
# Interactive selection
ingvar components

# Or with alias
ingvar components

# Or with npm script
npm run components
```

---

## 📦 Installation Methods

### Method 1: Automatic (During npm install)

Components are offered automatically when installing Ingvar Kit locally:

```bash
# Install Ingvar Kit
npm install ingvar-kit

# Follow prompts to install components
```

### Method 2: Manual (CLI Command)

Run the components command anytime:

```bash
ingvar components
```

**Interactive Flow:**

1. Choose installation mode (Essential, All, Cherry-pick)
2. Select components (if cherry-picking)
3. Confirm installation
4. Components installed to `src/components/ingka/`

### Method 3: Non-Interactive (CI/CD)

For automated setups:

```bash
# Install all components
ingvar components --mode=all --skip-confirmation

# Install essential only
ingvar components --mode=essential --skip-confirmation

# Install specific components
ingvar components --mode=cherry-pick --components=button,card,input --skip-confirmation
```

---

## 🎯 Component Selection Modes

### 1. Essential Components (Recommended)

**Best for:** Getting started quickly with most common components

**Includes (26 components):**

- **Foundations:** Design Tokens, Colors, Typography
- **Layout:** Grid
- **Display:** Card, Image, Text, Table, Tabs
- **Buttons:** Button, Hyperlink
- **Forms:** Input, TextArea, Checkbox, Radio, Switch, Select, Search
- **Feedback:** Badge, Toast, Loading
- **Modals:** Modal Prompt, Tooltip
- **Media:** Icon

```bash
ingvar components
# → Select "Essential Components"
```

### 2. All Components (Complete Library)

**Best for:** Projects needing full component coverage

**Includes:** All 75 components across all categories

```bash
ingvar components
# → Select "All Components (75 components)"
```

### 3. Cherry-Pick (Custom Selection)

**Best for:** Specific project needs

**Features:**

- Shows all 75 components grouped by category
- Essential components pre-selected (checkmarks)
- Use spacebar to toggle selection
- Visual categories: Foundations, Layout, Display, Buttons, Forms, etc.

```bash
ingvar components
# → Select "Cherry-pick (Select individual components)"
# → Use spacebar to toggle, Enter to confirm
```

**Interactive Selection:**

```
? Select components (spacebar to toggle, all shown by default):

=== FOUNDATIONS ===
❯◉ 🎨 Design Tokens - Core design tokens (colors, spacing, typography)
 ◉ 🌈 Colors - IKEA color palette
 ◉ ✍️  Typography - Font families, sizes, weights

=== LAYOUT ===
 ◉ 📐 Grid - Responsive grid system
 ◯ 📦 Aspect Ratio Box - Maintain aspect ratios
 ◯ ➖ Divider - Visual separators

[... 75 components total ...]
```

---

## 📚 Complete Component List

### Foundations (3)

- 🎨 **design-tokens** - Core design tokens (colors, spacing, typography) ✓
- 🌈 **colours** - IKEA color palette ✓
- ✍️ **typography** - Font families, sizes, weights ✓

### Layout & Structure (5)

- 📐 **grid** - Responsive grid system ✓
- 📦 **aspect-ratio-box** - Maintain aspect ratios
- ➖ **divider** - Visual separators
- 🔽 **expander** - Expandable sections
- ⏭️ **skip-content** - Accessibility skip links

### Display & Content (14)

- 🗂️ **card** - Content cards ✓
- 📇 **compact-card** - Compact card variant
- 🖼️ **text-overlay-card** - Cards with text overlays
- 🖼️ **image** - Optimized images ✓
- 📝 **text** - Typography components ✓
- 📋 **list** - List components
- 📑 **list-view** - List views
- ☐ **list-box** - List boxes
- 📊 **table** - Data tables ✓
- 📑 **tabs** - Tab navigation ✓
- 👀 **teaser** - Teaser content
- 🖼️ **thumbnail-grid** - Image grids
- 🪗 **accordion** - Expandable content
- 🎠 **carousel** - Image carousel

### Buttons & Actions (8)

- 🔘 **button** - Primary button component ✓
- ⚡ **dual-button** - Dual action buttons
- 🔼 **expanding-button** - Expanding button
- 🔵 **icon-button** - Icon-only button
- 💊 **icon-pill** - Icon pills
- 🔴 **jumbo-button** - Large prominent button
- 💊 **pill** - Pill-shaped button
- 🔗 **hyperlink** - Links and navigation ✓

### Form Inputs (13)

- 📝 **input-field** - Text input ✓
- 📄 **text-area** - Multi-line text input ✓
- ☑️ **checkbox** - Checkbox input ✓
- 🔘 **radio-button** - Radio button ✓
- 🎚️ **switch** - Toggle switch ✓
- 🔀 **toggle** - Alternative toggle
- 📋 **select** - Dropdown select ✓
- 🔍 **combobox** - Combo box input
- ✓ **choice** - Choice selector
- 🔍 **search** - Search input ✓
- 📊 **slider** - Range slider
- ➕➖ **quantity-stepper** - Quantity input
- 🎛️ **segmented-control** - Segmented control

### Feedback & Status (9)

- 🏷️ **badge** - Status badges ✓
- 🚦 **status** - Status indicators
- 🔔 **toast** - Toast notifications ✓
- 📣 **banner** - Banner messages
- 💬 **inline-message** - Inline messages
- ❓ **helper-text** - Helper text
- ⏳ **loading** - Loading indicators ✓
- 📊 **progress-indicator** - Progress bars
- 💀 **skeleton** - Skeleton loaders

### Modals & Overlays (4)

- 📦 **modal-prompt** - Prompt modals ✓
- 📋 **modal-sheets** - Sheet modals
- 🎭 **modal-theatre** - Theatre mode modals
- 💬 **tooltip** - Tooltips ✓

### Media & Rich Content (6)

- 🎥 **simple-video** - Video player
- 🛒 **shoppable-image** - Interactive product images
- 🎨 **icon** - Icon library ✓
- 🇸🇪 **logos** - IKEA logos
- 👤 **avatar** - User avatars
- ⭐ **rating** - Star ratings

### E-commerce (8)

- 💰 **price** - Price display
- 💵 **price-module** - Price modules
- 🔢 **product-identifier** - Product IDs
- 📢 **commercial-messages** - Commercial messages
- 🎫 **member-card** - Member cards
- 💳 **payment-logo** - Payment method logos
- 🏷️ **tag** - Product tags
- ✅ **endorsement-label** - Endorsement labels

### Utilities (2)

- ✨ **animations** - Animation utilities
- 🌐 **browserslist-config** - Browser support config

**Total:** 75 components
**✓ = Included in Essential mode** (26 components)

---

## 🔧 Registry Setup

### What is the Ingka Registry?

The **Ingka npm registry** (`https://npm.m2.blue.cdtapps.com`) hosts official `@ingka/*` packages used by IKEA internally.

### Automatic Configuration

Ingvar Kit automatically configures the registry during installation:

**`.npmrc` (auto-generated):**

```
@ingka:registry=https://npm.m2.blue.cdtapps.com
```

### Manual Configuration

If needed, configure manually:

```bash
# Project-level (recommended)
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"

# Or add to .npmrc manually
echo "@ingka:registry=https://npm.m2.blue.cdtapps.com" >> .npmrc
```

### Registry Access

**For IKEA Internal Users:**

- ✅ Full access to `@ingka/*` packages
- ✅ Latest component versions
- ✅ Official IKEA design tokens

**For External Users:**

- ⚠️ Limited access (requires IKEA network)
- ✅ Fallback: Local component templates used instead
- ✅ All components work standalone (no external dependencies)

---

## 💻 Usage Examples

### Basic Import

```tsx
import { Button, Card, Input } from "./components/ingka";

function MyComponent() {
  return (
    <Card>
      <Input label="Name" placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

### With Design Tokens

```tsx
import { Button } from "./components/ingka";
import { colors } from "@ingka/colours";
import { tokens } from "@ingka/design-tokens";

function StyledComponent() {
  return (
    <div
      style={{
        background: colors.blue.primary, // Official IKEA blue
        padding: tokens.spacing.lg,
        borderRadius: tokens.borderRadius.md,
      }}
    >
      <Button variant="primary">IKEA Style</Button>
    </div>
  );
}
```

### Complete Form Example

```tsx
import { Button, Input, Checkbox, Select, Toast } from "./components/ingka";

function ContactForm() {
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Full Name" required placeholder="John Doe" />

      <Input
        label="Email"
        type="email"
        required
        placeholder="john@example.com"
      />

      <Select
        label="Country"
        options={[
          { value: "se", label: "Sweden" },
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
        ]}
      />

      <Checkbox
        label="Subscribe to newsletter"
        checked={subscribed}
        onChange={setSubscribed}
      />

      <Button variant="primary" type="submit">
        Send Message
      </Button>

      {showToast && (
        <Toast message="Form submitted successfully!" variant="success" />
      )}
    </form>
  );
}
```

---

## 🐛 Troubleshooting

### Issue: Registry Authentication Failed

**Problem:**

```
npm ERR! code E401
npm ERR! Unable to authenticate with registry @ingka:registry
```

**Solution:**
This is expected for external users. Ingvar Kit automatically falls back to local templates:

```bash
⚠️  Some packages could not be installed from Ingka registry
   This might be due to:
   - Registry authentication required (IKEA internal only)

   Continuing with local template installation...
```

**Action:** No action needed - components work via local templates.

---

### Issue: Components Not Found After Installation

**Problem:**

```
Module not found: Can't resolve './components/ingka'
```

**Solution:**
Check installation location:

```bash
# Components should be at:
ls -la src/components/ingka/

# If missing, reinstall:
ingvar components
```

---

### Issue: React Not Detected

**Problem:**

```
⚠️  React not detected in package.json
   Ingka components require React
```

**Solution:**
Install React when prompted, or manually:

```bash
npm install react react-dom
```

---

### Issue: Type Errors with TypeScript

**Problem:**

```
Could not find a declaration file for module './components/ingka'
```

**Solution:**
Components include TypeScript definitions. Ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "jsx": "react",
    "moduleResolution": "node",
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

---

## ❓ FAQ

### Do I need IKEA network access?

**No.** While `@ingka/*` packages are hosted on an internal registry, Ingvar Kit provides standalone component templates that work without registry access. The installer automatically falls back to local templates if registry access fails.

### Can I use these in production?

**Yes.** All 75 components are production-ready, tested, and used in IKEA projects. They are:

- WCAG AA compliant
- Mobile-first responsive
- Cross-browser compatible
- Performance optimized

### How are components updated?

**Option 1: Update CLI (Recommended)**

```bash
npm update ingvar-kit
ingvar components --action=update
```

**Option 2: Manual Update**

```bash
# Update @ingka packages
npm update @ingka/button @ingka/card

# Or reinstall from templates
ingvar components --action=update
```

### Can I customize components?

**Yes.** Components are copied to your project:

- Located in `src/components/ingka/`
- Fully editable
- Override styles as needed
- Extend with custom props

**Example:**

```tsx
// Modify Button.tsx directly
export function Button({ variant, size, children, className, ...props }) {
  return (
    <button
      className={`ikea-button ${className}`} // Add custom class
      data-variant={variant}
      {...props}
    >
      {children}
    </button>
  );
}
```

### What's the difference between @ingka packages and templates?

| Aspect            | @ingka/\* Packages     | Local Templates          |
| ----------------- | ---------------------- | ------------------------ |
| **Source**        | IKEA internal registry | Ingvar Kit templates/    |
| **Access**        | IKEA network required  | Anyone                   |
| **Updates**       | npm update             | ingvar components update    |
| **Customization** | node_modules (limited) | src/components (full)    |
| **Best for**      | IKEA internal projects | External/custom projects |

**Recommendation:** Use local templates for maximum flexibility.

### Can I add more components later?

**Yes.** Run `ingvar components` anytime to add more:

```bash
# Add components to existing installation
ingvar components

# → Select "Cherry-pick"
# → Choose additional components
# → New components added to src/components/ingka/
```

### Do components work with Next.js / Vite / etc.?

**Yes.** Components are framework-agnostic React components. They work with:

- ✅ Next.js (App Router & Pages Router)
- ✅ Vite
- ✅ Create React App
- ✅ Remix
- ✅ Gatsby
- ✅ Any React framework

### What about Vue components?

Currently, Ingvar Kit focuses on **React components** from the Ingka Skapa Design System. Vue support is planned for future releases.

---

## 📖 Additional Resources

- **Component Index:** See `SKAPA_COMPONENT_INDEX.md` for detailed specs
- **Design System:** Official IKEA Ingka Skapa documentation (IKEA intranet)
- **Ingvar Kit Docs:** `docs/guides/` for more guides
- **Issue Tracker:** Report bugs at https://github.com/leopagotto/ingvar-kit/issues

---

## 🤝 Support

**For Component Issues:**

- GitHub: https://github.com/leopagotto/ingvar-kit/issues
- Label: `components`

**For @ingka Package Issues (IKEA Internal):**

- Contact IKEA IT Support
- Ingka Skapa Team

---

**Last Updated:** 2025-01-20
**Ingvar Kit Version:** 5.11.0+
