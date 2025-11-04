# 08 - CWDS Subsystem (Coworker Design System)

**Category:** Internal IKEA Applications  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Overview

**Purpose:** Design system for IKEA internal coworker applications (staff-facing tools).

**Key Difference:** Optimized for productivity, dense information, and frequent use by trained users.

**Audience:** IKEA employees, store staff, warehouse workers, corporate teams.

---

## 1. Ingka Global Header

### Overview
**Purpose:** Consistent top navigation across all coworker apps with branding, user profile, and global actions.

### Anatomy
```
┌──────────────────────────────────────────┐
│ [≡] INGKA │ App Name │ [🔔] [👤] John D │
└──────────────────────────────────────────┘
```

### Implementation
```jsx
<GlobalHeader>
  <GlobalHeader.MenuButton aria-label="Open navigation" />
  <GlobalHeader.Brand>INGKA</GlobalHeader.Brand>
  <GlobalHeader.AppName>Inventory Management</GlobalHeader.AppName>
  
  <GlobalHeader.Actions>
    <IconButton icon="notifications" badge={3} />
    <GlobalHeader.Profile
      name="John Doe"
      role="Store Manager"
      avatar="/avatar.jpg"
      onProfileClick={handleProfileClick}
      onSignOut={handleSignOut}
    />
  </GlobalHeader.Actions>
</GlobalHeader>
```

### Variants
- **Default:** Full header with all elements
- **Minimal:** Logo and user profile only (for focused tasks)

### Responsive Behavior
- **Desktop:** Full header with app name visible
- **Tablet:** App name may collapse to icon
- **Mobile:** Menu button, logo, profile only

---

## 2. Navigation Menu

### Overview
**Purpose:** Primary navigation for coworker apps with collapsible sections and deep hierarchies.

### Anatomy
```
┌─────────────────┐
│ [📊] Dashboard  │ ← Active
│ [📦] Inventory  │
│ [👥] Team       │
│                 │
│ MANAGEMENT      │ ← Section
│ [⚙️] Settings   │
│ [📄] Reports    │
│                 │
│ [←] Collapse    │ ← Toggle
└─────────────────┘
```

### Implementation
```jsx
<NavigationMenu collapsed={isCollapsed}>
  <NavigationMenu.Section>
    <NavigationMenu.Item
      icon="dashboard"
      label="Dashboard"
      href="/dashboard"
      active
    />
    <NavigationMenu.Item
      icon="inventory"
      label="Inventory"
      href="/inventory"
      badge={12}
    />
  </NavigationMenu.Section>
  
  <NavigationMenu.Section title="Management">
    <NavigationMenu.Item
      icon="users"
      label="Team"
      href="/team"
    />
    <NavigationMenu.Item
      icon="settings"
      label="Settings"
      href="/settings"
    />
  </NavigationMenu.Section>
  
  <NavigationMenu.CollapseButton />
</NavigationMenu>
```

### States
- **Expanded:** Full labels visible (240px width)
- **Collapsed:** Icons only (64px width)
- **Hover (Collapsed):** Tooltip shows label

### Collapsed State
```jsx
<NavigationMenu collapsed>
  {/* Shows only icons, expands on hover */}
</NavigationMenu>
```

**Width:**
- Expanded: 240px
- Collapsed: 64px

---

## 3. Bottom Bar Navigation (Mobile)

### Overview
**Purpose:** Mobile-optimized bottom navigation for coworker apps on tablets/phones.

### Anatomy
```
┌───────────────────────────────────────┐
│ [🏠] [��] [📋] [👤]                   │
│ Home  Scan  Tasks Profile             │
└───────────────────────────────────────┘
```

### Implementation
```jsx
<BottomBarNavigation>
  <BottomBarNavigation.Item
    icon="home"
    label="Home"
    href="/home"
    active
  />
  <BottomBarNavigation.Item
    icon="scan"
    label="Scan"
    href="/scan"
    badge={3}
  />
  <BottomBarNavigation.Item
    icon="tasks"
    label="Tasks"
    href="/tasks"
  />
  <BottomBarNavigation.Item
    icon="profile"
    label="Profile"
    href="/profile"
  />
</BottomBarNavigation>
```

### Guidelines
- **Max Items:** 3-5 for optimal usability
- **Active State:** Clear visual indicator
- **Labels:** Always show, don't hide on scroll
- **Badge:** Use for notifications/counts

---

## 4. App Switcher

### Overview
**Purpose:** Quick navigation between different coworker applications.

### Anatomy
```
Trigger: [⊞] App Switcher Icon

Menu:
┌──────────────────────────┐
│ Inventory Management  ✓  │ ← Active
│ Staff Scheduling         │
│ Sales Dashboard          │
│ Customer Service         │
└──────────────────────────┘
```

