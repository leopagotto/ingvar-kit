# Official Skapa Component Mapping

**Goal:** Use exact @ingka package names and APIs for maximum compatibility

---

## 📦 Official Skapa Components Available

### LAYOUT

- ✅ **Accordion** → `@ingka/accordion` - INSTALLED
- ✅ **Avatar** → `@ingka/avatar` - INSTALLED & USING
- ✅ **Card** → `@ingka/card` - INSTALLED & USING
- ✅ **Compact Card** → `@ingka/compact-card` - INSTALLED
- ❌ **Divider** → No package exists
- ✅ **Image** → `@ingka/image` - INSTALLED & USING
- ✅ **List** → `@ingka/list` - INSTALLED
- ✅ **Member Card** → `@ingka/member-card` - INSTALLED
- ✅ **Rating** → `@ingka/rating` - INSTALLED
- ✅ **Shoppable Image** → `@ingka/shoppable-image` - INSTALLED
- ✅ **Simple Video** → `@ingka/simple-video` - INSTALLED
- ✅ **Table** → `@ingka/table` - INSTALLED
- ✅ **Tabs** → `@ingka/tabs` - INSTALLED
- ✅ **Teaser** → `@ingka/teaser` - INSTALLED
- ✅ **Text** → `@ingka/text` - INSTALLED
- ✅ **Text Overlay Card** → `@ingka/text-overlay-card` - INSTALLED
- ✅ **Thumbnail Grid** → `@ingka/thumbnail-grid` - INSTALLED
- ✅ **Typography** → `@ingka/typography` - INSTALLED
- ❓ **Video Player** → Check if exists

### PRODUCT RANGE

- ❌ **Commercial Messages** → No package exists
- ✅ **Price** → `@ingka/price` - INSTALLED
- ✅ **Price Module** → `@ingka/price-module` - INSTALLED
- ✅ **Product Identifier** → `@ingka/product-identifier` - INSTALLED

### NAVIGATION

- ✅ **Hyperlink** → `@ingka/hyperlink` - INSTALLED & USING
- ✅ **Tag** → `@ingka/tag` - INSTALLED

### ACTIONS

- ✅ **Buttons** → `@ingka/button` - INSTALLED & USING
- ✅ **Dual Button** → `@ingka/dual-button` - INSTALLED & USING
- ❌ **Expanding Button** → No package exists
- ❌ **IconPill** → No package exists
- ❌ **Icon Button** → No package exists
- ✅ **Jumbo Button** → `@ingka/jumbo-button` - INSTALLED & USING
- ✅ **Pill** → `@ingka/pill` - INSTALLED & USING

### INPUTS & CONTROLS

- ✅ **Checkbox** → `@ingka/checkbox` - INSTALLED & USING
- ✅ **Choice** → `@ingka/choice` - INSTALLED
- ✅ **Combobox** → `@ingka/combobox` - INSTALLED
- ✅ **Input Field** → `@ingka/input-field` - INSTALLED & USING (as TextField)
- ✅ **Quantity Stepper** → `@ingka/quantity-stepper` - INSTALLED & USING
- ✅ **Radio Button** → `@ingka/radio-button` - INSTALLED & USING
- ✅ **Search** → `@ingka/search` - INSTALLED & USING
- ✅ **Segmented Control** → `@ingka/segmented-control` - INSTALLED & USING
- ✅ **Select** → `@ingka/select` - INSTALLED & USING
- ✅ **Slider** → `@ingka/slider` - INSTALLED & USING
- ✅ **Switch** → `@ingka/switch` - INSTALLED & USING (as Toggle)
- ✅ **Text Area** → `@ingka/text-area` - INSTALLED & USING
- ✅ **Toggle** → `@ingka/toggle` - INSTALLED (button group, different from Switch)

### INDICATORS

- ✅ **Badge** → `@ingka/badge` - INSTALLED & USING
- ✅ **Loading** → `@ingka/loading` - INSTALLED & USING
- ✅ **Progress Indicator** → `@ingka/progress-indicator` - INSTALLED
- ✅ **Skeleton** → `@ingka/skeleton` - INSTALLED & USING
- ✅ **Status** → `@ingka/status` - INSTALLED

### MESSAGE

