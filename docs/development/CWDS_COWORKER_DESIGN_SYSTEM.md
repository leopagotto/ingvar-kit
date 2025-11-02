# Co-Worker Design Subsystem (CWDS) Guide

**Last Updated:** October 31, 2025
**Version:** 6.1.0

## Overview

The **Co-Worker Design Subsystem (CWDS)** is IKEA's design system for internal co-worker-facing applications. It provides a consistent user experience across all internal tools, applications, and platforms used by IKEA employees.

### Key Differences from Skapa

| Feature             | Skapa Design System                        | CWDS                                        |
| ------------------- | ------------------------------------------ | ------------------------------------------- |
| **Target Audience** | External customers (IKEA.com, mobile apps) | Internal co-workers (staff tools)           |
| **Primary Colors**  | IKEA Blue (#0058AB) & Yellow (#FFDB00)     | Co-worker Blue (#003E72) & Yellow (#FFDB00) |
| **Components**      | Customer-facing UI                         | Co-worker productivity tools                |
| **Use Cases**       | E-commerce, product browsing               | Admin panels, internal tools, dashboards    |
| **Registry**        | `@ingka/*` (npm)                           | `@ingka-group-digital/*` (GitHub Packages)  |

---

## Components Overview

### 📐 Layout Components

#### 1. **CWDS Layout** (`cwds-react-layout`)

The main layout wrapper that provides the foundational structure for co-worker applications.

**Features:**

- Global header with app switcher integration
- Navigation menu support
- User profile drawer
- Responsive layout system
- Mobile bottom navigation
- Content area with optional narrow/wide modes

**Package:** `@ingka-group-digital/cwds-react-layout`

**Dependencies:**

- Skapa base components (`@ingka/base`, `@ingka/button`, etc.)
- CWDS shared components
- Focus-visible polyfill

---

#### 2. **ILOFF Layout** (`iloff-layout-react`)

Enhanced CWDS Layout with **ILOFF (IKEA Life-Optimizing Factory Framework)** apps integration. This automatically populates the App Switcher with all ILOFF applications the user has access to.

**Features:**

- All CWDS Layout features
- Automatic ILOFF apps discovery
- Role-based app access control
- Single Sign-On (SSO) integration
- Auth0 or Azure authentication

**Package:** `@ingka-group-digital/iloff-layout-react`

**Authentication Options:**

- **Auth0:** `@auth0/auth0-react`
- **Azure MSAL:** `@azure/msal-browser`, `@azure/msal-react`

---

### 🧭 Navigation Components

#### 3. **Global Header** (`cwds-react-header`)

The co-worker application header with IKEA branding, navigation, and quick actions.

**Features:**

- IKEA co-worker branding
- App switcher trigger
- Navigation menu trigger
- User profile trigger
- Search integration (optional)
- Breadcrumbs support

**Package:** `@ingka-group-digital/cwds-react-header`

---

#### 4. **App Switcher** (`cwds-react-app-switcher`)

A drawer component that allows co-workers to quickly switch between different internal applications.

**Features:**

- Grid view of accessible apps
- Recent apps section
- Favorites management
- Search/filter apps
- "See All Apps" link to ILOFF
- Keyboard navigation

**Package:** `@ingka-group-digital/cwds-react-app-switcher`

**Use Cases:**

- Switch from warehouse management to inventory system
- Quick access to frequently used tools
- Discover new available applications

---

#### 5. **Bottom Navigation** (`cwds-react-mobile-navigation`)

Mobile-optimized bottom tab bar for touch interfaces.

**Features:**

- Fixed bottom position
- Icon + label tabs
- Active state indicators
- Touch-friendly sizing
- Responsive hiding on scroll (optional)

**Package:** `@ingka-group-digital/cwds-react-mobile-navigation`

**Best Practices:**

- Use 3-5 main navigation items
- Keep labels short (1-2 words)
- Use clear, recognizable icons

---

#### 6. **Navigation Menu** (`cwds-react-nav-menu`)

A drawer-based navigation menu for hierarchical navigation structures.

**Features:**

- Multi-level navigation
- Collapsible sections
- Active item highlighting
- Prefix support (app-specific routes)
- Keyboard navigation
- RTL language support

**Package:** `@ingka-group-digital/cwds-react-nav-menu`

**Use Cases:**

- Multi-section admin panels
- Complex application hierarchies
- Secondary navigation

---

### 👤 User Components

#### 7. **User Profile** (`cwds-react-user-profile`)

A drawer component for user settings, preferences, and logout.

**Features:**

- User avatar and name display
- Multi-section content areas
- Language picker integration
- Custom profile sections
- Logout functionality
- Nested navigation support

**Package:** `@ingka-group-digital/cwds-react-user-profile`

**Common Sections:**

- Personal information
- Application preferences
- Language settings
- Notifications
- Help & support

---

### 🎨 Shared Components

#### 8. **CWDS Variables** (`cwds-variables`)

CSS variables for the co-worker design system.

**Includes:**

- Colors (co-worker palette)
- Typography scales
- Spacing system
- Border radius
- Z-index layers
- Breakpoints

**Package:** `@ingka-group-digital/cwds-variables`

---

## Installation

### Prerequisites

1. **GitHub Package Registry Access**

   - CWDS packages are hosted on GitHub Packages
   - Requires GitHub authentication

2. **Skapa Dependencies**
   - CWDS builds on top of Skapa foundations
   - Base components (`@ingka/base`, `@ingka/button`, etc.)

### Using Ingvar Kit CLI

```bash
# During project initialization
ingvar init

# Select "Yes" for Co-Worker Design Subsystem
# Choose components interactively
```

### Manual Installation

```bash
# Configure registry
npm config set @ingka-group-digital:registry https://npm.pkg.github.com

# Install CWDS Layout
npm install @ingka-group-digital/cwds-react-layout

# Install ILOFF Layout (with ILOFF apps integration)
npm install @ingka-group-digital/iloff-layout-react

# Install individual components
npm install @ingka-group-digital/cwds-react-header
npm install @ingka-group-digital/cwds-react-app-switcher
npm install @ingka-group-digital/cwds-react-mobile-navigation
npm install @ingka-group-digital/cwds-react-nav-menu
npm install @ingka-group-digital/cwds-react-user-profile
```

---

## Configuration

### 1. CSS Imports

Create a `cwds.css` file in your styles directory:

```css
/* Skapa Base Styles */
@import "@ingka/base/dist/style.css";
@import "@ingka/button/dist/style.css";
@import "@ingka/focus/dist/style.css";
@import "@ingka/modal/dist/style.css";
@import "@ingka/svg-icon/dist/style.css";
@import "@ingka/avatar/dist/style.css";
@import "@ingka/image/dist/style.css";
@import "@ingka/loading/dist/style.css";

/* CWDS Component Styles */
@import "@ingka-group-digital/cwds-react-layout/style.css";
@import "@ingka-group-digital/cwds-react-header/style.css";
@import "@ingka-group-digital/cwds-react-app-switcher/style.css";
@import "@ingka-group-digital/cwds-react-mobile-navigation/style.css";
@import "@ingka-group-digital/cwds-react-nav-menu/style.css";
@import "@ingka-group-digital/cwds-react-user-profile/style.css";

/* CWDS Shared Styles */
@import "@ingka-group-digital/cwds-react-shared-modal/style.css";
@import "@ingka-group-digital/cwds-react-shared-nav/style.css";
@import "@ingka-group-digital/cwds-react-shared-tabs/style.css";
@import "@ingka-group-digital/cwds-react-shared-app-symbol/style.css";
@import "@ingka-group-digital/cwds-variables/style.css";
```

### 2. Import Focus-Visible Polyfill

```javascript
// Add to your main entry file (e.g., App.tsx, _app.tsx)
import "focus-visible";
```

### 3. Authentication Setup (for ILOFF Layout)

#### Option A: Auth0

```typescript
import { Auth0Provider } from "@auth0/auth0-react";

<Auth0Provider
  domain={process.env.AUTH0_DOMAIN}
  clientId={process.env.AUTH0_CLIENT_ID}
  authorizationParams={{
    audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    redirect_uri: window.location.origin,
    scope: "openid profile email offline_access",
  }}
>
  {/* Your app */}
</Auth0Provider>;
```

#### Option B: Azure MSAL

```typescript
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: process.env.AZURE_AUTHORITY,
    redirectUri: window.location.origin,
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

<MsalProvider instance={msalInstance}>{/* Your app */}</MsalProvider>;
```

---

## Usage Examples

### Basic CWDS Layout

```typescript
import React, { FC, useCallback } from "react";
import {
  Layout as CWDSLayout,
  LayoutProps as CWDSLayoutProps,
} from "@ingka-group-digital/cwds-react-layout";
import { useRouter } from "next/router";

interface LayoutProps {
  accessibleApps: any[];
  children: React.ReactNode;
  user: any;
  logout: () => void;
}

export const Layout: FC<LayoutProps> = ({
  accessibleApps,
  children,
  user,
  logout,
}) => {
  const router = useRouter();

  const handleLocationChange = useCallback<
    NonNullable<CWDSLayoutProps["onRedirectChange"]>
  >(
    async (href, target, event) => {
      event.preventDefault();
      await router.push(href);
    },
    [router]
  );

  const handleSeeAllApps = useCallback<
    NonNullable<CWDSLayoutProps["onSeeAllAppsClick"]>
  >(
    async (event) => {
      event.preventDefault();
      await router.push("/apps");
    },
    [router]
  );

  const handleHomeClick = useCallback<
    NonNullable<CWDSLayoutProps["onHomeClick"]>
  >(
    async (event) => {
      event.preventDefault();
      await router.push("/");
    },
    [router]
  );

  return (
    <CWDSLayout
      narrowContent={true}
      accessibleApps={accessibleApps}
      headerNavMode={"HEADER_LINKS"}
      onRedirectChange={handleLocationChange}
      user={user}
      logoutCallback={logout}
      onSeeAllAppsClick={handleSeeAllApps}
      onHomeClick={handleHomeClick}
      isShowingBottomNav={false}
      isSeeAllAppsShown={true}
    >
      {children}
    </CWDSLayout>
  );
};
```

### ILOFF Layout with Auth0

```typescript
import React, { FC, useCallback } from "react";
import {
  IloffLayout,
  IloffLayoutProps,
} from "@ingka-group-digital/iloff-layout-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";

export const CoWorkerLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user, logout } = useAuth0();

  const handleLocationChange = useCallback<
    NonNullable<IloffLayoutProps["onRedirectChange"]>
  >(
    async (href, target, event) => {
      event.preventDefault();
      await router.push(href);
    },
    [router]
  );

  const handleSeeAllApps = useCallback<
    NonNullable<IloffLayoutProps["onSeeAllAppsClick"]>
  >(async (event) => {
    event.preventDefault();
    window.open("https://iloff.ingka.com", "_blank");
  }, []);

  const handleHomeClick = useCallback<
    NonNullable<IloffLayoutProps["onHomeClick"]>
  >(
    async (event) => {
      event.preventDefault();
      await router.push("/");
    },
    [router]
  );

  return (
    <IloffLayout
      narrowContent={true}
      headerNavMode={"HEADER_LINKS"}
      onRedirectChange={handleLocationChange}
      onSeeAllAppsClick={handleSeeAllApps}
      onHomeClick={handleHomeClick}
      isShowingBottomNav={false}
      isSeeAllAppsShown={true}
      envName={process.env.NODE_ENV === "production" ? "prod" : "test"}
      iloffBaseUrl={
        process.env.ILOFF_BASE_URL || "https://test.iloff.ingka.com"
      }
      isAuth0Used={true}
    >
      {children}
    </IloffLayout>
  );
};
```

### App Switcher

```typescript
import React, { FC, useState, useCallback } from "react";
import {
  AppSwitcherDrawer,
  AppSwitcherDrawerProps,
} from "@ingka-group-digital/cwds-react-app-switcher";

export const AppSwitcher: FC<{ accessibleApps: any[] }> = ({
  accessibleApps,
}) => {
  const [visible, setVisible] = useState(false);

  return (
    <AppSwitcherDrawer
      visible={visible}
      accessibleApps={accessibleApps}
      isSeeAllAppsShown={true}
      dir="ltr"
      appSwitcherLabels={{
        title: "Apps",
        goToHome: "Go to Home",
        seeAllApps: "See All Apps",
      }}
      onAppSwitcherClose={() => setVisible(false)}
    />
  );
};
```

### Mobile Navigation

```typescript
import React from "react";
import { MobileNavigation } from "@ingka-group-digital/cwds-react-mobile-navigation";
import { home, search, settings } from "@ingka/svg-icon";

export const BottomNav = () => {
  const navItems = [
    { id: "home", label: "Home", icon: home, href: "/" },
    { id: "search", label: "Search", icon: search, href: "/search" },
    { id: "settings", label: "Settings", icon: settings, href: "/settings" },
  ];

  return (
    <MobileNavigation
      navItems={navItems}
      dir="ltr"
      onTabActivate={(tabId) => console.log("Tab activated:", tabId)}
    />
  );
};
```

---

## Component Properties Reference

### CWDS Layout Props

| Property             | Type                       | Required | Default        | Description                          |
| -------------------- | -------------------------- | -------- | -------------- | ------------------------------------ |
| `narrowContent`      | boolean                    | No       | false          | Narrow content width (max 1200px)    |
| `accessibleApps`     | Array                      | Yes      | -              | List of apps user has access to      |
| `headerNavMode`      | 'HEADER_LINKS' \| 'DRAWER' | No       | 'HEADER_LINKS' | Navigation mode                      |
| `user`               | Object                     | Yes      | -              | User object with name, email, avatar |
| `logoutCallback`     | Function                   | Yes      | -              | Logout handler                       |
| `onRedirectChange`   | Function                   | No       | -              | Handle internal navigation           |
| `onSeeAllAppsClick`  | Function                   | No       | -              | Handle "See All Apps" click          |
| `onHomeClick`        | Function                   | No       | -              | Handle home click                    |
| `isShowingBottomNav` | boolean                    | No       | false          | Show mobile bottom navigation        |
| `isSeeAllAppsShown`  | boolean                    | No       | true           | Show "See All Apps" link             |

### ILOFF Layout Props

All CWDS Layout props plus:

| Property       | Type                      | Required | Default | Description                       |
| -------------- | ------------------------- | -------- | ------- | --------------------------------- |
| `envName`      | 'dev' \| 'test' \| 'prod' | Yes      | -       | Environment name                  |
| `iloffBaseUrl` | string                    | Yes      | -       | ILOFF base URL                    |
| `isAuth0Used`  | boolean                   | Yes      | -       | Use Auth0 (true) or Azure (false) |

### App Switcher Props

| Property             | Type           | Required | Default | Description         |
| -------------------- | -------------- | -------- | ------- | ------------------- |
| `visible`            | boolean        | Yes      | -       | Drawer visibility   |
| `accessibleApps`     | Array          | Yes      | -       | Apps to display     |
| `isSeeAllAppsShown`  | boolean        | No       | true    | Show "See All Apps" |
| `dir`                | 'ltr' \| 'rtl' | No       | 'ltr'   | Text direction      |
| `appSwitcherLabels`  | Object         | No       | -       | Localized labels    |
| `onAppSwitcherClose` | Function       | Yes      | -       | Close handler       |

---

## Accessibility

CWDS components follow WCAG 2.1 AA standards:

- ✅ Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- ✅ Screen reader support (ARIA labels, roles, live regions)
- ✅ Focus indicators (visible focus rings)
- ✅ Color contrast (4.5:1 minimum for text)
- ✅ Skip links (jump to main content)
- ✅ Semantic HTML (proper heading hierarchy)

### Keyboard Shortcuts

| Component       | Shortcut      | Action            |
| --------------- | ------------- | ----------------- |
| App Switcher    | `Escape`      | Close drawer      |
| Navigation Menu | `Escape`      | Close drawer      |
| User Profile    | `Escape`      | Close drawer      |
| Modal           | `Escape`      | Close modal       |
| All             | `Tab`         | Navigate forward  |
| All             | `Shift + Tab` | Navigate backward |

---

## Troubleshooting

### 1. Packages Not Installing

**Issue:** `npm install` fails for `@ingka-group-digital/*` packages

**Solutions:**

```bash
# Authenticate with GitHub
npm login --registry=https://npm.pkg.github.com

# Or configure .npmrc
echo "@ingka-group-digital:registry=https://npm.pkg.github.com" >> .npmrc

# Verify authentication
npm whoami --registry=https://npm.pkg.github.com
```

### 2. Styles Not Loading

**Issue:** Components render without styles

**Solutions:**

```javascript
// Ensure CSS imports are in correct order
import "@ingka/base/dist/style.css"; // Base FIRST
import "@ingka-group-digital/cwds-react-layout/style.css";
import "focus-visible"; // Focus polyfill AFTER styles
```

### 3. Auth0/Azure Not Working

**Issue:** ILOFF Layout authentication errors

**Solutions:**

- Verify environment variables are set
- Check redirect URIs match exactly
- Ensure Auth0/Azure provider wraps the app
- Check browser console for specific errors

### 4. Navigation Not Working

**Issue:** Links not navigating correctly

**Solutions:**

```typescript
// Provide proper navigation handlers
const handleLocationChange = async (href, target, event) => {
  event.preventDefault(); // IMPORTANT: Prevent default
  await router.push(href); // Use your router
};
```

---

## Best Practices

### 1. **Component Composition**

```typescript
// ✅ Good: Compose layouts hierarchically
<IloffLayout>
  <PageHeader />
  <MainContent>
    <PageContent />
  </MainContent>
  <PageFooter />
</IloffLayout>

// ❌ Bad: Mixing layout systems
<IloffLayout>
  <SkapaLayout> {/* Don't mix design systems */}
    <Content />
  </SkapaLayout>
</IloffLayout>
```

### 2. **Authentication**

```typescript
// ✅ Good: Single auth provider at root
<Auth0Provider {...config}>
  <IloffLayout>
    <App />
  </IloffLayout>
</Auth0Provider>

// ❌ Bad: Multiple auth providers
<Auth0Provider>
  <MsalProvider> {/* Don't nest auth providers */}
    <IloffLayout />
  </MsalProvider>
</Auth0Provider>
```

### 3. **Navigation Structure**

```typescript
// ✅ Good: Clear navigation hierarchy
const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    children: [
      { id: 'overview', label: 'Overview', href: '/dashboard/overview' },
      { id: 'analytics', label: 'Analytics', href: '/dashboard/analytics' },
    ]
  }
];

// ❌ Bad: Flat navigation with too many items
const navItems = [
  'Item1', 'Item2', 'Item3', ... // 20+ items
];
```

### 4. **Mobile Considerations**

- Use bottom navigation for 3-5 primary actions
- Hide complex navigation on mobile (use hamburger menu)
- Test on actual devices (not just browser DevTools)
- Ensure touch targets are at least 44x44 pixels

---

## Resources

### Official Documentation

- **Skapa Design System:** https://skapa.ikea.com
- **CWDS Subsystem:** https://skapa.ikea.com/subsystems/cwds
- **Component Library:** https://storybook.cwds.ingka.com

### Package Registries

- **Skapa (@ingka/\*):** https://registry.npmjs.org/
- **CWDS (@ingka-group-digital/\*):** https://npm.pkg.github.com

### Support

- **Slack:** #cwds-support
- **Email:** cwds-team@ingka.com
- **GitHub Issues:** https://github.com/ingka-group-digital/cwds/issues

---

## Appendix: Complete Component List

### Layout

- `cwds-react-layout` - Main layout wrapper
- `iloff-layout-react` - ILOFF-integrated layout

### Navigation

- `cwds-react-header` - Global header
- `cwds-react-app-switcher` - App switcher drawer
- `cwds-react-mobile-navigation` - Bottom navigation
- `cwds-react-nav-menu` - Navigation menu drawer

### User

- `cwds-react-user-profile` - User profile drawer

### Shared

- `cwds-variables` - CSS variables
- `cwds-react-shared-models` - TypeScript models
- `cwds-react-shared-modal` - Shared modal utilities
- `cwds-react-shared-nav` - Shared navigation utilities
- `cwds-react-shared-tabs` - Shared tabs utilities
- `cwds-react-shared-app-symbol` - App symbol components
- `cwds-layout-utils` - Layout utility functions
- `iloff-apps` - ILOFF apps integration

---

**Document Version:** 1.0.0
**Last Updated:** October 31, 2025
**Maintained by:** Ingvar Kit Team