### Implementation
```jsx
<AppSwitcher>
  <AppSwitcher.Trigger>
    <IconButton icon="grid" aria-label="Switch application" />
  </AppSwitcher.Trigger>
  
  <AppSwitcher.Menu>
    <AppSwitcher.App
      name="Inventory Management"
      icon="inventory"
      href="/apps/inventory"
      active
    />
    <AppSwitcher.App
      name="Staff Scheduling"
      icon="calendar"
      href="/apps/scheduling"
    />
    <AppSwitcher.App
      name="Sales Dashboard"
      icon="chart"
      href="/apps/sales"
    />
    <AppSwitcher.App
      name="Customer Service"
      icon="headset"
      href="/apps/support"
    />
  </AppSwitcher.Menu>
</AppSwitcher>
```

### Usage Guidelines
- **Position:** Global header (top right)
- **Max Apps:** Show 8-10 most used apps
- **Grouping:** Can organize by category
- **Search:** Include search for 10+ apps

---

## 5. Profile Component

### Overview
**Purpose:** User profile display with role, department, and quick actions.

### Anatomy
```
┌────────────────────────────┐
│ [👤] John Doe              │
│      Store Manager         │
│      Stockholm Store #42   │
│ ────────────────────────── │
│ My Profile                 │
│ Settings                   │
│ ────────────────────────── │
│ Sign Out                   │
└────────────────────────────┘
```

### Implementation
```jsx
<Profile>
  <Profile.Avatar src="/avatar.jpg" alt="John Doe" size={48} />
  <Profile.Info>
    <Profile.Name>John Doe</Profile.Name>
    <Profile.Role>Store Manager</Profile.Role>
    <Profile.Department>Stockholm Store #42</Profile.Department>
  </Profile.Info>
  
  <Profile.Menu>
    <MenuItem href="/profile">My Profile</MenuItem>
    <MenuItem href="/settings">Settings</MenuItem>
    <MenuDivider />
    <MenuItem variant="danger" onClick={signOut}>
      Sign Out
    </MenuItem>
  </Profile.Menu>
</Profile>
```

### Profile Badge
```jsx
<Profile.Badge>
  <Avatar src="/avatar.jpg" size={32} />
  <Badge color="success" position="bottom-right" />
</Profile.Badge>
```

**Badge Colors:**
- Green: Available
- Yellow: Away
- Red: Busy
- Grey: Offline

---

## 6. CWDS Colors

### Color Palette

**Primary Colors:**
```javascript
const cwdsColors = {
  // Brand
  primary: '#0058A3',      // IKEA Blue
  secondary: '#FFDB00',    // IKEA Yellow
  
  // Status
  success: '#2E7D32',      // Green
  warning: '#F57C00',      // Orange
  error: '#C62828',        // Red
  info: '#0277BD',         // Blue
  
  // Neutrals (Coworker optimized)
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  
  // Background
  background: {
    default: '#FAFAFA',    // Light grey
    paper: '#FFFFFF',      // White
    elevated: '#FFFFFF',   // White with shadow
  },
  
  // Text
  text: {
    primary: '#212121',    // Dark grey
    secondary: '#757575',  // Medium grey
    disabled: '#BDBDBD',   // Light grey
    hint: '#9E9E9E',       // Very light grey
  }
};
```

### Usage
```jsx
<Box
  background="background.default"
  color="text.primary"
  borderColor="grey.300"
>
  {/* Content */}
</Box>
```

---

## 7. CWDS Layout Example

### Coworker Dashboard

