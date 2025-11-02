# CWDS Quick Reference Guide

**Ingka Co-Worker Design System - Fast Implementation Guide**

## 🚀 Quick Start

```typescript
import { GlobalHeader } from "@ingka/global-header";
import { NavigationMenu } from "@ingka/navigation-menu";
import { Profile } from "@ingka/profile";
import { BottomBarNavigation } from "@ingka/bottom-bar-navigation";

// Basic co-worker app structure
export function CoWorkerApp() {
  return (
    <>
      <GlobalHeader productName="App" />
      <NavigationMenu items={items} /> {/* Desktop */}
      <main>Content</main>
      <BottomBarNavigation items={items} /> {/* Mobile */}
      <Profile user={currentUser} />
    </>
  );
}
```

## 6 CWDS Components at a Glance

### 1. Global Header

- **Location:** Top, fixed
- **Color:** #003E72 (non-negotiable)
- **Contains:** App title, nav links, utilities, profile access, app switcher
- **Mobile:** Collapse to hamburger menu
- **Special:** Hide/show on scroll behavior

### 2. Navigation Menu

- **Location:** Left sidebar (desktop only)
- **Max depth:** 2 levels
- **Features:** Icons, active states, collapsible sections
- **Alternative:** Bottom Bar Navigation on mobile

### 3. Bottom Bar Navigation

- **Location:** Bottom of screen (mobile only)
- **Max items:** 5
- **Features:** Icons, labels, badge counts
- **Alternative:** Navigation Menu on desktop

### 4. Profile Component

- **Location:** Side panel (triggered from Global Header)
- **Contents:** User card, list items (max 5), language selector
- **Special:** Sticky profile + language selector
- **Behavior:** Scroll inner content, keep top/bottom fixed

### 5. App Switcher

- **Location:** Modal overlay
- **Triggered by:** Icon in Global Header
- **Features:** Recently used, frequently used, search
- **Behavior:** Navigate to selected app URL

### 6. Colours

