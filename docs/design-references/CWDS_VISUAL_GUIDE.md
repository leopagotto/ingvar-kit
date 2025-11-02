# CWDS Visual Reference Guide

**IKEA Co-Worker Design System (CWDS) Component Gallery**

This guide provides visual references and usage examples for CWDS components. Use this to validate your implementations and understand component behavior.

---

## 📐 Layout Components

### CWDS Layout

**Purpose:** Main layout wrapper for co-worker applications with header, navigation, and content areas.

**Visual Structure:**

```
┌─────────────────────────────────────────────────────────┐
│  [IKEA Logo]  App Name        [App Switcher] [Profile] │ ← Header
├─────────────────────────────────────────────────────────┤
│ ┌──────────┬────────────────────────────────────────┐  │
│ │ 🏠 Home  │                                        │  │
│ │ 📊 Stats │         Main Content Area             │  │
│ │ ⚙️ Setup │                                        │  │
│ │          │                                        │  │
│ └──────────┴────────────────────────────────────────┘  │
│    ↑ Navigation                  ↑ Content              │
└─────────────────────────────────────────────────────────┘
```

**Key Features:**

- Sticky header with IKEA branding
- Collapsible side navigation
- Responsive content area
- Mobile-friendly hamburger menu

**Example Implementation:**

```jsx
import { Layout } from "@ingka-group-digital/cwds-react-layout";

function App() {
  return (
    <Layout
      appName="Order Management"
      userName="John Doe"
      userEmail="john.doe@ingka.com"
      navigation={[
        { label: "Home", icon: "home", path: "/" },
        { label: "Orders", icon: "list", path: "/orders" },
        { label: "Settings", icon: "settings", path: "/settings" },
      ]}
    >
      <YourAppContent />
    </Layout>
  );
}
```

---

### ILOFF Layout

**Purpose:** Enhanced CWDS Layout with ILOFF (IKEA Logistic Office) app integration and enterprise features.

**Visual Structure:**

```
┌─────────────────────────────────────────────────────────┐
│  [IKEA Logo]  App Name    [ILOFF Apps ▼] [User ▼]     │
├─────────────────────────────────────────────────────────┤
│ ┌──────────┬────────────────────────────────────────┐  │
│ │          │  ┌──────────────────────────────┐     │  │
│ │ Nav 1    │  │                              │     │  │
│ │ Nav 2    │  │    Enterprise Content        │     │  │
│ │ Nav 3    │  │    with Data Tables          │     │  │
│ │          │  │    and Business Logic        │     │  │
│ │          │  └──────────────────────────────┘     │  │
│ └──────────┴────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Key Features:**

- ILOFF app switcher integration
- SSO authentication (Auth0 or Azure MSAL)
- Enterprise-grade security
- Multi-tenant support

**Example Implementation:**

```jsx
import { IloffLayout } from "@ingka-group-digital/iloff-layout-react";

function App() {
  return (
    <IloffLayout
      appName="Warehouse Manager"
      appCode="WM"
      authProvider="azure" // or "auth0"
      navigation={navItems}
    >
      <YourEnterpriseContent />
    </IloffLayout>
  );
}
```

---

## 🧭 Navigation Components

### Global Header

**Purpose:** Standard co-worker application header with IKEA branding and user controls.

**Visual Appearance:**

```
┌─────────────────────────────────────────────────────────┐
│ [🔵 IKEA]  Application Name        [🎯 Apps] [👤 User] │
│                                                         │
└─────────────────────────────────────────────────────────┘
  ← Blue #003D82 (CWDS brand color)
