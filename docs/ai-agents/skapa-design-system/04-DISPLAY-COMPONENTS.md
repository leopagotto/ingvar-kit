# 04 - Display Components

**Category:** Display & Data Visualization  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Overview

Display components organize and present information in structured, scannable formats. These components help users quickly understand and digest content through visual hierarchy, grouping, and interactive patterns.

**Components in this Guide:**
1. Card (Regular, Simple, Themed)
2. Compact Card
3. Text Overlay Card
4. List & List View Item
5. Table
6. Accordion
7. Expander

---

## 1. Card

### Overview

**Purpose:** Displays grouped content and actions on a single topic, providing entry point to detailed information.

**Platforms:** Figma, React, Vue, Web Components, Android, iOS

**Last Updated:** 2025-08-20

**Key Rule:** ⚠️ Cards cannot be used without a Title (mandatory).

### Anatomy

```
┌─────────────────────────────────────┐
│  Add-on (Icon/Badge/Comm. Message)  │
│  Label ───────────────────────────  │
│  ┌──────────────────────────────┐   │
│  │  Media Container (optional)   │   │
│  │  (Image/Video/Shoppable Img) │   │
│  └──────────────────────────────┘   │
│                                      │
│  Title (REQUIRED) ─────────────────  │
│  Subtitle (optional) ──────────────  │
│  Body text (optional) ─────────────  │
│  At IKEA we don't just believe...   │
│                                      │
│  [Call to Action Button] ──────────  │
└─────────────────────────────────────┘
        Card Surface (background)
```

### Variants

#### 1. Regular Card
- Colored background surface for stronger visual contrast
- Creates contained expression
- Approved background color variants

```jsx
<Card variant="regular" background="default">
  <Card.Media src="pets.jpg" aspectRatio="16:9" />
  <Card.Title>The life of pets at home</Card.Title>
  <Card.Body>
    At IKEA we don't just believe in a better life at home for 
    the many people, but for pets too.
  </Card.Body>
  <Card.Action>Learn more</Card.Action>
</Card>
```

#### 2. Simple Card
- No background surface color
- Only use on neutral backgrounds
- Supports arrow or Secondary Button

```jsx
<Card variant="simple">
  <Card.Media src="collection.jpg" aspectRatio="4:3" />
  <Card.Title>The UTSADD pet collection</Card.Title>
  <Card.Body>Discover our new pet-friendly furniture</Card.Body>
  <Card.IconAction icon="arrow-right" />
</Card>
```

#### 3. Theme Cards
Special themed cards approved by IKEA Brand team:

**Default Theme:**
- First choice for all messages
- Use for: general messages, seasonality, campaigns, services, inspiration, sustainability, food, recalls

**Inverse Theme:**
- Use on colored surfaces or images
- ❌ Do not use on white backgrounds

**Important Message Theme:**
- Strong visual impact for temporary messages (max 1 week)
- Use for: "here today, gone tomorrow", time-restricted messages, temporary notices, alerts

**Wayfinding Theme:**
- IKEA Brand color (trade dress)
- Reserved for: wayfinding features, global corporate messages

**Lowest Price Theme:**
- IKEA Brand yellow (trade dress)
- Use for: BTI products, sales, reduced prices, limited offers

```jsx
<Card theme="wayfinding">
  <Card.Title>Store Navigation</Card.Title>
  <Card.Body>Find your way through IKEA</Card.Body>
</Card>

<Card theme="lowest-price">
  <Card.Badge>Best Price</Card.Badge>
  <Card.Title>BILLY Bookcase</Card.Title>
  <Card.Price>$49.99</Card.Price>
</Card>
```

### Card Elements

#### Add-ons
- Supports: Icon, Commercial Message, Badge
- Only ONE add-on visible at a time
- Positioned on top of title

```jsx
<Card>
  <Card.Badge>NEW</Card.Badge>
  <Card.Title>Latest Collection</Card.Title>
</Card>
```

