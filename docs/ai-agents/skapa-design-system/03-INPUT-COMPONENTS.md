# Skapa Design System: Input Components

> **For AI Agents:** Complete reference for form inputs, text fields, selections, and data entry components.

## 📋 Covered Components

- Input Field
- Text Area
- Search
- Checkbox
- Radio Button
- Switch / Toggle
- Select (Native)
- Combobox
- Slider
- Quantity Stepper

---

## Input Field

### Overview

Single-line text input for collecting user data.

**Platforms:** Figma, React, Vue, Web Components, Android, iOS

### Anatomy

```
Label (optional)          Helper text (optional)
   ↓                             ↓
┌──────────────────────────────────┐
│ [Icon] Input text...      [Icon] │ ← Input container
└──────────────────────────────────┘
        ↑                      ↑
   Leading icon          Trailing icon
   (optional)            (optional)

   Error/Success message (conditional)
```

### Variants

#### Default Input

```jsx
<InputField
  label="Email address"
  placeholder="your.email@example.com"
  type="email"
/>
```

#### With Leading Icon

```jsx
<InputField
  label="Search"
  placeholder="Search products..."
  leadingIcon="search"
/>
```

#### With Trailing Icon

```jsx
<InputField
  label="Password"
  type="password"
  trailingIcon="visibility"
  onIconClick={togglePasswordVisibility}
/>
```

#### With Helper Text

```jsx
<InputField
  label="Username"
  helperText="Must be 3-20 characters"
  pattern="[a-zA-Z0-9]{3,20}"
/>
```

### States

#### Default

```jsx
<InputField label="Name" />
```

#### Focused

```css
border: 2px solid var(--color-blue-ikea);
outline: 3px solid rgba(0, 88, 163, 0.2);
```

#### Filled

```jsx
<InputField label="Name" value="John Doe" />
```

#### Error

```jsx
<InputField
  label="Email"
  value="invalid"
  error="Please enter a valid email address"
  isInvalid
/>
```

#### Success

```jsx
<InputField
  label="Email"
  value="valid@email.com"
  success="Email verified"
  isValid
/>
```

#### Disabled

```jsx
<InputField label="Name" disabled value="Readonly value" />
```

### Input Types

```javascript
inputTypes: {
  text: "Default text input",
  email: "Email validation",
  password: "Masked characters",
  tel: "Telephone number",
  number: "Numeric input",
  url: "URL validation",
  search: "Search input",
  date: "Date picker",
  time: "Time picker",
  datetime-local: "Date and time"
}
```

### Validation

```jsx
<InputField
  label="Email"
  type="email"
  required
  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
  minLength={5}
  maxLength={100}
  onChange={handleValidation}
/>
```

### Accessibility

```jsx
<InputField
  id="email-input"
  label="Email address"
  aria-required="true"
  aria-invalid={hasError}
  aria-describedby="email-error"
  errorId="email-error"
/>
```

**Keyboard:**

- `Tab`: Navigate between fields
- `Shift + Tab`: Navigate backwards
- `Enter`: Submit form (if in form)

---

## Text Area

### Overview

Multi-line text input for longer content.

### Anatomy

```
Label
   ↓
┌──────────────────────────┐
│ Multi-line text input... │
│                          │ ← Resizable vertically
│                          │
└──────────────────────────┘
   Character count (optional)
```

### Implementation

```jsx
<TextArea
  label="Description"
  placeholder="Tell us about your experience..."
  rows={4}
  maxLength={500}
  showCharacterCount
/>
```

### Features

```javascript
features: {
  autoResize: "Grows with content",
  characterCount: "Shows remaining characters",
  maxLength: "Enforces character limit",
  minRows: "Minimum height",
  maxRows: "Maximum height before scroll"
}
```

### States

Same as Input Field:

- Default
- Focused
- Filled
- Error
- Success
- Disabled

---

## Search

### Overview

