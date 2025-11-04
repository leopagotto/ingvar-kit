# Skapa Component Library - Implementation Plan

**Status:** 🚧 In Progress
**Issue:** #15
**Started:** 2025-11-04
**Target Completion:** 2025-11-08 (4 days)

---

## 🎯 Project Overview

Transform the Skapa Design System documentation into a production-ready, NPM-published component library that:

- Provides 58+ ready-to-use React/Vue components
- Includes 13+ documented design patterns
- Integrates seamlessly with Ingvar-kit
- Works out-of-the-box with GitHub Copilot
- Enables 5-minute rapid prototyping setup

---

## 📋 Multi-Phase Implementation

### **Phase 1: Extract Pattern Screenshots** ⏳ IN PROGRESS

**Goal:** Convert 13 pattern screenshots to structured JSON specifications

**Tasks:**

- [x] Create `scripts/extract-skapa-patterns.js` OCR extraction script
- [ ] Install Tesseract OCR dependencies
- [ ] Extract all 13 pattern screenshots
- [ ] Validate JSON outputs
- [ ] Store in `docs/guides/Skapa-json/patterns/`

**Patterns to Extract:**

1. Dark Mode
2. Data Visualisation (page 1)
3. Data Visualisation (page 2)
4. Data Visualisation (page 3)
5. Empty States
6. Feedback Collection
7. Filtering
8. Forms
9. Loading States
10. Modal Containers
11. Overflows
12. Selection Patterns
13. Subsystems Overview

**Output:**

```
docs/guides/Skapa-json/patterns/
├── Dark-Mode.json
├── Data-Visualisation-1.json
├── Data-Visualisation-2.json
├── Data-Visualisation-3.json
├── Empty-States.json
├── Feedback-Collection.json
├── Filtering.json
├── Forms.json
├── Loading-States.json
├── Modal-Containers.json
├── Overflows.json
├── Selection-Patterns.json
└── Subsystems-Overview.json
```

**Estimated:** 2-3 hours

---

### **Phase 2: Document Patterns for AI Agents** 🔜 NEXT

**Goal:** Create comprehensive pattern documentation for Copilot consumption

**Tasks:**

- [ ] Create `09-DESIGN-PATTERNS.md`
- [ ] Create `10-FOUNDATIONS-EXTENDED.md`
- [ ] Document each pattern with:
  - Pattern overview and purpose
  - When to use / when not to use
  - Implementation examples with existing components
  - Component combinations
  - Code examples (React/Vue)
  - Accessibility considerations
  - Best practices

**Structure for 09-DESIGN-PATTERNS.md:**

```markdown
# 09: Design Patterns

> **For AI Agents:** Complete guide to Skapa design patterns for rapid prototyping

## Pattern Categories

### 1. Interaction Patterns

- Filtering & Search
- Selection Patterns
- Forms & Data Entry
- Feedback Collection

### 2. Layout Patterns

- Empty States
- Loading States
- Overflows & Scrolling
- Modal Containers

### 3. Visual Patterns

- Dark Mode
- Data Visualisation
- Color & Contrast

### 4. Navigation Patterns

- [Cross-reference with 06-NAVIGATION-AND-SPECIALTY.md]

## Pattern Details

### 1.1 Filtering Pattern

[Detailed documentation]

### 1.2 Selection Pattern

[Detailed documentation]

[etc...]
```

**Structure for 10-FOUNDATIONS-EXTENDED.md:**

```markdown
# 10: Foundations - Extended Reference

> **For AI Agents:** Deep dive into Skapa design foundations

## Foundation Categories

### 1. Typography System

- Font families and weights
- Type scale and hierarchy
- Line heights and spacing
- Responsive typography

### 2. Color System

- Brand colors
- Extended palette
- Semantic colors
- Dark mode colors
- Accessibility (WCAG AA/AAA)

### 3. Spacing System

- Spacing scale (4px base)
- Layout spacing
- Component spacing
- Responsive spacing

### 4. Motion & Animation

- Motion principles
- Timing functions
- Duration scales
- Animation patterns

### 5. Iconography

- Icon library
- Icon sizes
- Usage guidelines

### 6. Layout & Grid

- Grid system
- Breakpoints
- Container widths
- Responsive behavior
```

