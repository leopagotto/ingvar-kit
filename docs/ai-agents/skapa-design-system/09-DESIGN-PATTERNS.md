# 09: Design Patterns

> **For AI Agents:** Complete guide to Skapa design patterns for building consistent, user-friendly interfaces. Use these patterns to solve common UX challenges with proven solutions.

**Last Updated:** 2025-11-04
**Status:** Complete
**Pattern Count:** 12 patterns

---

## Quick Reference

| Pattern                                       | Use Case                         | Key Components               | Complexity |
| --------------------------------------------- | -------------------------------- | ---------------------------- | ---------- |
| [Filtering](#1-filtering-pattern)             | Product browsing, search results | Pill, Listbox, Button        | Medium     |
| [Empty States](#2-empty-states)               | No content scenarios             | Text, Button, Illustration   | Simple     |
| [Loading States](#3-loading-states)           | Data fetching, processing        | Skeleton, Progress Indicator | Simple     |
| [Selection Patterns](#4-selection-patterns)   | Multi-select, single-select      | Checkbox, Radio, Listbox     | Medium     |
| [Forms](#5-forms-pattern)                     | Data entry, user input           | InputField, Select, Button   | Complex    |
| [Modal Containers](#6-modal-containers)       | Dialogs, overlays                | Sheet, Prompt, Theatre       | Medium     |
| [Feedback Collection](#7-feedback-collection) | User feedback, ratings           | Rating, TextArea, Button     | Medium     |
| [Overflows](#8-overflows)                     | Content truncation               | Expander, Tooltip, Menu      | Simple     |
| [Dark Mode](#9-dark-mode)                     | Theme switching                  | Color tokens, IconButton     | Simple     |
| [Data Visualisation](#10-data-visualisation)  | Charts, metrics                  | Custom components            | Complex    |

---

## Pattern Categories

### Interaction Patterns

- [Filtering](#1-filtering-pattern)
- [Selection Patterns](#4-selection-patterns)
- [Forms](#5-forms-pattern)
- [Feedback Collection](#7-feedback-collection)

### Layout Patterns

- [Empty States](#2-empty-states)
- [Loading States](#3-loading-states)
- [Modal Containers](#6-modal-containers)
- [Overflows](#8-overflows)

### Visual Patterns

- [Dark Mode](#9-dark-mode)
- [Data Visualisation](#10-data-visualisation)

---

## 1. Filtering Pattern

### Overview

**Purpose:** Enable users to narrow down collections of items (products, content, search results) using relevant facets.

**When to Use:**

- Product listing pages with 10+ items
- Search results with multiple filter criteria
- Data tables with filterable columns
- Shopping/browsing experiences

**When NOT to Use:**

- Small lists (< 10 items) - use sorting instead
- Single-criterion filtering - use a single Select
- Real-time search is sufficient

### Best Practices

**Prioritize commonly used filters:**

```tsx
// ✅ GOOD: Most-used filters first
<div className="filters">
  <Pill>Sort ▾</Pill>
  <Pill>Price ▾</Pill>
  <Pill>Color ▾</Pill>
  <Pill>Size ▾</Pill>
  <Pill>Material ▾</Pill>
</div>
```

**Create category-specific filters:**

- **Mattresses:** Sort, Price, Size, Firmness, Mattress type, Thickness
- **Dining tables:** Sort, Price, Color, Shape, Seating capacity, Material
- **Sofas:** Sort, Price, Color, Style, Seating capacity, Material

**Use filters to teach customers:**

```tsx
<Listbox label="Firmness">
  <Listbox.Item value="soft">
    <div>
      <strong>Soft</strong>
      <p>Best for side sleepers</p>
    </div>
  </Listbox.Item>
  <Listbox.Item value="medium">
    <div>
      <strong>Medium</strong>
      <p>Best for all sleepers</p>
    </div>
  </Listbox.Item>
  <Listbox.Item value="firm">
    <div>
      <strong>Firm</strong>
      <p>Best for back sleepers</p>
    </div>
  </Listbox.Item>
</Listbox>
```

**Use natural language:**

- ❌ "Dimension: 160x200cm"
- ✅ "Size: Queen"

**Provide instant feedback:**

```tsx
const [filters, setFilters] = useState({ color: [], price: [] });
const [products, setProducts] = useState([]);

useEffect(() => {
  // Update results immediately when filters change
  const filtered = applyFilters(allProducts, filters);
  setProducts(filtered);
}, [filters]);
```

### Implementation Example

```tsx
import { Pill, Listbox, Button } from "@ingvar-kit/skapa-components";
import { useState } from "react";

function ProductFilters({ onFilterChange }) {
  const [priceOpen, setPriceOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [],
    color: [],
    size: [],
  });

  const handleFilterChange = (category, values) => {
    const newFilters = { ...selectedFilters, [category]: values };
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filters">
      {/* Sort - Always first */}
      <Pill onClick={() => handleSort()}>Sort ▾</Pill>

      {/* Price Filter */}
      <Pill onClick={() => setPriceOpen(!priceOpen)}>
        Price{" "}
        {selectedFilters.price.length > 0 &&
          `(${selectedFilters.price.length})`}{" "}
        ▾
      </Pill>
      {priceOpen && (
        <Listbox
          multiple
          value={selectedFilters.price}
          onChange={(values) => handleFilterChange("price", values)}
          onClose={() => setPriceOpen(false)}
        >
          <Listbox.Item value="0-50">$0 - $50</Listbox.Item>
          <Listbox.Item value="50-100">$50 - $100</Listbox.Item>
          <Listbox.Item value="100-200">$100 - $200</Listbox.Item>
          <Listbox.Item value="200+">$200+</Listbox.Item>
        </Listbox>
      )}

      {/* Color Filter */}
      <Pill onClick={() => setColorOpen(!colorOpen)}>
        Color{" "}
        {selectedFilters.color.length > 0 &&
          `(${selectedFilters.color.length})`}{" "}
        ▾
      </Pill>
      {colorOpen && (
        <Listbox
          multiple
          value={selectedFilters.color}
          onChange={(values) => handleFilterChange("color", values)}
          onClose={() => setColorOpen(false)}
        >
          <Listbox.Item value="white">White</Listbox.Item>
          <Listbox.Item value="black">Black</Listbox.Item>
          <Listbox.Item value="brown">Brown</Listbox.Item>
          <Listbox.Item value="gray">Gray</Listbox.Item>
          <Listbox.Item value="blue">Blue</Listbox.Item>
        </Listbox>
      )}

      {/* Clear filters */}
      {(selectedFilters.price.length > 0 ||
        selectedFilters.color.length > 0) && (
        <Button
          variant="tertiary"
          onClick={() => setSelectedFilters({ price: [], color: [], size: [] })}
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
```

### Accessibility

- **Keyboard:** Tab to Pills, Enter/Space to open, Arrow keys in Listbox
- **Screen reader:** Announce filter count: "Price filter, 2 selected"
- **Focus management:** Return focus to Pill after closing Listbox
- **ARIA:** `role="menu"` on filter container, `aria-expanded` on Pills

---

## 2. Empty States

### Overview

**Purpose:** Reassure users that the interface is working when no content is available, and guide them toward next actions.

**When to Use:**

- Empty shopping cart/wishlist
- No search results
- First-time user experience
- Unavailable content/products
- Error states with no content

**When NOT to Use:**

- Loading states (use Loading pattern instead)
- Temporary states that resolve quickly
- Error states that need immediate attention (use Banner instead)

### Anatomy

```
┌─────────────────────────────────────┐
│                                     │
│              [Icon]                 │ ← Optional illustration
│                                     │
│         Your bag is empty           │ ← Description/Headline
│                                     │
│   Nothing to see here yet.          │ ← Supporting text
│   Let's find something you like?    │
│                                     │
│         [Browse Products]           │ ← Call to action
│                                     │
│     ┌───────┐  ┌───────┐           │
│     │Product│  │Product│           │ ← Alternative content
│     └───────┘  └───────┘           │
│                                     │
└─────────────────────────────────────┘
```

### Types of Empty States

**1. Starter Content**

```tsx
<EmptyState
  icon="shopping-bag"
  title="Your bag is empty"
  description="Have an account? Login to see items you may have added on a different device."
  action={
    <Button variant="secondary" onClick={handleLogin}>
      Login
    </Button>
  }
  alternatives={
    <div className="product-suggestions">
      <h3>Popular picks</h3>
      <ProductGrid products={popularProducts} />
    </div>
  }
/>
```

**2. Alternative Content**

```tsx
// Product not found
<EmptyState
  icon="search"
  title="Uh-oh. Product not found."
  description="Sorry, this product is no longer sold. Let's find something else you might like?"
  alternatives={
    <>
      <h3>Similar sofas</h3>
      <div className="alternatives">
        <Card product={similarProduct1} />
        <Card product={similarProduct2} />
      </div>
    </>
  }
/>
```

**3. Instructional Content**

```tsx
// Store locator - no results
<EmptyState
  icon="location"
  title="Find and pick up at your local IKEA store"
  description="Sorry, we couldn't find a store near you. Please check to make sure the address you provided is right."
  action={
    <InputField
      label="Search by city, state"
      value={searchQuery}
      onChange={setSearchQuery}
    />
  }
/>
```

### Best Practices

**DO:**

- ✅ Use friendly, conversational tone
- ✅ Provide clear next steps
- ✅ Suggest alternative actions/content
- ✅ Keep illustrations simple and on-brand
- ✅ Make CTAs action-oriented

**DON'T:**

- ❌ Use technical error messages
- ❌ Leave users without options
- ❌ Overcrowd with competing elements
- ❌ Use illustration for every empty state
- ❌ Make users feel stuck

### Implementation Example

```tsx
import { Button, Card, InputField } from "@ingvar-kit/skapa-components";

function EmptyState({ type, onAction }) {
  if (type === "empty-cart") {
    return (
      <div className="empty-state">
        <svg className="empty-state__icon" />
        <h2>Your bag is empty</h2>
        <p>Nothing to see here yet. Let's find something you might like?</p>
        <Button onClick={() => onAction("browse")}>Browse products</Button>

        <div className="empty-state__alternatives">
          <h3>Easy picks</h3>
          <div className="product-grid">
            {popularProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (type === "no-search-results") {
    return (
      <div className="empty-state">
        <svg className="empty-state__icon" />
        <h2>No results found</h2>
        <p>Try adjusting your search or filters</p>
        <div className="empty-state__actions">
          <Button variant="secondary" onClick={() => onAction("clear-filters")}>
            Clear filters
          </Button>
          <Button variant="tertiary" onClick={() => onAction("reset-search")}>
            New search
          </Button>
        </div>
      </div>
    );
  }

  // Default empty state
  return (
    <div className="empty-state">
      <p>No content available</p>
    </div>
  );
}
```

### Accessibility

- **Semantic HTML:** Use `<section role="status">` for empty states
- **Screen reader:** Announce state change when content becomes empty
- **Focus management:** Move focus to first actionable element
- **ARIA:** `aria-live="polite"` for dynamic empty states

---

## 3. Loading States

### Overview

**Purpose:** Indicate that content is being fetched or processed, maintaining user confidence and reducing perceived wait time.

**When to Use:**

- Initial page load (> 500ms)
- API data fetching
- Image/content loading
- Form submission processing
- Search queries

**When NOT to Use:**

- Very fast operations (< 300ms)
- Background updates that don't block UI
- Non-critical lazy-loaded content

### Types of Loading States

**1. Skeleton Loading** (Preferred for content)

```tsx
import { Skeleton } from "@ingvar-kit/skapa-components";

<div className="product-card">
  <Skeleton variant="rectangular" width="100%" height={200} />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="60%" />
  <div className="product-card__footer">
    <Skeleton variant="text" width="40%" />
    <Skeleton variant="rectangular" width={100} height={36} />
  </div>
</div>;
```

**2. Progress Indicator** (Determinate)

```tsx
import { ProgressIndicator } from '@ingvar-kit/skapa-components';

// Linear progress with percentage
<ProgressIndicator
  variant="linear"
  value={uploadProgress}
  label="Uploading..."
/>

// Circular progress
<ProgressIndicator
  variant="circular"
  value={loadProgress}
  size="large"
/>
```

**3. Progress Indicator** (Indeterminate)

```tsx
// When duration is unknown
<ProgressIndicator
  variant="linear"
  indeterminate
  label="Processing your order..."
/>
```

### Best Practices

**Skeleton screens:**

- ✅ Mirror the actual content structure
- ✅ Use for initial page loads
- ✅ Maintain layout to prevent shift
- ✅ Animate with subtle pulse

**Progress indicators:**

- ✅ Use determinate when duration is known
- ✅ Show percentage for file uploads
- ✅ Add descriptive labels
- ✅ Use indeterminate for unknown duration

**General:**

- ✅ Set minimum display time (300-500ms) to avoid flicker
- ✅ Provide feedback for operations > 1 second
- ✅ Use appropriate loading pattern for context
- ✅ Consider perceived performance

### Implementation Example

```tsx
import { Skeleton, ProgressIndicator } from "@ingvar-kit/skapa-components";
import { useState, useEffect } from "react";

function ProductList() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="product-grid">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="product-card">
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
            <div className="product-card__footer">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="rectangular" width={100} height={36} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// File upload with progress
function FileUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file) => {
    setUploading(true);
    setProgress(0);

    await uploadFile(file, (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      setProgress(percentCompleted);
    });

    setUploading(false);
  };

  if (uploading) {
    return (
      <div className="upload-progress">
        <ProgressIndicator
          variant="linear"
          value={progress}
          label={`Uploading... ${progress}%`}
        />
      </div>
    );
  }

  return (
    <input type="file" onChange={(e) => handleUpload(e.target.files[0])} />
  );
}
```

### Accessibility

- **ARIA:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Screen reader:** Announce loading state and completion
- **Keyboard:** Don't trap focus during loading
- **Motion:** Respect `prefers-reduced-motion`

---

## 4. Selection Patterns

### Overview

**Purpose:** Enable users to select one or multiple options from a set of choices.

**When to Use:**

- Single choice from 2-5 options (Radio)
- Multiple selections (Checkbox)
- Single choice from many options (Select/Listbox)
- Comparison/selection of items (Checkbox cards)

### Selection Type Decision Tree

```
Is it a single selection?
├─ YES
│  └─ How many options?
│     ├─ 2-5 options → Use Radio Button
│     ├─ 6-10 options → Use Select/Listbox
│     └─ 10+ options → Use Combobox (searchable)
└─ NO (multiple selections)
   └─ How many options?
      ├─ 2-5 options → Use Checkbox group
      ├─ 6-10 options → Use Listbox (multiple)
      └─ 10+ options → Use Combobox (multiple, searchable)
```

### Best Practices

**Radio Buttons:**

```tsx
// ✅ GOOD: Clear, mutually exclusive options
<RadioGroup label="Delivery method">
  <Radio value="standard">Standard (3-5 days)</Radio>
  <Radio value="express">Express (1-2 days)</Radio>
  <Radio value="pickup">Click & Collect (Today)</Radio>
</RadioGroup>
```

**Checkboxes:**

```tsx
// ✅ GOOD: Multiple independent choices
<CheckboxGroup label="Select your interests">
  <Checkbox value="bedroom">Bedroom</Checkbox>
  <Checkbox value="living-room">Living room</Checkbox>
  <Checkbox value="kitchen">Kitchen</Checkbox>
  <Checkbox value="bathroom">Bathroom</Checkbox>
</CheckboxGroup>
```

**Listbox for many options:**

```tsx
// ✅ GOOD: Many options with grouping
<Listbox label="Select room" value={selectedRoom}>
  <Listbox.Group label="Bedroom">
    <Listbox.Item value="master">Master bedroom</Listbox.Item>
    <Listbox.Item value="kids">Kids room</Listbox.Item>
  </Listbox.Group>
  <Listbox.Divider />
  <Listbox.Group label="Living areas">
    <Listbox.Item value="living">Living room</Listbox.Item>
    <Listbox.Item value="dining">Dining room</Listbox.Item>
  </Listbox.Group>
</Listbox>
```

### Implementation Example

```tsx
import { Radio, Checkbox, Listbox, Button } from "@ingvar-kit/skapa-components";
import { useState } from "react";

// Product comparison selection
function ProductComparison() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const toggleProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="product-comparison">
      <div className="product-grid">
        {products.map((product) => (
          <Card
            key={product.id}
            className={selectedProducts.includes(product.id) ? "selected" : ""}
          >
            <Checkbox
              checked={selectedProducts.includes(product.id)}
              onChange={() => toggleProduct(product.id)}
              aria-label={`Select ${product.name} for comparison`}
            />
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </Card>
        ))}
      </div>

      {selectedProducts.length >= 2 && (
        <Button onClick={handleCompare}>
          Compare {selectedProducts.length} products
        </Button>
      )}
    </div>
  );
}

// Multi-step form with selection
function CheckoutForm() {
  const [delivery, setDelivery] = useState("standard");
  const [assembly, setAssembly] = useState(false);
  const [preferences, setPreferences] = useState([]);

  return (
    <form className="checkout-form">
      {/* Single selection */}
      <section>
        <h2>Delivery method</h2>
        <RadioGroup value={delivery} onChange={setDelivery}>
          <Radio value="standard">
            <div>
              <strong>Standard delivery</strong>
              <p>3-5 business days • $19</p>
            </div>
          </Radio>
          <Radio value="express">
            <div>
              <strong>Express delivery</strong>
              <p>1-2 business days • $49</p>
            </div>
          </Radio>
          <Radio value="pickup">
            <div>
              <strong>Click & Collect</strong>
              <p>Available today • Free</p>
            </div>
          </Radio>
        </RadioGroup>
      </section>

      {/* Boolean selection */}
      <section>
        <Checkbox
          checked={assembly}
          onChange={setAssembly}
          label="Add assembly service ($89)"
        />
      </section>

      {/* Multiple selections */}
      <section>
        <h2>Communication preferences</h2>
        <CheckboxGroup value={preferences} onChange={setPreferences}>
          <Checkbox value="email">Email updates</Checkbox>
          <Checkbox value="sms">SMS notifications</Checkbox>
          <Checkbox value="phone">Phone calls</Checkbox>
        </CheckboxGroup>
      </section>

      <Button type="submit">Continue to payment</Button>
    </form>
  );
}
```

### Accessibility

- **Keyboard:** Tab to group, Arrow keys to navigate options, Space to select
- **Screen reader:** Group label + option count, selection state
- **ARIA:** `role="radiogroup"`, `role="group"`, `aria-checked`, `aria-labelledby`
- **Focus:** Visible focus indicator, logical tab order

---

## 5. Forms Pattern

### Overview

**Purpose:** Enable users to input and submit data efficiently with clear validation and feedback.

**When to Use:**

- User registration/login
- Checkout flows
- Settings/preferences
- Data entry tasks
- Search and filters

### Form Structure

```
┌─────────────────────────────────────┐
│  Form Title                         │ ← Clear heading
│                                     │
│  [Label] *                          │ ← Required indicator
│  [Input field           ]           │
│  Helper text                        │ ← Guidance
│                                     │
│  [Label]                            │
│  [Input field           ]           │
│  ✓ Validation success               │ ← Inline validation
│                                     │
│  [Label] *                          │
│  [Input field           ]           │
│  ⚠ Error message here               │ ← Error feedback
│                                     │
│  [ ] Optional checkbox              │
│                                     │
│  [Cancel]  [Submit]                 │ ← Clear actions
└─────────────────────────────────────┘
```

### Best Practices

**Input Field Design:**

```tsx
// ✅ GOOD: Clear labels, helper text, validation
<InputField
  label="Email address"
  type="email"
  required
  helperText="We'll never share your email"
  error={errors.email}
  value={email}
  onChange={setEmail}
/>
```

**Group Related Fields:**

```tsx
<fieldset>
  <legend>Shipping address</legend>
  <InputField label="Street address" />
  <div className="form-row">
    <InputField label="City" />
    <InputField label="State" />
    <InputField label="ZIP code" />
  </div>
</fieldset>
```

**Validation:**

- ✅ Validate on blur, not on every keystroke
- ✅ Show success states for important fields
- ✅ Provide specific, actionable error messages
- ✅ Don't clear valid fields on error

**Submit Button:**

```tsx
<Button
  type="submit"
  disabled={isSubmitting || !isValid}
  loading={isSubmitting}
>
  {isSubmitting ? "Submitting..." : "Complete purchase"}
</Button>
```

### Implementation Example

```tsx
import {
  InputField,
  Select,
  Checkbox,
  Button,
  Banner,
} from "@ingvar-kit/skapa-components";
import { useState } from "react";

function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    saveInfo: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? null
          : "Please enter a valid email address";
      case "zipCode":
        return /^\d{5}$/.test(value) ? null : "Please enter a 5-digit ZIP code";
      default:
        return value.trim() ? null : "This field is required";
    }
  };

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true });
    const error = validateField(name, formData[name]);
    setErrors({ ...errors, [name]: error });
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors({ ...errors, [name]: error });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "saveInfo") {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        )
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h2>Shipping information</h2>

      {submitError && (
        <Banner variant="error" onClose={() => setSubmitError(null)}>
          {submitError}
        </Banner>
      )}

      {/* Contact information */}
      <section>
        <h3>Contact</h3>
        <InputField
          label="Email address"
          type="email"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          error={touched.email && errors.email}
          helperText="Order confirmation will be sent here"
        />
      </section>

      {/* Shipping address */}
      <section>
        <h3>Delivery address</h3>

        <InputField
          label="Full name"
          required
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          onBlur={() => handleBlur("fullName")}
          error={touched.fullName && errors.fullName}
        />

        <InputField
          label="Street address"
          required
          value={formData.address}
          onChange={(e) => handleChange("address", e.target.value)}
          onBlur={() => handleBlur("address")}
          error={touched.address && errors.address}
        />

        <div className="form-row">
          <InputField
            label="City"
            required
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            error={touched.city && errors.city}
          />

          <Select
            label="State"
            required
            value={formData.state}
            onChange={(value) => handleChange("state", value)}
            onBlur={() => handleBlur("state")}
            error={touched.state && errors.state}
          >
            <option value="">Select state</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            {/* ... more states */}
          </Select>

          <InputField
            label="ZIP code"
            type="text"
            inputMode="numeric"
            required
            value={formData.zipCode}
            onChange={(e) => handleChange("zipCode", e.target.value)}
            onBlur={() => handleBlur("zipCode")}
            error={touched.zipCode && errors.zipCode}
            maxLength={5}
          />
        </div>
      </section>

      {/* Optional preference */}
      <Checkbox
        checked={formData.saveInfo}
        onChange={(checked) => handleChange("saveInfo", checked)}
        label="Save this information for next time"
      />

      {/* Actions */}
      <div className="form-actions">
        <Button
          variant="tertiary"
          type="button"
          onClick={() => window.history.back()}
        >
          Back to cart
        </Button>
        <Button type="submit" disabled={isSubmitting} loading={isSubmitting}>
          {isSubmitting ? "Processing..." : "Continue to payment"}
        </Button>
      </div>
    </form>
  );
}
```

### Accessibility

- **Semantic HTML:** Use `<form>`, `<fieldset>`, `<legend>`, `<label>`
- **Keyboard:** Tab order follows visual order
- **Screen reader:** Associate labels, errors, and helper text with inputs
- **ARIA:** `aria-required`, `aria-invalid`, `aria-describedby`
- **Focus:** Clear focus indicators, don't trap focus
- **Validation:** Provide error summary at form level for screen readers

---

## 6. Modal Containers

### Overview

**Purpose:** Display focused content or collect information without navigating away from the current page.

**When to Use:**

- Critical decisions requiring user attention
- Multi-step workflows within a context
- Focused tasks (image preview, video player)
- Quick data entry without page reload
- Confirmations and alerts

**Modal Types:**

- **Sheet:** Standard modal, center of screen
- **Theatre:** Full-screen immersive content
- **Prompt:** Critical alerts/confirmations

### Best Practices

**Sheet (Standard Modal):**

```tsx
import { Sheet, Button } from "@ingvar-kit/skapa-components";

<Sheet
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add to wishlist"
  size="medium"
>
  <Sheet.Body>
    <p>Choose a wishlist or create a new one</p>
    <Listbox value={selectedList} onChange={setSelectedList}>
      <Listbox.Item value="favorites">My favorites</Listbox.Item>
      <Listbox.Item value="bedroom">Bedroom ideas</Listbox.Item>
      <Listbox.Item value="new">+ Create new list</Listbox.Item>
    </Listbox>
  </Sheet.Body>
  <Sheet.Footer>
    <Button variant="tertiary" onClick={() => setIsOpen(false)}>
      Cancel
    </Button>
    <Button onClick={handleAdd}>Add to list</Button>
  </Sheet.Footer>
</Sheet>;
```

**Theatre (Full-Screen):**

```tsx
<Theatre isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
  <Theatre.Header>
    <IconButton icon="close" onClick={() => setIsPreviewOpen(false)} />
  </Theatre.Header>
  <Theatre.Body>
    <ImageGallery images={product.images} />
  </Theatre.Body>
</Theatre>
```

**Prompt (Confirmation):**

```tsx
<Prompt
  isOpen={showDeleteConfirm}
  onClose={() => setShowDeleteConfirm(false)}
  variant="warning"
  title="Delete item?"
  description="This action cannot be undone."
>
  <Prompt.Actions>
    <Button variant="tertiary" onClick={() => setShowDeleteConfirm(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleDelete}>
      Delete
    </Button>
  </Prompt.Actions>
</Prompt>
```

### Implementation Example

```tsx
import { Sheet, Button, InputField, Toast } from "@ingvar-kit/skapa-components";
import { useState } from "react";

function CreateListModal({ isOpen, onClose, onSuccess }) {
  const [listName, setListName] = useState("");
  const [listDescription, setListDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!listName.trim()) return;

    setIsSubmitting(true);
    try {
      await createWishlist({ name: listName, description: listDescription });
      onSuccess();
      setListName("");
      setListDescription("");
      onClose();
    } catch (error) {
      Toast.error("Failed to create list");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title="Create new list"
      size="medium"
    >
      <Sheet.Body>
        <InputField
          label="List name"
          required
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="e.g., Bedroom makeover"
          autoFocus
        />

        <TextArea
          label="Description (optional)"
          value={listDescription}
          onChange={(e) => setListDescription(e.target.value)}
          placeholder="Add a description to remember what this list is for"
          rows={3}
        />
      </Sheet.Body>

      <Sheet.Footer>
        <Button variant="tertiary" onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!listName.trim() || isSubmitting}
          loading={isSubmitting}
        >
          Create list
        </Button>
      </Sheet.Footer>
    </Sheet>
  );
}
```

### Accessibility

- **Focus trap:** Keep focus within modal while open
- **Keyboard:** Esc to close, Tab to cycle through focusable elements
- **Screen reader:** Announce modal opening, restore focus on close
- **ARIA:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- **Background:** Prevent scrolling, add overlay

---

## 7. Feedback Collection

### Overview

**Purpose:** Gather user feedback, ratings, and reviews to improve products and services.

**When to Use:**

- Post-purchase reviews
- Service satisfaction surveys
- Feature feedback
- Bug reports
- Customer support

### Implementation Example

```tsx
import {
  Rating,
  TextArea,
  Button,
  Checkbox,
} from "@ingvar-kit/skapa-components";
import { useState } from "react";

function ProductReview({ product, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ rating, review, recommend });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="review-form">
      <h2>Rate {product.name}</h2>

      <div className="rating-section">
        <label>Overall rating *</label>
        <Rating value={rating} onChange={setRating} size="large" />
      </div>

      <TextArea
        label="Your review (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience with this product..."
        rows={5}
        maxLength={500}
        helperText={`${review.length}/500 characters`}
      />

      <Checkbox
        checked={recommend}
        onChange={setRecommend}
        label="I would recommend this product to a friend"
      />

      <Button
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        loading={isSubmitting}
      >
        Submit review
      </Button>
    </div>
  );
}
```

---

## 8. Overflows

### Overview

**Purpose:** Handle content that exceeds available space gracefully.

**Strategies:**

- Truncation with ellipsis
- Expand/collapse
- Tooltips for full content
- Horizontal/vertical scrolling

### Implementation Example

```tsx
import { Expander, Tooltip } from "@ingvar-kit/skapa-components";

// Text truncation with tooltip
function ProductName({ name }) {
  return (
    <Tooltip content={name}>
      <h3 className="product-name truncate">{name}</h3>
    </Tooltip>
  );
}

// Expandable description
function ProductDescription({ description }) {
  return (
    <Expander
      preview={description.slice(0, 150) + "..."}
      expanded={description}
      buttonText="Read more"
    />
  );
}
```

---

## 9. Dark Mode

### Overview

**Purpose:** Support system-level dark mode preferences for reduced eye strain and battery savings.

**Best Practices:**

- Default to user's device setting
- Allow manual override
- Use elevation tokens for layering
- Reduce color saturation in dark mode
- Maintain WCAG AA contrast ratios

### Implementation Example

```tsx
import { IconButton, Switch } from "@ingvar-kit/skapa-components";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [theme, setTheme] = useState("auto");

  useEffect(() => {
    // Default to system preference
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedTheme = localStorage.getItem("theme") || "auto";

    if (savedTheme === "auto") {
      document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    } else {
      document.documentElement.dataset.theme = savedTheme;
    }

    setTheme(savedTheme);
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "auto") {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.dataset.theme = prefersDark ? "dark" : "light";
    } else {
      document.documentElement.dataset.theme = newTheme;
    }
  };

  return (
    <div className="theme-settings">
      <h3>App theme</h3>
      <RadioGroup value={theme} onChange={handleThemeChange}>
        <Radio value="light">Light</Radio>
        <Radio value="dark">Dark</Radio>
        <Radio value="auto">
          <div>
            <strong>Automatic (default)</strong>
            <p>Uses your device settings</p>
          </div>
        </Radio>
      </RadioGroup>
    </div>
  );
}
```

---

## 10. Data Visualisation

### Overview

**Purpose:** Present complex data in visual, easy-to-understand formats.

**Chart Types:**

- **Bar charts:** Comparing categories
- **Line charts:** Trends over time
- **Pie charts:** Part-to-whole relationships
- **Tables:** Detailed data with sorting/filtering

### Best Practices

- ✅ Use appropriate chart type for data
- ✅ Provide data table alternative
- ✅ Include axis labels and legends
- ✅ Use accessible colors (WCAG AA)
- ✅ Support keyboard navigation
- ✅ Provide text descriptions for screen readers

---

## Pattern Combinations

### E-Commerce Product Page

```tsx
// Combines: Loading States, Selection, Feedback, Modal, Empty States
function ProductPage({ productId }) {
  const [product, loading] = useProduct(productId);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product) {
    return <EmptyState type="product-not-found" />;
  }

  return (
    <>
      <div className="product-page">
        {/* Product images */}
        <ImageGallery images={product.images} />

        {/* Product info with selection */}
        <div className="product-info">
          <h1>{product.name}</h1>
          <Rating value={product.rating} count={product.reviewCount} />
          <Price value={product.price} />

          {/* Color selection */}
          <SelectionGroup label="Color">
            <RadioGroup value={selectedVariant} onChange={setSelectedVariant}>
              {product.variants.map((variant) => (
                <Radio key={variant.id} value={variant.id}>
                  <ColorSwatch color={variant.color} />
                  {variant.name}
                </Radio>
              ))}
            </RadioGroup>
          </SelectionGroup>

          {/* Add to cart */}
          <Button onClick={() => setCartOpen(true)}>Add to bag</Button>
        </div>

        {/* Reviews (feedback collection) */}
        <ProductReviews productId={productId} />
      </div>

      {/* Cart modal */}
      <Sheet isOpen={cartOpen} onClose={() => setCartOpen(false)}>
        {/* Cart contents */}
      </Sheet>
    </>
  );
}
```

---

## Quick Pattern Selection Guide

**Need to...**

- Show product filters? → **Filtering Pattern**
- Handle empty cart? → **Empty States**
- Show loading data? → **Loading States**
- Let user pick options? → **Selection Patterns**
- Collect user input? → **Forms Pattern**
- Show confirmation dialog? → **Modal Containers**
- Get ratings/reviews? → **Feedback Collection**
- Handle long text? → **Overflows**
- Support dark theme? → **Dark Mode**
- Display metrics/data? → **Data Visualisation**

---

**Next:** See [10-FOUNDATIONS-EXTENDED.md](./10-FOUNDATIONS-EXTENDED.md) for detailed design foundations (typography, color, spacing, motion).

**Component Reference:** See files 02-08 for complete component documentation.