- **Primary:** #003E72 (Global Header)
- **Secondary:** #0051BA (Links, accents)
- **States:** Danger (#D20000), Success (#007C3D), Warning (#FF8C00)
- **Rule:** Never override CWDS colors

## Responsive Strategy

| Breakpoint          | Navigation      | Header                 |
| ------------------- | --------------- | ---------------------- |
| **S** (0-599px)     | Bottom Bar      | Simplified header      |
| **M** (600-1024px)  | Navigation Menu | Full header            |
| **L-XXL** (1024px+) | Navigation Menu | Full header with links |

**❌ NEVER combine:** Hamburger Menu + Bottom Bar Navigation

## 🔧 Implementation Checklist

### Before Building

- [ ] Read CWDS instructions: `lib/ai-instructions/frontend-agent-ingka.instructions.md`
- [ ] Check JSON specs: `docs/guides/Skapa-json/subsystems/`
- [ ] Verify breakpoint strategy
- [ ] Plan navigation depth (max 2 levels)

### During Development

- [ ] Use #003E72 ONLY for Global Header background
- [ ] Implement keyboard navigation (Tab, Enter, Escape)
- [ ] Add ARIA landmarks (header, nav, main)
- [ ] Test screen reader with profile panel
- [ ] Ensure 4.5:1 contrast ratio
- [ ] Make touch targets 44x44px minimum

### Accessibility (Required)

- [ ] Tab navigation works for all controls
- [ ] Enter/Space activates buttons & links
- [ ] Escape closes modals & panels
- [ ] Focus returns to trigger element
- [ ] Skip link visible on Tab
- [ ] ARIA labels on icon-only buttons

### Testing

- [ ] Desktop (1440px): Full header + nav menu
- [ ] Tablet (768px): Full header + nav menu
- [ ] Mobile (320px): Simplified header + bottom bar
- [ ] RTL languages work correctly
- [ ] All keyboard shortcuts work
- [ ] Screen reader accessible

## Do's & Don'ts

### ✅ DO

```typescript
// Use CWDS colors
backgroundColor: '#003E72'  // Global Header

// Combine components correctly
<GlobalHeader />
<NavigationMenu /> {/* Desktop */}
<BottomBarNavigation /> {/* Mobile */}

// Native language selector
<select onChange={e => i18n.changeLanguage(e.target.value)}>

// Keyboard accessible
onKeyDown={(e) => e.key === 'Enter' && handleClick()}

// Semantic HTML
<header role="banner">
<nav role="navigation">
<main role="main">
```

### ❌ DON'T

```typescript
// Don't change header color
backgroundColor: '#0051BA'  // WRONG - must be #003E72

// Don't combine nav patterns
<NavigationMenu />
<BottomBarNavigation /> {/* WRONG - never together */}

// Don't create custom selectors
<CustomDropdown /> {/* Use native <select> */}

// Don't hardcode RTL
direction: 'rtl' {/* WRONG - use lang attribute */}

// Don't mix list item styles
<ListItem variant="large" />
<ListItem variant="single-line" /> {/* WRONG - pick one */}
```

## Common Patterns

### Authentication Flow

```typescript
// User logs in → Show Global Header with profile
// Profile triggered → Show user name, role, department
// Language selector → Change app language
// App switcher → Navigate to other internal apps
```

### Mobile Navigation

```typescript
// Small screens (< 600px)
// - Global Header simplified (app name + utilities + profile)
// - Bottom Bar Navigation (5 main sections max)
// - Each icon leads to section, no nested nav
```

### Desktop Navigation

```typescript
// Large screens (> 600px)
// - Global Header (app name + nav links + utilities + profile)
// - Left Navigation Menu (nested items, 2 levels max)
// - Content area takes remaining space
```

### Sticky Elements

```typescript
// Profile component:
// - Profile card (top) → STICKY
// - List items → SCROLLABLE
// - Language selector (bottom) → STICKY
```

## Color System

```typescript
// CWDS Colors (immutable)
#003E72  // Primary dark blue (Global Header, must not change)
#0051BA  // Secondary IKEA blue (links, accents)
#D20000  // Danger red (alerts, destructive actions)
#007C3D  // Success green (confirmations)
#FF8C00  // Warning orange (warnings)

// Always use semantic tokens
colors.primary    // #003E72
colors.danger     // #D20000
colors.success    // #007C3D
```

## Spacing Grid

```typescript
// CWDS uses 8px base grid (same as Skapa)
8px   // xs - minimal spacing
16px  // sm - small spacing
24px  // md - medium spacing (common default)
32px  // lg - large spacing
40px  // xl - extra large
48px  // xxl - maximum spacing
```

## Accessibility Keyboard Shortcuts

| Component       | Shortcut      | Action                     |
| --------------- | ------------- | -------------------------- |
| All             | Tab           | Focus next element         |
| All             | Shift+Tab     | Focus previous element     |
| Links/Buttons   | Enter         | Activate                   |
| Icon buttons    | Space         | Activate                   |
| Global Header   | Tab           | Cycle through header items |
| Navigation Menu | Arrow Up/Down | Navigate items             |
| Navigation Menu | Arrow Right   | Expand submenu             |
| Navigation Menu | Arrow Left    | Collapse submenu           |
| Profile         | Escape        | Close panel                |
| Profile         | Tab           | Navigate list items        |

## JSON Specification Files

All component specs available as JSON (extracted from Skapa):

```
docs/guides/Skapa-json/subsystems/
├── Ingka-Co-Worker-Global-Header.json
├── Ingka-Co-Worker-Navigation-Menu.json
├── Ingka-Co-Worker-Bottom-Bar-Navigation.json
├── Ingka-Co-Worker-Profile.json
├── Ingka-Co-Worker-App-Switcher.json
└── Ingka-Co-Worker-Colours.json
```

Parse these to extract:

- Component anatomy & structure
- Variant definitions
- Responsive specifications
- Accessibility requirements
- Motion & interaction details

## More Information

- **Full Instructions:** `lib/ai-instructions/frontend-agent-ingka.instructions.md`
- **Update Documentation:** `docs/development/CWDS_INSTRUCTIONS_UPDATE.md`
- **Test Results:** `docs/guides/SKAPA_JSON_TEST_RESULTS.md`
- **JSON Specifications:** `docs/guides/Skapa-json/subsystems/`

---

**Quick Links:**

- ✅ CWDS Instructions: 421 lines of implementation guidance
- ✅ React Examples: 7+ complete code snippets
- ✅ Accessibility: WCAG AA compliant
- ✅ JSON Specs: 6 extracted components
- ✅ Responsive: Mobile-first design
