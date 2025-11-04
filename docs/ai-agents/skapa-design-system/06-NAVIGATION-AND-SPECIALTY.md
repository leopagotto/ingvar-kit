# 06 - Navigation & Specialty Components

**Category:** Navigation, Media, Commerce  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Part A: Navigation Components

### 1. Tabs

#### Overview
**Purpose:** Groups and allows navigation between related content at same hierarchy level without leaving page.

**Platforms:** Figma, React, Vue, Web Components, Android, iOS

**Last Updated:** 2025-07-24

#### Anatomy
```
┌────────────────────────────────────┐
│ Title                       ──────│
│ Tab bar                            │
│ [Delivery] Payment Returns  ────> │
│  ─────────                         │
│    │ Track (selector)              │
│                                    │
│ Content ─────────────────────────  │
│ (Changes based on selected tab)    │
└────────────────────────────────────┘
```

#### Variants

**Text Tabs:**
```jsx
<Tabs defaultValue="delivery">
  <Tabs.List>
    <Tabs.Tab value="delivery">Delivery</Tabs.Tab>
    <Tabs.Tab value="payment">Payment</Tabs.Tab>
    <Tabs.Tab value="returns">Returns</Tabs.Tab>
  </Tabs.List>
  
  <Tabs.Content value="delivery">
    Delivery information...
  </Tabs.Content>
  <Tabs.Content value="payment">
    Payment methods...
  </Tabs.Content>
</Tabs>
```

**Icon + Text Tabs:**
```jsx
<Tabs defaultValue="info">
  <Tabs.List>
    <Tabs.Tab value="info">
      <Tabs.Icon name="user" />
      My Info
    </Tabs.Tab>
    <Tabs.Tab value="payment">
      <Tabs.Icon name="credit-card" />
      Payment
    </Tabs.Tab>
  </Tabs.List>
</Tabs>
```

#### Behaviors

**Tab Requirements:**
- Minimum 2 tabs
- Maximum 8 tabs
- One tab always selected
- First tab inset from edge (not flush)

**Overflow Handling:**
```jsx
<Tabs overflowBehavior="scroll">
  {/* Horizontal scroll with arrows */}
  <Tabs.List>
    {manyTabs.map(tab => (
      <Tabs.Tab key={tab.id} value={tab.id}>
        {tab.label}
      </Tabs.Tab>
    ))}
  </Tabs.List>
</Tabs>
```

**Fixed Position:**
```jsx
<Tabs position="sticky" top={0}>
  {/* Tabs remain visible while scrolling */}
</Tabs>
```

#### Motion
```javascript
// Tab selector slide
duration: 'standard' // 300ms
easing: 'easy-easy' // cubic-bezier(0.4, 0.0, 0.2, 1)
```

#### Usage Guidelines

**✅ DO:**
- Use for page-level content organization
- Keep tab titles short and similar length
- Pre-select a default tab
- Place at top of page/region

**❌ DON'T:**
- Use for primary navigation
- Indicate progress (use stepper instead)
- Place at bottom of UI
- Have long/varying title lengths

**Tabs vs. Segmented Control:**
- **Tabs:** Different sections of information (Account, Billing, Settings)
- **Segmented Control:** Related content views (Grid/List view toggle)

**Tabs vs. Accordion:**
- **Tabs:** Navigation, always at top, switches entire region
- **Accordion:** Progressive disclosure, anywhere, expands in place

#### Keyboard Navigation
- `Tab` - Focus first selected tab, then next element
- `Left Arrow` - Previous tab (wraps to last)
- `Right Arrow` - Next tab (wraps to first)
- `Enter/Space` - Activate focused tab

---

### 2. App Bar

#### Overview
**Purpose:** Top-level navigation container with branding, actions, and navigation elements.

**Use Cases:** Primary navigation, search, global actions, branding

#### Anatomy
```
┌────────────────────────────────────┐
│ [☰] IKEA Logo  [Search] [Cart][•] │
└────────────────────────────────────┘
```

#### Implementation
```jsx
<AppBar>
  <AppBar.MenuButton aria-label="Open navigation menu" />
  <AppBar.Logo src="ikea-logo.svg" href="/" />
  <AppBar.Search placeholder="Search products" />
  <AppBar.Actions>
    <IconButton icon="shopping-cart" badge={3} />
    <IconButton icon="user" />
  </AppBar.Actions>
</AppBar>
```

