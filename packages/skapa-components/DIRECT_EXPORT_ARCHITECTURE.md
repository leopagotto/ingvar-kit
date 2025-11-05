# Direct Export Architecture

## Overview

The `@ingvar-kit/skapa-components` package now provides **two ways to use Skapa components**:

1. **Direct @ingka exports** - Official Skapa components with exact names
2. **Custom wrappers** - Simplified APIs around @ingka components

This gives you maximum flexibility: use official Skapa components when you need full compatibility, or use our simplified wrappers for rapid prototyping.

## Installation Status

**Currently installed:** 44 @ingka packages
**Target:** ~65-70 packages (full Skapa coverage)

### Installed Packages (44)

**LAYOUT (10):**

- ✅ accordion
- ✅ avatar
- ✅ card
- ✅ image
- ✅ list
- ✅ rating
- ✅ table
- ✅ tabs
- ✅ teaser
- ✅ text

**ACTIONS (4):**

- ✅ button
- ✅ dual-button
- ✅ jumbo-button
- ✅ pill

**INPUTS (11):**

- ✅ checkbox
- ✅ input-field
- ✅ quantity-stepper
- ✅ radio-button
- ✅ search
- ✅ segmented-control
- ✅ select
- ✅ slider
- ✅ switch
- ✅ text-area
- ✅ toggle

**INDICATORS (5):**

- ✅ badge
- ✅ loading
- ✅ progress-indicator
- ✅ skeleton
- ✅ status

**MESSAGES (5):**

- ✅ banner
- ✅ helper-text
- ✅ inline-message
- ✅ modal
- ✅ toast

**NAVIGATION (2):**

- ✅ breadcrumb
- ✅ hyperlink
- ✅ tag

**CONTAINERS (3):**

- ✅ carousel
- ✅ expander
- ✅ tooltip

**FOUNDATION (2):**

- ✅ icon
- ⚠️ grid (installed but missing types)

**PRODUCT RANGE (1):**

- ✅ price

### Missing Packages (~20)

**LAYOUT:**

- ⏳ compact-card
- ⏳ member-card
- ⏳ shoppable-image
- ⏳ simple-video
- ⏳ text-overlay-card
- ⏳ thumbnail-grid
- ⏳ typography

**INPUTS:**

- ⏳ choice
- ⏳ combobox

**PRODUCT RANGE:**

- ⏳ price-module
- ⏳ product-identifier

**CONTAINERS:**

- ⏳ aspect-ratio-box
- ⏳ endorsement-label
- ⏳ list-box
- ⏳ list-view
- ⏳ payment-logo
- ⏳ skip-content

## Usage Examples

### Option 1: Direct @ingka Exports (Exact Skapa Names)

```typescript
import {
  Button,        // Direct from @ingka/button
  Card,          // Direct from @ingka/card
  InputField,    // Direct from @ingka/input-field (not TextField)
  Switch,        // Direct from @ingka/switch (not Toggle)
  RadioButton    // Direct from @ingka/radio-button (not Radio)
} from '@ingvar-kit/skapa-components/ingka-direct';

// Use with official Skapa APIs
<Button variant="primary" size="medium">
  Click me
</Button>

<InputField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

### Option 2: Custom Wrappers (Simplified APIs)

```typescript
import {
  Button,        // Our wrapper
  Card,          // Our wrapper
  TextField,     // Simplified API (wraps InputField)
  Toggle,        // Simplified API (wraps Switch)
  Radio          // Simplified API (wraps RadioButton)
} from '@ingvar-kit/skapa-components';

// Use with simplified APIs
<Button variant="primary" size="large">
  Click me
</Button>

<TextField
  label="Email"
  value={email}
  onChange={setEmail}  // Direct function, not event
/>
```

### Option 3: Mixed Usage (index-new.ts)

```typescript
import {
  Button as IngkaButton,      // Direct @ingka
  Button,                     // Our wrapper
  Card as IngkaCard,          // Direct @ingka
  Card,                       // Our wrapper
  InputField,                 // Direct @ingka (no wrapper exists)
  Search                      // Direct @ingka
} from '@ingvar-kit/skapa-components/index-new';

