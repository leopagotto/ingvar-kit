# Skapa Design System - AI Agent Documentation

> **📖 Complete Reference Guide for AI Agents**
> Comprehensive documentation of IKEA's Skapa Design System extracted from official sources and organized for AI agent consumption.

## 🎯 Purpose

This documentation provides AI agents with detailed specifications for implementing IKEA's Skapa Design System components. All information is extracted from official Skapa design system screenshots (skapa.ikea.net) using OCR and organized into structured, searchable markdown files.

## 📚 Documentation Structure

The documentation is organized into 9 focused modules:

### Core Documentation

| File                                                                   | Coverage                                                 | Components Count |
| ---------------------------------------------------------------------- | -------------------------------------------------------- | ---------------- |
| **[00-QUICK-START-GUIDE.md](./00-QUICK-START-GUIDE.md)**               | Installation, quick reference, common patterns           | -                |
| **[01-OVERVIEW-AND-FOUNDATIONS.md](./01-OVERVIEW-AND-FOUNDATIONS.md)** | Design tokens, typography, spacing, colors, grids, icons | -                |
| **[02-ACTION-COMPONENTS.md](./02-ACTION-COMPONENTS.md)**               | Interactive elements                                     | 6                |
| **[03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md)**                 | Forms and data entry                                     | 10               |
| **[04-DISPLAY-COMPONENTS.md](./04-DISPLAY-COMPONENTS.md)**             | Content display (Cards, Lists, Tables)                   | 7                |
| **[05-FEEDBACK-COMPONENTS.md](./05-FEEDBACK-COMPONENTS.md)**           | User feedback (Toasts, Modals, Alerts)                   | 7                |
| **[06-NAVIGATION-AND-SPECIALTY.md](./06-NAVIGATION-AND-SPECIALTY.md)** | Navigation, Media, Commerce                              | 14               |
| **[07-LAYOUT-PATTERNS.md](./07-LAYOUT-PATTERNS.md)**                   | Page layouts and composition                             | -                |
| **[08-CWDS-SUBSYSTEM.md](./08-CWDS-SUBSYSTEM.md)**                     | Coworker Design System (internal apps)                   | 6                |

**Total Components Documented:** 50+ production-ready components

## 🚀 Quick Navigation

### By User Need

**Building Forms?** → [03-INPUT-COMPONENTS.md](./03-INPUT-COMPONENTS.md)
**Creating Buttons/Links?** → [02-ACTION-COMPONENTS.md](./02-ACTION-COMPONENTS.md)
**Displaying Products?** → [04-DISPLAY-COMPONENTS.md](./04-DISPLAY-COMPONENTS.md)
**Showing Notifications?** → [05-FEEDBACK-COMPONENTS.md](./05-FEEDBACK-COMPONENTS.md)
**Building Navigation?** → [06-NAVIGATION-AND-SPECIALTY.md](./06-NAVIGATION-AND-SPECIALTY.md)
**E-commerce Features?** → [06-NAVIGATION-AND-SPECIALTY.md](./06-NAVIGATION-AND-SPECIALTY.md)
**Page Layouts?** → [07-LAYOUT-PATTERNS.md](./07-LAYOUT-PATTERNS.md)
**Internal IKEA Apps?** → [08-CWDS-SUBSYSTEM.md](./08-CWDS-SUBSYSTEM.md)

### By Component Name

<details>
<summary><strong>Action Components (6)</strong></summary>

- Button (Primary, Secondary, Tertiary, Danger, Emphasised)
- Icon Button
- Dual Button
- Hyperlink (Regular, Subtle)
- Expanding Button
- Jumbo Button
</details>

<details>
<summary><strong>Input Components (10)</strong></summary>

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
</details>

<details>
<summary><strong>Display Components (8)</strong></summary>

- Card (Regular, Simple, Themed)
- Compact Card
- Text Overlay Card
- List
- List View Item
- Table
- Accordion
- Expander
</details>

<details>
<summary><strong>Feedback Components (7)</strong></summary>

- Toast
- Banner
- Inline Message
- Modal Containers (Sheet, Theatre, Prompt)
- Loading (Skeleton, Progress Indicator)
- Status
- Helper Text
</details>

<details>
<summary><strong>Navigation Components (4)</strong></summary>

- Tabs
- App Bar
- Menu Item
- Segmented Control
</details>

<details>
<summary><strong>Media Components (3)</strong></summary>

- Image (Aspect Ratio Box, Broken Image)
- Carousel
- Shoppable Image
</details>

<details>
<summary><strong>Specialty Components (7)</strong></summary>

- Price
- Price Module
- Product Identifier
- Rating
- Badge
- Tag
- Avatar
</details>

<details>
<summary><strong>CWDS Subsystem (6)</strong></summary>