**Estimated:** 4-5 hours

---

### **Phase 3: Create Component Library** 🔮 PLANNED

**Goal:** Build production-ready React/Vue component library

**Architecture:**

```
packages/skapa-components/
├── package.json
├── tsconfig.json
├── README.md
├── src/
│   ├── index.ts                    # Main export
│   ├── components/
│   │   ├── actions/
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.stories.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Button.module.css
│   │   │   │   └── index.ts
│   │   │   ├── IconButton/
│   │   │   ├── DualButton/
│   │   │   ├── Hyperlink/
│   │   │   ├── JumboButton/
│   │   │   └── Pill/
│   │   ├── inputs/
│   │   │   ├── InputField/
│   │   │   ├── TextArea/
│   │   │   ├── Search/
│   │   │   ├── Checkbox/
│   │   │   ├── Radio/
│   │   │   ├── Switch/
│   │   │   ├── Select/
│   │   │   ├── Combobox/
│   │   │   ├── Slider/
│   │   │   ├── QuantityStepper/
│   │   │   ├── Choice/
│   │   │   └── Listbox/
│   │   ├── display/
│   │   ├── feedback/
│   │   ├── navigation/
│   │   └── cwds/
│   ├── patterns/
│   │   ├── FilteringPattern.tsx
│   │   ├── EmptyState.tsx
│   │   ├── LoadingState.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useSkapa.ts
│   │   ├── useDarkMode.ts
│   │   ├── useResponsive.ts
│   │   └── useAccessibility.ts
│   ├── utils/
│   │   ├── classnames.ts
│   │   ├── a11y.ts
│   │   └── colors.ts
│   └── styles/
│       ├── tokens.css
│       ├── reset.css
│       └── utilities.css
├── dist/                           # Build output
└── .storybook/                     # Storybook config
```

**Component Template Structure:**

```typescript
// Button/Button.tsx
import React from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.types";

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  disabled = false,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.displayName = "SkapaButton";
```

**Tasks:**

- [ ] Setup package structure
- [ ] Configure TypeScript
- [ ] Setup Tailwind CSS / CSS Modules
- [ ] Create base component templates (8 actions)
- [ ] Create input components (12)
- [ ] Create display components (10)
- [ ] Create feedback components (7)
- [ ] Create navigation components (14)
- [ ] Create CWDS components (6)
- [ ] Create pattern components (13)
- [ ] Add TypeScript definitions for all
- [ ] Create Storybook stories
- [ ] Add unit tests (Jest/React Testing Library)
- [ ] Add accessibility tests
- [ ] Setup build system (Rollup/Vite)

**Estimated:** 10-15 hours

---

### **Phase 4: NPM Package Setup** 🔮 PLANNED

**Goal:** Publish to NPM for easy installation

**Package Configuration:**

```json
{
  "name": "@ingvar-kit/skapa-components",
  "version": "1.0.0",
  "description": "Official Skapa Design System components for React/Vue - IKEA's design language",
  "main": "./dist/index.js",
  "module": "./dist/index.esm.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.esm.js",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "keywords": [
    "ikea",
    "skapa",
    "design-system",
    "react",
    "vue",
    "components",
    "ui",
    "ingvar-kit"
  ],
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "rollup": "^4.0.0"
  }
}
```

**Tasks:**

- [ ] Configure package.json
- [ ] Setup build pipeline (Rollup/Vite)
- [ ] Generate TypeScript declarations
- [ ] Create comprehensive README
- [ ] Add LICENSE file
- [ ] Setup GitHub Actions for automated publishing
- [ ] Test local installation (`npm link`)
- [ ] Publish to NPM registry
- [ ] Create installation guide