```

**Elements:**

- **IKEA Logo:** Blue circle with white IKEA text
- **App Name:** Bold, truncated if too long
- **App Switcher:** Grid icon, opens app directory
- **User Profile:** Avatar with dropdown menu

**States:**

- **Normal:** Blue background, white text
- **Hover:** Slightly lighter blue
- **Active:** Highlighted item with darker shade

---

### App Switcher

**Purpose:** Navigate between different IKEA co-worker applications.

**Visual Appearance:**

```
┌───────────────────────────────┐
│  Co-worker Applications       │
├───────────────────────────────┤
│ [📦] Order Management         │
│ [🏬] Store Tools              │
│ [📊] Analytics Dashboard      │
│ [⚙️] Admin Panel              │
├───────────────────────────────┤
│ View All Apps →               │
└───────────────────────────────┘
```

**Behavior:**

- Opens on click of grid icon
- Shows recently used apps
- Search functionality
- Quick access to favorites

---

### Navigation Menu

**Purpose:** Sidebar navigation for application sections.

**Visual Appearance:**

```
┌──────────────────┐
│ 🏠 Dashboard     │ ← Active (highlighted)
│ 📋 Orders        │
│ 📦 Products      │
│ 👥 Customers     │
│ ──────────────   │
│ ⚙️ Settings      │
│ ❓ Help          │
└──────────────────┘
```

**Features:**

- Icons with labels
- Active state highlighting
- Collapsible sections
- Badge counts (e.g., "5 new")

---

### User Profile

**Purpose:** Display user information and access account settings.

**Visual Appearance:**

```
┌──────────────────────────┐
│ [👤] John Doe            │
│      john.doe@ingka.com  │
├──────────────────────────┤
│ 👤 My Profile            │
│ ⚙️ Settings              │
│ 🌐 Language: English     │
│ 🎨 Theme: Light          │
├──────────────────────────┤
│ 🚪 Sign Out              │
└──────────────────────────┘
```

**Information Shown:**

- User full name
- Email address
- Profile picture (if available)
- Quick settings

---

### Mobile Navigation

**Purpose:** Responsive navigation for mobile/tablet devices.

**Visual Appearance:**

```
Mobile (< 768px):
┌─────────────────────────────┐
│ [☰]  App Name     [👤]     │ ← Hamburger menu
└─────────────────────────────┘

When menu opened:
┌─────────────────────────────┐
│ [✕]  Menu                   │
├─────────────────────────────┤
│ 🏠 Home                     │
│ 📊 Dashboard                │
│ ⚙️ Settings                 │
├─────────────────────────────┤
│ [🎯 Apps]  [👤 Profile]    │
└─────────────────────────────┘
```

---

## 🎨 Design Tokens

### Colors (CWDS Internal)

**Primary:**

- **CWDS Blue:** `#003D82` (darker than customer-facing `#0058A3`)
- **IKEA Yellow:** `#FFDB00`

**Neutrals:**

- **Text Primary:** `#111111`
- **Text Secondary:** `#484848`
- **Background:** `#FFFFFF`
- **Border:** `#DFDFDF`

**Semantic:**

- **Success:** `#007A3D` (green)
- **Warning:** `#FFA000` (orange)
- **Error:** `#D32F2F` (red)
- **Info:** `#0058A3` (blue)

### Typography

**Font Family:** Noto IKEA (fallback: system fonts)

**Sizes:**

```
Heading 1: 32px / 2rem
Heading 2: 24px / 1.5rem
Heading 3: 20px / 1.25rem
Body:      16px / 1rem
Small:     14px / 0.875rem
```

### Spacing

**System:** 8px base unit

```
XS:  4px  (0.25rem)
S:   8px  (0.5rem)
M:   16px (1rem)
L:   24px (1.5rem)
XL:  32px (2rem)
XXL: 48px (3rem)
```

---

## ✅ Component Checklist

Use this checklist to verify your CWDS implementation:

### Layout ✓

- [ ] Header displays IKEA logo correctly
- [ ] App name is visible and truncated appropriately
- [ ] Navigation menu is collapsible
- [ ] Content area is scrollable independently
- [ ] Mobile breakpoint activates hamburger menu (< 768px)
- [ ] Footer (if used) stays at bottom

### Navigation ✓

- [ ] Active navigation item is highlighted
- [ ] Icons match IKEA Skapa icon set
- [ ] Hover states work on all interactive elements
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Focus indicators are visible

### User Profile ✓

- [ ] User name displays correctly
- [ ] Email shows full address
- [ ] Avatar/initials render properly
- [ ] Dropdown menu opens/closes smoothly
- [ ] Sign out button is clearly labeled

### Accessibility ✓

- [ ] All interactive elements have proper ARIA labels
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces page changes
- [ ] Focus is managed correctly in modals

---

## 🎯 Common Patterns

### Pattern 1: Dashboard Layout