- Global Header
- Navigation Menu
- Bottom Bar Navigation
- App Switcher
- Profile
- CWDS Colors
</details>

## 📖 How to Use This Documentation

### For AI Agents

1. **Start with [00-QUICK-START-GUIDE.md](./00-QUICK-START-GUIDE.md)**

   - Get installation instructions
   - Learn common patterns
   - Understand quick reference

2. **Read [01-OVERVIEW-AND-FOUNDATIONS.md](./01-OVERVIEW-AND-FOUNDATIONS.md)**

   - Understand design tokens
   - Learn color system
   - Master spacing scale
   - Typography system

3. **Reference Component-Specific Files**

   - Each file contains detailed component specs
   - Includes variants, states, usage rules
   - Accessibility requirements
   - Code examples

4. **Validate Implementation**
   - Check accessibility checklist
   - Verify responsive behavior
   - Test keyboard navigation
   - Validate color contrast

### For Human Developers

1. **Day 1:** Read Quick Start + Overview
2. **Day 2:** Build buttons and forms (02 + 03)
3. **Day 3:** Create cards and lists (04)
4. **Day 4:** Add feedback and navigation (05 + 06)
5. **Day 5:** Integrate media and specialty components (07 + 08)

## 🎨 Design Tokens Quick Reference

### Colors (IKEA Brand)

```css
--color-blue-ikea: #0058a3; /* Primary */
--color-yellow-ikea: #ffdb00; /* Accent */
--color-success: #00a300; /* Green */
--color-error: #e00751; /* Red */
--color-warning: #ff8c00; /* Orange */
```

### Spacing (Base-8 Grid)

```css
--spacing-8: 8px; /* Base unit */
--spacing-16: 16px; /* Common padding */
--spacing-24: 24px; /* Section spacing */
--spacing-32: 32px; /* Large spacing */
--spacing-64: 64px; /* Section breaks */
```

### Typography (Noto IKEA)

```css
--text-body-medium: 14px / 20px; /* Default body */
--text-heading-medium: 24px / 32px; /* Default heading */
--font-weight-regular: 400;
--font-weight-bold: 700;
```

### Breakpoints

```css
--breakpoint-sm: 600px; /* Phone landscape */
--breakpoint-md: 900px; /* Tablet */
--breakpoint-lg: 1200px; /* Desktop */
--breakpoint-xl: 1440px; /* Large desktop */
```

## ♿ Accessibility Standards

All components meet **WCAG 2.1 Level AA** requirements:

- **Color Contrast:** 4.5:1 for normal text, 3:1 for large text
- **Keyboard Navigation:** All interactive elements accessible via keyboard
- **Focus Indicators:** Visible 3px blue outline
- **Screen Reader Support:** Semantic HTML + ARIA labels
- **Motion Preferences:** Respects `prefers-reduced-motion`

## 🌍 Internationalization

All components support:

- **RTL Languages** (Arabic, Hebrew) - automatic mirroring
- **Multi-language** content with proper text wrapping
- **Locale-specific** formatting (dates, numbers, currency)
- **Icon directionality** - automatic flipping for RTL

## 📱 Platform Support

### Web

- **React:** `@ingka/skapa-react`
- **Vue:** `@ingka/skapa-vue`
- **Web Components:** `@ingka/skapa-web-components`

### Mobile

- **Android:** `com.ingka.skapa`
- **iOS:** `SkapaKit`

### Design

- **Figma:** Official component library (internal IKEA access)

## 🔍 Search & Find Components

### By Visual Pattern

- **Single action button** → Button (Primary/Secondary/Tertiary)
- **Icon-only button** → Icon Button
- **Two related buttons** → Dual Button
- **Text link** → Hyperlink
- **Text input** → Input Field
- **Dropdown selection** → Select or Combobox
- **On/off toggle** → Switch
- **Multiple choices** → Checkbox
- **Single choice** → Radio Button
- **Content card** → Card or Compact Card
- **Notification** → Toast or Banner
- **Full-screen overlay** → Modal (Sheet/Theatre)
- **Tab navigation** → Tabs
- **List of items** → List or Table
- **Image with products** → Shoppable Image
- **Price display** → Price or Price Module
- **Star rating** → Rating
- **Product badge** → Badge or Pill

## 📊 Component Complexity Matrix

| Complexity   | Components                                                           | Time to Implement |
| ------------ | -------------------------------------------------------------------- | ----------------- |
| **Simple**   | Button, Icon Button, Badge, Pill, Hyperlink, Checkbox, Radio, Switch | 30-60 min         |
| **Medium**   | Input Field, Select, Card, List, Toast, Tabs, Image                  | 1-2 hours         |
| **Complex**  | Combobox, Table, Modal, Carousel, Search, Shoppable Image            | 2-4 hours         |
| **Advanced** | Full page layouts, Multi-step forms, Complex navigation              | 4-8 hours         |

