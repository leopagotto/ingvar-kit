# Skapa Package Usage Mapping

## ✅ Components Now Using @ingka Packages (37/58 = 64%)

### Actions Category (4/8)
- ✅ **Hyperlink** → `@ingka/hyperlink@9.0.2` (UPDATED)
- ✅ **Pill** → `@ingka/pill@12.0.4` (TODO: Update)
- ✅ **DualButton** → `@ingka/dual-button@0.10.2` (TODO: Update)
- ✅ **JumboButton** → `@ingka/jumbo-button@9.0.4` (TODO: Update)
- ⚠️ **Button** → `@ingka/button@19.0.4` (Available but keeping manual for simplicity)
- ❌ **IconButton** → No package (manual)
- ❌ **FAB** → No package (manual)
- ❌ **SplitButton** → No package (manual)

### Inputs Category (11/12)
- ✅ **TextField** → `@ingka/input-field@23.0.4` (TODO: Update)
- ✅ **TextArea** → `@ingka/text-area@18.0.4` (TODO: Update)
- ✅ **Checkbox** → `@ingka/checkbox@18.0.4` (TODO: Update)
- ✅ **Radio** → `@ingka/radio-button@17.0.4` (TODO: Update)
- ✅ **Toggle** → `@ingka/toggle@9.0.4` OR `@ingka/switch@7.0.4` (TODO: Update)
- ✅ **Select** → `@ingka/select@15.0.4` OR `@ingka/combobox@0.7.5` OR `@ingka/choice@12.1.0` (TODO: Update)
- ✅ **Slider** → `@ingka/slider@21.0.4` (TODO: Update)
- ✅ **NumberField** → `@ingka/quantity-stepper@11.0.4` (ALREADY USING ✓)
- ✅ **SearchField** → `@ingka/search@11.0.4` (ALREADY USING ✓)
- ✅ **FileUpload** → `@ingka/file-upload@0.0.2` (TODO: Update - DEPRECATED)
- ❌ **DatePicker** → No package (manual)
- ❌ **ColorPicker** → No package (manual)

### Display Category (10/10)
- ✅ **Card** → `@ingka/card@19.1.1` (ALREADY USING ✓)
- ✅ **Badge** → `@ingka/badge@0.4.4` (ALREADY USING ✓)
- ✅ **Avatar** → `@ingka/avatar@0.12.5` (ALREADY USING ✓)
- ✅ **Image** → `@ingka/image@7.0.2` (ALREADY USING ✓)
- ✅ **Skeleton** → `@ingka/skeleton@5.0.2` (ALREADY USING ✓)
- ✅ **Tooltip** → `@ingka/tooltip@16.1.0` (ALREADY USING ✓)
- ✅ **Loading** → `@ingka/loading@9.0.4` (ALREADY USING ✓)
- ✅ **Divider** → Can use CSS only (current manual is fine)
- ✅ **Spinner** → Use `@ingka/loading` (TODO: consolidate)
- ⚠️ **Popover** → `@ingka/popover@0.0.12` (DEPRECATED)

### Feedback Category (6/7)
- ✅ **Toast** → `@ingka/toast@20.1.2` (ALREADY USING ✓)
- ✅ **Banner** → `@ingka/banner@11.0.4` (ALREADY USING ✓)
- ✅ **Modal** → `@ingka/modal@12.0.5` (ALREADY USING ✓)
- ✅ **Alert** → `@ingka/inline-message@12.0.4` OR `@ingka/helper-text@0.5.4` (TODO: Update)
- ✅ **ProgressBar** → `@ingka/status@12.0.4` (TODO: Update)
- ❌ **Snackbar** → No package (use Toast)
- ❌ **Dialog** → No package (use Modal)

### Navigation Category (3/14)
- ✅ **Tabs** → `@ingka/tabs@18.1.3` (TODO: Update - complex API)
- ✅ **Breadcrumbs** → `@ingka/breadcrumb@3.0.9` (TODO: Update - DEPRECATED)
- ✅ **Accordion** → `@ingka/accordion@14.0.2` (TODO: Update)
- ✅ **SegmentedControl** → `@ingka/segmented-control@0.3.4` (TODO: Update)
- ❌ **Pagination** → No package (manual)
- ❌ **Header** → No package (manual)
- ❌ **Footer** → No package (manual)
- ❌ **Menu** → No package (manual)
- ❌ **Navbar** → No package (manual)
- ❌ **Stepper** → No package (manual)
- ❌ **Sidebar** → No package (manual)
- ❌ **Drawer** → No package (manual)
- ❌ **BottomNav** → No package (manual)
- ❌ **AppBar** → No package (manual)

### CWDS Category (0/6)
- ❌ All manual (no npm packages exist)

### Patterns Category (0/12)
- ❌ Not built yet

## Summary

**Total Components:** 58
**Using @ingka packages:** 37 available (64%)
**Already updated:** 12 (21%)
**Need to update:** 25 (43%)
**Must stay manual:** 21 (36%)

## Priority Updates

### High Priority (Simple Wrappers)
1. Pill
2. DualButton
3. JumboButton
4. TextField (input-field)
5. TextArea
6. Checkbox
7. Radio
8. Toggle/Switch
9. Select
10. Slider

### Medium Priority (Need API Mapping)
1. Alert → inline-message
2. ProgressBar → status
3. FileUpload (deprecated but usable)
4. Tabs (complex API)
5. Breadcrumbs (deprecated but usable)
6. Accordion
7. SegmentedControl

### Low Priority (Keep Manual)
- Navigation components (no packages)
- CWDS components (no packages)
- IconButton, FAB, SplitButton (no packages)
- DatePicker, ColorPicker (no packages)
- Snackbar, Dialog (use Toast/Modal instead)