// Choose which version to use per component
<IngkaButton variant="primary">Official</IngkaButton>
<Button variant="primary">Wrapper</Button>
```

## Component Name Mapping

**Our wrappers use simplified names, @ingka uses official Skapa names:**

| Wrapper Name       | @ingka Package             | Official Skapa Name |
| ------------------ | -------------------------- | ------------------- |
| `TextField`        | `@ingka/input-field`       | `InputField`        |
| `Toggle`           | `@ingka/switch`            | `Switch`            |
| `Radio`            | `@ingka/radio-button`      | `RadioButton`       |
| `TextArea`         | `@ingka/text-area`         | `TextArea`          |
| `Select`           | `@ingka/select`            | `Select`            |
| `Slider`           | `@ingka/slider`            | `Slider`            |
| `Checkbox`         | `@ingka/checkbox`          | `Checkbox`          |
| `Button`           | `@ingka/button`            | `Button`            |
| `Pill`             | `@ingka/pill`              | `Pill`              |
| `DualButton`       | `@ingka/dual-button`       | `DualButton`        |
| `JumboButton`      | `@ingka/jumbo-button`      | `JumboButton`       |
| `Alert`            | `@ingka/inline-message`    | `InlineMessage`     |
| `Toast`            | `@ingka/toast`             | `Toast`             |
| `Banner`           | `@ingka/banner`            | `Banner`            |
| `Modal`            | `@ingka/modal`             | `Modal`             |
| `SegmentedControl` | `@ingka/segmented-control` | `SegmentedControl`  |
| `Tooltip`          | `@ingka/tooltip`           | `Tooltip`           |

## File Structure

```
packages/skapa-components/src/
├── index.ts                      # Current exports (custom wrappers)
├── index-new.ts                  # NEW: Dual export strategy
├── ingka-direct.ts               # NEW: Direct @ingka re-exports
├── components/
│   ├── actions/                  # Custom wrapper components
│   ├── inputs/
│   ├── feedback/
│   └── ...
└── SKAPA_COMPONENT_MAPPING.md    # NEW: Complete component catalog
```

## Benefits

### Direct @ingka Exports

- ✅ Maximum compatibility with official Skapa
- ✅ Exact component names as in Skapa docs
- ✅ Easy migration from existing Skapa projects
- ✅ Full access to all @ingka features
- ✅ Always up-to-date with latest Skapa releases

### Custom Wrappers

- ✅ Simplified APIs for rapid prototyping
- ✅ Consistent naming conventions
- ✅ Less boilerplate code
- ✅ Better DX for beginners
- ✅ Tailwind-friendly prop names

## Roadmap

### Phase 1: Complete Package Installation ✅

- ✅ Install core 44 packages
- ⏳ Install remaining ~20 packages
- ⏳ Verify all types are available

### Phase 2: Export Strategy Migration

- ⏳ Test index-new.ts in real projects
- ⏳ Gather user feedback
- ⏳ Create migration guide
- ⏳ Replace index.ts with index-new.ts (breaking change)
- ⏳ Bump to v1.0.0

### Phase 3: Complete Component Coverage

- ⏳ Build remaining 7/58 custom components
- ⏳ Add "Patterns" category (12 components)
- ⏳ Create comprehensive examples
- ⏳ Add Storybook documentation

### Phase 4: Testing & Quality

- ⏳ Add unit tests for direct exports
- ⏳ Add integration tests
- ⏳ Improve TypeScript type safety
- ⏳ Performance optimization

## Migration Guide

### For Existing Users

**Current import (v0.1.0):**

```typescript
import { Button, TextField, Toggle } from "@ingvar-kit/skapa-components";
```

**New import (v1.0.0 - future):**

```typescript
// Option A: Keep using wrappers (recommended for prototyping)
import { Button, TextField, Toggle } from "@ingvar-kit/skapa-components";

// Option B: Switch to official Skapa names
import { Button, InputField, Switch } from "@ingvar-kit/skapa-components";

// Option C: Mix and match
import {
  Button, // Wrapper
  InputField, // Direct @ingka
  Switch as Toggle, // Direct @ingka with alias
} from "@ingvar-kit/skapa-components";
```

**No breaking changes until v1.0.0** - Both approaches will be supported.

## Build Status

✅ **Build:** Passing
✅ **Bundle:** dist/index.js, dist/index.esm.js
⚠️ **Warnings:** React "use client" directives (expected)
⚠️ **TypeScript:** 3 minor type issues in custom wrappers

## Next Steps

1. **Install remaining packages** (~20 more)
2. **Test index-new.ts** in Spark apps
3. **Update README** with new import examples
4. **Create migration guide** for v1.0.0
5. **Gather feedback** from Leo and team

## Questions?

See [SKAPA_COMPONENT_MAPPING.md](./SKAPA_COMPONENT_MAPPING.md) for complete component catalog and mapping strategy.