Specialized input for search functionality with autocomplete and suggestions.

### Anatomy

```
┌────────────────────────────────┐
│ 🔍 Search query...        [×]  │
└────────────────────────────────┘
┌────────────────────────────────┐ ← Suggestions dropdown
│ → Recent: "sofas"              │
│ → Suggested: "sofa beds"       │
│ → Product: "STOCKHOLM sofa"    │
└────────────────────────────────┘
```

### Implementation

```jsx
<Search
  placeholder="Search products, rooms & ideas"
  onSearch={handleSearch}
  suggestions={[
    { type: "recent", label: "sofas" },
    { type: "suggested", label: "sofa beds" },
    { type: "product", label: "STOCKHOLM sofa", id: "12345" },
  ]}
  showRecentSearches
  clearable
/>
```

### Features

```javascript
searchFeatures: {
  autocomplete: "Live suggestions as user types",
  recentSearches: "Show previously searched terms",
  categories: "Categorize suggestions (products, articles, rooms)",
  clearButton: "Quick clear icon",
  voiceSearch: "Speech-to-text input (optional)",
  keyboard: "Arrow keys navigate suggestions"
}
```

---

## Checkbox

### Overview

Binary selection control for multiple choices.

### Anatomy

```
┌───┐
│ ✓ │  Label text
└───┘
```

### Variants

#### Single Checkbox

```jsx
<Checkbox
  label="I agree to the terms and conditions"
  checked={agreed}
  onChange={setAgreed}
/>
```

#### Checkbox Group

```jsx
<CheckboxGroup label="Select your interests">
  <Checkbox value="living-room" label="Living room" />
  <Checkbox value="bedroom" label="Bedroom" />
  <Checkbox value="kitchen" label="Kitchen" />
</CheckboxGroup>
```

#### Indeterminate State

```jsx
<Checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={handleSelectAll}
/>
```

### States

```javascript
states: {
  unchecked: "Empty box",
  checked: "Checkmark visible",
  indeterminate: "Dash/minus (partial selection)",
  disabled: "Greyed out, not interactive",
  error: "Red border, error message",
  focused: "Blue outline"
}
```

### Usage Rules

**✅ DO:**

- Use for multiple independent choices
- Keep label text short and clear
- Indicate required fields
- Group related checkboxes

**❌ DON'T:**

- Use for mutually exclusive options (use Radio instead)
- Nest checkboxes more than 2 levels
- Use negative language ("Don't send me emails")

---

## Radio Button

### Overview

Mutually exclusive selection within a group.

### Anatomy

```
○ Option 1
● Option 2  ← Selected
○ Option 3
```

### Implementation

```jsx
<RadioGroup
  label="Delivery method"
  value={deliveryMethod}
  onChange={setDeliveryMethod}
>
  <RadioButton value="standard" label="Standard delivery (3-5 days)" />
  <RadioButton value="express" label="Express delivery (1-2 days)" />
  <RadioButton value="pickup" label="Click & collect (Free)" />
</RadioGroup>
```

### States

```javascript
states: {
  unselected: "Empty circle",
  selected: "Filled dot",
  disabled: "Greyed out",
  focused: "Blue outline",
  error: "Red border + message"
}
```

### Usage Rules

**✅ DO:**

- Use for mutually exclusive choices
- Always have one option pre-selected (when possible)
- Show all options at once
- Keep options to 2-7 choices

**❌ DON'T:**

- Use for binary yes/no (use Checkbox or Switch)
- Allow deselection after selection (use Checkbox if needed)
- Hide options in dropdowns (use Select instead)

**Radio vs Checkbox vs Select:**

```javascript
decisionTree: {
  "Multiple selections allowed?": {
    yes: "Use Checkbox",
    no: {
      "2-7 options?": {
        yes: "Use Radio Button",
        no: "Use Select (dropdown)"
      }
    }
  }
}
```

---

