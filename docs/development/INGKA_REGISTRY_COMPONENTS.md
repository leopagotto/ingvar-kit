# Ingka Registry Component Availability

**Last Updated:** October 31, 2025  
**Registry:** https://npm.m2.blue.cdtapps.com  
**Test Status:** Comprehensive test of all 72 components completed

## Summary

- ✅ **Available from Registry:** 62/72 components (86% coverage)
- ❌ **Unavailable (need local templates):** 10/72 components (14%)

## Component Availability by Category

### Design Foundations (2/3 available)

| Component | Status | Package Name | Notes |
|-----------|--------|--------------|-------|
| Variables | ✅ | `@ingka/variables` | **Use this instead of design-tokens** |
| Typography | ✅ | `@ingka/typography` | |
| Colours | ❌ | `@ingka/colours` | Not available - use variables |

### Layout & Structure (4/5 available)

| Component | Status | Package Name |
|-----------|--------|--------------|
| Grid | ✅ | `@ingka/grid` |
| Expander | ✅ | `@ingka/expander` |
| Skip Content | ✅ | `@ingka/skip-content` |
| Divider | ✅ | `@ingka/divider` |
| Aspect Ratio Box | ❌ | `@ingka/aspect-ratio-box` |

### Display & Content (14/14 available) ✅

| Component | Status | Package Name |
|-----------|--------|--------------|
| Card | ✅ | `@ingka/card` |
| Compact Card | ✅ | `@ingka/compact-card` |
| Text Overlay Card | ✅ | `@ingka/text-overlay-card` |
| Image | ✅ | `@ingka/image` |
| Text | ✅ | `@ingka/text` |
| List | ✅ | `@ingka/list` |
| List View | ✅ | `@ingka/list-view` |
| List Box | ✅ | `@ingka/list-box` |
| Table | ✅ | `@ingka/table` |
| Tabs | ✅ | `@ingka/tabs` |
| Teaser | ✅ | `@ingka/teaser` |
| Thumbnail Grid | ✅ | `@ingka/thumbnail-grid` |
| Accordion | ✅ | `@ingka/accordion` |
| Carousel | ✅ | `@ingka/carousel` |

### Buttons & Actions (5/8 available)

| Component | Status | Package Name |
|-----------|--------|--------------|
| Button | ✅ | `@ingka/button` |
| Dual Button | ✅ | `@ingka/dual-button` |
| Jumbo Button | ✅ | `@ingka/jumbo-button` |
| Pill | ✅ | `@ingka/pill` |
| Hyperlink | ✅ | `@ingka/hyperlink` |
| Expanding Button | ❌ | `@ingka/expanding-button` |
| Icon Button | ❌ | `@ingka/icon-button` |
| Icon Pill | ❌ | `@ingka/icon-pill` |

### Form Inputs (13/13 available) ✅

| Component | Status | Package Name |
|-----------|--------|--------------|
| Input Field | ✅ | `@ingka/input-field` |
| Text Area | ✅ | `@ingka/text-area` |
| Checkbox | ✅ | `@ingka/checkbox` |
| Radio Button | ✅ | `@ingka/radio-button` |
| Switch | ✅ | `@ingka/switch` |
| Toggle | ✅ | `@ingka/toggle` |
| Select | ✅ | `@ingka/select` |
| Combobox | ✅ | `@ingka/combobox` |
| Choice | ✅ | `@ingka/choice` |
| Search | ✅ | `@ingka/search` |
| Slider | ✅ | `@ingka/slider` |
| Quantity Stepper | ✅ | `@ingka/quantity-stepper` |
| Segmented Control | ✅ | `@ingka/segmented-control` |

### Feedback & Status (9/9 available) ✅

| Component | Status | Package Name |
|-----------|--------|--------------|
| Badge | ✅ | `@ingka/badge` |
| Status | ✅ | `@ingka/status` |
| Toast | ✅ | `@ingka/toast` |
| Banner | ✅ | `@ingka/banner` |
| Inline Message | ✅ | `@ingka/inline-message` |
| Helper Text | ✅ | `@ingka/helper-text` |
| Loading | ✅ | `@ingka/loading` |
| Progress Indicator | ✅ | `@ingka/progress-indicator` |
| Skeleton | ✅ | `@ingka/skeleton` |

### Modals & Overlays (2/4 available)

| Component | Status | Package Name | Notes |
|-----------|--------|--------------|-------|
| Modal | ✅ | `@ingka/modal` | **Use this instead of modal-prompt** |
| Tooltip | ✅ | `@ingka/tooltip` |
| Modal Sheets | ❌ | `@ingka/modal-sheets` |
| Modal Theatre | ❌ | `@ingka/modal-theatre` |

### Media & Rich Content (5/6 available)

| Component | Status | Package Name |
|-----------|--------|--------------|
| Simple Video | ✅ | `@ingka/simple-video` |
| Shoppable Image | ✅ | `@ingka/shoppable-image` |
| Icon | ✅ | `@ingka/icon` |
| Avatar | ✅ | `@ingka/avatar` |
| Rating | ✅ | `@ingka/rating` |
| Logos | ❌ | `@ingka/logos` |

### E-commerce (7/8 available)

| Component | Status | Package Name |
|-----------|--------|--------------|
| Price | ✅ | `@ingka/price` |
| Price Module | ✅ | `@ingka/price-module` |
| Product Identifier | ✅ | `@ingka/product-identifier` |
| Member Card | ✅ | `@ingka/member-card` |
| Payment Logo | ✅ | `@ingka/payment-logo` |
| Tag | ✅ | `@ingka/tag` |
| Endorsement Label | ✅ | `@ingka/endorsement-label` |
| Commercial Messages | ❌ | `@ingka/commercial-messages` |

