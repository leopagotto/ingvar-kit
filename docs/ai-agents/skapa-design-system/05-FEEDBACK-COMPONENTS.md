# 05 - Feedback Components

**Category:** User Feedback & Communication  
**Last Updated:** November 4, 2025  
**Source:** Skapa Design System (skapa.ikea.net) - OCR Extracted Nov 2, 2025

---

## Overview

Feedback components communicate system status, user actions, and important information. They guide users through processes and inform them of successes, errors, or required actions.

**Components in this Guide:**
1. Toast
2. Banner
3. Inline Message
4. Modal Containers (Sheet, Theatre, Prompt)
5. Loading (Skeleton, Progress Indicator)
6. Status
7. Helper Text

---

## 1. Toast

### Overview

**Purpose:** Brief, non-interruptive messages that float above screen content providing instant feedback.

**Platforms:** Figma, React, Vue, Web Components, Android, iOS

**Key Principle:** Toasts should only be triggered by user actions or system feedback, never for arbitrary messaging.

### Anatomy

```
┌─────────────────────────────────────┐
│  Body Text Message ──────── [X]    │
│  (optional action link)             │
└─────────────────────────────────────┘
        Background + Close Button
```

**Example:**
```
┌─────────────────────────────────────┐
│  BILLY was added to your bag   [X] │
└─────────────────────────────────────┘
```

### Variants

#### 1. Basic Toast
Simple feedback message without actions.

```jsx
<Toast>
  <Toast.Body>Profile updated</Toast.Body>
  <Toast.CloseButton aria-label="Close notification" />
</Toast>
```

#### 2. Action Toast
Includes a single text action (use with caution).

```jsx
<Toast>
  <Toast.Body>BILLY was added to your bag</Toast.Body>
  <Toast.Action href="/bag">View</Toast.Action>
  <Toast.CloseButton />
</Toast>
```

⚠️ **Action Accessibility:** Actions must also be accessible elsewhere in the UI (not only in Toast).

#### 3. Banner Style
Full-width banner at top of screen (mobile).

```jsx
<Toast variant="banner" position="top">
  <Toast.Body>Message</Toast.Body>
  <Toast.CloseButton />
</Toast>
```

#### 4. Bar Style
Rounded corners, inset from edges (desktop).

```jsx
<Toast variant="bar" position="top-right">
  <Toast.Body>Message</Toast.Body>
  <Toast.CloseButton />
</Toast>
```

### Positioning

**Platform-Specific:**
- **iOS & Web:** Top center (banner) or top-right (bar)
- **Android:** Bottom center
- **Desktop Web:** Top-right corner (bar style)

```jsx
// iOS/Web
<Toast position="top" variant="banner">...</Toast>
<Toast position="top-right" variant="bar">...</Toast>

// Android
<Toast position="bottom" variant="banner">...</Toast>
```

### Behaviors

#### Auto-Dismissal
- **Minimum:** 5000ms (5 seconds)
- **Maximum:** 10000ms (10 seconds)
- **Formula:** 50ms × character count

```javascript
// Calculate lifespan
const characterCount = message.length;
const calculatedLifespan = characterCount * 50; // ms
const lifespan = Math.min(
  Math.max(calculatedLifespan, 5000), 
  10000
);
```

**Example:** 141 characters = 7,050ms ≈ 7 seconds

#### Manual Dismissal
1. **Close button:** Click/tap X icon
2. **Swipe gesture:** Swipe in opposite direction of entry

```jsx
<Toast 
  autoClose={7000}
  onClose={handleClose}
  swipeable
  swipeDirection="up" // Opposite of entry direction
>
  {/* Toast content */}
</Toast>
```

#### Interrupt Auto-Dismissal
- Hover (mouse) or focus (keyboard) pauses timer
- Timer resets to full duration on mouse-out/blur

```jsx
<Toast
  pauseOnHover
  pauseOnFocusWithin
  onAutoCloseChange={(isPaused) => console.log('Paused:', isPaused)}
>
  {/* Content */}
</Toast>
```

#### Toast Priority
- Only one Toast visible at a time
- New Toast replaces previous instantly
- Most recent Toast has priority

