# 07 - Layout Patterns & CWDS Subsystem

**Category:** Layout Patterns, Coworker Design System  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Part A: Layout Patterns

### Overview

Layout patterns provide responsive, accessible page structures using Skapa's grid system and spacing tokens. These patterns ensure consistent visual hierarchy across breakpoints.

---

### 1. Grid System

#### 12-Column Responsive Grid

**Breakpoints:**
```javascript
const breakpoints = {
  xs: 0,      // Mobile portrait
  sm: 600,    // Mobile landscape / Small tablet
  md: 900,    // Tablet
  lg: 1200,   // Desktop
  xl: 1440,   // Large desktop
  xxl: 1920   // Extra large desktop
};
```

#### Grid Container
```jsx
<Container maxWidth="lg" padding={24}>
  {/* Content constrained to max-width */}
</Container>
```

**Max Widths:**
- `sm`: 600px
- `md`: 900px
- `lg`: 1200px
- `xl`: 1440px
- `full`: 100%

#### Grid Layout
```jsx
<Grid container spacing={16}>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <ProductCard />
  </Grid>
  <Grid item xs={12} sm={6} md={4} lg={3}>
    <ProductCard />
  </Grid>
  {/* Repeat for more items */}
</Grid>
```

**Responsive Columns:**
```jsx
// 1 column mobile, 2 tablet, 3 desktop, 4 large
<Grid
  columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
  gap={16}
>
  {items.map(item => (
    <Grid.Item key={item.id}>
      <Card {...item} />
    </Grid.Item>
  ))}
</Grid>
```

---

### 2. Page Layouts

#### Single Column Layout
**Use:** Content-heavy pages, articles, forms

```jsx
<Page>
  <AppBar />
  <Container maxWidth="md">
    <Stack spacing={32}>
      <Hero />
      <Content />
      <Sidebar />
    </Stack>
  </Container>
  <Footer />
</Page>
```

#### Two-Column Layout
**Use:** Content + sidebar, product listings with filters

```jsx
<Page>
  <AppBar />
  <Container maxWidth="xl">
    <Grid container spacing={24}>
      <Grid item xs={12} md={3}>
        <Sidebar>
          <FilterPanel />
        </Sidebar>
      </Grid>
      <Grid item xs={12} md={9}>
        <Main>
          <ProductGrid />
        </Main>
      </Grid>
    </Grid>
  </Container>
  <Footer />
</Page>
```

#### Three-Column Layout
**Use:** Dashboards, complex data displays

```jsx
<Container maxWidth="xl">
  <Grid container spacing={16}>
    <Grid item xs={12} lg={3}>
      <LeftSidebar />
    </Grid>
    <Grid item xs={12} lg={6}>
      <MainContent />
    </Grid>
    <Grid item xs={12} lg={3}>
      <RightSidebar />
    </Grid>
  </Grid>
</Container>
```

---

### 3. Common Page Templates

#### Product Listing Page