#### Label
- Small text for categorization or attribution
- Placed above title

```jsx
<Card>
  <Card.Label>Kitchen</Card.Label>
  <Card.Title>Storage Solutions</Card.Title>
</Card>
```

#### Title Sizes
- **Regular:** Default size for most cards
- **Small:** For compact layouts or secondary cards

```jsx
<Card titleSize="regular">...</Card>
<Card titleSize="small">...</Card>
```

#### Call to Action Button
- Supports: Button with text label, Icon Button
- Simple Cards: arrow or Secondary Button
- Button and Card surface must lead to same link
- ⚠️ Do not add separate link to button

### Media Container

#### Image
Uses Aspect Ratio Box component with supported ratios:
- 1:1, 3:4, 4:3, 4:5, 6:7, 9:16, 16:9

```jsx
<Card>
  <Card.Image 
    src="furniture.jpg" 
    aspectRatio="16:9"
    alt="Modern living room setup"
  />
</Card>
```

#### Simple Video
- Autoplay with minimal controls
- Click anywhere to toggle play/pause
- Controls available for play/pause

```jsx
<Card>
  <Card.Video 
    src="product-demo.mp4" 
    aspectRatio="16:9"
    autoplay
    controls="minimal"
  />
</Card>
```

#### Shoppable Image
- Allows product discovery with hotspots
- Interactive product tags

```jsx
<Card>
  <Card.ShoppableImage src="room.jpg">
    <Hotspot product="UTSADD" position={{ x: 120, y: 200 }} />
    <Hotspot product="BILLY" position={{ x: 300, y: 150 }} />
  </Card.ShoppableImage>
</Card>
```

### Responsive Features

#### Vertical Alignment (Desktop >900px)
- **Default:** Button fixed to bottom
- **Centered:** Content aligned middle, button grouped with body

```jsx
<Card verticalAlign="default">...</Card>
<Card verticalAlign="centered">...</Card>
```

#### Image Position (Desktop >900px)
- **Leading:** Image on left side
- **Trailing:** Image on right side

```jsx
<Card imagePosition="leading">...</Card>
<Card imagePosition="trailing">...</Card>
```

### States

- **Default:** Normal appearance
- **Hover:** Subtle elevation increase
- **Pressed:** Visual feedback on touch
- **Loading:** Skeleton loading state

### Usage Guidelines

#### ✅ DO:
- Use Cards as entry points to detailed content
- Keep text clear and concise
- Use themes consistently with brand guidelines
- Ensure button and card lead to same destination
- Use appropriate theme for message type

#### ❌ DON'T:
- Create Cards without a Title
- Add separate link to CTA button (must match card link)
- Use Inverse theme on white backgrounds
- Override theme colors
- Use Important Message theme for >1 week

### Accessibility

```jsx
<Card
  role="article"
  aria-labelledby="card-title-1"
>
  <Card.Title id="card-title-1">Title</Card.Title>
  <Card.Link href="/details" aria-label="Learn more about Title">
    <Card.Action>Learn more</Card.Action>
  </Card.Link>
</Card>
```

**Requirements:**
- Card link must have descriptive aria-label
- Images require alt text
- Focus visible on keyboard navigation
- Touch target minimum 44x44px

---

## 2. Compact Card

### Overview

**Purpose:** Space-efficient card variant for dense layouts and lists.

**Use Cases:** Product grids, search results, category browsing

### Anatomy

```
┌───────────────────┐
│  ┌─────────────┐  │
│  │   Thumbnail │  │
│  └─────────────┘  │
│  Title           │
│  Subtitle        │
│  Price (opt)     │
└───────────────────┘
```

### Variants

#### Product Compact Card

```jsx
<CompactCard variant="product">
  <CompactCard.Image src="product.jpg" aspectRatio="1:1" />
  <CompactCard.Title>BILLY Bookcase</CompactCard.Title>
  <CompactCard.Subtitle>80x28x202 cm</CompactCard.Subtitle>
  <CompactCard.Price>$49.99</CompactCard.Price>
</CompactCard>
```