**Installation Command:**

```bash
npm install @ingvar-kit/skapa-components
# or
yarn add @ingvar-kit/skapa-components
```

**Usage Example:**

```tsx
import { Button, Card, Modal } from "@ingvar-kit/skapa-components";
import "@ingvar-kit/skapa-components/styles";

function App() {
  return (
    <Card>
      <Button variant="primary" onClick={() => alert("Hello Skapa!")}>
        Click me
      </Button>
    </Card>
  );
}
```

**Estimated:** 3-4 hours

---

### **Phase 5: Copilot Integration** 🔮 PLANNED

**Goal:** Configure GitHub Copilot to use Skapa components automatically

**Tasks:**

- [ ] Update `.github/copilot-instructions.md`
- [ ] Create Designer Agent component instructions
- [ ] Add auto-import configuration
- [ ] Create quick-start templates
- [ ] Add component discovery prompts
- [ ] Document common usage patterns
- [ ] Add troubleshooting guide

**Copilot Instructions Addition:**

```markdown
## Skapa Component Library Integration

### Available Components

GitHub Copilot has access to the complete Skapa Design System component library:

**Installation:**
\`\`\`bash
npm install @ingvar-kit/skapa-components
\`\`\`

**Auto-Import:** Copilot will automatically suggest imports from `@ingvar-kit/skapa-components`

**Categories:**

- Actions: Button, IconButton, DualButton, Hyperlink, JumboButton, Pill (8)
- Inputs: InputField, TextArea, Search, Checkbox, Radio, Switch, Select, etc. (12)
- Display: Card, CompactCard, TextOverlayCard, List, Table, Accordion, etc. (10)
- Feedback: Toast, Banner, InlineMessage, Modal, Loading, Status (7)
- Navigation: Tabs, AppBar, MenuItem, Carousel, Image, Price, etc. (14)
- CWDS: GlobalHeader, NavigationMenu, BottomBar, AppSwitcher, Profile (6)

**Usage Pattern:**
\`\`\`tsx
import { Button, Card, InputField } from '@ingvar-kit/skapa-components';
import '@ingvar-kit/skapa-components/styles';
\`\`\`

### Designer Agent Instructions

When the Designer Agent creates mockups:

1. Use Skapa components from the library
2. Reference component documentation for props/variants
3. Follow Skapa design patterns
4. Ensure WCAG 2.1 AA compliance
5. Use Skapa color tokens and spacing scale

### Component Discovery

To see available components:
\`\`\`bash
npx skapa-components list
\`\`\`

To generate a component:
\`\`\`bash
npx skapa-components generate Button --variant=primary
\`\`\`
```

**Designer Agent Update:**

```markdown
# Designer Agent - Skapa Component Integration

## Component Library Access

You have access to 58+ production-ready Skapa components via:
\`@ingvar-kit/skapa-components\`

## Rapid Prototyping Workflow

1. **User Request** → Identify needed components
2. **Import Components** → Auto-import from library
3. **Create Mockup** → Use real component JSX
4. **Apply Patterns** → Reference pattern documentation
5. **Preview** → Generate functional prototype

## Component Reference

### Action Components (8)

- \`<Button variant="primary|secondary|tertiary">\`
- \`<IconButton icon="..." />\`
- \`<JumboButton>\` (hero CTAs)
- \`<Pill>\` (filter chips)

### Input Components (12)

- \`<InputField label="..." />\`
- \`<Checkbox label="..." />\`
- \`<Select options={[...]} />\`
- \`<Combobox>\` (searchable select)

[etc...]

## Pattern Application

When user requests a feature, apply relevant patterns:

**Filtering UI:**
\`\`\`tsx
import { Pill, Listbox } from '@ingvar-kit/skapa-components';

<div className="filters">
  <Pill onClick={toggleFilters}>Price ▾</Pill>
  <Pill onClick={toggleFilters}>Color ▾</Pill>
  <Listbox isOpen={filtersOpen}>
    <Listbox.Item value="0-50">$0 - $50</Listbox.Item>
    <Listbox.Item value="50-100">$50 - $100</Listbox.Item>
  </Listbox>
</div>
\`\`\`

**Empty State:**
\`\`\`tsx
import { EmptyState, Button } from '@ingvar-kit/skapa-components';

<EmptyState
icon="search"
title="No results found"
description="Try adjusting your filters"
action={<Button onClick={clearFilters}>Clear filters</Button>}
/>
\`\`\`
```

