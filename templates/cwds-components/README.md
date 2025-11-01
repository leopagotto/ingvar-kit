# CWDS Component Templates

> **Source of Truth**: Official IKEA Ingka Co-worker Design Components (Figma)
> **Last Generated**: 2025-11-01

## Overview

These React/TypeScript component templates implement the **Co-Worker Design System (CWDS)** specification extracted directly from the official IKEA Figma designs. 

**Important**: CWDS is a **design specification**, not an npm package. These templates compose real `@ingka/*` UI primitives to match the CWDS design patterns.

## Available Components

### 1. Global Header
```tsx
import { GlobalHeader } from './GlobalHeader';

<GlobalHeader
  appName="Warehouse Management"
  userName="Bill Lau"
  userRole="Reverse Flow Specialist"
  notificationCount={3}
  onMenuClick={() => {}}
  onSearchClick={() => {}}
/>
```

### 2. Navigation Menu
```tsx
import { NavigationMenu } from './NavigationMenu';

<NavigationMenu
  items={[
    { id: 'home', label: 'Home', href: '/' },
    { id: 'orders', label: 'Orders', href: '/orders' },
  ]}
  activeItemId="home"
/>
```

### 3. App Switcher
```tsx
import { AppSwitcher } from './AppSwitcher';

<AppSwitcher
  isOpen={true}
  apps={[
    { id: 'wms', name: 'Warehouse Management' },
    { id: 'pos', name: 'Point of Sale' },
  ]}
  onAppClick={(app) => console.log(app)}
/>
```

### 4. Profile
```tsx
import { Profile } from './Profile';

<Profile
  isOpen={true}
  userName="Bill Lau"
  userRole="Reverse Flow Specialist"
  onSignOut={() => {}}
/>
```

### 5. Bottom Bar Navigation
```tsx
import { BottomBarNavigation } from './BottomBarNavigation';

<BottomBarNavigation
  items={[
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
  ]}
  activeItemId="home"
/>
```

## Installation

These templates are designed to be copied into your project during initialization with `ingvar init`. When you select "CWDS" as your design system, these files will be automatically copied to your `src/components/cwds/` directory.

### Manual Installation

If you need to add these templates to an existing project:

```bash
# Copy templates to your project
cp -r templates/cwds-components/* src/components/cwds/

# Install required @ingka/* dependencies (examples - adjust based on actual usage)
npm install @ingka/button @ingka/card @ingka/input @ingka/icon
```

## Design Tokens

Design tokens are extracted from the Figma file and available in:
- `styles/cwds-tokens.css` - CSS custom properties

Import the tokens in your app:
```tsx
import './components/cwds/styles/cwds-tokens.css';
```

## Customization

These templates provide a base implementation matching the CWDS specification. You can customize them for your specific needs:

1. **Replace placeholder icons** with actual `@ingka/icon` components when available
2. **Add real `@ingka/*` components** instead of styled divs/buttons
3. **Adjust colors and spacing** to match your brand requirements
4. **Add additional props** for your use cases

## Real @ingka/* Packages

According to npm registry search, these are the actual available `@ingka/*` packages:

- `@ingka/button`
- `@ingka/card`
- `@ingka/input`
- `@ingka/modal`
- `@ingka/grid`
- `@ingka/base`
- `@ingka/avatar`
- ... (60+ UI primitives)

**Note**: There are NO `@ingka-group-digital/cwds-*` packages. CWDS is a design pattern that you implement by composing the above primitives.

## Figma Reference

View the original designs in Figma:
- [Global Header](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=301-142)
- [Navigation Menu](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=702-2930)
- [App Switcher](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=702-2931)
- [Profile](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=2941-96)
- [Bottom Bar](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx?node-id=2941-97)

## Documentation

For complete specifications extracted from Figma, see:
- `docs/guides/CWDS_FIGMA_SPECS.md` - Human-readable documentation
- `docs/guides/CWDS_FIGMA_SPECS.json` - Machine-readable specifications

## Support

For issues with these templates or the CWDS specification extraction:
- GitHub Issues: https://github.com/leopagotto/ingvar-kit/issues
- Label: `cwds`

## License

These templates are provided as reference implementations. Adjust according to your organization's requirements and licensing.