#### Category Compact Card

```jsx
<CompactCard variant="category">
  <CompactCard.Image src="category.jpg" aspectRatio="4:3" />
  <CompactCard.Title>Living Room</CompactCard.Title>
</CompactCard>
```

### Usage Guidelines

#### ✅ DO:
- Use in grids (3-4 columns on desktop)
- Keep titles short (max 2 lines)
- Use for browsing experiences

#### ❌ DON'T:
- Add long body text
- Use multiple CTAs
- Overload with information

---

## 3. Text Overlay Card

### Overview

**Purpose:** Card with text overlaid on image background for dramatic visual impact.

**Use Cases:** Hero sections, feature highlights, campaigns

### Anatomy

```
┌─────────────────────────────────┐
│  Background Image (full bleed)  │
│  ┌─────────────────────────┐    │
│  │  Gradient Overlay       │    │
│  │  Title ──────────────── │    │
│  │  Subtitle ───────────── │    │
│  │  [CTA Button]           │    │
│  └─────────────────────────┘    │
└─────────────────────────────────┘
```

### Implementation

```jsx
<TextOverlayCard 
  backgroundImage="hero.jpg"
  overlayGradient="dark"
  textPosition="bottom-left"
>
  <TextOverlayCard.Title color="white">
    New Collection
  </TextOverlayCard.Title>
  <TextOverlayCard.Subtitle color="white">
    Sustainable living starts here
  </TextOverlayCard.Subtitle>
  <TextOverlayCard.Action variant="inverse">
    Explore
  </TextOverlayCard.Action>
</TextOverlayCard>
```

### Overlay Positions
- `top-left`, `top-center`, `top-right`
- `center-left`, `center-center`, `center-right`
- `bottom-left`, `bottom-center`, `bottom-right`

### Accessibility

**Critical Requirements:**
- Image text contrast ratio ≥ 4.5:1 (WCAG AA)
- Use gradient overlays to ensure readability
- Provide alt text for background image
- Text must be readable on failed image load

```jsx
<TextOverlayCard
  backgroundImage="hero.jpg"
  alt="Modern living room with IKEA furniture"
  overlayGradient="rgba(0, 0, 0, 0.5)"
  fallbackColor="#0058A3"
>
  {/* Text content */}
</TextOverlayCard>
```

---

## 4. List & List View Item

### Overview

**Purpose:** Display collections of related items in vertical format.

**Platforms:** All (Figma, React, Vue, Web Components, Android, iOS)

### List Anatomy

```
┌─────────────────────────────────┐
│  List Item 1 ────────────── >  │
├─────────────────────────────────┤
│  List Item 2 ────────────── >  │
├─────────────────────────────────┤
│  List Item 3 ────────────── >  │
└─────────────────────────────────┘
```

### List View Item Anatomy

```
┌─────────────────────────────────────┐
│  [Icon]  Primary Text  │  Trailing │
│          Secondary Text   [Action] │
└─────────────────────────────────────┘
```

### Variants

#### Simple List Item

```jsx
<List>
  <ListItem>
    <ListItem.Text>My Account</ListItem.Text>
    <ListItem.Action icon="chevron-right" />
  </ListItem>
  <ListItem>
    <ListItem.Text>Payment Methods</ListItem.Text>
    <ListItem.Action icon="chevron-right" />
  </ListItem>
</List>
```

#### Two-Line List Item

```jsx
<ListItem>
  <ListItem.Icon name="delivery-truck" />
  <ListItem.Text>
    <ListItem.Primary>Order #12345</ListItem.Primary>
    <ListItem.Secondary>Arriving tomorrow</ListItem.Secondary>
  </ListItem.Text>
  <ListItem.Action icon="chevron-right" />
</ListItem>
```

#### Three-Line List Item