- ✅ **Banner** → `@ingka/banner` - INSTALLED & USING
- ✅ **Helper Text** → `@ingka/helper-text` - INSTALLED
- ✅ **Inline Message** → `@ingka/inline-message` - INSTALLED & USING
- ✅ **Toast** → `@ingka/toast` - INSTALLED & USING

### CONTAINER & OVERFLOW

- ✅ **Aspect Ratio Box** → `@ingka/aspect-ratio-box` - INSTALLED
- ✅ **Carousel** → `@ingka/carousel` - INSTALLED
- ✅ **Endorsement Label** → `@ingka/endorsement-label` - INSTALLED
- ✅ **Expander** → `@ingka/expander` - INSTALLED
- ✅ **List Box** → `@ingka/list-box` - INSTALLED
- ✅ **List View** → `@ingka/list-view` - INSTALLED
- ❌ **Modal Prompt** → No package exists
- ❌ **Modal Sheets** → No package exists
- ❌ **Modal Theatre** → No package exists
- ✅ **Payment Logo** → `@ingka/payment-logo` - INSTALLED
- ✅ **Skip Content** → `@ingka/skip-content` - INSTALLED
- ✅ **Tooltip** → `@ingka/tooltip` - INSTALLED & USING

---

## 🔄 Renaming Strategy

### Components to Rename (Use Skapa Names)

1. **TextField** → **InputField** (matches `@ingka/input-field`)
2. **TextArea** → **TextArea** (keep, matches `@ingka/text-area`)
3. **Toggle** → **Switch** (matches `@ingka/switch`)
4. **Radio** → **RadioButton** (matches `@ingka/radio-button`)
5. **NumberField** → **QuantityStepper** (matches `@ingka/quantity-stepper`)
6. **SearchField** → **Search** (matches `@ingka/search`)
7. **Alert** → **InlineMessage** (matches `@ingka/inline-message`)
8. **Spinner** → **Loading** (matches `@ingka/loading`)

### New Components to Add (From Installed Packages)

**LAYOUT:**

- CompactCard
- List
- MemberCard
- Rating
- ShoppableImage
- SimpleVideo
- Table
- Teaser
- Text
- TextOverlayCard
- ThumbnailGrid

**PRODUCT RANGE:**

- Price
- PriceModule
- ProductIdentifier

**NAVIGATION:**

- Tag (simple, should add)

**INPUTS:**

- Choice
- Combobox

**INDICATORS:**

- ProgressIndicator
- Status

**MESSAGE:**

- HelperText

**CONTAINER:**

- AspectRatioBox
- Carousel
- EndorsementLabel
- Expander
- ListBox
- ListView
- PaymentLogo
- SkipContent

---

## 📋 Action Plan

### Phase 1: Rename Existing Components (2 hours)

1. Rename component folders and files
2. Update exports in index.ts
3. Update all imports across codebase
4. Update documentation

### Phase 2: Add Missing Display Components (4 hours)

Components we have packages for but haven't wrapped yet:

- CompactCard, List, MemberCard, Rating
- ShoppableImage, SimpleVideo, Table
- Teaser, Text, TextOverlayCard, ThumbnailGrid

### Phase 3: Add Product Range Components (2 hours)

- Price, PriceModule, ProductIdentifier

### Phase 4: Add Remaining Inputs (2 hours)

- Choice, Combobox

### Phase 5: Add Indicators & Messages (2 hours)

- ProgressIndicator, Status, HelperText

### Phase 6: Add Container Components (3 hours)

- AspectRatioBox, Carousel, EndorsementLabel
- Expander, ListBox, ListView
- PaymentLogo, SkipContent

---

## 🎯 Target Component Count

**Current:** 51/58 (88%)
**After All Additions:** ~90+ components (full Skapa coverage)

**Breakdown:**

- Existing wrapped: 19 components ✅
- Existing manual: 32 components
- New from Skapa: 40+ components
- **Total: 90+ components covering full Skapa design system**

---

## 💡 Benefits

1. **Exact API Match** - Users familiar with Skapa know exactly what to expect
2. **Official Compatibility** - Direct use of @ingka packages
3. **Easy Migration** - Existing Skapa projects can drop in our components
4. **Complete Coverage** - All official Skapa components available
5. **Consistent Naming** - Matches official documentation

---

**Next Steps:**

1. Start with renames (low risk, high value)
2. Add high-value display components (Card variants, Table, etc.)
3. Complete product range (Price, etc.)
4. Fill in remaining gaps