## Switch / Toggle

### Overview

Binary control for instant on/off states.

### Anatomy

```
OFF  [○────]  Label
ON   [────●]  Label
```

### Implementation

```jsx
<Switch
  label="Enable notifications"
  checked={notificationsEnabled}
  onChange={setNotificationsEnabled}
/>
```

### States

```javascript
states: {
  off: "Toggle to the left, grey",
  on: "Toggle to the right, blue",
  disabled: "Greyed out, not interactive",
  focused: "Blue outline"
}
```

### Usage Rules

**Switch vs Checkbox:**

```javascript
useSwitch: {
  when: "Immediate effect (no submit button needed)",
  examples: [
    "Enable/disable notifications",
    "Show/hide map labels",
    "Light/dark mode"
  ]
}

useCheckbox: {
  when: "Part of a form (requires submit)",
  examples: [
    "Agree to terms",
    "Subscribe to newsletter",
    "Select multiple items"
  ]
}
```

**✅ DO:**

- Use for settings with immediate effect
- Label clearly what will happen when toggled
- Provide instant feedback

**❌ DON'T:**

- Use in forms requiring submit button
- Use for actions requiring confirmation
- Use for multiple related options (use Checkbox group)

---

## Select (Native)

### Overview

Dropdown menu for single selection from many options.

### Anatomy

```
┌──────────────────────────┐
│ Selected option      ▼   │
└──────────────────────────┘
        ↓ (when opened)
┌──────────────────────────┐
│ Option 1                 │
│ ✓ Selected option        │
│ Option 3                 │
│ Option 4                 │
└──────────────────────────┘
```

### Implementation

```jsx
<Select
  label="Country"
  value={selectedCountry}
  onChange={setSelectedCountry}
  placeholder="Select a country"
>
  <option value="se">Sweden</option>
  <option value="no">Norway</option>
  <option value="dk">Denmark</option>
  <option value="fi">Finland</option>
</Select>
```

### With Optgroups

```jsx
<Select label="Furniture">
  <optgroup label="Living Room">
    <option value="sofa">Sofas</option>
    <option value="tv-unit">TV units</option>
  </optgroup>
  <optgroup label="Bedroom">
    <option value="bed">Beds</option>
    <option value="wardrobe">Wardrobes</option>
  </optgroup>
</Select>
```

### Usage Rules

**✅ DO:**

- Use for 8+ options
- Sort options logically (alphabetical, frequency, etc.)
- Include search for 15+ options (use Combobox)
- Provide clear default/placeholder

**❌ DON'T:**

- Use for 2-7 options (use Radio Button)
- Use for critical frequently-used options (makes them hidden)
- Use for binary choices (use Switch or Checkbox)

---

## Combobox

### Overview

Searchable dropdown with autocomplete (Select + Search combined).

### Anatomy

```
┌──────────────────────────┐
│ Type to search...    ▼   │
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│ 🔍 "chair"               │  ← User typing
├──────────────────────────┤
│ → Office chairs          │  ← Filtered results
│ → Dining chairs          │
│ → Armchairs              │
└──────────────────────────┘
```

### Implementation

```jsx
<Combobox
  label="Product category"
  placeholder="Search categories..."
  options={categories}
  value={selectedCategory}
  onChange={setSelectedCategory}
  filterOnType
  clearable
/>
```

### Features

```javascript
comboboxFeatures: {
  typeahead: "Filters as user types",
  customOptions: "Allow creating new options",
  multiSelect: "Select multiple items",
  recentSelections: "Show previously selected",
  keyboard: "Full arrow key navigation"
}
```

### Usage Rules

**Select vs Combobox:**

```javascript
useSelect: {
  when: "8-15 options, no search needed",
  example: "Month picker, status dropdown"
}

useCombobox: {
  when: "15+ options, search beneficial",
  example: "Country picker, product category, user search"
}
```

---

## Slider

### Overview