```jsx
<ListItem lines="three">
  <ListItem.Thumbnail src="product.jpg" />
  <ListItem.Text>
    <ListItem.Primary>BILLY Bookcase</ListItem.Primary>
    <ListItem.Secondary>White, 80x28x202 cm</ListItem.Secondary>
    <ListItem.Tertiary>$49.99</ListItem.Tertiary>
  </ListItem.Text>
  <ListItem.Action icon="more-vertical" />
</ListItem>
```

### States

- **Default:** Normal appearance
- **Hover:** Background highlight
- **Pressed:** Visual feedback
- **Selected:** Persistent highlight (for selectable lists)
- **Disabled:** Reduced opacity, no interaction

### Usage Guidelines

#### ✅ DO:
- Use for navigational menus
- Group related items
- Keep primary text concise
- Use icons consistently across list

#### ❌ DON'T:
- Mix list item heights inconsistently
- Use more than 3 lines of text
- Overload with too many actions

### Accessibility

```jsx
<List role="list" aria-label="Navigation menu">
  <ListItem role="listitem">
    <ListItem.Link href="/account" aria-label="Go to My Account">
      <ListItem.Text>My Account</ListItem.Text>
    </ListItem.Link>
  </ListItem>
</List>
```

---

## 5. Table

### Overview

**Purpose:** Display structured data in rows and columns for comparison and analysis.

**Use Cases:** Product comparisons, order history, data dashboards

### Anatomy

```
┌──────────┬──────────┬──────────┬──────────┐
│ Header 1 │ Header 2 │ Header 3 │ Actions  │
├──────────┼──────────┼──────────┼──────────┤
│ Cell 1-1 │ Cell 1-2 │ Cell 1-3 │  [...]   │
├──────────┼──────────┼──────────┼──────────┤
│ Cell 2-1 │ Cell 2-2 │ Cell 2-3 │  [...]   │
└──────────┴──────────┴──────────┴──────────┘
```

### Implementation

```jsx
<Table>
  <Table.Header>
    <Table.HeaderCell sortable>Product</Table.HeaderCell>
    <Table.HeaderCell sortable>Price</Table.HeaderCell>
    <Table.HeaderCell sortable>Stock</Table.HeaderCell>
    <Table.HeaderCell>Actions</Table.HeaderCell>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>BILLY Bookcase</Table.Cell>
      <Table.Cell align="right">$49.99</Table.Cell>
      <Table.Cell>
        <Badge color="success">In Stock</Badge>
      </Table.Cell>
      <Table.Cell>
        <IconButton icon="more-vertical" aria-label="More actions" />
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

### Features

#### Sortable Columns

```jsx
<Table.HeaderCell 
  sortable 
  sortDirection="asc"
  onSort={(direction) => handleSort('price', direction)}
>
  Price
</Table.HeaderCell>
```

#### Selectable Rows

```jsx
<Table selectable>
  <Table.Row 
    selected={selectedIds.includes(row.id)}
    onSelect={(isSelected) => handleSelect(row.id, isSelected)}
  >
    <Table.Cell>...</Table.Cell>
  </Table.Row>
</Table>
```

#### Sticky Header

```jsx
<Table stickyHeader headerHeight={56}>
  {/* Table content */}
</Table>
```

### Responsive Patterns

#### Mobile: Card View

```jsx
<Table responsive="card">
  {/* On mobile, rows become cards */}
</Table>
```

#### Mobile: Horizontal Scroll

```jsx
<Table responsive="scroll">
  {/* Table scrolls horizontally on mobile */}
</Table>
```

### Accessibility

**Requirements:**
- Use proper table semantics (`<table>`, `<thead>`, `<tbody>`, `<th>`, `<td>`)
- Sortable columns announce sort direction
- Use `scope` attribute for headers
- Provide caption or aria-label

```jsx
<Table aria-label="Product inventory">
  <Table.Caption>Current product stock levels</Table.Caption>
  <Table.Header>
    <Table.HeaderCell scope="col">Product</Table.HeaderCell>
    <Table.HeaderCell scope="col">Stock</Table.HeaderCell>
  </Table.Header>