### States

- **Entering:** Slide animation from edge
- **Visible:** Fixed position, full opacity
- **Paused:** Auto-dismiss timer paused (on hover/focus)
- **Exiting:** Slide animation out

### Motion

```javascript
// Entry animation
duration: 300ms
easing: 'ease-out'
direction: 'slide-down' // or 'slide-up' for bottom

// Exit animation
duration: 200ms
easing: 'ease-in'
direction: 'slide-up' // or 'slide-down' for bottom
```

### Usage Guidelines

#### ✅ DO:
- Use for confirming user actions
- Keep messages short and scannable
- Trigger only from user actions or system feedback
- Display one Toast at a time
- Calculate lifespan based on character count

#### ❌ DON'T:
- Use for arbitrary messaging unrelated to actions
- Stack multiple Toasts
- Include long messages (max ~140 chars)
- Use for critical information requiring user response
- Include essential actions only in Toast

### Toast vs. Modal
**Toast:** Brief, non-interruptive, auto-dismisses  
**Modal:** Requires attention, blocks interaction, user must dismiss

```jsx
// ✅ Good: Non-disruptive confirmation
<Toast>BILLY was added to your bag</Toast>

// ❌ Bad: Requires response (use Modal)
<Toast>Delete this item? [Yes] [No]</Toast>
```

### Toast vs. Inline Message
**Toast:** Temporary feedback on actions  
**Inline Message:** Persistent contextual information, warnings, errors

```jsx
// ✅ Good: Action confirmation
<Toast>Product was added to bag</Toast>

// ❌ Bad: Should use Inline Message for errors
<Toast type="error">Invalid email address</Toast>
```

### Accessibility

```jsx
<Toast
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  <Toast.Body>Profile updated</Toast.Body>
  <Toast.CloseButton aria-label="Close notification" />
</Toast>
```

**Requirements:**
- Use `role="status"` or `role="alert"` (urgent)
- Set `aria-live="polite"` (or "assertive" for urgent)
- Provide descriptive `aria-label` for close button
- Ensure sufficient contrast (WCAG AA)
- Keyboard focusable if includes action

---

## 2. Banner

### Overview

**Purpose:** Prominent messages displayed at top of page for important announcements or system-wide notifications.

**Use Cases:** Site-wide alerts, promotions, maintenance notices

### Anatomy

```
┌──────────────────────────────────────────┐
│ [Icon] Message Text ───────────── [X]   │
│        Optional action link              │
└──────────────────────────────────────────┘
```

### Variants

#### Info Banner

```jsx
<Banner variant="info">
  <Banner.Icon name="info-circle" />
  <Banner.Message>
    We're updating our website. Some features may be temporarily unavailable.
  </Banner.Message>
  <Banner.CloseButton />
</Banner>
```

#### Success Banner

```jsx
<Banner variant="success">
  <Banner.Icon name="check-circle" />
  <Banner.Message>Your order has been confirmed!</Banner.Message>
  <Banner.Action href="/orders/12345">View order</Banner.Action>
  <Banner.CloseButton />
</Banner>
```

#### Warning Banner

```jsx
<Banner variant="warning">
  <Banner.Icon name="warning-triangle" />
  <Banner.Message>
    Your session will expire in 5 minutes. Save your work.
  </Banner.Message>
  <Banner.Action onClick={extendSession}>Extend session</Banner.Action>
</Banner>
```

#### Error Banner

```jsx
<Banner variant="error">
  <Banner.Icon name="x-circle" />
  <Banner.Message>Unable to process payment. Please try again.</Banner.Message>
  <Banner.Action onClick={retry}>Retry</Banner.Action>
  <Banner.CloseButton />
</Banner>
```

### Positioning
- **Fixed top:** Stays visible while scrolling
- **Inline top:** Pushes content down
- **Fixed bottom:** Sticky footer style

```jsx
<Banner position="fixed-top">...</Banner>
<Banner position="inline-top">...</Banner>
<Banner position="fixed-bottom">...</Banner>
```

