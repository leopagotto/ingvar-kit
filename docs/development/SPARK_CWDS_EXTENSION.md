# Spark v6.2.0 - CWDS as Ingka Skapa Extension

**Date:** 31 October 2025
**Architecture:** CWDS extends Ingka Skapa (not alternative)
**Status:** ✅ Implementation Complete

---

## Architecture Decision

**CWDS is a subsystem of Ingka Skapa** - they work together, not as separate choices.

### User Options:

1. **Ingka Skapa Only** (default) → Customer-facing apps

   - 75+ @ingka/\* components
   - E-commerce, product pages, public sites
   - IKEA Blue (#0051BA) + Yellow (#FFDB00)

2. **Ingka Skapa + CWDS** → Internal co-worker tools
   - 75+ @ingka/\* components (base)
   - 10+ @ingka-group-digital/\* components (co-worker features)
   - Admin panels, dashboards, internal tools
   - Co-Worker Blue (#003E72) + Yellow (#FFDB00)
   - Global Header, App Switcher, ILOFF Layout, User Profile

---

## Implementation

### CLI Options

```bash
# Ingka Skapa only (customer-facing)
ingvar spark -p "todo app" -n "my-app" --ikea

# Ingka Skapa + CWDS (internal tool)
ingvar spark -p "admin dashboard" -n "admin-app" --ikea --cwds

# Interactive prompts
ingvar spark -p "project management tool"
# → Use IKEA Ingka Skapa? (Yes/No)
# → Add CWDS components? (Yes/No - only if IKEA selected)
```

### File Changes

#### 1. `lib/commands/spark.js`

- ✅ Added `--cwds` option (extends `--ikea`)
- ✅ Interactive prompts ask about IKEA, then CWDS
- ✅ `applyIngkaSkapaDesignSystem()` function (renamed from `applyIkeaDesignSystem`)
- ✅ `applyCWDSDesignSystem()` function (new)
- ✅ `generateAppCode()` accepts both `useIkea` and `useCwds` flags
- ✅ Module exports function for CLI integration

#### 2. `bin/cli.js`

- ✅ Added `--ikea` and `--cwds` options
- ✅ Description: "IKEA Ingka Skapa (+ optional CWDS for internal tools)"

#### 3. `lib/ai/code-generator.js`

- ✅ `generateSparkApp()` accepts `{ useIkea, useCwds }` options
- ✅ Three system prompts:
  - **Ingka Skapa only** - Customer-facing components
  - **Ingka Skapa + CWDS** - Internal tool with co-worker features
  - **Default** - No IKEA (fallback)

#### 4. `README.md`

- ✅ Updated description: "IKEA Ingka Skapa + Optional CWDS"
- ✅ Clarified CWDS extends Ingka Skapa

---

## User Experience

### Scenario 1: Customer-Facing App (Ingka Skapa Only)

```bash
$ ingvar spark -p "shopping cart" -n "cart-app" --ikea

🚀 Ingvar Spark - Rapid App Generator

ℹ️  Generate React apps with IKEA Ingka Skapa Design System

   • Ingka Skapa (75+ components) - Customer-facing apps
   • Optional: Add CWDS (10+ components) for internal tools

🔧 Setting up Spark app...

🇸🇪 Using IKEA Ingka Skapa Design System (Customer-facing)

🇸🇪 Installing IKEA Ingka Skapa Design System...

✅ Installed IKEA Ingka Skapa components
✅ Created IKEA design tokens reference
✅ Created IKEA CSS imports file
✅ Updated index.css to import IKEA styles

✅ IKEA Ingka Skapa Design System installed successfully!

ℹ️  You can now import IKEA components:
   import { Button } from '@ingka/button';
   import { Card } from '@ingka/card';
   import { IKEA_DESIGN_TOKENS } from './lib/ikea-design-tokens';

🤖 Generating app code with AI...

🎉 Spark app created successfully!

📍 Location: ./spark-apps/cart-app
🇸🇪 Design System: IKEA Ingka Skapa
🎨 Colors: IKEA Blue (#0051BA) & Yellow (#FFDB00)
```

---

### Scenario 2: Internal Tool (Ingka Skapa + CWDS)

```bash
$ ingvar spark -p "admin dashboard" -n "admin-app" --ikea --cwds

🚀 Ingvar Spark - Rapid App Generator

ℹ️  Generate React apps with IKEA Ingka Skapa Design System

   • Ingka Skapa (75+ components) - Customer-facing apps
   • Optional: Add CWDS (10+ components) for internal tools

🔧 Setting up Spark app...

🇸🇪 Using IKEA Ingka Skapa + CWDS (Internal co-worker tools)

🇸🇪 Installing IKEA Ingka Skapa Design System...

✅ Installed IKEA Ingka Skapa components
✅ Created IKEA design tokens reference
✅ Created IKEA CSS imports file
✅ Updated index.css to import IKEA styles

✅ IKEA Ingka Skapa Design System installed successfully!

🏢 Installing IKEA CWDS (extends Ingka Skapa)...

✅ IKEA CWDS installed successfully!

ℹ️  You can now import CWDS components:
   import { CWDSLayout } from '@ingka-group-digital/cwds-react-layout';
   import { GlobalHeader } from '@ingka-group-digital/cwds-react-header';
   import { AppSwitcher } from '@ingka-group-digital/cwds-react-app-switcher';

🤖 Generating app code with AI...

🎉 Spark app created successfully!

📍 Location: ./spark-apps/admin-app
🇸🇪 Design System: IKEA Ingka Skapa + CWDS
🎨 Components: 75+ Ingka Skapa + 10+ CWDS (Internal tools)
   • Global Header, App Switcher, ILOFF Layout
```

---

### Scenario 3: Interactive Selection

```bash
$ ingvar spark -p "project management tool" -n "project-app"

🚀 Ingvar Spark - Rapid App Generator

ℹ️  Generate React apps with IKEA Ingka Skapa Design System

? 🇸🇪 Use IKEA Ingka Skapa design system? (75+ components, customer-facing apps) (Y/n) Y
? 🏢 Add CWDS components? (For internal co-worker tools, extends Ingka Skapa) (y/N) Y

🔧 Setting up Spark app...

🇸🇪 Using IKEA Ingka Skapa + CWDS (Internal co-worker tools)
```

---

## AI Code Generation

### Ingka Skapa Only Prompt

```
You are an expert React developer creating a production-ready app using IKEA's Ingka Skapa Design System.

TECH STACK:
- React 19 + TypeScript
- Vite
- IKEA Ingka Skapa (@ingka/* components)

COMPONENTS:
- Button, Card, InputField, Text, Grid, Loading, Badge, Modal, Tabs, Checkbox, Select
- (75+ total)

DESIGN:
- IKEA Blue (#0051BA), Yellow (#FFDB00)
- Swedish minimalism
- 8px grid system
- WCAG 2.1 AA
```

---

### Ingka Skapa + CWDS Prompt

```
You are an expert React developer creating a production-ready internal tool using IKEA's Ingka Skapa + CWDS.

TECH STACK:
- React 19 + TypeScript
- Vite
- IKEA Ingka Skapa (@ingka/* components) - Base
- IKEA CWDS (@ingka-group-digital/* components) - Co-worker features
- Auth0 or Azure MSAL

BASE COMPONENTS (Ingka Skapa):
- Button, Card, InputField, Text, Grid, Table, etc.

CO-WORKER COMPONENTS (CWDS):
- CWDSLayout, ILOFFLayout
- GlobalHeader, AppSwitcher
- MobileNavigation, NavMenu
- UserProfile

DESIGN:
- Co-Worker Blue (#003E72), IKEA Yellow (#FFDB00)
- Professional, task-oriented
- ILOFF app discovery
- Global Header with app switching

REQUIREMENTS:
1. Use CWDSLayout or ILOFFLayout as root
2. Include GlobalHeader with AppSwitcher and UserProfile
3. Use @ingka/* for UI elements (forms, tables, cards)
4. Implement Auth0/Azure authentication
5. Professional, efficient for internal tools

EXAMPLE:
import { CWDSLayout } from '@ingka-group-digital/cwds-react-layout';
import { GlobalHeader } from '@ingka-group-digital/cwds-react-header';
import { Card } from '@ingka/card';
import { Button } from '@ingka/button';

function App() {
  return (
    <CWDSLayout>
      <GlobalHeader appName="Admin Dashboard" user={currentUser} />
      <main>
        <Card>{/* @ingka/* components */}</Card>
      </main>
    </CWDSLayout>
  );
}
```

---

## Component Installation

### Ingka Skapa Installation

**Function:** `applyIngkaSkapaDesignSystem(appPath)`

**What it does:**

1. Changes to app directory (`process.chdir(appPath)`)
2. Calls component installer to install 11 @ingka/\* components
3. Creates `src/lib/ikea-design-tokens.ts` file
4. Creates `src/styles/ingka.css` with component imports
5. Updates `src/index.css` to import Ingka styles

**Components installed:**

- button, card, input-field, text, grid
- loading, badge, modal, tabs, checkbox, select

---

### CWDS Installation

**Function:** `applyCWDSDesignSystem(appPath)`

**What it does:**

1. Creates CWDSInstaller instance with `appPath`
2. Auto-selects 8 recommended CWDS components
3. Installs via GitHub Packages (@ingka-group-digital/\*)
4. Sets up authentication (Auth0 default)

**Components installed:**

- cwds-react-layout
- iloff-layout-react
- cwds-react-header
- cwds-react-app-switcher
- cwds-react-mobile-navigation
- cwds-react-nav-menu
- cwds-react-user-profile
- cwds-variables

---

## Benefits of This Architecture

### ✅ **Correct Relationship**

- CWDS truly extends Ingka Skapa (not alternative)
- Internal tools get full base component library + co-worker features
- Matches IKEA's actual design system architecture

### ✅ **Flexibility**

- Customer apps: Ingka Skapa only
- Internal tools: Ingka Skapa + CWDS
- Users never get CWDS alone (which wouldn't work anyway)

### ✅ **Clear User Intent**

- `--ikea` → "I want IKEA components"
- `--cwds` → "I also want co-worker features"
- Two separate, clear decisions

### ✅ **Better UX**

- Interactive prompts flow naturally:
  1. "Use IKEA?" → "Yes" (most users want this)
  2. "Add CWDS?" → "Yes" (only for internal tools)

### ✅ **Accurate Naming**

- "Ingka Skapa" = IKEA's official design system name
- "CWDS" = Co-Worker Design Subsystem (sub-system of Skapa)

---

## Testing

### Test 1: Ingka Skapa Only

```bash
mkdir /tmp/test-ingka && cd /tmp/test-ingka
git init
ingvar spark -p "todo app" -n "test-app" --ikea --no-install

# Verify:
# ✅ @ingka/* packages in package.json
# ✅ No @ingka-group-digital/* packages
# ✅ src/styles/ingka.css created
# ✅ src/lib/ikea-design-tokens.ts created
```

### Test 2: Ingka Skapa + CWDS

```bash
mkdir /tmp/test-cwds && cd /tmp/test-cwds
git init
ingvar spark -p "admin panel" -n "admin-app" --ikea --cwds --no-install

# Verify:
# ✅ @ingka/* packages in package.json
# ✅ @ingka-group-digital/* packages in package.json
# ✅ Both Ingka and CWDS styles
# ✅ AI-generated code uses CWDSLayout + @ingka/* components
```

### Test 3: Interactive

```bash
mkdir /tmp/test-interactive && cd /tmp/test-interactive
git init
ingvar spark -p "dashboard" -n "test-dash"

# Should prompt:
# ? Use IKEA Ingka Skapa? (Y/n)
# ? Add CWDS components? (y/N)
```

---

## Next Steps

1. ✅ Implementation complete
2. ⏳ Test both scenarios (Ingka only, Ingka + CWDS)
3. ⏳ Update CHANGELOG.md
4. ⏳ Version bump to 6.2.0
5. ⏳ Git commit & npm publish

---

**Architecture Summary:**

```
Ingvar Spark
├── No Design System (default Vite template)
├── IKEA Ingka Skapa (75+ components)
│   ├── Customer-facing apps
│   └── + CWDS (10+ components)
│       └── Internal co-worker tools
```

**The key insight:** CWDS is not a peer of Ingka Skapa, it's a child/extension of it. Users choose Ingka Skapa as the base, then optionally add CWDS features for internal tools.

This matches IKEA's actual design system architecture where CWDS builds on top of Ingka Skapa for co-worker-specific needs.
