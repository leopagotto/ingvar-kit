# IKEA Ingka Design Guidelines

> **Comprehensive guide for building IKEA applications using Skapa and CWDS design systems**

---

## 📋 Table of Contents

- [Introduction](#introduction)
- [Design Systems Overview](#design-systems-overview)
- [Skapa Design System](#skapa-design-system)
- [CWDS (Co-Worker Design Subsystem)](#cwds-co-worker-design-subsystem)
- [Which System to Use?](#which-system-to-use)
- [Getting Started](#getting-started)
- [Design Principles](#design-principles)
- [Component Architecture](#component-architecture)
- [Implementation Guide](#implementation-guide)
- [Best Practices](#best-practices)
- [Resources](#resources)

---

## Introduction

IKEA Ingka builds digital products following a **design system-first approach** to ensure consistency, accessibility, and brand alignment across all applications. This guide explains how to leverage the two primary design systems:

- **Skapa Design System**: For customer-facing applications
- **CWDS (Co-Worker Design Subsystem)**: For internal co-worker tools

---

## Design Systems Overview

### What is a Design System?

A design system is a collection of reusable components, design tokens, patterns, and guidelines that ensure:

- ✅ **Consistency**: Same look and feel across all products
- ✅ **Efficiency**: Faster development with pre-built components
- ✅ **Accessibility**: WCAG 2.1 AA compliance built-in
- ✅ **Brand Alignment**: IKEA visual identity maintained
- ✅ **Quality**: Battle-tested, production-ready components

---

## 🎯 **CRITICAL: Understanding Component Systems**

Ingvar Kit provides **TWO COMPLEMENTARY component systems**. Understanding when to use each is essential:

### 1️⃣ **Official @ingka/\* Packages (66+ Components)**

**What they are:**

- ✅ Production-ready, compiled React components
- ✅ Published to IKEA's private npm registry
- ✅ Official IKEA Skapa design system implementation
- ✅ Automatically installed with `ingvar-kit`

**When to use:**

```tsx
// ✅ Use official packages for standard IKEA-compliant apps
import { Button } from "@ingka/button";
import { Card } from "@ingka/card";
import { Modal } from "@ingka/modal";

function ProductPage() {
  return (
    <Card>
      <Button variant="primary">Add to Cart</Button>
    </Card>
  );
}
```

**Characteristics:**

- 🔒 Pre-compiled (not editable)
- ✅ Production-tested by IKEA
- 🔄 Automatic updates via npm
- 🎯 Official IKEA support
- ⚠️ Limited customization (props only)

---

### 2️⃣ **Local TypeScript Templates (34 Components)**

**What they are:**

- 📝 Full source code templates in `templates/ingka-components/`
- 📚 Learning resources showing proper implementation
- 🎨 Customizable starting points you can copy and modify
- 📖 Educational examples of best practices

**When to use:**

```tsx
// ✅ Use templates when you need customization
// 1. Copy template to your project:
//    ingvar components add Button

// 2. Import YOUR customized version:
import { Button } from "./components/Button";

function CustomDashboard() {
  // You can modify this template to have:
  // - Custom colors, sizes, behaviors
  // - Additional variants
  // - Project-specific features
  return <Button variant="custom">My Custom Button</Button>;
}
```

**Characteristics:**

- ✏️ Full source code (100% editable)
- 🎨 Completely customizable
- 📖 Educational (shows implementation)
- 🛠️ Starting point for custom components
- 💡 Self-contained (no @ingka dependencies)

---

### 📊 **Decision Matrix: Which to Use?**

| Scenario                         | Use Official @ingka/\* | Use Local Templates |
| -------------------------------- | ---------------------- | ------------------- |
| Standard IKEA customer apps      | ✅ Yes                 | ❌ No               |
| Need guaranteed brand compliance | ✅ Yes                 | ❌ No               |
| Want automatic IKEA updates      | ✅ Yes                 | ❌ No               |
| Learning component patterns      | ⚠️ Maybe               | ✅ Yes              |
| Heavy customization needed       | ❌ No                  | ✅ Yes              |
| Internal tools (non-standard)    | ⚠️ Maybe               | ✅ Yes              |
| Prototyping new variants         | ❌ No                  | ✅ Yes              |
| Offline development              | ❌ No                  | ✅ Yes              |
| Building custom design system    | ❌ No                  | ✅ Yes              |

---

### 💡 **Hybrid Approach (Recommended)**

Most projects use **both** strategically:

```tsx
// Official packages for standard components
import { Card } from "@ingka/card";
import { Modal } from "@ingka/modal";
import { Icon } from "@ingka/icon";

// Custom templates for unique needs
import { CustomButton } from "./components/Button"; // Modified template
import { SpecialInput } from "./components/Input"; // Modified template

function App() {
  return (
    <Card>
      {" "}
      {/* Official - standard card */}
      <Modal>
        {" "}
        {/* Official - standard modal */}
        {/* Custom - modified for special features */}
        <CustomButton variant="special" customProp="unique-to-your-app">
          Custom Action
        </CustomButton>
      </Modal>
    </Card>
  );
}
```

**Key Rule:** Use official packages by default, customize templates only when necessary.

---

### 🔍 **Quick Reference**

**Official Packages Available:**

```bash
# View all installed @ingka packages
npm list --depth=0 | grep @ingka

# Example: 66+ components including:
# @ingka/button, @ingka/card, @ingka/modal, @ingka/input-field,
# @ingka/accordion, @ingka/carousel, @ingka/table, etc.
```

**Local Templates Available:**

```bash
# View all template components
ls templates/ingka-components/

# 34 components including:
# Button/, Card/, Modal/, Input/, Checkbox/, Select/, etc.
# Plus 800+ SVG icons in Icons/
```

**Installation Commands:**

```bash
# Official packages (already installed with ingvar-kit)
import { Button } from '@ingka/button'; // Ready to use!

# Templates (copy to your project)
ingvar components add Button  # Copies template to src/components/
```

---

### IKEA Ingka's Design Philosophy

1. **Democratic Design**: Form, function, quality, sustainability, and low price
2. **Human-Centered**: Focus on user needs and experiences
3. **Inclusive**: Accessible to all users, regardless of ability
4. **Consistent**: Unified experience across all touchpoints
5. **Scalable**: Systems that grow with the business

---

## Skapa Design System

### Overview

**Skapa** (Swedish for "create") is IKEA's design system for **customer-facing applications**.

**Use Skapa for:**

- E-commerce websites
- Customer mobile apps
- Public-facing web applications
- Self-service kiosks
- Customer portals

### Key Features

#### 1. **Visual Identity**

- IKEA brand colors (blue, yellow, white)
- IKEA Noto Sans typography
- Authentic IKEA look and feel
- Product imagery guidelines

#### 2. **Component Library**

- Buttons, forms, navigation
- Product cards and listings
- Shopping cart components
- Search and filters
- Modals and overlays

#### 3. **Design Tokens**

```json
{
  "colors": {
    "primary-blue": "#0058A3",
    "primary-yellow": "#FFDB00",
    "neutral-white": "#FFFFFF",
    "text-black": "#111111"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "typography": {
    "font-family": "IKEA Noto Sans, sans-serif",
    "sizes": {
      "body": "16px",
      "h1": "32px",
      "h2": "24px"
    }
  }
}
```

#### 4. **Responsive Design**

- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Touch-friendly (44x44px minimum)
- Progressive enhancement

#### 5. **Accessibility**

- WCAG 2.1 AA compliant
- Keyboard navigation
- Screen reader support
- Color contrast ratios
- Focus indicators

### Skapa Installation

```bash
# Using Ingvar Kit
ingvar components --system skapa

# Or manually
npm install @ikea/skapa-components
```

### Skapa Example

```typescript
import { Button, ProductCard, Navigation } from "@ikea/skapa-components";

function ProductPage() {
  return (
    <div>
      <Navigation logo="IKEA" />

      <ProductCard
        name="BILLY Bookcase"
        price="$79.99"
        image="/products/billy.jpg"
        rating={4.5}
        reviews={1234}
      />

      <Button variant="primary" size="lg">
        Add to Cart
      </Button>
    </div>
  );
}
```

---

## CWDS (Co-Worker Design Subsystem)

### Overview

**CWDS** is IKEA's design system for **internal co-worker applications**.

**Use CWDS for:**

- Internal dashboards
- Admin tools
- Inventory management systems
- HR and finance applications
- Co-worker portals
- Business intelligence tools

### Key Features

#### 1. **Professional Interface**

- Clean, functional design
- Focus on productivity
- Data-dense layouts
- Task-oriented workflows

#### 2. **Component Library**

- GlobalHeader: Company-wide navigation
- AppSwitcher: Navigate between internal apps
- NavigationMenu: Hierarchical navigation
- Profile: User account management
- BottomBarNavigation: Mobile navigation
- DataTables: Complex data display
- Forms: Data entry and validation
- Charts: Data visualization

#### 3. **Design Tokens**

```json
{
  "colors": {
    "primary": "#0058A3",
    "secondary": "#005FA3",
    "success": "#4CAF50",
    "warning": "#FFC107",
    "danger": "#F44336",
    "neutral-100": "#F5F5F5",
    "neutral-900": "#111111"
  },
  "spacing": {
    "unit": "8px",
    "compact": "4px",
    "comfortable": "12px"
  },
  "shadows": {
    "elevation-1": "0 2px 4px rgba(0,0,0,0.1)",
    "elevation-2": "0 4px 8px rgba(0,0,0,0.15)"
  }
}
```

#### 4. **Layout Patterns**

- **GlobalHeader**: Top navigation with branding
- **Sidebar Navigation**: Left-side menu for deep hierarchies
- **Content Area**: Main workspace
- **Bottom Bar**: Mobile-optimized navigation

#### 5. **Accessibility**

- WCAG 2.1 AA compliant
- Enterprise keyboard shortcuts
- Screen reader optimized
- High contrast mode support

### CWDS Installation

```bash
# Using Ingvar Kit
ingvar cwds install

# Or manually
npm install @ikea/cwds-components
```

### CWDS Example

```typescript
import {
  GlobalHeader,
  NavigationMenu,
  Profile,
  AppSwitcher,
} from "@ikea/cwds-components";

function AdminDashboard() {
  const apps = [
    { id: "inventory", name: "Inventory", icon: "warehouse" },
    { id: "hr", name: "HR Portal", icon: "people" },
    { id: "finance", name: "Finance", icon: "chart" },
  ];

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "home" },
    { id: "products", label: "Products", icon: "inventory" },
    { id: "orders", label: "Orders", icon: "shopping" },
    { id: "reports", label: "Reports", icon: "analytics" },
  ];

  return (
    <div>
      <GlobalHeader
        appName="Inventory Management"
        userName="John Doe"
        userRole="Store Manager"
      >
        <AppSwitcher apps={apps} currentApp="inventory" />
        <Profile
          userName="John Doe"
          userRole="Store Manager"
          onLogout={handleLogout}
        />
      </GlobalHeader>

      <NavigationMenu
        items={menuItems}
        activeItemId="dashboard"
        onItemClick={handleNavigation}
      />

      <main>{/* Your content here */}</main>
    </div>
  );
}
```

---

## Which System to Use?

### Decision Matrix

| Criteria            | Skapa                      | CWDS                            |
| ------------------- | -------------------------- | ------------------------------- |
| **Audience**        | Customers                  | Co-workers/Internal staff       |
| **Purpose**         | Shopping, browsing         | Work tasks, data management     |
| **Branding**        | Full IKEA brand experience | Professional, functional        |
| **Data Density**    | Product-focused, visual    | Data-dense, tables, forms       |
| **Mobile Priority** | Mobile-first, responsive   | Desktop-first, mobile-optimized |
| **Examples**        | IKEA.com, mobile app       | WMS, HR portal, admin tools     |

### Quick Decision Guide

**Choose Skapa if:**

- ✅ Building customer-facing features
- ✅ E-commerce or product browsing
- ✅ Public website or app
- ✅ Marketing or promotional content
- ✅ Customer self-service

**Choose CWDS if:**

- ✅ Building internal tools
- ✅ Admin dashboards
- ✅ Data management systems
- ✅ Business applications
- ✅ Co-worker workflows

---

## Getting Started

### Using Ingvar Kit (Recommended)

Ingvar Kit provides a streamlined workflow for IKEA application development:

#### 1. Initialize Project

```bash
# Install Ingvar Kit globally
npm install -g ingvar-kit

# Initialize in your project
cd your-project
ingvar init
```

#### 2. Generate Application with Design System

```bash
# Customer-facing app with Skapa
ingvar spark --design-system skapa --name my-customer-app

# Internal co-worker app with CWDS
ingvar spark --design-system cwds --name my-admin-tool
```

#### 3. Install Additional Components

```bash
# Skapa components
ingvar components --system skapa

# CWDS components
ingvar cwds install

# Specific CWDS component
ingvar cwds install GlobalHeader
```

### Manual Setup

#### For Skapa:

```bash
# Install dependencies
npm install @ikea/skapa-components react react-dom

# Import in your code
import '@ikea/skapa-components/dist/styles.css';
import { Button, ProductCard } from '@ikea/skapa-components';
```

#### For CWDS:

```bash
# Install dependencies
npm install @ikea/cwds-components react react-dom

# Import in your code
import '@ikea/cwds-components/dist/styles.css';
import { GlobalHeader, NavigationMenu } from '@ikea/cwds-components';
```

---

## Design Principles

### 1. **Consistency**

Maintain visual and functional consistency across all touchpoints:

- Use design system components as-is (don't customize unnecessarily)
- Follow spacing and typography scales
- Use approved color palettes
- Maintain consistent interaction patterns

### 2. **Accessibility**

Build inclusive experiences for all users:

- ✅ WCAG 2.1 AA compliance minimum
- ✅ Keyboard navigation support
- ✅ Screen reader compatibility
- ✅ Color contrast ratios (4.5:1 for text, 3:1 for UI)
- ✅ Touch targets (minimum 44x44px)
- ✅ Error messages and validation

### 3. **Performance**

Deliver fast, efficient experiences:

- ⚡ Lazy load components
- ⚡ Code splitting by route
- ⚡ Optimize images (WebP format)
- ⚡ Tree-shake unused components
- ⚡ Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### 4. **Responsive Design**

Design for all screen sizes:

```css
/* Mobile-first approach */
.component {
  padding: 16px; /* Mobile */
}

@media (min-width: 768px) {
  .component {
    padding: 24px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .component {
    padding: 32px; /* Desktop */
  }
}
```

### 5. **Progressive Enhancement**

Start with core functionality, enhance for modern browsers:

1. **Base**: HTML semantic structure
2. **Enhanced**: CSS styling and layout
3. **Interactive**: JavaScript functionality
4. **Advanced**: Modern features with fallbacks

---

## Component Architecture

### Atomic Design Methodology

Both Skapa and CWDS follow atomic design principles:

```
atoms/          # Basic elements (Button, Input, Icon)
├── Button.tsx
├── Input.tsx
└── Icon.tsx

molecules/      # Simple combinations (SearchBar, FormField)
├── SearchBar.tsx
└── FormField.tsx

organisms/      # Complex combinations (Header, DataTable)
├── GlobalHeader.tsx
├── NavigationMenu.tsx
└── DataTable.tsx

templates/      # Page layouts
├── DashboardLayout.tsx
└── ProductLayout.tsx

pages/          # Actual pages
├── Dashboard.tsx
└── ProductPage.tsx
```

### Component Structure Example

````typescript
// GlobalHeader.tsx (CWDS Component)

import React from "react";
import "./GlobalHeader.css";

export interface GlobalHeaderProps {
  /** Application name displayed in the header */
  appName: string;

  /** User name for profile display */
  userName: string;

  /** Optional user role */
  userRole?: string;

  /** Additional header actions */
  children?: React.ReactNode;

  /** Logo URL (optional) */
  logoUrl?: string;
}

/**
 * GlobalHeader - Top navigation for IKEA internal applications
 *
 * Provides consistent branding, navigation, and user profile access
 * across all IKEA co-worker applications.
 *
 * @example
 * ```tsx
 * <GlobalHeader
 *   appName="Inventory Management"
 *   userName="John Doe"
 *   userRole="Store Manager"
 * >
 *   <AppSwitcher apps={apps} />
 *   <Profile user={user} />
 * </GlobalHeader>
 * ```
 */
export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  appName,
  userName,
  userRole,
  children,
  logoUrl = "/ikea-logo.svg",
}) => {
  return (
    <header className="cwds-global-header" role="banner">
      <div className="cwds-global-header__logo">
        <img src={logoUrl} alt="IKEA" />
      </div>

      <div className="cwds-global-header__title">
        <h1>{appName}</h1>
      </div>

      <div className="cwds-global-header__actions">{children}</div>
    </header>
  );
};
````

---

## Implementation Guide

### Step-by-Step: Building a Customer App (Skapa)

#### 1. **Generate Project**

```bash
ingvar spark --design-system skapa --name my-store-app
cd my-store-app
```

#### 2. **Project Structure**

```
my-store-app/
├── src/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── ShoppingCart.tsx
│   │   └── Navigation.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ProductList.tsx
│   │   └── Checkout.tsx
│   ├── styles/
│   │   ├── theme.css
│   │   └── global.css
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
└── vite.config.ts
```

#### 3. **Implement Components**

```typescript
// src/pages/ProductList.tsx
import { ProductCard, Button, SearchBar } from "@ikea/skapa-components";
import { useState, useEffect } from "react";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch products from API
    fetchProducts().then(setProducts);
  }, []);

  return (
    <div className="product-list">
      <SearchBar
        placeholder="Search for products..."
        value={searchQuery}
        onChange={setSearchQuery}
      />

      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            rating={product.rating}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
```

### Step-by-Step: Building an Internal Tool (CWDS)

#### 1. **Generate Project**

```bash
ingvar spark --design-system cwds --name inventory-manager
cd inventory-manager
```

#### 2. **Project Structure**

```
inventory-manager/
├── src/
│   ├── components/
│   │   ├── InventoryTable.tsx
│   │   ├── ProductForm.tsx
│   │   └── StockChart.tsx
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── Products.tsx
│   │   └── Reports.tsx
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── vite.config.ts
```

#### 3. **Implement Layout**

```typescript
// src/layouts/DashboardLayout.tsx
import {
  GlobalHeader,
  NavigationMenu,
  Profile,
  AppSwitcher,
} from "@ikea/cwds-components";

export function DashboardLayout({ children }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "home", path: "/" },
    { id: "products", label: "Products", icon: "inventory", path: "/products" },
    { id: "stock", label: "Stock Levels", icon: "warehouse", path: "/stock" },
    { id: "reports", label: "Reports", icon: "analytics", path: "/reports" },
  ];

  return (
    <div className="dashboard-layout">
      <GlobalHeader
        appName="Inventory Management"
        userName="John Doe"
        userRole="Store Manager"
      >
        <AppSwitcher apps={availableApps} />
        <Profile user={currentUser} />
      </GlobalHeader>

      <div className="dashboard-layout__content">
        <NavigationMenu
          items={menuItems}
          activeItemId={currentRoute}
          onItemClick={handleNavigation}
        />

        <main className="dashboard-layout__main">{children}</main>
      </div>
    </div>
  );
}
```

---

## Best Practices

### 1. **Component Usage**

```typescript
// ✅ Good: Use design system components as-is
import { Button } from '@ikea/skapa-components';
<Button variant="primary">Add to Cart</Button>

// ❌ Bad: Creating custom styled buttons
<button className="my-custom-blue-button">Add to Cart</button>
```

### 2. **Theming**

```typescript
// ✅ Good: Use design tokens
const styles = {
  padding: "var(--spacing-md)",
  color: "var(--color-primary)",
  fontSize: "var(--font-size-body)",
};

// ❌ Bad: Hard-coded values
const styles = {
  padding: "16px",
  color: "#0058A3",
  fontSize: "16px",
};
```

### 3. **Responsive Design**

```typescript
// ✅ Good: Mobile-first responsive
<div className="container">
  <style>{`
    .container {
      padding: 16px; /* Mobile */
    }

    @media (min-width: 768px) {
      .container {
        padding: 24px; /* Tablet */
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding: 32px; /* Desktop */
      }
    }
  `}</style>
</div>

// ❌ Bad: Desktop-first
<div style={{ padding: '32px' }}> {/* Doesn't scale down */}
```

### 4. **Accessibility**

```typescript
// ✅ Good: Accessible form
<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-describedby="email-hint"
/>
<span id="email-hint">We'll never share your email</span>

// ❌ Bad: Non-accessible form
<input type="email" placeholder="Email" />
```

### 5. **Performance**

```typescript
// ✅ Good: Lazy loading
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));

<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>;

// ❌ Bad: Import everything upfront
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Reports from "./pages/Reports";
// All pages loaded immediately
```

---

## Resources

### Official Documentation

- **Skapa Design System**: [Internal Figma documentation]
- **CWDS Documentation**: [Internal CWDS portal]
- **Ingvar Kit**: [GitHub - leopagotto/ingvar-kit](https://github.com/leopagotto/ingvar-kit)

### Component Libraries

```bash
# Skapa
npm install @ikea/skapa-components

# CWDS
npm install @ikea/cwds-components
```

### Quick Reference

#### Skapa Components

- `Button`, `Input`, `Select`, `Checkbox`, `Radio`
- `ProductCard`, `PriceTag`, `Rating`
- `Navigation`, `Breadcrumb`, `Footer`
- `Modal`, `Toast`, `Tooltip`
- `SearchBar`, `Filters`, `Pagination`

#### CWDS Components

- `GlobalHeader`, `NavigationMenu`, `BottomBarNavigation`
- `AppSwitcher`, `Profile`
- `DataTable`, `DataGrid`, `TreeView`
- `Form`, `FormField`, `FormValidation`
- `Chart`, `Graph`, `Metrics`
- `Card`, `Panel`, `Accordion`

### Design Tokens

Both systems provide design tokens for:

- Colors (primary, secondary, semantic)
- Typography (fonts, sizes, weights)
- Spacing (margins, padding, gaps)
- Shadows (elevations)
- Border radius
- Transitions and animations

### Support

- **Internal Slack**: #ikea-design-systems
- **Email**: design-systems@ikea.com
- **Ingvar Kit Issues**: [GitHub Issues](https://github.com/leopagotto/ingvar-kit/issues)

---

## Summary

### Key Takeaways

1. **Use the right system**: Skapa for customers, CWDS for co-workers
2. **Component-first**: Use pre-built components, don't reinvent
3. **Accessibility**: WCAG 2.1 AA compliance is mandatory
4. **Performance**: Lazy load, code split, optimize images
5. **Consistency**: Follow design tokens and patterns
6. **Mobile-first**: Design for smallest screen, enhance upward
7. **Progressive enhancement**: Start with base, enhance progressively
8. **Ingvar Kit**: Use for streamlined development workflow

### Getting Help

When building IKEA applications:

1. **Check documentation first**: This guide and official docs
2. **Use Ingvar Kit**: Automated setup and component installation
3. **Follow design system**: Don't create custom components unnecessarily
4. **Ask for help**: Internal Slack channels and support
5. **Contribute back**: Share learnings with the community

---

**Built with ❤️ by IKEA Ingka**

_Last updated: November 2025_