### Utilities (2/2 available) ✅

| Component | Status | Package Name |
|-----------|--------|--------------|
| Animations | ✅ | `@ingka/animations` |
| Browserslist Config | ✅ | `@ingka/browserslist-config` |

## Installation Guide

### 1. Configure Registry

**Project Level (Recommended):**
```bash
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"
```

**User Level (Global):**
```bash
npm set @ingka:registry="https://npm.m2.blue.cdtapps.com"
```

### 2. Install Components

**Essential Components:**
```bash
npm install @ingka/variables @ingka/typography @ingka/grid \
  @ingka/button @ingka/card @ingka/modal \
  @ingka/input-field @ingka/text-area @ingka/checkbox @ingka/radio-button \
  @ingka/select @ingka/switch @ingka/search \
  @ingka/badge @ingka/toast @ingka/loading @ingka/tooltip @ingka/icon
```

**All Available Components:**
```bash
npm install @ingka/variables @ingka/typography @ingka/grid @ingka/expander \
  @ingka/skip-content @ingka/divider @ingka/card @ingka/compact-card \
  @ingka/text-overlay-card @ingka/image @ingka/text @ingka/list @ingka/list-view \
  @ingka/list-box @ingka/table @ingka/tabs @ingka/teaser @ingka/thumbnail-grid \
  @ingka/accordion @ingka/carousel @ingka/button @ingka/dual-button \
  @ingka/jumbo-button @ingka/pill @ingka/hyperlink @ingka/input-field \
  @ingka/text-area @ingka/checkbox @ingka/radio-button @ingka/switch @ingka/toggle \
  @ingka/select @ingka/combobox @ingka/choice @ingka/search @ingka/slider \
  @ingka/quantity-stepper @ingka/segmented-control @ingka/badge @ingka/status \
  @ingka/toast @ingka/banner @ingka/inline-message @ingka/helper-text @ingka/loading \
  @ingka/progress-indicator @ingka/skeleton @ingka/modal @ingka/tooltip \
  @ingka/simple-video @ingka/shoppable-image @ingka/icon @ingka/avatar @ingka/rating \
  @ingka/price @ingka/price-module @ingka/product-identifier @ingka/member-card \
  @ingka/payment-logo @ingka/tag @ingka/endorsement-label @ingka/animations \
  @ingka/browserslist-config
```

### 3. Using Ingvar Kit Component Installer

The component installer now correctly uses registry packages:

```bash
# Interactive installation
ingvar components

# Install essential components
ingvar components -m essential

# Install all components (62 from registry + 10 local templates)
ingvar components -m all
```

## Components Requiring Local Templates (10)

These components are **not available** in the registry and will use local templates from `templates/ingka-components/`:

1. **@ingka/colours** - Use `@ingka/variables` instead
2. **@ingka/aspect-ratio-box** - Layout utility
3. **@ingka/expanding-button** - Button variant
4. **@ingka/icon-button** - Button variant
5. **@ingka/icon-pill** - Button variant
6. **@ingka/modal-sheets** - Use `@ingka/modal` instead
7. **@ingka/modal-theatre** - Use `@ingka/modal` instead
8. **@ingka/logos** - IKEA branding assets
9. **@ingka/commercial-messages** - E-commerce component

## Key Recommendations

### ✅ Use These Packages

- **Variables:** Use `@ingka/variables` (not `@ingka/design-tokens` or `@ingka/colours`)
- **Modals:** Use `@ingka/modal` (not `@ingka/modal-prompt`)
- **Forms:** All form inputs available from registry ✅
- **Display:** All display components available from registry ✅
- **Feedback:** All feedback components available from registry ✅

### ⚠️ Need Alternatives

If you need these components, use local templates or alternatives:
- **@ingka/colours** → Use `@ingka/variables`
- **@ingka/modal-prompt** → Use `@ingka/modal`
- **@ingka/modal-sheets** → Use `@ingka/modal`
- **@ingka/modal-theatre** → Use `@ingka/modal`

## Testing Results

Comprehensive test conducted on October 31, 2025:
- **Method:** Individual package installation attempts
- **Registry:** https://npm.m2.blue.cdtapps.com
- **Success Rate:** 86% (62/72 components)
- **Test Environment:** macOS with Node.js v24.5.0

### Command Used
```bash
for comp in [all-components]; do
  npm install --no-save @ingka/$comp
done
```

## Component Installer Updates (v6.0.0)

The component installer has been updated to:
1. ✅ Configure `.npmrc` before installation
2. ✅ Install packages individually (prevents one failure blocking all)
3. ✅ Use correct package names (`variables`, `modal`)
4. ✅ Fall back to local templates for unavailable packages
5. ✅ Provide accurate installation reporting

## Next Steps

- [ ] Create local templates for the 10 unavailable components
- [ ] Test component installer end-to-end with new package names
- [ ] Update documentation with registry-first approach
- [ ] Verify all 62 registry components work in production

## Related Documentation

- [Component Installer Code](../../lib/components/component-installer.js)
- [Ingka Skapa Design System](https://github.com/ingka-group/skapa) (internal)
- [Component Installation Guide](../guides/COMPONENT_INSTALLATION.md)

---

**Maintained by:** Ingvar Kit Team  
**Last Test:** October 31, 2025  
**Next Review:** When new components are added to registry