```jsx
<Layout appName="Dashboard">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card>Metric 1</Card>
    <Card>Metric 2</Card>
    <Card>Metric 3</Card>
  </div>
</Layout>
```

**Visual:**

```
┌─────────────────────────────────────┐
│  Dashboard                          │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐           │
│ │ 📊  │ │ 📈  │ │ 📉  │           │
│ │ 123 │ │ 456 │ │ 789 │           │
│ └─────┘ └─────┘ └─────┘           │
└─────────────────────────────────────┘
```

---

### Pattern 2: List View

```jsx
<Layout appName="Orders">
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Order #</TableCell>
        <TableCell>Customer</TableCell>
        <TableCell>Status</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {orders.map((order) => (
        <TableRow key={order.id}>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.customer}</TableCell>
          <TableCell>{order.status}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</Layout>
```

**Visual:**

```
┌──────────────────────────────────────┐
│  Orders                              │
├──────────────────────────────────────┤
│ Order #  Customer      Status        │
├──────────────────────────────────────┤
│ #12345   John Doe      ✓ Completed  │
│ #12346   Jane Smith    ⏳ Pending   │
│ #12347   Bob Johnson   📦 Shipped   │
└──────────────────────────────────────┘
```

---

### Pattern 3: Form Layout

```jsx
<Layout appName="Settings">
  <Form>
    <FormSection title="Account Settings">
      <Input label="Name" value={name} />
      <Input label="Email" value={email} />
      <Select label="Language" options={langs} />
    </FormSection>
    <Button type="submit">Save Changes</Button>
  </Form>
</Layout>
```

**Visual:**

```
┌──────────────────────────────────────┐
│  Settings                            │
├──────────────────────────────────────┤
│ Account Settings                     │
│                                      │
│ Name:  [John Doe          ]         │
│ Email: [john.doe@ingka.com]         │
│ Lang:  [English ▼         ]         │
│                                      │
│        [Save Changes]                │
└──────────────────────────────────────┘
```

---

## 📸 Screenshots

> **Note:** Actual screenshots would be included here in production.
> For now, ASCII diagrams provide structural reference.

To add screenshots to this guide:

1. Deploy a CWDS app locally
2. Take screenshots of each component
3. Place in `docs/design-references/images/`
4. Update this file with image references

---

## 🔍 Visual Debugging Tips

### Issue: Header Not Sticky

```css
/* Verify this CSS is applied */
.cwds-header {
  position: sticky;
  top: 0;
  z-index: 1000;
}
```

### Issue: Navigation Overlapping Content

```css
/* Ensure proper layout structure */
.cwds-layout {
  display: flex;
  min-height: 100vh;
}
.cwds-nav {
  flex-shrink: 0;
  width: 240px;
}
.cwds-content {
  flex-grow: 1;
  overflow: auto;
}
```

### Issue: Colors Don't Match

**Check:** Are you using CWDS colors (`#003D82`) or Ingka colors (`#0058A3`)?
**Solution:** CWDS = internal tools, Ingka = customer-facing

---

## 🛠️ Development Tools

### Browser DevTools

- **Inspect Element:** Check applied CSS classes
- **Network Tab:** Verify component assets load
- **Console:** Look for React warnings

### Recommended Extensions

- **React Developer Tools:** Inspect component props
- **Axe DevTools:** Accessibility testing
- **ColorZilla:** Verify color values

---

## 📚 Additional Resources

- **CWDS Storybook:** [Internal IKEA Link]
- **Figma Designs:** [Internal IKEA Link]
- **Component Props:** See individual package README files
- **Support:** Microsoft Teams → "CWDS Support" channel

---

## ✨ Best Practices

1. **Always use CWDS Layout** - Don't build custom headers
2. **Follow IKEA Accessibility Guidelines** - WCAG 2.1 AA minimum
3. **Use Noto IKEA font** - Available via CWDS packages
4. **Test on mobile** - At least iPhone SE and iPad sizes
5. **Validate colors** - Use official CWDS tokens only
6. **Keep navigation shallow** - Max 2 levels deep
7. **Provide loading states** - Users should see progress
8. **Handle errors gracefully** - Show clear error messages

---

**Last Updated:** November 1, 2025
**Ingvar Kit Version:** 6.2.0+
**CWDS Version:** See individual package versions
