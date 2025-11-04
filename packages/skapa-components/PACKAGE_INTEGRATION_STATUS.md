# Skapa Package Integration Status

**Last Updated:** 2025-01-31  
**Goal:** Maximum alignment with official @ingka packages

## Summary

- **Total Components:** 58
- **Using @ingka Packages:** 19/58 (33%)
- **Manual Implementations:** 39/58 (67%)
  - 21 components: No @ingka package exists
  - 18 components: Not yet integrated (patterns, complex APIs)

---

## ✅ Components Using @ingka Packages (19)

### Actions (4/8)
1. **Button** → `@ingka/button@19.0.4` ✅
2. **Pill** → `@ingka/pill@12.0.4` ✅
3. **DualButton** → `@ingka/dual-button@0.10.2` ✅
4. **JumboButton** → `@ingka/jumbo-button@9.0.4` ✅

### Inputs (7/12)
5. **TextField** → `@ingka/input-field@23.0.4` ✅
6. **TextArea** → `@ingka/text-area@18.0.4` ✅
7. **Checkbox** → `@ingka/checkbox@18.0.4` ✅
8. **Radio** → `@ingka/radio-button@17.0.4` ✅
9. **Toggle** → `@ingka/switch@7.0.4` ✅
10. **Select** → `@ingka/select@15.0.4` ✅
11. **Slider** → `@ingka/slider@21.0.4` ✅
12. **NumberField** → `@ingka/quantity-stepper@11.0.4` ✅ (already integrated)
13. **SearchField** → `@ingka/search@11.0.4` ✅ (already integrated)

### Display (7/10)
14. **Card** → `@ingka/card@19.1.1` ✅ (already integrated)
15. **Badge** → `@ingka/badge@0.4.4` ✅ (already integrated)
16. **Avatar** → `@ingka/avatar@0.12.5` ✅ (already integrated)
17. **Image** → `@ingka/image@7.0.2` ✅ (already integrated)
18. **Skeleton** → `@ingka/skeleton@5.0.2` ✅ (already integrated)
19. **Tooltip** → `@ingka/tooltip@16.1.0` ✅ (already integrated)
20. **Loading** → `@ingka/loading@9.0.4` ✅ (already integrated)

### Feedback (4/7)
21. **Toast** → `@ingka/toast@20.1.2` ✅ (already integrated)
22. **Banner** → `@ingka/banner@11.0.4` ✅ (already integrated)
23. **Modal** → `@ingka/modal@12.0.5` ✅ (already integrated)
24. **Alert** → `@ingka/inline-message@12.0.4` ✅

### Navigation (1/14)
25. **SegmentedControl** → `@ingka/segmented-control@0.3.4` ✅

---

## ⏳ Components Pending Integration (18)

### Actions (4 components)
- **IconButton** - No @ingka/icon-button package
- **FAB** - No dedicated package
- **SplitButton** - No dedicated package
- **Tag** - `@ingka/tag` available but not yet integrated

### Inputs (2 components)
- **DatePicker** - No @ingka package (keep manual)
- **ColorPicker** - No @ingka package (keep manual)

### Display (3 components)
- **Spinner** - Use existing Loading component
- **Divider** - No @ingka/divider package
- **FileUpload** - `@ingka/file-upload@0.0.2` available (deprecated)

### Feedback (2 components)
- **ProgressBar** - `@ingka/progress-indicator` is for steppers, not bars
- **Snackbar/Dialog** - Use wrappers around Toast/Modal

### Navigation (13 components)
**Complex APIs (need AccordionItem/Tab/Panel children):**
- **Tabs** - `@ingka/tabs@18.1.3` (complex Tab/TabPanel API)
- **Breadcrumbs** - `@ingka/breadcrumb@3.0.9` (deprecated, complex API)
- **Accordion** - `@ingka/accordion@14.0.2` (needs AccordionItem children)

**No packages available:**
- Pagination, Header, Footer, Menu, Navbar
- Stepper, Sidebar, Drawer, BottomNav, AppBar

### CWDS Components (6 - all manual)
- GlobalHeader, SearchBar, UserProfile
- Cart, ProductCard, CategoryNav
- **Note:** No @ingka-group-digital packages exist in npm registry

### Patterns (12 - not built yet)
All pattern components are compositions of base components and will be built in final phase.

---

## 📦 Installed @ingka Packages (65 total)

### Foundation (4)
- @ingka/variables, @ingka/animations
- @ingka/browserslist-config, @ingka/grid, @ingka/typography

### Actions (6)
- button, hyperlink, pill, dual-button, jumbo-button, tag

### Inputs (14)
- input-field, text-area, checkbox, radio-button
- search, select, slider, switch, toggle
- quantity-stepper, choice, combobox
- file-upload, helper-text

### Display (19)
- card, avatar, badge, image, skeleton, tooltip, loading
- compact-card, list, member-card, rating
- shoppable-image, simple-video, table, teaser
- text, text-overlay-card, thumbnail-grid, icon