#### Variants

**Fixed AppBar:**
```jsx
<AppBar position="fixed" elevation={2}>
  {/* Stays at top during scroll */}
</AppBar>
```

**Sticky AppBar:**
```jsx
<AppBar position="sticky">
  {/* Scrolls away, returns on scroll up */}
</AppBar>
```

---

### 3. Menu Item

#### Overview
**Purpose:** Individual selectable items within menus, dropdowns, and navigation lists.

#### Anatomy
```
┌────────────────────────────────┐
│ [Icon] Label         Shortcut  │
└────────────────────────────────┘
```

#### Implementation
```jsx
<Menu>
  <MenuItem>
    <MenuItem.Icon name="user" />
    <MenuItem.Label>My Account</MenuItem.Label>
  </MenuItem>
  
  <MenuItem>
    <MenuItem.Icon name="settings" />
    <MenuItem.Label>Settings</MenuItem.Label>
    <MenuItem.Shortcut>⌘S</MenuItem.Shortcut>
  </MenuItem>
  
  <MenuDivider />
  
  <MenuItem variant="danger">
    <MenuItem.Icon name="log-out" />
    <MenuItem.Label>Sign Out</MenuItem.Label>
  </MenuItem>
</Menu>
```

#### States
- **Default:** Normal appearance
- **Hover:** Background highlight
- **Focused:** Keyboard focus ring
- **Pressed:** Active state feedback
- **Disabled:** Reduced opacity, no interaction
- **Selected:** Checkmark or background

---

### 4. Segmented Control

#### Overview
**Purpose:** Toggle between 2-5 related views or filters within same context.

**Difference from Tabs:** Switches content views, not page sections.

#### Implementation
```jsx
<SegmentedControl value={view} onChange={setView}>
  <SegmentedControl.Button value="grid">
    <Icon name="grid" />
    Grid
  </SegmentedControl.Button>
  <SegmentedControl.Button value="list">
    <Icon name="list" />
    List
  </SegmentedControl.Button>
</SegmentedControl>
```

#### Usage
```jsx
// View toggle
<SegmentedControl value={view}>
  <Button value="grid">Grid</Button>
  <Button value="list">List</Button>
</SegmentedControl>

// Filter toggle
<SegmentedControl value={filter}>
  <Button value="all">All</Button>
  <Button value="active">Active</Button>
  <Button value="completed">Completed</Button>
</SegmentedControl>
```

---

## Part B: Media Components

### 5. Image

#### Overview
**Purpose:** Display images with responsive loading, aspect ratios, and accessibility.

#### Implementation
```jsx
<Image
  src="product.jpg"
  alt="BILLY Bookcase white"
  aspectRatio="1:1"
  loading="lazy"
  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
/>
```

#### Aspect Ratio Box
Maintains consistent image proportions:

**Supported Ratios:** 1:1, 3:4, 4:3, 4:5, 6:7, 9:16, 16:9

```jsx
<AspectRatioBox ratio="16:9">
  <Image src="hero.jpg" alt="Room setup" />
</AspectRatioBox>
```

#### Broken Image State
```jsx
<Image
  src="missing.jpg"
  alt="Product"
  fallback={
    <BrokenImage>
      <Icon name="image-off" />
      <Text>Image unavailable</Text>
    </BrokenImage>
  }
/>
```

---

### 6. Carousel

#### Overview
**Purpose:** Horizontally scrollable content gallery with navigation controls.

#### Implementation
```jsx
<Carousel>
  <Carousel.Item>
    <Image src="slide1.jpg" alt="Living room" />
  </Carousel.Item>
  <Carousel.Item>
    <Image src="slide2.jpg" alt="Kitchen" />
  </Carousel.Item>
  <Carousel.Item>
    <Image src="slide3.jpg" alt="Bedroom" />
  </Carousel.Item>
  
  <Carousel.Controls>
    <Carousel.PrevButton />
    <Carousel.Indicators />
    <Carousel.NextButton />
  </Carousel.Controls>
</Carousel>
```

#### Features
```jsx
<Carousel
  autoPlay={true}
  interval={5000}
  loop={true}
  swipeable={true}
>
  {/* Slides */}
</Carousel>
```