```jsx
<Page>
  <AppBar>
    <AppBar.Logo />
    <AppBar.Search />
    <AppBar.Cart />
  </AppBar>
  
  <Container maxWidth="xl">
    <Breadcrumbs>
      <Breadcrumb href="/">Home</Breadcrumb>
      <Breadcrumb href="/products">Products</Breadcrumb>
      <Breadcrumb current>Living Room</Breadcrumb>
    </Breadcrumbs>
    
    <Grid container spacing={24}>
      {/* Filters Sidebar */}
      <Grid item xs={12} md={3}>
        <Card>
          <Card.Header>
            <Card.Title>Filters</Card.Title>
          </Card.Header>
          <Card.Body>
            <FilterGroup>
              <Accordion>
                <Accordion.Item value="category">
                  <Accordion.Header>Category</Accordion.Header>
                  <Accordion.Content>
                    <CheckboxGroup>
                      <Checkbox>Sofas</Checkbox>
                      <Checkbox>Tables</Checkbox>
                      <Checkbox>Chairs</Checkbox>
                    </CheckboxGroup>
                  </Accordion.Content>
                </Accordion.Item>
                
                <Accordion.Item value="price">
                  <Accordion.Header>Price Range</Accordion.Header>
                  <Accordion.Content>
                    <Slider
                      min={0}
                      max={1000}
                      value={priceRange}
                      onChange={setPriceRange}
                    />
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            </FilterGroup>
          </Card.Body>
        </Card>
      </Grid>
      
      {/* Product Grid */}
      <Grid item xs={12} md={9}>
        <Stack spacing={16}>
          <Flex justify="space-between" align="center">
            <Text>Showing 24 of 156 products</Text>
            <SegmentedControl value={view}>
              <Button value="grid">Grid</Button>
              <Button value="list">List</Button>
            </SegmentedControl>
          </Flex>
          
          <Grid columns={{ xs: 2, sm: 3, lg: 4 }} gap={16}>
            {products.map(product => (
              <CompactCard key={product.id} variant="product">
                <CompactCard.Image
                  src={product.image}
                  aspectRatio="1:1"
                />
                <CompactCard.Title>{product.name}</CompactCard.Title>
                <CompactCard.Price>{product.price}</CompactCard.Price>
              </CompactCard>
            ))}
          </Grid>
        </Stack>
      </Grid>
    </Grid>
  </Container>
  
  <Footer />
</Page>
```

#### Product Detail Page

```jsx
<Page>
  <AppBar />
  
  <Container maxWidth="lg">
    <Breadcrumbs />
    
    <Grid container spacing={32}>
      {/* Product Images */}
      <Grid item xs={12} md={6}>
        <Carousel>
          {product.images.map((img, i) => (
            <Carousel.Item key={i}>
              <Image src={img} aspectRatio="1:1" />
            </Carousel.Item>
          ))}
        </Carousel>
      </Grid>
      
      {/* Product Info */}
      <Grid item xs={12} md={6}>
        <Stack spacing={24}>
          <div>
            <Text size="small" color="secondary">
              {product.category}
            </Text>
            <Heading level={1}>{product.name}</Heading>
            <ProductIdentifier>
              {product.articleNumber}
            </ProductIdentifier>
          </div>
          
          <Rating value={product.rating} count={product.reviews} />
          
          <PriceModule>
            <Price value={product.price} size="large" />
            <Price.Family value={product.familyPrice} />
          </PriceModule>
          
          <Stack spacing={12}>
            <Select
              label="Color"
              value={selectedColor}
              onChange={setSelectedColor}
            >
              {product.colors.map(color => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </Select>
            
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={product.stock}
            />
          </Stack>
          
          <Button
            variant="primary"
            size="large"
            fullWidth
            onClick={addToCart}
          >
            Add to cart
          </Button>
          
          <Accordion>
            <Accordion.Item value="details">
              <Accordion.Header>Product Details</Accordion.Header>
              <Accordion.Content>
                {product.details}
              </Accordion.Content>
            </Accordion.Item>
            
            <Accordion.Item value="delivery">
              <Accordion.Header>Delivery & Assembly</Accordion.Header>
              <Accordion.Content>
                {product.deliveryInfo}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>
        </Stack>
      </Grid>
    </Grid>
  </Container>
  
  <Footer />
</Page>
```

#### Checkout Page