### Feedback (8)
- toast, banner, modal, inline-message
- progress-indicator, status
- popover (deprecated), breadcrumb

### Navigation (4)
- tabs, breadcrumb (deprecated)
- accordion, segmented-control

### Utilities (10)
- aspect-ratio-box, carousel, endorsement-label
- expander, list-box, list-view
- payment-logo, skip-content
- price, price-module, product-identifier

---

## 🎯 Implementation Patterns

### Thin Wrapper Layer
All @ingka component integrations use a consistent wrapper pattern:

```tsx
import IngkaComponent from '@ingka/component';

export const Component = ({ ourProps, ...props }) => {
  // 1. Map our simple API to Ingka's API
  const mappedProps = {
    ingkaType: ourVariant,
    ingkaSize: ourSize === 'large' ? 'medium' : ourSize,
    ...otherMappings
  };

  // 2. Filter incompatible props
  const { incompatible, ...compatible } = props;

  // 3. Wrap in div for custom styling
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <IngkaComponent {...mappedProps} {...compatible} />
      {/* Custom helper text, errors, etc. */}
    </div>
  );
};
```

### Common Prop Mappings
- `variant` → `type`
- `fullWidth` → `fluid`
- `type` (button type) → `htmlType`
- `children` → `text` or `label`
- `required` → `req`
- `helperText` → `caption`
- `size: 'large'` → `size: 'medium'` (many Ingka components don't have large)

---

## 🚀 Next Steps

### Priority 1: Simple Integrations (2-3 hours)
1. **Tag** component → `@ingka/tag`
2. **FileUpload** → `@ingka/file-upload` (check if deprecated still usable)
3. Consolidate **Spinner** with existing **Loading** component

### Priority 2: Complex APIs (4-6 hours)
1. **Tabs** - Study Tab/TabPanel API, create adapter
2. **Accordion** - Study AccordionItem API, create adapter
3. **Breadcrumbs** - Evaluate if worth integrating (deprecated)

### Priority 3: Build Patterns (12 components, 8-10 hours)
Complete final category to reach 58/58 (100%)

---

## 📊 Progress Metrics

**Component Completion:**
- Phase 1-2: Documentation (100%) ✅
- Phase 3: Components (88% - 51/58) ✅
- Phase 4: Package Integration (79% - 19/24 target) 🔄

**Package Alignment:**
- Currently using: 19/58 (33%)
- Realistically achievable: 25/58 (43%)
  - 19 current + 3 simple + 3 complex
- Must stay manual: 33/58 (57%)

**Quality Metrics:**
- All components TypeScript strict mode ✅
- All components using CSS Modules ✅
- All @ingka integrations with prop mapping layer ✅
- Build time: 2-10 seconds ✅
- Zero TypeScript errors ✅

---

## 🔍 Package Availability Analysis

**Why only 33% using @ingka packages?**

1. **No packages exist (36%):** 21/58 components
   - IconButton, FAB, SplitButton (Actions)
   - DatePicker, ColorPicker (Inputs)
   - Divider (Display)
   - 10 Navigation components
   - 6 CWDS components
   - 12 Pattern components

2. **Complex APIs (12%):** 7/58 components
   - Tabs, Breadcrumbs, Accordion
   - Need significant adapter work
   - May not maintain our simple API

3. **Already integrated (33%):** 19/58 components ✅
   - Successfully using @ingka packages
   - Thin wrapper maintains compatibility

4. **Simple remaining (5%):** 3/58 components
   - Tag, FileUpload, Spinner
   - Easy to integrate

5. **Alternative solutions (14%):** 8/58 components
   - Use wrapper components (Toast→Snackbar)
   - Use existing integrations (Loading→Spinner)
   - Keep manual (ProgressBar - no suitable package)

---

## 📝 Lessons Learned

### What Worked Well ✅
1. **Thin wrapper pattern** - Maintains API compatibility
2. **Prop mapping layer** - Smooth transition for users
3. **Batch installations** - Efficient package management
4. **Incremental commits** - Easy to track progress

### Challenges 🔧
1. **API mismatches** - @ingka APIs differ significantly
2. **Missing types** - Some packages have incomplete TypeScript definitions
3. **Deprecated packages** - Some official packages are deprecated
4. **Complex component patterns** - Tab/Accordion need children components
5. **CWDS packages** - Don't exist in npm registry

### Recommendations 💡
1. **Focus on simple wrappers** - Complex adapters may not be worth maintenance
2. **Document API differences** - Help users understand limitations
3. **Keep manual implementations** - For components without packages or complex APIs
4. **Test thoroughly** - Wrapper layer needs comprehensive testing
5. **Version pinning** - Lock @ingka package versions for stability

---

**Status:** Active Development  
**Last Commit:** 30fc343 - "feat(skapa): update Alert and SegmentedControl to @ingka packages"  
**Next:** Complete remaining simple integrations, then build Patterns category