</Table>
```

---

## 6. Accordion

### Overview

**Purpose:** Progressive disclosure of content in collapsible sections.

**Use Cases:** FAQs, settings panels, information architecture

### Anatomy

```
┌─────────────────────────────────────┐
│  [▼] Section Title 1          [+]  │ ← Expanded
├─────────────────────────────────────┤
│  Content for section 1              │
│  Can span multiple lines...         │
├─────────────────────────────────────┤
│  [▶] Section Title 2          [+]  │ ← Collapsed
├─────────────────────────────────────┤
│  [▶] Section Title 3          [+]  │ ← Collapsed
└─────────────────────────────────────┘
```

### Implementation

```jsx
<Accordion>
  <Accordion.Item value="delivery">
    <Accordion.Header>
      <Accordion.Title>Delivery Options</Accordion.Title>
    </Accordion.Header>
    <Accordion.Content>
      We offer home delivery, click & collect, and in-store pickup.
    </Accordion.Content>
  </Accordion.Item>
  
  <Accordion.Item value="returns">
    <Accordion.Header>
      <Accordion.Title>Return Policy</Accordion.Title>
    </Accordion.Header>
    <Accordion.Content>
      365-day return policy for IKEA Family members.
    </Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Variants

#### Single Expand
Only one section open at a time

```jsx
<Accordion type="single" defaultValue="delivery">
  {/* Items */}
</Accordion>
```

#### Multiple Expand
Multiple sections can be open simultaneously

```jsx
<Accordion type="multiple" defaultValue={["delivery", "returns"]}>
  {/* Items */}
</Accordion>
```

### States

- **Collapsed:** Content hidden, chevron pointing right/down
- **Expanded:** Content visible, chevron pointing down/up
- **Disabled:** Cannot be toggled

### Motion

```javascript
// Expansion
duration: 300ms
easing: 'ease-out'

// Collapse
duration: 200ms
easing: 'ease-in'
```

### Usage Guidelines

#### ✅ DO:
- Use for organizing large amounts of content
- Keep section titles descriptive
- Use for FAQs and settings
- Consider Accordion for responsive layouts

#### ❌ DON'T:
- Hide critical information in collapsed sections
- Use too many nested levels
- Make sections too small (add minimal content)

### Accessibility

```jsx
<Accordion.Item>
  <Accordion.Header>
    <button
      aria-expanded={isOpen}
      aria-controls="section-content-1"
      id="section-header-1"
    >
      <Accordion.Title>Section Title</Accordion.Title>
      <Accordion.Icon />
    </button>
  </Accordion.Header>
  <Accordion.Content
    id="section-content-1"
    aria-labelledby="section-header-1"
    role="region"
  >
    Content
  </Accordion.Content>
</Accordion.Item>
```

**Keyboard Navigation:**
- `Tab` - Move focus to next accordion header
- `Enter/Space` - Toggle accordion section
- `Home` - Move focus to first accordion header
- `End` - Move focus to last accordion header

---

## 7. Expander

### Overview

**Purpose:** Expandable content section with "show more/less" pattern.

**Use Cases:** Long descriptions, product details, terms and conditions

### Anatomy

```
┌─────────────────────────────────┐
│  Visible content that shows     │
│  initially (collapsed state)... │
│                                  │
│  [Show more ▼]                  │
└─────────────────────────────────┘

After expansion:
┌─────────────────────────────────┐
│  Visible content that shows     │
│  initially (collapsed state)... │
│                                  │
│  Additional content that was    │
│  hidden becomes visible here... │
│                                  │
│  [Show less ▲]                  │
└─────────────────────────────────┘
```

### Implementation