```jsx
<CWDSPage>
  <GlobalHeader>
    <GlobalHeader.MenuButton />
    <GlobalHeader.Brand>INGKA</GlobalHeader.Brand>
    <GlobalHeader.AppName>Staff Dashboard</GlobalHeader.AppName>
    <GlobalHeader.Actions>
      <AppSwitcher />
      <IconButton icon="notifications" badge={3} />
      <Profile />
    </GlobalHeader.Actions>
  </GlobalHeader>
  
  <Flex>
    <NavigationMenu collapsed={isMenuCollapsed}>
      <NavigationMenu.Item icon="dashboard" label="Dashboard" active />
      <NavigationMenu.Item icon="tasks" label="Tasks" badge={5} />
      <NavigationMenu.Item icon="schedule" label="Schedule" />
      <NavigationMenu.Item icon="inventory" label="Inventory" />
      <NavigationMenu.Section title="Reports">
        <NavigationMenu.Item icon="chart" label="Sales" />
        <NavigationMenu.Item icon="users" label="Staff" />
      </NavigationMenu.Section>
    </NavigationMenu>
    
    <Main flex={1}>
      <Container maxWidth="xl" padding={24}>
        <Stack spacing={24}>
          <Flex justify="space-between" align="center">
            <Heading level={1}>Dashboard</Heading>
            <Button variant="primary">New Task</Button>
          </Flex>
          
          <Grid columns={{ xs: 1, sm: 2, lg: 4 }} gap={16}>
            <StatCard
              title="Today's Tasks"
              value={12}
              icon="tasks"
              trend={+8}
            />
            <StatCard
              title="Staff On Duty"
              value={24}
              icon="users"
            />
            <StatCard
              title="Pending Orders"
              value={156}
              icon="shopping-cart"
              trend={-12}
            />
            <StatCard
              title="Stock Alerts"
              value={3}
              icon="warning"
              variant="warning"
            />
          </Grid>
          
          <Grid container spacing={16}>
            <Grid item xs={12} lg={8}>
              <Card>
                <Card.Header>
                  <Card.Title>Recent Activities</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Time</Table.HeaderCell>
                        <Table.HeaderCell>Activity</Table.HeaderCell>
                        <Table.HeaderCell>User</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {activities.map(activity => (
                        <Table.Row key={activity.id}>
                          <Table.Cell>{activity.time}</Table.Cell>
                          <Table.Cell>{activity.name}</Table.Cell>
                          <Table.Cell>{activity.user}</Table.Cell>
                          <Table.Cell>
                            <Badge variant={activity.status}>
                              {activity.status}
                            </Badge>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Card.Body>
              </Card>
            </Grid>
            
            <Grid item xs={12} lg={4}>
              <Card>
                <Card.Header>
                  <Card.Title>Quick Actions</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Stack spacing={8}>
                    <Button variant="secondary" fullWidth icon="clock">
                      Clock In/Out
                    </Button>
                    <Button variant="secondary" fullWidth icon="alert">
                      Report Issue
                    </Button>
                    <Button variant="secondary" fullWidth icon="calendar">
                      View Schedule
                    </Button>
                    <Button variant="secondary" fullWidth icon="barcode">
                      Scan Item
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Main>
  </Flex>
  
  {/* Mobile Bottom Navigation */}
  <BottomBarNavigation>
    <BottomBarNavigation.Item icon="home" label="Home" active />
    <BottomBarNavigation.Item icon="tasks" label="Tasks" badge={5} />
    <BottomBarNavigation.Item icon="scan" label="Scan" />
    <BottomBarNavigation.Item icon="profile" label="Profile" />
  </BottomBarNavigation>
</CWDSPage>
```

---

## Summary

### CWDS Components

| Component | Use Case | Coworker-Specific |
|-----------|----------|-------------------|
| **Global Header** | App branding, navigation | ✅ Yes |
| **Navigation Menu** | Primary navigation | ✅ Yes |
| **Bottom Bar** | Mobile navigation | ✅ Yes |
| **App Switcher** | Switch between apps | ✅ Yes |
| **Profile** | User info, actions | ✅ Yes |
| **CWDS Colors** | Consistent theming | ✅ Yes |

---

## Key Differences: Skapa vs. CWDS

| Aspect | Skapa (Customer) | CWDS (Coworker) |
|--------|------------------|-----------------|
| **Audience** | Customers | Staff members |
| **Density** | Spacious, breathable | Compact, information-dense |
| **Navigation** | Simple, guided | Complex, multi-level |
| **Typography** | Large, readable | Smaller, efficient |
| **Colors** | Warm, inviting | Professional, neutral |
| **Interactions** | Touch-optimized | Keyboard-optimized |
| **Learning Curve** | None expected | Training assumed |
| **Task Frequency** | Occasional | Daily, repetitive |
| **Information Density** | Low (focus on conversion) | High (maximize productivity) |

---

## Usage Guidelines

### ✅ DO:
- Use CWDS for internal staff applications
- Optimize for keyboard navigation
- Show more information per screen
- Support power-user features (shortcuts, batch actions)
- Design for desktop-first (though responsive)
- Include detailed status indicators
- Use badges for notifications and counts

### ❌ DON'T:
- Use CWDS components for customer-facing apps
- Prioritize aesthetics over functionality
- Hide important information for "cleaner" design
- Assume users need onboarding every time
- Limit keyboard shortcuts
- Over-simplify complex workflows

---

## Accessibility

**CWDS maintains WCAG 2.1 AA compliance:**
- Keyboard navigation (Tab, Arrow keys, shortcuts)
- Screen reader support
- Focus indicators (visible on all elements)
- Color contrast (4.5:1 for text)
- Resizable text (up to 200%)

**Additional CWDS Requirements:**
- Keyboard shortcuts for common actions
- Batch operations support
- Quick search/filter capabilities
- Status persistence (remember view preferences)

---

**Congratulations!** You've completed the full Skapa Design System documentation, including the CWDS subsystem for internal applications.

**Previous:** [07-LAYOUT-PATTERNS.md](./07-LAYOUT-PATTERNS.md) - Layout Patterns

**Back to:** [README.md](./README.md) - Documentation Index