---

### 7. Shoppable Image

#### Overview
**Purpose:** Interactive image with product hotspots for discovery and shopping.

#### Implementation
```jsx
<ShoppableImage src="room.jpg" alt="Living room setup">
  <Hotspot
    x={120}
    y={200}
    product={{
      id: "UTSADD",
      name: "Soft toy for dog",
      price: "$9.99",
      image: "utsadd.jpg"
    }}
  />
  <Hotspot
    x={300}
    y={150}
    product={{
      id: "BILLY",
      name: "Bookcase",
      price: "$49.99"
    }}
  />
</ShoppableImage>
```

#### Hotspot Behavior
- Click/tap to show product card
- Animated pulse effect
- Position with x/y coordinates

---

## Part C: Specialty Components

### 8. Price

#### Overview
**Purpose:** Display product prices with proper formatting, currency, and promotional pricing.

#### Variants

**Regular Price:**
```jsx
<Price value={49.99} currency="USD" />
// Displays: $49.99
```

**Sale Price:**
```jsx
<Price
  value={39.99}
  originalValue={49.99}
  currency="USD"
  variant="sale"
/>
// Displays: $39.99 $49.99
```

**Price Range:**
```jsx
<Price.Range
  min={29.99}
  max={49.99}
  currency="USD"
/>
// Displays: $29.99 - $49.99
```

**From Price:**
```jsx
<Price.From value={19.99} currency="USD" />
// Displays: From $19.99
```

#### Accessibility
```jsx
<Price
  value={39.99}
  originalValue={49.99}
  aria-label="Sale price $39.99, was $49.99"
>
  <Price.Current>$39.99</Price.Current>
  <Price.Original aria-label="Original price">
    $49.99
  </Price.Original>
</Price>
```

---

### 9. Price Module

#### Overview
**Purpose:** Complete pricing section with price, family price, and BTI (Best Price) indicator.

#### Implementation
```jsx
<PriceModule>
  <PriceModule.Main>
    <Price value={49.99} currency="USD" size="large" />
  </PriceModule.Main>
  
  <PriceModule.Family>
    <Icon name="ikea-family" />
    <Price value={44.99} currency="USD" />
    <Text>IKEA Family Price</Text>
  </PriceModule.Family>
  
  <PriceModule.BTI>
    <Badge variant="lowest-price">Lowest Price</Badge>
    <Text size="small">Price valid until March 31</Text>
  </PriceModule.BTI>
</PriceModule>
```

---

### 10. Product Identifier

#### Overview
**Purpose:** Display product article number, measurements, and specifications.

#### Implementation
```jsx
<ProductIdentifier>
  <ProductIdentifier.ArticleNumber>
    304.841.11
  </ProductIdentifier.ArticleNumber>
  
  <ProductIdentifier.Dimensions>
    80x28x202 cm
  </ProductIdentifier.Dimensions>
  
  <ProductIdentifier.Color>
    White
  </ProductIdentifier.Color>
</ProductIdentifier>
```

---

### 11. Rating

#### Overview
**Purpose:** Display user ratings and reviews with stars and numerical scores.

#### Implementation
```jsx
<Rating>
  <Rating.Stars value={4.5} max={5} />
  <Rating.Score>4.5</Rating.Score>
  <Rating.Count>(1,234 reviews)</Rating.Count>
</Rating>
```

**Interactive Rating:**
```jsx
<Rating
  value={rating}
  onChange={setRating}
  editable
  size="large"
>
  <Rating.Stars />
</Rating>
```

---

### 12. Badge

#### Overview
**Purpose:** Small labels indicating status, count, or category.

#### Variants
```jsx
<Badge variant="new">NEW</Badge>
<Badge variant="sale">SALE</Badge>
<Badge variant="lowest-price">Lowest Price</Badge>
<Badge variant="neutral" count={5}>5</Badge>
```

**Positioned Badge:**
```jsx
<IconButton icon="shopping-cart">
  <Badge count={3} position="top-right" />
</IconButton>
```

---

### 13. Tag

#### Overview
**Purpose:** Removable labels for filters, categories, or selections.