```jsx
<Expander maxHeight={100} collapsedLines={3}>
  <Expander.Content>
    <p>
      Long product description that needs to be truncated 
      for better readability. Users can expand to read more 
      when interested.
    </p>
  </Expander.Content>
  <Expander.Toggle>
    {(isExpanded) => isExpanded ? 'Show less' : 'Show more'}
  </Expander.Toggle>
</Expander>
```

### Variants

#### Line-Based Truncation

```jsx
<Expander collapsedLines={3}>
  <p>Content truncated after 3 lines...</p>
</Expander>
```

#### Height-Based Truncation

```jsx
<Expander maxHeight={150}>
  <div>Content truncated after 150px height...</div>
</Expander>
```

### States

- **Collapsed:** Truncated content with "Show more"
- **Expanded:** Full content with "Show less"
- **Loading:** Skeleton state while content loads

### Usage Guidelines

#### ✅ DO:
- Use for long descriptions or details
- Provide clear "Show more/less" labels
- Fade out text at truncation point (gradient)
- Maintain scroll position on collapse

#### ❌ DON'T:
- Truncate very short content
- Hide critical information by default
- Use for primary navigation

### Accessibility

```jsx
<Expander>
  <Expander.Content
    id="expandable-content-1"
    aria-hidden={!isExpanded}
  >
    {content}
  </Expander.Content>
  <button
    aria-expanded={isExpanded}
    aria-controls="expandable-content-1"
    onClick={toggleExpand}
  >
    {isExpanded ? 'Show less' : 'Show more'}
  </button>
</Expander>
```

---

## Summary: Display Components

| Component | Use Case | Complexity | Mobile-Friendly |
|-----------|----------|------------|-----------------|
| **Card** | Content entry points, features | Medium | ✅ Yes |
| **Compact Card** | Product grids, search results | Low | ✅ Yes |
| **Text Overlay Card** | Hero sections, campaigns | Medium | ⚠️ Caution |
| **List** | Navigation, item collections | Low | ✅ Yes |
| **Table** | Data comparison, dashboards | High | ⚠️ Needs responsive pattern |
| **Accordion** | FAQs, progressive disclosure | Medium | ✅ Yes |
| **Expander** | Long text, descriptions | Low | ✅ Yes |

---

## Common Patterns

### Product Card Grid

```jsx
<Grid columns={{ xs: 2, md: 3, lg: 4 }} gap={16}>
  {products.map(product => (
    <CompactCard key={product.id} variant="product">
      <CompactCard.Image src={product.image} aspectRatio="1:1" />
      <CompactCard.Title>{product.name}</CompactCard.Title>
      <CompactCard.Price>{product.price}</CompactCard.Price>
    </CompactCard>
  ))}
</Grid>
```

### FAQ Accordion

```jsx
<Accordion type="single">
  {faqs.map(faq => (
    <Accordion.Item key={faq.id} value={faq.id}>
      <Accordion.Header>
        <Accordion.Title>{faq.question}</Accordion.Title>
      </Accordion.Header>
      <Accordion.Content>{faq.answer}</Accordion.Content>
    </Accordion.Item>
  ))}
</Accordion>
```

### Order History Table

```jsx
<Table>
  <Table.Header>
    <Table.HeaderCell>Order #</Table.HeaderCell>
    <Table.HeaderCell>Date</Table.HeaderCell>
    <Table.HeaderCell>Total</Table.HeaderCell>
    <Table.HeaderCell>Status</Table.HeaderCell>
  </Table.Header>
  <Table.Body>
    {orders.map(order => (
      <Table.Row key={order.id}>
        <Table.Cell>{order.number}</Table.Cell>
        <Table.Cell>{order.date}</Table.Cell>
        <Table.Cell>{order.total}</Table.Cell>
        <Table.Cell>
          <Badge color={order.statusColor}>{order.status}</Badge>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
</Table>
```

---

**Next:** [05-FEEDBACK-COMPONENTS.md](./05-FEEDBACK-COMPONENTS.md) - Toasts, Modals, Alerts, Loading States

**Previous:** [03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md) - Form Inputs & Controls