### States
- **Visible:** Banner displayed
- **Dismissed:** User closed banner
- **Hidden:** Banner removed from DOM

### Usage Guidelines

#### ✅ DO:
- Use for important system-wide messages
- Keep text concise and actionable
- Use appropriate variant for message type
- Allow dismissal for non-critical banners

#### ❌ DON'T:
- Use multiple banners simultaneously
- Use for regular content
- Block critical UI elements
- Make all banners non-dismissible

---

## 3. Inline Message

### Overview

**Purpose:** Contextual feedback within forms, sections, or pages for validation, errors, and informational messages.

**Use Cases:** Form validation, contextual help, section-level feedback

### Anatomy

```
┌─────────────────────────────────────┐
│ [!] Title (optional)                │
│     Message text with details       │
│     [Optional Action Button]        │
└─────────────────────────────────────┘
```

### Variants

#### Info Message

```jsx
<InlineMessage variant="info">
  <InlineMessage.Icon name="info-circle" />
  <InlineMessage.Content>
    <InlineMessage.Title>Delivery Information</InlineMessage.Title>
    <InlineMessage.Body>
      Free shipping on orders over $50.
    </InlineMessage.Body>
  </InlineMessage.Content>
</InlineMessage>
```

#### Success Message

```jsx
<InlineMessage variant="success">
  <InlineMessage.Icon name="check-circle" />
  <InlineMessage.Content>
    <InlineMessage.Title>Payment Successful</InlineMessage.Title>
    <InlineMessage.Body>
      Your order #12345 has been confirmed.
    </InlineMessage.Body>
  </InlineMessage.Content>
  <InlineMessage.Action href="/orders/12345">
    View order
  </InlineMessage.Action>
</InlineMessage>
```

#### Warning Message

```jsx
<InlineMessage variant="warning">
  <InlineMessage.Icon name="warning-triangle" />
  <InlineMessage.Content>
    <InlineMessage.Title>Stock Running Low</InlineMessage.Title>
    <InlineMessage.Body>
      Only 3 items left in stock. Order soon.
    </InlineMessage.Body>
  </InlineMessage.Content>
</InlineMessage>
```

#### Error Message

```jsx
<InlineMessage variant="error">
  <InlineMessage.Icon name="x-circle" />
  <InlineMessage.Content>
    <InlineMessage.Title>Payment Failed</InlineMessage.Title>
    <InlineMessage.Body>
      Your credit card was declined. Please try another payment method.
    </InlineMessage.Body>
  </InlineMessage.Content>
  <InlineMessage.Action onClick={changePayment}>
    Change payment method
  </InlineMessage.Action>
</InlineMessage>
```

### Usage Guidelines

#### ✅ DO:
- Use for contextual feedback within sections
- Provide clear, actionable guidance
- Use appropriate variant for message severity
- Place near related content

#### ❌ DON'T:
- Use for global site-wide messages (use Banner)
- Use for temporary feedback (use Toast)
- Overload pages with too many messages
- Use without icon for variant identification

### Accessibility

```jsx
<InlineMessage
  variant="error"
  role="alert"
  aria-live="assertive"
>
  <InlineMessage.Icon aria-hidden="true" />
  <InlineMessage.Content>
    <InlineMessage.Title id="error-title">
      Payment Failed
    </InlineMessage.Title>
    <InlineMessage.Body aria-describedby="error-title">
      Your credit card was declined.
    </InlineMessage.Body>
  </InlineMessage.Content>
</InlineMessage>
```

---

## 4. Modal Containers

### Overview

**Purpose:** Overlay components that focus user attention on specific tasks or information.

**Types:** Sheet, Theatre, Prompt

### 4.1 Sheet

**Purpose:** Side panel for forms, details, or secondary content.

**Anatomy:**
```
┌────────────────┬──────────────────┐
│                │ [X]              │
│                │ Sheet Title      │
│  Main Content  │ ─────────────── │
│                │ Sheet content... │
│                │                  │
│                │ [Actions]        │
└────────────────┴──────────────────┘
     Page              Sheet (overlay)
```

**Implementation:**