#### Implementation
```jsx
<Tag onRemove={handleRemove}>
  <Tag.Label>Living Room</Tag.Label>
  <Tag.RemoveButton aria-label="Remove Living Room filter" />
</Tag>
```

**Tag Group:**
```jsx
<TagGroup>
  {selectedFilters.map(filter => (
    <Tag key={filter.id} onRemove={() => removeFilter(filter.id)}>
      {filter.label}
    </Tag>
  ))}
</TagGroup>
```

---

### 14. Avatar

#### Overview
**Purpose:** User profile image or initials representation.

#### Variants

**Image Avatar:**
```jsx
<Avatar
  src="user.jpg"
  alt="John Doe"
  size={40}
/>
```

**Initials Avatar:**
```jsx
<Avatar size={40} color="primary">
  JD
</Avatar>
```

**Icon Avatar:**
```jsx
<Avatar size={40} icon="user" />
```

**Sizes:** 24px, 32px, 40px, 48px, 64px, 96px

---

## Summary Tables

### Navigation Components

| Component | Use Case | Complexity | Mobile-Friendly |
|-----------|----------|------------|-----------------|
| **Tabs** | Page sections navigation | Medium | ✅ Yes |
| **App Bar** | Top-level navigation | Medium | ✅ Yes |
| **Menu Item** | Dropdown/menu options | Low | ✅ Yes |
| **Segmented Control** | View/filter toggle | Low | ✅ Yes |

### Media Components

| Component | Use Case | Lazy Load | Responsive |
|-----------|----------|-----------|------------|
| **Image** | Product/content images | ✅ Yes | ✅ Yes |
| **Carousel** | Image galleries | Optional | ✅ Yes |
| **Shoppable Image** | Product discovery | ✅ Yes | ✅ Yes |

### Specialty Components

| Component | Use Case | Complexity |
|-----------|----------|------------|
| **Price** | Product pricing | Low |
| **Price Module** | Complete pricing info | Medium |
| **Product Identifier** | Article numbers | Low |
| **Rating** | User reviews | Low |
| **Badge** | Status indicators | Low |
| **Tag** | Removable filters | Low |
| **Avatar** | User representation | Low |

---

## Common Patterns

### Product Card with All Specialty Components

```jsx
<Card>
  <Badge variant="new" position="top-left">NEW</Badge>
  
  <Card.Image src="product.jpg" aspectRatio="1:1" />
  
  <Card.Body>
    <Card.Title>BILLY Bookcase</Card.Title>
    <ProductIdentifier>304.841.11</ProductIdentifier>
    
    <Rating value={4.5} count={1234} />
    
    <PriceModule>
      <Price value={49.99} size="large" />
      <Price.Family value={44.99} />
    </PriceModule>
    
    <TagGroup>
      <Tag>Bestseller</Tag>
      <Tag>Sustainable</Tag>
    </TagGroup>
  </Card.Body>
  
  <Card.Action>Add to cart</Card.Action>
</Card>
```

### Filtered Product List with Navigation

```jsx
<Page>
  <AppBar>
    <AppBar.Logo />
    <AppBar.Search />
    <AppBar.Cart badge={3} />
  </AppBar>
  
  <Container>
    <Tabs defaultValue="all">
      <Tabs.List>
        <Tabs.Tab value="all">All Products</Tabs.Tab>
        <Tabs.Tab value="new">New Arrivals</Tabs.Tab>
        <Tabs.Tab value="sale">On Sale</Tabs.Tab>
      </Tabs.List>
    </Tabs>
    
    <FilterBar>
      <SegmentedControl value={view}>
        <Button value="grid">Grid</Button>
        <Button value="list">List</Button>
      </SegmentedControl>
      
      <TagGroup>
        {activeFilters.map(filter => (
          <Tag key={filter.id} onRemove={() => remove(filter.id)}>
            {filter.label}
          </Tag>
        ))}
      </TagGroup>
    </FilterBar>
    
    <ProductGrid view={view}>
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </ProductGrid>
  </Container>
</Page>
```

---

**Next:** [07-LAYOUT-AND-CWDS.md](./07-LAYOUT-AND-CWDS.md) - Layout Patterns & CWDS Subsystem

**Previous:** [05-FEEDBACK-COMPONENTS.md](./05-FEEDBACK-COMPONENTS.md) - Toasts, Modals, Alerts