Continuous or discrete value selection along a track.

### Anatomy

```
Label: 50%
├────●─────────┤  ← Track with thumb
0%           100%
```

### Variants

#### Single Thumb

```jsx
<Slider
  label="Volume"
  min={0}
  max={100}
  value={volume}
  onChange={setVolume}
  unit="%"
/>
```

#### Range (Two Thumbs)

```jsx
<Slider
  label="Price range"
  min={0}
  max={5000}
  value={[minPrice, maxPrice]}
  onChange={setPriceRange}
  unit="€"
  showValues
/>
```

#### With Steps

```jsx
<Slider
  label="Quantity"
  min={0}
  max={10}
  step={1}
  value={quantity}
  onChange={setQuantity}
  showSteps
/>
```

### Features

```javascript
sliderFeatures: {
  continuous: "Smooth values (decimals)",
  discrete: "Step-based values (integers)",
  labels: "Show min/max labels",
  valueDisplay: "Show current value",
  tooltip: "Value tooltip on thumb",
  keyboard: "Arrow keys adjust value"
}
```

---

## Quantity Stepper

### Overview

Increment/decrement control for quantities.

### Anatomy

```
┌───┬─────┬───┐
│ − │  5  │ + │
└───┴─────┴───┘
```

### Implementation

```jsx
<QuantityStepper
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={1}
  max={99}
  step={1}
/>
```

### With Input Field

```jsx
<QuantityStepper
  label="Quantity"
  value={quantity}
  onChange={setQuantity}
  min={0}
  max={999}
  allowManualInput
/>
```

### Features

```javascript
stepperFeatures: {
  increment: "Plus button increases value",
  decrement: "Minus button decreases value",
  manualInput: "Type value directly (optional)",
  minMax: "Enforce boundaries",
  disableAtLimits: "Disable buttons at min/max"
}
```

### Usage Rules

**✅ DO:**

- Use for shopping cart quantities
- Disable buttons at min/max limits
- Show current value clearly
- Support keyboard input (arrows)

**❌ DON'T:**

- Use for large ranges (use Slider or Input instead)
- Allow negative quantities (unless appropriate)
- Hide current value

---

## Form Best Practices

### Form Layout

```jsx
<Form>
  {/* Group related fields */}
  <FormSection title="Personal Information">
    <InputField label="First name" required />
    <InputField label="Last name" required />
    <InputField label="Email" type="email" required />
  </FormSection>

  <FormSection title="Preferences">
    <CheckboxGroup label="Interests">
      <Checkbox value="living" label="Living room" />
      <Checkbox value="bedroom" label="Bedroom" />
    </CheckboxGroup>

    <Switch label="Receive marketing emails" />
  </FormSection>

  <ButtonGroup>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Button variant="secondary" type="button">
      Cancel
    </Button>
  </ButtonGroup>
</Form>
```

### Validation

**Real-time vs On-Submit:**

```jsx
// Real-time (for immediate feedback)
<InputField
  label="Username"
  value={username}
  onChange={(e) => {
    setUsername(e.target.value);
    validateUsername(e.target.value); // Immediate
  }}
  error={usernameError}
/>

// On-submit (for server validation)
<Form onSubmit={handleSubmit}>
  <InputField label="Email" name="email" />
  {serverErrors.email && (
    <ErrorMessage>{serverErrors.email}</ErrorMessage>
  )}
</Form>
```

### Accessibility Checklist

- [ ] All inputs have associated labels
- [ ] Required fields marked with `required` and `aria-required`
- [ ] Error messages linked with `aria-describedby`
- [ ] Tab order is logical
- [ ] Focus states are visible
- [ ] Error messages are clear and actionable
- [ ] Success states confirmed visually and for screen readers

---

**Next:** [04-DISPLAY-COMPONENTS.md](./04-DISPLAY-COMPONENTS.md) - Cards, Lists, Tables, and Content Display