**Estimated:** 2-3 hours

---

## 📊 Success Metrics

### Component Library

- [ ] 58+ components implemented
- [ ] 100% TypeScript coverage
- [ ] 90%+ test coverage
- [ ] Storybook documentation for all components
- [ ] WCAG 2.1 AA compliant

### NPM Package

- [ ] Published to NPM registry
- [ ] < 200kb bundle size (minified + gzipped)
- [ ] Tree-shakeable imports
- [ ] Zero breaking changes in 1.x

### Copilot Integration

- [ ] Auto-suggests Skapa components
- [ ] Correct import paths
- [ ] Pattern-aware code generation
- [ ] 5-minute setup time for new projects

---

## 🎯 Timeline

| Phase       | Duration        | Start Date     | End Date       | Status         |
| ----------- | --------------- | -------------- | -------------- | -------------- |
| **Phase 1** | 2-3 hours       | 2025-11-04     | 2025-11-04     | ⏳ In Progress |
| **Phase 2** | 4-5 hours       | 2025-11-04     | 2025-11-05     | 🔜 Next        |
| **Phase 3** | 10-15 hours     | 2025-11-05     | 2025-11-07     | 🔮 Planned     |
| **Phase 4** | 3-4 hours       | 2025-11-07     | 2025-11-07     | 🔮 Planned     |
| **Phase 5** | 2-3 hours       | 2025-11-07     | 2025-11-08     | 🔮 Planned     |
| **Total**   | **21-30 hours** | **2025-11-04** | **2025-11-08** | **4 days**     |

---

## 🔗 Dependencies

### Required Tools

- [x] Node.js 18+
- [x] npm/yarn
- [ ] Tesseract OCR (for Phase 1)
- [x] TypeScript 5+
- [x] React 18+

### Required Packages

- `tesseract.js` or `node-tesseract-ocr` (Phase 1)
- `@types/react` (Phase 3)
- `rollup` or `vite` (Phase 3, 4)
- `storybook` (Phase 3)
- `jest` + `@testing-library/react` (Phase 3)

### Existing Assets

- [x] 58 component specifications (JSON)
- [x] 58 component documentation (markdown)
- [x] 13 pattern screenshots (PNG)
- [ ] 13 pattern specifications (JSON) - Phase 1 output
- [ ] Pattern documentation - Phase 2 output

---

## 📚 Related Documentation

- Issue #15: https://github.com/leopagotto/ingvar-kit/issues/15
- Current Skapa Docs: `/docs/ai-agents/skapa-design-system/`
- Component Specs: `/docs/guides/Skapa-json/components/`
- Pattern Screenshots: `/docs/guides/Skapa-patterns/`
- Copilot Instructions: `/.github/copilot-instructions.md`

---

## 🚀 Quick Commands

```bash
# Phase 1: Extract patterns
node scripts/extract-skapa-patterns.js

# Phase 2: Validate documentation
npm run validate:skapa-docs

# Phase 3: Build components
cd packages/skapa-components
npm run build

# Phase 4: Test package locally
npm link
cd ~/test-project
npm link @ingvar-kit/skapa-components

# Phase 4: Publish to NPM
npm run build
npm publish --access public

# Phase 5: Test Copilot integration
# [Manual testing with GitHub Copilot in VS Code]
```

---

**Last Updated:** 2025-11-04
**Status:** Phase 1 in progress - OCR extraction script created, awaiting Tesseract installation