```jsx
<Sheet open={isOpen} onClose={handleClose} position="right">
  <Sheet.Header>
    <Sheet.Title>Filter Products</Sheet.Title>
    <Sheet.CloseButton aria-label="Close filter" />
  </Sheet.Header>
  
  <Sheet.Body>
    <FilterForm />
  </Sheet.Body>
  
  <Sheet.Footer>
    <Button variant="secondary" onClick={handleReset}>
      Reset
    </Button>
    <Button variant="primary" onClick={handleApply}>
      Apply Filters
    </Button>
  </Sheet.Footer>
</Sheet>
```

**Positions:**
- `right` (default) - Slides from right edge
- `left` - Slides from left edge
- `bottom` - Slides from bottom (mobile)

### 4.2 Theatre

**Purpose:** Full-screen overlay for rich content (images, videos, large forms).

**Anatomy:**
```
┌────────────────────────────────────┐
│  [X]                               │
│                                    │
│         Theatre Title              │
│                                    │
│  ──────────────────────────────   │
│  Content area (centered)           │
│                                    │
│  ──────────────────────────────   │
│                                    │
│         [Actions]                  │
└────────────────────────────────────┘
```

**Implementation:**

```jsx
<Theatre open={isOpen} onClose={handleClose}>
  <Theatre.Header>
    <Theatre.Title>Product Gallery</Theatre.Title>
    <Theatre.CloseButton />
  </Theatre.Header>
  
  <Theatre.Body>
    <ImageCarousel images={productImages} />
  </Theatre.Body>
  
  <Theatre.Footer>
    <Button onClick={handleAddToCart}>Add to cart</Button>
  </Theatre.Footer>
</Theatre>
```

### 4.3 Prompt

**Purpose:** Confirmation dialogs requiring user decision.

**Anatomy:**
```
┌──────────────────────────────────┐
│  [!] Prompt Title                │
│  ────────────────────────────    │
│  Prompt message explaining       │
│  the action consequences.        │
│                                  │
│  [Cancel] [Confirm Action]       │
└──────────────────────────────────┘
```

**Implementation:**

```jsx
<Prompt
  open={isOpen}
  onClose={handleClose}
  variant="destructive" // or "default"
>
  <Prompt.Icon name="warning-triangle" />
  <Prompt.Title>Delete product?</Prompt.Title>
  <Prompt.Body>
    This action cannot be undone. The product will be permanently removed.
  </Prompt.Body>
  
  <Prompt.Actions>
    <Button variant="secondary" onClick={handleClose}>
      Cancel
    </Button>
    <Button variant="danger" onClick={handleConfirm}>
      Delete product
    </Button>
  </Prompt.Actions>
</Prompt>
```

### Modal Behaviors

#### Focus Management
- Focus moves to modal on open
- Focus trapped within modal
- Focus returns to trigger on close

```jsx
<Modal
  open={isOpen}
  onClose={handleClose}
  initialFocus={firstInputRef}
  returnFocus={triggerButtonRef}
>
  {/* Content */}
</Modal>
```

#### Backdrop
- Click outside to close (optional)
- Backdrop overlay dims background

```jsx
<Modal
  closeOnBackdropClick={true}
  backdropOpacity={0.5}
>
  {/* Content */}
</Modal>
```

#### Scrolling
- Body scroll locked when modal open
- Modal content scrollable if needed

```jsx
<Modal
  lockBodyScroll={true}
  maxHeight="90vh"
  overflowY="auto"
>
  {/* Content */}
</Modal>
```

### Accessibility

```jsx
<Modal
  open={isOpen}
  onClose={handleClose}
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  role="dialog"
  aria-modal="true"
>
  <Modal.Title id="modal-title">Modal Title</Modal.Title>
  <Modal.Body id="modal-description">
    Modal content description
  </Modal.Body>
</Modal>
```

**Keyboard Navigation:**
- `Esc` - Close modal
- `Tab` - Cycle through focusable elements
- `Shift+Tab` - Reverse cycle
- Focus trap prevents tabbing outside modal

---

## 5. Loading States

### 5.1 Skeleton

**Purpose:** Placeholder that mimics content structure during loading.

