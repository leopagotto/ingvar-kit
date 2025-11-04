# Skapa Design System: Action Components

> **For AI Agents:** Complete reference for interactive action components including Buttons, Links, and related controls.

## 📋 Table of Contents

- [Button](#button)
- [Icon Button](#icon-button)
- [Dual Button](#dual-button)
- [Hyperlink](#hyperlink)
- [Expanding Button](#expanding-button)
- [Jumbo Button](#jumbo-button)

---

## Button

### Overview

**Purpose:** Primary component for performing actions.

**Last Updated:** 2025-05-14

**Platforms:** Figma, React/Preact, Vue, Web Components, Android, iOS

### Anatomy

```
┌────────────────────────────┐
│  [Icon] Label [Icon]       │  ← Button Container
└────────────────────────────┘

Components:
- Background surface
- Button label (text)
- Leading icon (optional)
- Trailing icon (optional)
- Focus indicator
- Loading state (bouncy ball)
```

### Variants

#### 1. Primary Button

**Use Case:** Main action on a screen

```jsx
<Button variant="primary">Add to cart</Button>
```

**Visual:** Blue background (#0058A3), white text
**When to use:** Place emphasis on the most important action

#### 2. Secondary Button

**Use Case:** Supporting action

```jsx
<Button variant="secondary">Cancel</Button>
```

**Visual:** Transparent background, border, dark text
**When to use:** Less emphasis than primary actions

#### 3. Tertiary Button

**Use Case:** Lowest priority action

```jsx
<Button variant="tertiary">Skip question</Button>
```

**Visual:** No background, no border, underlined text
**When to use:** Least emphasis on an action

#### 4. Danger Button

**Use Case:** Destructive actions

```jsx
<Button variant="danger">
  <Icon name="warning" />
  Delete account
</Button>
```

**Visual:** Red background, white text, warning icon (always)
**When to use:** Actions that lead to irreversible data loss

#### 5. Emphasised Button

**Use Case:** Critical call-to-action

```jsx
<Button variant="emphasised">Start free trial</Button>
```

**Visual:** Accent color background, high contrast
**When to use:** Most important actions in critical flows

#### 6. Inverse Themes

**Use Case:** Dark backgrounds or images

```jsx
<Button variant="primary-inverse">
  Learn more
</Button>

<Button variant="secondary-inverse">
  Skip
</Button>
```

**Visual:** Inverted colors for dark surfaces
**When to use:** Buttons on dark backgrounds, never on white (neutral-1)

#### 7. Image Overlay

**Use Case:** Buttons on top of images

```jsx
<Button variant="image-overlay">View gallery</Button>
```

**Visual:** Secondary button variant optimized for image backgrounds
**When to use:** Actions placed directly on images

### Sizes

```javascript
sizes: {
  medium: "Default size, touch-optimized",
  small: "Compact spaces, secondary actions",
  "extra-small": "Very tight spaces (WARNING: smaller than touch target)"
}
```

**Implementation:**

```jsx
<Button size="medium">Default</Button>
<Button size="small">Compact</Button>
<Button size="extra-small">Tiny</Button>
```

**⚠️ Important:** Extra small buttons have hit areas extending beyond visual boundaries for accessibility.

### Icons

#### Leading Icon (Before Text)

```jsx
<Button>
  <Icon name="cart" position="leading" />
  Add to cart
</Button>
```

#### Trailing Icon (After Text)

```jsx
<Button>
  Continue
  <Icon name="arrow-right" position="trailing" />
</Button>
```

**Guidelines:**

- ✅ Use icons that directly connect to the action (e.g., cart icon for "Add to cart")
- ✅ Icon should be recognizable without the label
- ❌ Don't use icons as decoration
- ❌ Don't use icons just to draw attention

### States

#### Default

Normal interactive state

#### Hover

```css
/* Fade to darker color */
transition: background-color 200ms ease;
background-color: darken(primary, 10%);
```

#### Pressed

```css
/* Scale down animation */
transform: scale(0.97);
transition: transform 100ms ease;
```

#### Loading

```jsx
<Button loading>
  <LoadingIndicator type="bouncy-ball" />
  Processing...
</Button>
```

#### Disabled

```jsx
<Button disabled>Unavailable</Button>
```

**Visual:** Grey background, reduced opacity, `cursor: not-allowed`

### Behavior

#### Fluid Width

Button expands to fill container

```jsx
<Button width="fluid">Full width button</Button>
```

```css
width: 100%;
```

#### Auto Width

Button width determined by content

```jsx
<Button width="auto">Auto width</Button>
```

**Note:** Labels rarely wrap to two lines in this scenario

### Button Grouping

#### Two Buttons

```jsx
<ButtonGroup>
  <Button variant="primary">Submit</Button>
  <Button variant="secondary">Cancel</Button>
</ButtonGroup>
```

**Rules:**

- Use identical styles together (primary + secondary regular, OR primary + secondary inverse)
- Exception: Emphasised button can be used with secondary regular

#### Three Buttons

```jsx
<ButtonGroup>
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Draft</Button>
  <Button variant="tertiary">Cancel</Button>
</ButtonGroup>
```

#### On Image

```jsx
<ButtonGroup>
  <Button variant="primary-inverse">Learn more</Button>
  <Button variant="image-overlay">Skip</Button>
</ButtonGroup>
```

### Button Order

#### Horizontal Layout

```
┌─────────────────────────────────┐
│  [Secondary]      [Primary] →   │
└─────────────────────────────────┘
```

**Primary button positioned at the end (trailing)**

#### Vertical Layout

```
┌─────────────┐
│  [Primary]  │ ← Top
├─────────────┤
│ [Secondary] │
└─────────────┘
```

**Primary button positioned at the top**

### Usage Guidelines

#### ✅ DO:

1. **Give one clear primary action**

   - Only one primary button per screen
   - Creates clear forward path

2. **Use emphasised variants for important actions**

   - Highlights critical product flows
   - Shows importance hierarchy

3. **Use concise verbs in labels**

   - "Customise" ✅
   - "Click here to customize your settings" ❌

4. **Keep button order consistent**
   - Horizontal: Primary trailing
   - Vertical: Primary top

#### ❌ DON'T:

1. Mix multiple primary actions
2. Combine emphasised + primary + secondary in one group
3. Use unclear or unnecessarily long labels
4. Use icons as decoration (only functional connections)

### Motion

#### Press and Release

```css
/* Press */
@keyframes press {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.97);
  }
}

/* Release */
@keyframes release {
  from {
    transform: scale(0.97);
  }
  to {
    transform: scale(1);
  }
}

/* Apply */
transition: transform 100ms ease;
```

#### Hover

```css
transition: background-color 200ms ease;
```

#### Waiting State

```jsx
<Button loading>
  <InlineBouncyBall />
  Loading...
</Button>
```

### Internationalization

#### RTL Support

```jsx
// Button labels are center-aligned
// No difference between LTR and RTL for label

// Icons swap position
<Button dir="rtl">
  {/* Leading icon becomes trailing in RTL */}
  <Icon name="arrow-left" />
  Back
</Button>
```

### Accessibility

```jsx
<Button
  aria-label="Add item to shopping cart"
  aria-pressed={pressed}
  aria-busy={loading}
  disabled={disabled}
>
  Add to cart
</Button>
```

**Keyboard Interactions:**

| Key     | Action                 |
| ------- | ---------------------- |
| `Space` | Triggers button action |
| `Enter` | Triggers button action |
| `Tab`   | Moves focus to button  |

**Focus State:**

```css
:focus-visible {
  outline: 3px solid var(--color-blue-ikea);
  outline-offset: 2px;
}
```

---

## Icon Button

### Overview

**Purpose:** Compact button labeled with icon instead of text.

**Last Updated:** 2025-05-19

**Use Case:** Small spaces where text labels don't fit.

### Anatomy

```
┌────┐
│ 🔍 │  ← Icon only
└────┘

Components:
- Background surface (optional)
- Icon (required)
- Focus indicator
- Hidden label (accessibility)
```

### Variants

#### Primary Icon Button

```jsx
<IconButton variant="primary" icon="search" label="Search" />
```

**Use Case:** More emphasis on an action

#### Secondary Icon Button

```jsx
<IconButton variant="secondary" icon="favorite" label="Add to favorites" />
```

**Use Case:** Less emphasis on an action

#### Tertiary Icon Button

```jsx
<IconButton variant="tertiary" icon="close" label="Close" />
```

**Use Case:** Least emphasis on an action

#### Emphasised Icon Button

```jsx
<IconButton variant="emphasised" icon="cart" label="Add to cart" />
```

**Use Case:** Critical actions with highest emphasis

#### Image Overlay Icon Button

```jsx
<IconButton variant="image-overlay" icon="play" label="Play video" />
```

**Use Case:** Actions placed on top of images

#### Inverse Theme Icon Button

```jsx
<IconButton variant="inverse" icon="share" label="Share" />
```

**Use Case:** Dark backgrounds or image backgrounds

### Sizes

```jsx
<IconButton size="medium" icon="edit" label="Edit" />
<IconButton size="small" icon="edit" label="Edit" />
<IconButton size="extra-small" icon="edit" label="Edit" />
```

**Icon Variants for Extra Small:**

- Use `-Small` icon variants (e.g., "Cross - Small")
- Designed for legibility at small sizes
- Retains natural 24px icon size internally

### States

Same as regular Button:

- Default
- Hover (fade to darker)
- Pressed (scale to 97%)
- Loading (bouncy ball)
- Disabled

### Usage Guidelines

#### ✅ DO:

**Designing Compact Actions**

```jsx
// Product card with compact favorite action
<Card>
  <CardImage />
  <CardTitle />
  <ButtonGroup>
    <Button variant="primary">Add to bag</Button>
    <IconButton variant="secondary" icon="favorite" label="Add to favorites" />
  </ButtonGroup>
</Card>
```

**Placing Icon Buttons**

- Place inline horizontally following full-size buttons
- Use as secondary actions
- Position primary icon buttons at the end of groups

**Combining Button Styles**

```jsx
// Use size to communicate hierarchy, not just color
<ButtonGroup>
  <Button variant="primary" size="medium">
    Add to bag
  </Button>
  <IconButton variant="secondary" size="small" icon="favorite" />
</ButtonGroup>
```

#### ❌ DON'T:

1. **Don't stack vertically as secondary action**

   ```jsx
   {/* ❌ Bad */}
   <Button>Add to bag</Button>
   <IconButton icon="favorite" /> {/* Destroys hierarchy */}
   ```

2. **Don't mix contradicting color styles**

   ```jsx
   {/* ❌ Bad */}
   <Button variant="primary">Add to bag</Button>
   <IconButton variant="primary" icon="favorite" /> {/* Confusing hierarchy */}
   ```

3. **Don't use medium icons on extra-small buttons**

   ```jsx
   {
     /* ❌ Bad */
   }
   <IconButton size="extra-small" icon="cross-medium" />;

   {
     /* ✅ Good */
   }
   <IconButton size="extra-small" icon="cross-small" />;
   ```

### Icon Button Group Order

```
┌─────────────────────────────┐
│  [Secondary] [Secondary] [Primary] →
└─────────────────────────────┘
```

**Primary buttons positioned at the end**

### Accessibility

**CRITICAL:** Always provide a label for screen readers

```jsx
<IconButton
  icon="close"
  label="Close dialog" // Screen reader only
  aria-label="Close dialog"
/>
```

**Keyboard Interactions:**

| Key               | Action                 |
| ----------------- | ---------------------- |
| `Space` / `Enter` | Triggers button action |

---

## Dual Button

### Overview

**Purpose:** Two buttons grouped together for binary actions.

**Last Updated:** 2025-05-14

**Use Case:** Related opposite actions (zoom in/out, undo/redo, left/right).

### Anatomy

```
┌──────┬──────┐
│  −   │  +   │  ← Horizontal orientation
└──────┴──────┘

┌──────┐
│  +   │  ← Vertical orientation
├──────┤
│  −   │
└──────┘

Components:
- Background
- Divider border
- Two icon buttons
- Focus indicators (per button)
```

### Variants

#### Primary Dual Button

```jsx
<DualButton variant="primary">
  <DualButton.First icon="zoom-out" label="Zoom out" />
  <DualButton.Second icon="zoom-in" label="Zoom in" />
</DualButton>
```

**Use Case:** Stand out on images or graphics (e.g., interactive maps)

#### Secondary Dual Button

```jsx
<DualButton variant="secondary">
  <DualButton.First icon="arrow-left" label="Previous" />
  <DualButton.Second icon="arrow-right" label="Next" />
</DualButton>
```

**Use Case:** Low emphasis on light backgrounds

#### Secondary Inverse Dual Button

```jsx
<DualButton variant="secondary-inverse">
  <DualButton.First icon="minus" label="Decrease" />
  <DualButton.Second icon="plus" label="Increase" />
</DualButton>
```

**Use Case:** Low emphasis on dark backgrounds

### Orientations

#### Horizontal

```jsx
<DualButton orientation="horizontal">
  <DualButton.First icon="arrow-left" />
  <DualButton.Second icon="arrow-right" />
</DualButton>
```

#### Vertical

```jsx
<DualButton orientation="vertical">
  <DualButton.First icon="arrow-up" />
  <DualButton.Second icon="arrow-down" />
</DualButton>
```

**Choose based on:** Context and space constraints

### Sizes

```jsx
<DualButton size="medium">...</DualButton>
<DualButton size="small">...</DualButton>
```

### Usage Guidelines

#### ✅ DO: Always Use Corresponding Buttons

**Binary Actions** (choices related to each other):

```jsx
{/* ✅ Good: Corresponding binary actions */}
<DualButton>
  <DualButton.First icon="zoom-out" label="Zoom out" />
  <DualButton.Second icon="zoom-in" label="Zoom in" />
</DualButton>

<DualButton>
  <DualButton.First icon="undo" label="Undo" />
  <DualButton.Second icon="redo" label="Redo" />
</DualButton>

<DualButton>
  <DualButton.First icon="arrow-left" label="Previous" />
  <DualButton.Second icon="arrow-right" label="Next" />
</DualButton>
```

#### ❌ DON'T: Use Unrelated Actions

```jsx
{
  /* ❌ Bad: Unrelated actions */
}
<DualButton>
  <DualButton.First icon="close" label="Close" />
  <DualButton.Second icon="add-product" label="Add product" />
</DualButton>;
```

### States

Each button has independent states:

- Default
- Hover
- Pressed
- Disabled (per button)
- Loading (per button)

```jsx
<DualButton>
  <DualButton.First icon="minus" disabled />
  <DualButton.Second icon="plus" />
</DualButton>
```

### Accessibility

```jsx
<DualButton>
  <DualButton.First
    icon="arrow-left"
    label="Navigate to previous item"
    aria-label="Navigate to previous item"
  />
  <DualButton.Second
    icon="arrow-right"
    label="Navigate to next item"
    aria-label="Navigate to next item"
  />
</DualButton>
```

**Keyboard Interactions:**

| Key                | Action                               |
| ------------------ | ------------------------------------ |
| `Space` / `Return` | Triggers focused button action       |
| `Tab`              | Moves focus between buttons          |
| `Arrow Left/Right` | Move focus in horizontal orientation |
| `Arrow Up/Down`    | Move focus in vertical orientation   |

---

## Hyperlink

### Overview

**Purpose:** Text component that is clickable and takes users to another page.

**Last Updated:** 2025-06-04

**Accessibility:** Validated against WCAG 2.2 (June 1, 2025)

### Anatomy

```
This is a sentence with a [hyperlink] in it.
                           └─────────┘
                           Underlined, clickable text

Components:
- Hyperlink text (inherits parent color)
- Underline (emphasis)
- Focus indicator
- Optional icon (for external links)
```

### Variants

#### Regular Hyperlink

```jsx
<p>
  Here you will find everything from
  <Hyperlink href="/smart-home">smart home solutions</Hyperlink>
  to a large selection of bedroom furniture.
</p>
```

**Visual:** Underlined text, inherits parent color
**Use Case:** Body text or standalone links (not part of bigger context)
**Required:** Always underlined for emphasis

#### Subtle Hyperlink

```jsx
<nav>
  <Hyperlink variant="subtle" href="/planning">
    Planning Services
  </Hyperlink>
  <Hyperlink variant="subtle" href="/delivery">
    Delivery & collection
  </Hyperlink>
  <Hyperlink variant="subtle" href="/assembly">
    Assembly
  </Hyperlink>
</nav>
```

**Visual:** NOT underlined, bold text style
**Use Case:** Headings, navigation lists, footers, menus
**Requirements:**

- Only use when isolated in navigation contexts
- Clear that entire group is interactive
- ⚠️ **NEVER** use in body text (WCAG 2.2 F73 violation)

### When Part of Bigger Component

```jsx
<Card clickable>
  <CardTitle>
    <Hyperlink variant="subtle" href="/article">
      Small change, big impact
      <Icon name="arrow-right" />
    </Hyperlink>
  </CardTitle>
</Card>
```

**Rules:**

- Doesn't need underline if entire component is clickable
- Should be emphasized in bold text
- Typically accompanied by directional icon (arrow/chevron)
- Whole area should feel clickable

### Color

**Links inherit color from text styling:**

```css
/* ✅ Good: Use parent color styles */
.body-text a {
  color: inherit; /* Inherits from parent */
  text-decoration: underline;
}

/* ❌ Bad: Don't use accent/brand colors */
.body-text a {
  color: var(--color-yellow-ikea); /* Too prominent, confusing */
}
```

### Usage Guidelines

#### ✅ DO:

**Always Make Links Feel Clickable**

```jsx
// In body text: Always underline
<p>
  For more than 70 years, we have worked to create a
  <Hyperlink href="/about">better everyday life</Hyperlink>
  for the many people.
</p>
```

**Use Solid Backgrounds**

```jsx
{
  /* ✅ Good: Clear contrast */
}
<div style={{ background: "white" }}>
  <Hyperlink href="/stockholm">STOCKHOLM 2017</Hyperlink>
</div>;

{
  /* ❌ Bad: On image without solid background */
}
<div style={{ backgroundImage: "url(...)" }}>
  <Hyperlink href="/stockholm">STOCKHOLM 2017</Hyperlink>
</div>;
```

#### ❌ DON'T:

**Opening New Tabs**

- ⚠️ **Generally avoid** `target="_blank"`
- Loses context, breaks back button
- Accessibility issue, especially on mobile
- Only use if user needs to reference both tabs simultaneously

**Exceptions for New Tab:**

```jsx
// Only when absolutely necessary
<Hyperlink href="/terms" target="_blank" rel="noopener noreferrer">
  Terms & Conditions (opens in new tab)
</Hyperlink>
```

**External Link Icons**

- ⚠️ **Don't use** icons to indicate external sites
- Users misunderstand as "opens in new tab"
- If context change is important, write as text

```jsx
{
  /* ❌ Bad: Icon confusion */
}
<Hyperlink href="https://external.com">
  External site <Icon name="external" />
</Hyperlink>;

{
  /* ✅ Good: Text notification */
}
<Hyperlink href="https://external.com">
  External site (leaves IKEA website)
</Hyperlink>;
```

### Mobile Native Considerations

**Provide Adequate Clickable Area:**

```jsx
{
  /* ❌ Bad: Small touch target in text block */
}
<Text>
  Make your return faster. <Hyperlink href="/login">Log in</Hyperlink> to get
  info.
</Text>;

{
  /* ✅ Good: Use List or Buttons for actions */
}
<List>
  <ListItem onClick={handleReturn}>Make your return faster</ListItem>
  <ListItem onClick={handleLogin}>Log in for more info</ListItem>
</List>;
```

**Exception:** Terms & Conditions and similar legal text can use hyperlinks

### Accessibility

**WCAG 2.2 Compliance:**

```jsx
<Hyperlink href="/delivery" aria-label="Delivery and collection information">
  Delivery & collection
</Hyperlink>
```

**Technique F73:** Subtle variant must NOT be used in body text

**Keyboard Interactions:**

| Key               | Action               |
| ----------------- | -------------------- |
| `Tab`             | Navigates to link    |
| `Enter` / `Space` | Triggers link action |

**Focus State:**

```css
a:focus-visible {
  outline: 3px solid var(--color-blue-ikea);
  outline-offset: 2px;
  border-radius: 2px;
}
```

---

## Quick Reference: When to Use Which Action Component

---

## 7. Pill

### Overview

**Purpose:** A button that represents an attribute or unit of data (nouns/adjectives, NOT actions).

**Platforms:** Web, Android, iOS
**Last Updated:** May 14, 2025

**Key Distinction:**

- **Pills = DATA** (nouns, adjectives): "Kitchen", "Soft", "Blue", "Outdoor"
- **Buttons = ACTIONS** (verbs): "Shop", "Apply", "Continue", "Add to cart"

### Anatomy

```
┌───────────────┐
│ [🖼️] Label   │ ← Pill with optional icon/thumbnail
└───────────────┘
```

### Variants

#### 1. Text Pill

Basic label representing categories or attributes

```jsx
<Pill>Kitchens</Pill>
<Pill>Bathrooms</Pill>
<Pill>Outdoors</Pill>
```

#### 2. Icon Pill

Leading or trailing icons with label

```jsx
{
  /* Leading icon */
}
<Pill icon="delivery" iconPosition="leading">
  Delivery
</Pill>;

{
  /* Trailing icon */
}
<Pill icon="clipboard" iconPosition="trailing">
  Pre-order
</Pill>;
```

#### 3. Thumbnail Pill

Image thumbnail with label (profiles, categories)

```jsx
<Pill thumbnail="/images/user-avatar.jpg">
  Sarah Thompson
</Pill>

<Pill thumbnail="/images/category-bedroom.jpg">
  Bedroom
</Pill>
```

#### 4. Badge Pill

With quantity badge indicator

```jsx
<Pill badge={3}>
  Kitchen appliances
</Pill>

<Pill badge={12}>
  Outdoor furniture
</Pill>
```

### Sizes

**Medium:** Default, for larger screens (kiosks)
**Small:** Standard web and mobile
**Extra Small:** Dismissible filter pills (trailing X icon only)

```jsx
<Pill size="medium">Category</Pill>
<Pill size="small">Category</Pill>
<Pill size="xs" dismissible onDismiss={() => {}}>Filter</Pill>
```

### States

- **Default:** Unselected, interactive
- **Selected:** Active state (e.g., applied filter)
- **Disabled:** Non-interactive, grayed out
- **Loading:** Skeleton state while loading

```jsx
<Pill>Default</Pill>
<Pill selected>Selected</Pill>
<Pill disabled>Disabled</Pill>
```

### Behaviors

#### Fluid Width Container (Horizontal Scroll)

Pills overflow into horizontal scrollable carousel

```jsx
<PillGroup scrollable>
  <Pill>Kitchen</Pill>
  <Pill>Bedroom</Pill>
  <Pill>Living room</Pill>
  {/* ...20 more pills */}
</PillGroup>
```

#### Fixed Width Container (Multi-Row Wrap)

Pills wrap to multiple rows with "+N more" overflow button

```jsx
<PillGroup wrap maxVisible={5}>
  <Pill>Kitchen</Pill>
  <Pill>Bedroom</Pill>
  <Pill>Living room</Pill>
  <Pill>Bathroom</Pill>
  <Pill>Outdoor</Pill>
  {/* +15 more collapsed, shown in modal */}
</PillGroup>
```

### Usage Patterns

#### Pills as Selection (Checkbox Alternative)

Use for quizzes, preferences, attribute selection

```jsx
<fieldset>
  <legend>Select your room preferences</legend>
  <PillGroup type="checkbox" value={selectedRooms} onChange={setSelectedRooms}>
    <Pill value="kitchen">Kitchen</Pill>
    <Pill value="bedroom">Bedroom</Pill>
    <Pill value="living">Living room</Pill>
  </PillGroup>
</fieldset>
```

#### Pills as Input (Chatbot Suggestions)

Tap to populate input field

```jsx
<Stack>
  <TextInput placeholder="What are you looking for?" />
  <PillGroup onPillClick={handleSuggestion}>
    <Pill>Sofas</Pill>
    <Pill>Dining tables</Pill>
    <Pill>Bed frames</Pill>
  </PillGroup>
</Stack>
```

#### Dismissible Pills (Active Filters)

Remove applied filters with X icon

```jsx
<PillGroup>
  {activeFilters.map((filter) => (
    <Pill
      key={filter.id}
      size="xs"
      dismissible
      onDismiss={() => removeFilter(filter.id)}
    >
      {filter.label}
    </Pill>
  ))}
</PillGroup>
```

### Badge Integration

**Rules for Pills with Badges:**

- Use only Badge **Small, Black, Label Only** variant
- Maximum value: 99 (display as "+99" for larger numbers)
- Position: Trailing edge of pill

```jsx
<Pill badge={3}>Kitchen items</Pill>
<Pill badge={99}>Popular products</Pill>
<Pill badge={150}>Top sellers</Pill> {/* Displays "+99" */}
```

### Usage Guidelines

#### ✅ DO:

- Use pills to represent DATA (nouns, categories, attributes)
- Use for filtering, tagging, categorization
- Keep labels short (1-3 words)
- Use auto-width for natural sizing
- Provide clear selected/unselected states

```jsx
{
  /* ✅ GOOD: Data representation */
}
<PillGroup>
  <Pill>Modern</Pill>
  <Pill>Traditional</Pill>
  <Pill>Minimalist</Pill>
</PillGroup>;

{
  /* ✅ GOOD: Active filters */
}
<Stack>
  <Text>Active filters:</Text>
  <PillGroup>
    <Pill dismissible>Price: $0-$100</Pill>
    <Pill dismissible>Color: Blue</Pill>
  </PillGroup>
</Stack>;
```

#### ❌ DON'T:

- Use pills for ACTIONS (use Buttons instead)
- Use dismissible pills without X icon
- Exceed badge count of 99
- Use Medium size on mobile (use Small)
- Put long text in pills (keep concise)

```jsx
{/* ❌ BAD: Action words (use Button instead) */}
<Pill>Add to cart</Pill>
<Pill>Buy now</Pill>
<Pill>Continue shopping</Pill>

{/* ✅ GOOD: Use Button for actions */}
<Button>Add to cart</Button>
```

### Accessibility

**Keyboard Interactions:**

```jsx
<Pill
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handlePillClick();
    }
  }}
>
  Kitchen
</Pill>
```

**ARIA Attributes:**

```jsx
{
  /* Selection pattern */
}
<div role="group" aria-label="Room preferences">
  <Pill role="checkbox" aria-checked={isSelected}>
    Kitchen
  </Pill>
</div>;

{
  /* Dismissible pattern */
}
<Pill>
  <span>Active filter</span>
  <button aria-label="Remove filter">×</button>
</Pill>;
```

**Focus State:** 3px blue outline, 2px offset

### Pill vs Button Comparison

| Aspect          | Pill                            | Button                            |
| --------------- | ------------------------------- | --------------------------------- |
| **Represents**  | Data (nouns/adjectives)         | Actions (verbs)                   |
| **Examples**    | "Kitchen", "Blue", "Modern"     | "Add to cart", "Continue", "Shop" |
| **Primary Use** | Filtering, categorization, tags | Triggering actions                |
| **Selection**   | Can be multi-select             | Typically single action           |
| **Dismissible** | Yes (filters)                   | No                                |
| **Badge**       | Yes (quantities)                | No                                |

### Internationalization

- **RTL:** Pill labels are center-aligned, no visual difference
- **Icon position:** Leading/trailing flip in RTL
- **Dismissible X:** Moves to leading edge in RTL

---

## 8. Jumbo Button

### Overview

**Purpose:** Large, prominent button used to emphasize the final action in a linear flow (e.g., purchase journey).

**Platforms:** Web, Android, iOS
**Last Updated:** May 14, 2025

**Key Use Case:** Final step confirmation in critical user flows (payment, checkout, form submission)

### Anatomy

```
┌─────────────────────────────────────────┐
│ Complete purchase                    →  │ ← Button label + Trailing icon
└─────────────────────────────────────────┘
```

### Variants

#### Regular Jumbo Button

Used within a grid or container on larger screens (inset, inline)

```jsx
<JumboButton variant="regular" onClick={handlePurchase}>
  Complete purchase
</JumboButton>
```

#### Footer Jumbo Button

Spans edge-to-edge at bottom of container, typically on mobile (fills full width)

```jsx
<JumboButton variant="footer" onClick={handleSubmit}>
  Submit application
</JumboButton>
```

### States

- **Default:** Normal interactive state
- **Loading:** Shows spinner, prevents interaction
- **Disabled:** Non-interactive, grayed out

```jsx
<JumboButton>Complete purchase</JumboButton>
<JumboButton loading>Processing...</JumboButton>
<JumboButton disabled>Unavailable</JumboButton>
```

### Behaviors

#### Text Overflow

- Buttons respect fixed height
- Text can wrap up to 2 lines
- Truncates with ellipsis if exceeds 2 lines

```jsx
<JumboButton>Really really really long Jumbo Button label trunc...</JumboButton>
```

#### Link Conversion

Can be converted to `<a>` tag with `href` prop

```jsx
<JumboButton href="/checkout">Continue to checkout</JumboButton>;
{
  /* Renders as: <a class="jumbo-button" href="/checkout">...</a> */
}
```

### Usage Guidelines

#### ✅ DO:

- Use ONLY for the final step of a linear flow
- Present as standalone action on the screen
- Use clear, verb-based labels
- Be consistent across flow steps
- Use Regular variant on larger screens
- Use Footer variant on mobile

```jsx
{/* ✅ GOOD: Final step of checkout */}
<CheckoutFlow>
  <Step1>Contact information →</Step1>
  <Step2>Payment method →</Step2>
  <Step3>
    <OrderSummary />
    <JumboButton variant="footer">
      Complete purchase
    </JumboButton>
  </Step3>
</CheckoutFlow>

{/* ✅ GOOD: Clear verb-based label */}
<JumboButton>Complete purchase</JumboButton>
<JumboButton>Submit application</JumboButton>
<JumboButton>Confirm order</JumboButton>
```

#### ❌ DON'T:

- Pair with secondary actions (no "Cancel" button alongside)
- Use in middle steps of a flow
- Use for non-critical actions
- Use long sentence-like labels
- Mix Regular and Footer variants in same flow

```jsx
{
  /* ❌ BAD: Paired with secondary action */
}
<Stack>
  <JumboButton>Complete purchase</JumboButton>
  <Button variant="secondary">Continue shopping</Button>
</Stack>;

{
  /* ❌ BAD: Long label (provide context outside) */
}
<JumboButton>Let's complete your purchase and finalize the order</JumboButton>;

{
  /* ✅ GOOD: Context outside, concise label */
}
<Stack>
  <Text>Let's complete your purchase</Text>
  <JumboButton>Complete purchase</JumboButton>
</Stack>;
```

### Regular vs Footer Variants

**Regular Jumbo Button:**

- **Use on:** Larger screens (tablets, desktops)
- **Layout:** Inset and inline like typical button
- **Width:** Natural width or constrained by container
- **Why:** Footer variant feels too stretched on wide screens

**Footer Jumbo Button:**

- **Use on:** Mobile screens or narrow containers
- **Layout:** Edge-to-edge at bottom of screen/container
- **Width:** Full width (100%)
- **Why:** Makes button prominent and easy to tap on mobile

```jsx
{
  /* Desktop layout */
}
<Grid container="large">
  <PaymentForm />
  <JumboButton variant="regular">Complete purchase</JumboButton>
</Grid>;

{
  /* Mobile layout */
}
<Screen>
  <PaymentForm />
  <JumboButton variant="footer">Complete purchase</JumboButton>
</Screen>;
```

### Visual Emphasis

**Only use Jumbo Buttons in the final step** - Its visual prominence is most effective when conveying critical decisions like payment confirmation.

**Linear flow example:**

1. Contact information → (regular button)
2. Delivery details → (regular button)
3. Payment method → (regular button)
4. Order summary → **Complete purchase (Jumbo Button)**

### Button Labels

**Best practices:**

- Use a verb (action word)
- Be concise (2-4 words max)
- Set clear expectations
- Avoid sentences

**Good examples:**

- "Complete purchase"
- "Submit application"
- "Confirm order"
- "Finalize booking"

**Bad examples:**

- "Click here" (not descriptive)
- "Let's complete your purchase together" (too long)
- "Next" (not specific enough for final step)

### Accessibility

**Keyboard Interactions:**

| Key             | Action                |
| --------------- | --------------------- |
| `Tab`           | Navigate to button    |
| `Enter`/`Space` | Trigger button action |

**ARIA Attributes:**

```jsx
<button
  className="jumbo-button"
  aria-label="Complete purchase and finalize order"
  onClick={handlePurchase}
>
  Complete purchase →
</button>;

{
  /* Loading state */
}
<button
  className="jumbo-button"
  aria-busy="true"
  aria-label="Processing purchase"
  disabled
>
  <Spinner /> Processing...
</button>;
```

**Focus State:** 3px blue outline, 2px offset

### Internationalization

**RTL Languages:**

- Text and icon flip positions
- Icon moves from trailing (→) to leading (←) edge

```jsx
{
  /* LTR */
}
<JumboButton>Complete purchase →</JumboButton>;

{
  /* RTL */
}
<JumboButton dir="rtl">← إكمال الشراء</JumboButton>;
```

---

## Quick Reference: When to Use Which Action Component

```javascript
actionComponents: {
  Button: {
    primary: "Main action on screen (only one per screen)",
    secondary: "Supporting actions",
    tertiary: "Lowest priority actions",
    danger: "Destructive actions (data loss)",
    emphasised: "Critical call-to-action in important flows"
  },

  IconButton: {
    useCase: "Compact spaces, icon-only actions",
    requirement: "Icon must be recognizable without label",
    accessibility: "Always provide hidden label"
  },

  DualButton: {
    useCase: "Binary opposite actions only",
    examples: ["zoom in/out", "undo/redo", "previous/next"],
    rule: "Both buttons must correspond to each other"
  },

  Hyperlink: {
    regular: "Body text links (always underlined)",
    subtle: "Navigation lists, footers, menus (NOT body text)",
    rule: "Subtle variant violates WCAG 2.2 F73 if used in body text"
  },

  Pill: {
    useCase: "Represent DATA (nouns, attributes, categories)",
    patterns: ["filtering", "tagging", "selection", "chatbot suggestions"],
    rule: "Pills = data, Buttons = actions",
    dismissible: "Use for active filters with X icon"
  },

  JumboButton: {
    useCase: "Final step of linear flows (checkout, forms)",
    variants: ["regular (desktop)", "footer (mobile)"],
    rule: "Use ONLY for final critical action, never pair with secondary actions",
    emphasis: "Maximum visual prominence for conversion moments"
  }
}
```

---

**Next:** [03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md) - Forms, Text Fields, and Data Entry

```

---

**Next:** [03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md) - Forms, Text Fields, and Data Entry
```