```jsx
<Page>
  <AppBar minimal />
  
  <Container maxWidth="lg">
    <Heading level={1}>Checkout</Heading>
    
    <Grid container spacing={32}>
      {/* Checkout Form */}
      <Grid item xs={12} md={7}>
        <Stack spacing={32}>
          <Card>
            <Card.Header>
              <Card.Title>1. Delivery Information</Card.Title>
            </Card.Header>
            <Card.Body>
              <FormField>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </FormField>
              
              <FormField>
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </FormField>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <Card.Title>2. Payment Method</Card.Title>
            </Card.Header>
            <Card.Body>
              <RadioGroup>
                <Radio value="card">Credit Card</Radio>
                <Radio value="paypal">PayPal</Radio>
                <Radio value="invoice">Invoice</Radio>
              </RadioGroup>
            </Card.Body>
          </Card>
        </Stack>
      </Grid>
      
      {/* Order Summary */}
      <Grid item xs={12} md={5}>
        <Card sticky top={80}>
          <Card.Header>
            <Card.Title>Order Summary</Card.Title>
          </Card.Header>
          <Card.Body>
            <Stack spacing={16}>
              {cartItems.map(item => (
                <Flex key={item.id} justify="space-between">
                  <Text>{item.name} × {item.quantity}</Text>
                  <Price value={item.total} />
                </Flex>
              ))}
              
              <Divider />
              
              <Flex justify="space-between">
                <Text weight="bold">Total</Text>
                <Price value={total} size="large" weight="bold" />
              </Flex>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" size="large" fullWidth>
              Place Order
            </Button>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Page>
```

---

### 4. Responsive Patterns

#### Mobile-First Breakpoints

```jsx
// Stack on mobile, side-by-side on tablet+
<Stack spacing={16} direction={{ xs: 'column', md: 'row' }}>
  <Box flex={1}>Content 1</Box>
  <Box flex={1}>Content 2</Box>
</Stack>

// Hide on mobile, show on desktop
<Box display={{ xs: 'none', md: 'block' }}>
  Desktop only content
</Box>

// Show on mobile, hide on desktop
<Box display={{ xs: 'block', md: 'none' }}>
  Mobile only content
</Box>
```

---

## Part B: CWDS Subsystem (Coworker Design System)

### Overview

**Purpose:** Design system for IKEA internal coworker applications (staff-facing tools).

**Key Difference:** Optimized for productivity, dense information, and frequent use by trained users.

---

### 1. Ingka Global Header

#### Overview
**Purpose:** Consistent top navigation across all coworker apps with branding, user profile, and global actions.

#### Anatomy
```
┌──────────────────────────────────────────┐
│ [≡] INGKA │ App Name │ [🔔] [👤] John D │
└──────────────────────────────────────────┘
```

#### Implementation
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

---

### 2. Navigation Menu

#### Overview
**Purpose:** Primary navigation for coworker apps with collapsible sections and deep hierarchies.

#### Implementation
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

#### Collapsed State
```jsx
<NavigationMenu collapsed>
  {/* Shows only icons, expands on hover */}
</NavigationMenu>
```

---

### 3. Bottom Bar Navigation (Mobile)

#### Overview
**Purpose:** Mobile-optimized bottom navigation for coworker apps on tablets/phones.

#### Implementation
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

**Max Items:** 3-5 for optimal usability

---

### 4. App Switcher

#### Overview
**Purpose:** Quick navigation between different coworker applications.

#### Implementation
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

---

### 5. Profile Component

#### Overview
**Purpose:** User profile display with role, department, and quick actions.

#### Implementation
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

---

### 6. CWDS Colors

#### Color Palette

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

**Usage:**
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

### 7. CWDS Layout Example

#### Coworker Dashboard

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
                    {/* Activity log */}
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
                    <Button variant="secondary" fullWidth>
                      Clock In/Out
                    </Button>
                    <Button variant="secondary" fullWidth>
                      Report Issue
                    </Button>
                    <Button variant="secondary" fullWidth>
                      View Schedule
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

### Layout System

| Pattern | Use Case | Complexity | Responsive |
|---------|----------|------------|------------|
| **Single Column** | Content pages, forms | Low | ✅ Yes |
| **Two Column** | Listing + filters | Medium | ✅ Yes |
| **Three Column** | Dashboards, complex data | High | ✅ Yes |
| **Grid** | Product listings, cards | Medium | ✅ Yes |

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

---

**Congratulations!** You've completed the Skapa Design System documentation for AI agents.

**Previous:** [06-NAVIGATION-AND-SPECIALTY.md](./06-NAVIGATION-AND-SPECIALTY.md) - Navigation, Media, Commerce

**Back to:** [README.md](./README.md) - Documentation Index