**Implementation:**

```jsx
<Skeleton>
  <Skeleton.Image aspectRatio="16:9" width="100%" />
  <Skeleton.Title width="80%" />
  <Skeleton.Text lines={3} />
  <Skeleton.Button width={120} />
</Skeleton>
```

**Variants:**

```jsx
// Card skeleton
<Skeleton variant="card">
  <Skeleton.Image aspectRatio="1:1" />
  <Skeleton.Title />
  <Skeleton.Text lines={2} />
</Skeleton>

// List item skeleton
<Skeleton variant="list-item">
  <Skeleton.Avatar size={40} />
  <Skeleton.Text lines={2} />
</Skeleton>

// Text skeleton
<Skeleton variant="text" lines={5} />
```

### 5.2 Progress Indicator

**Purpose:** Shows loading progress with determinate or indeterminate state.

#### Linear Progress

```jsx
// Determinate (known progress)
<ProgressBar value={65} max={100} />

// Indeterminate (unknown duration)
<ProgressBar indeterminate />
```

#### Circular Progress

```jsx
// Determinate
<CircularProgress value={75} max={100} size={48} />

// Indeterminate (spinner)
<CircularProgress indeterminate size={32} />
```

### Usage Guidelines

#### ✅ DO:
- Use Skeleton for initial page load
- Use Progress for known operations
- Match skeleton shape to actual content
- Provide loading text for screen readers

#### ❌ DON'T:
- Use both Skeleton and Progress together
- Show loading states for <500ms operations
- Use indeterminate progress for long operations

---

## 6. Status

### Overview

**Purpose:** Visual indicators for states, statuses, and conditions.

### Variants

```jsx
// Status badges
<Status variant="success">Active</Status>
<Status variant="warning">Pending</Status>
<Status variant="error">Failed</Status>
<Status variant="info">Processing</Status>
<Status variant="neutral">Draft</Status>
```

### With Icons

```jsx
<Status variant="success" icon="check-circle">
  Delivered
</Status>
```

### Usage in Lists

```jsx
<ListItem>
  <ListItem.Text>Order #12345</ListItem.Text>
  <Status variant="success">Delivered</Status>
</ListItem>
```

---

## 7. Helper Text

### Overview

**Purpose:** Supplementary text providing guidance, context, or error messages for form fields.

### Variants

#### Default (Guidance)

```jsx
<FormField>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
  <HelperText>We'll never share your email with anyone.</HelperText>
</FormField>
```

#### Error

```jsx
<FormField error>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" aria-invalid="true" />
  <HelperText variant="error" id="email-error">
    Please enter a valid email address
  </HelperText>
</FormField>
```

#### Success

```jsx
<FormField>
  <Label htmlFor="username">Username</Label>
  <Input id="username" />
  <HelperText variant="success">
    Username is available!
  </HelperText>
</FormField>
```

### Accessibility

```jsx
<FormField>
  <Label htmlFor="password">Password</Label>
  <Input
    id="password"
    type="password"
    aria-describedby="password-help"
    aria-invalid={hasError}
  />
  <HelperText id="password-help">
    Must be at least 8 characters
  </HelperText>
</FormField>
```

---

## Summary: Feedback Components

| Component | Use Case | Urgency | Dismissible | Auto-Close |
|-----------|----------|---------|-------------|------------|
| **Toast** | Action confirmation | Low | Yes | Yes (5-10s) |
| **Banner** | Site-wide alerts | Medium | Optional | No |
| **Inline Message** | Contextual feedback | Medium | No | No |
| **Modal** | Task focus | High | Yes | No |
| **Skeleton** | Loading placeholder | - | No | On load |
| **Progress** | Operation status | - | No | On complete |
| **Status** | State indicators | - | No | No |
| **Helper Text** | Field guidance | Low | No | No |

---

**Next:** [06-NAVIGATION-COMPONENTS.md](./06-NAVIGATION-COMPONENTS.md) - Tabs, Menus, App Bar

**Previous:** [04-DISPLAY-COMPONENTS.md](./04-DISPLAY-COMPONENTS.md) - Cards, Lists, Tables