## 🐛 Common Implementation Mistakes

### ❌ Avoid These:

1. **Hardcoded values** instead of design tokens
2. **Missing labels** on input fields
3. **Multiple primary buttons** on one screen
4. **Icon buttons without accessibility labels**
5. **Subtle hyperlinks in body text** (WCAG violation)
6. **Skipping keyboard navigation** testing
7. **Ignoring mobile breakpoints**
8. **Using wrong semantic HTML** elements
9. **Missing error states** on forms
10. **Not testing with screen readers**

### ✅ Best Practices:

1. Always use design tokens for colors/spacing
2. Provide labels for all form elements
3. One primary action per screen
4. Include aria-labels for icon-only buttons
5. Use regular hyperlinks in body text
6. Test all interactions with keyboard
7. Design mobile-first, enhance for desktop
8. Use semantic HTML (`<button>`, `<input>`, `<nav>`)
9. Show clear error/success states
10. Test with NVDA/JAWS/VoiceOver

## 📚 Additional Resources

### Official Sources

- **Skapa Website:** https://skapa.ikea.net (internal IKEA)
- **Figma Library:** Available to IKEA designers
- **GitHub:** Internal IKEA repositories

### This Repository

- **JSON Specs:** `/docs/guides/Skapa-json/` - Raw OCR-extracted data
- **Visual References:** Design system screenshots
- **Test Results:** `/docs/guides/SKAPA_JSON_TEST_RESULTS.md`

## 🔄 Data Extraction Process

This documentation was created using:

1. **Source:** Official screenshots from skapa.ikea.net
2. **Extraction:** Tesseract OCR (2025-11-02)
3. **Processing:** Structured JSON format
4. **Organization:** Markdown documentation (AI-friendly)
5. **Validation:** Cross-referenced with official specs

## 📝 Documentation Maintenance

### Last Updated

- **Documentation Generated:** November 4, 2025
- **Source Data Extracted:** November 2, 2025
- **Skapa Version:** 2025 (components updated through August 2025)

### Version History

- **v1.1** (2025-11-04): Separated Layout and CWDS into dedicated files
  - Split 07-LAYOUT-AND-CWDS.md into two files for better organization
  - 07-LAYOUT-PATTERNS.md: Layout patterns and page templates
  - 08-CWDS-SUBSYSTEM.md: Coworker Design System components
  - Total: 9 organized markdown files

- **v1.0** (2025-11-04): Initial comprehensive AI agent documentation
  - 8 organized markdown files (~6,500 lines)
  - 50+ components documented
  - Full accessibility specs (WCAG 2.1 AA)
  - Responsive patterns included
  - Layout templates
  - CWDS subsystem coverage

## 🤝 Contributing

### For AI Agents

When implementing components:

1. Reference the appropriate documentation file
2. Follow accessibility guidelines strictly
3. Use design tokens (never hardcode)
4. Test keyboard navigation
5. Validate responsive behavior

### For Human Developers

To update this documentation:

1. Extract new screenshots from skapa.ikea.net
2. Run OCR processing (`scripts/extract-cwds-from-figma.js`)
3. Update relevant markdown files
4. Validate examples with actual code
5. Test on real devices

## 📞 Support

### For Implementation Questions

- Check component-specific markdown files
- Reference JSON specs in `/docs/guides/Skapa-json/`
- Review accessibility checklist
- Consult official Skapa documentation

### For Ingvar Kit Questions

- Repository: https://github.com/leopagotto/ingvar-kit
- Issues: GitHub Issues
- Documentation: `/docs/` directory

## 🎯 Success Criteria

Your implementation is successful when:

- ✅ All components use design tokens
- ✅ Keyboard navigation works perfectly
- ✅ Screen readers announce content correctly
- ✅ Color contrast meets WCAG 2.1 AA
- ✅ Responsive behavior works on all breakpoints
- ✅ RTL languages display correctly
- ✅ Motion respects user preferences
- ✅ Error states are clear and actionable
- ✅ Loading states provide feedback
- ✅ Focus indicators are always visible

---

## 🚀 Get Started

**Ready to implement?** Start here:

1. **[00-QUICK-START-GUIDE.md](./00-QUICK-START-GUIDE.md)** - Fast reference
2. **[01-OVERVIEW-AND-FOUNDATIONS.md](./01-OVERVIEW-AND-FOUNDATIONS.md)** - Deep dive
3. **Pick a component** from 02-09 based on your needs
4. **Build, test, validate** with accessibility checklist

---

**Built with ❤️ for AI Agents | IKEA Skapa Design System | November 2025**
