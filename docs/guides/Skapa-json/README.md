# Skapa Design System - JSON Format

This directory contains JSON conversions of IKEA Skapa Design System PDF specifications.

## 📊 Overview

- **Total Files:** 82 JSON files
- **Foundations:** 23 files (colors, typography, spacing, motion, etc.)
- **Components:** 59 files (buttons, cards, forms, navigation, etc.)
- **Generated:** November 1, 2025
- **Source:** Converted from PDF specifications using `ingvar pdf-to-json`

## 📁 Directory Structure

```
Skapa-json/
├── index.json                      # Master index with all files
├── foundations/                    # Design token specifications (23 files)
│   ├── Colour-brand.json
│   ├── Colour-extended.json
│   ├── Typography-system.json
│   ├── Spacing.json
│   ├── Corner-radius.json
│   ├── Elevation.json
│   └── ...
└── components/                     # Component specifications (59 files)
    ├── Button.json
    ├── Card.json
    ├── Input-field.json
    ├── Modal-containers.json
    └── ...
```

## 🎨 Foundations (23 files)

### Color System
- `Colour-brand.json` - IKEA brand colors (Swedish Blue, Yellow)
- `Colour-main.json` - Primary color palette
- `Colour-extended.json` - Extended color variations
- `Colour-tokens.json` - Color token specifications

### Typography
- `Typography-system.json` - Type system overview
- `Typography-typeface.json` - Typeface specifications (Noto Sans)
- `Typography-using.json` - Usage guidelines
- `Typography-showcase.json` - Typography examples

### Layout & Spacing
- `Spacing.json` - 8px spacing system
- `Layouts-grids.json` - Grid system and layouts

### Visual Elements
- `Borders.json` - Border specifications
- `Corner-radius.json` - Border radius standards
- `Elevation.json` - Shadow and depth system
- `Design-tokens.json` - Complete token reference

### Iconography
- `Iconography.json` - Icon system overview
- `Iconography-specs.json` - Icon specifications
- `Icons.json` - Available icons

### Motion
- `Motion-overview.json` - Animation principles
- `Motion-dynamics.json` - Motion dynamics
- `Motion-tokens.json` - Animation tokens

### Content
- `Writting-overview.json` - Content strategy
- `Writting-style.json` - Writing style guide
- `Writting-voice-tone.json` - Voice and tone guidelines

## 🧩 Components (59 files)

### Buttons & Actions
- `Button.json` - Primary button component
- `Icon-button.json` - Icon-only buttons
- `Dual-button.json` - Two-button layout
- `Expanding-button.json` - Expandable button
- `Jumbo-button.json` - Large prominent button

### Form Controls
- `Input-field.json` - Text input field
- `Text-area.json` - Multi-line text input
- `Checkbox.json` - Checkbox component
- `Radio-button.json` - Radio button selection
- `Switch.json` - Toggle switch
- `Slider.json` - Range slider
- `Select-native.json` - Native select dropdown
- `Combobox.json` - Combo box selection
- `Search.json` - Search input
- `Quantity-stepper.json` - Numeric stepper

### Display Components
- `Card.json` - Card container
- `Compact-card.json` - Smaller card variant
- `Text-overlay-cards.json` - Cards with text overlays
- `Badge.json` - Status badge
- `Tag.json` - Tag/label component
- `Pill.json` - Pill-shaped element
- `Icon-pill.json` - Icon with pill background
- `Status.json` - Status indicator
- `Rating.json` - Star rating display
- `Price.json` - Price display
- `Product-identifier.json` - Product ID display

### Navigation
- `App-bar.json` - Application top bar
- `Tabs.json` - Tab navigation
- `Menu-item.json` - Menu item component
- `Hyperlink.json` - Link component
- `Segmented-control.json` - Segmented button group

### Lists & Collections
- `List.json` - List container
- `List-view-item.json` - List item
- `List-box.json` - Selection list box
- `Table.json` - Data table
- `Carousel.json` - Image/content carousel

### Modals & Overlays
- `Modal-containers.json` - Modal dialog
- `Sheet.json` - Bottom sheet
- `Tooltip.json` - Tooltip overlay
- `Toast.json` - Toast notification
- `Prompt.json` - Confirmation prompt
- `Inline-message.json` - Inline message

### Media
- `Image.json` - Image component
- `Broken-image.json` - Image error state
- `Avatar.json` - User avatar
- `Simple-video.json` - Video player
- `Theatre.json` - Full-screen media view
- `Aspect-ratio-box.json` - Aspect ratio container

### Feedback & Progress
- `Loading.json` - Loading spinner
- `Progress-indicator.json` - Progress bar
- `Banner.json` - Notice banner
- `Endorsement-label.json` - Endorsement badge
- `Helper-text.json` - Helper/hint text

### Layout & Structure
- `Divider.json` - Visual divider
- `Accordion.json` - Collapsible content
- `Expander.json` - Expandable section
- `Toggle.json` - Toggle component
- `Choice.json` - Choice selection

## 📖 JSON Structure

Each JSON file contains:

```json
{
  "name": "Component-name",
  "category": "Skapa-foundations" or "Skapa-components",
  "source": "category/filename.pdf",
  "extractedAt": "2025-11-01T09:45:33.012Z",
  "metadata": {
    "pages": 4,
    "info": {}
  },
  "content": {
    "rawText": "Extracted text content",
    "lines": ["Line 1", "Line 2", ...]
  },
  "tokens": {
    // For foundations
    "type": "color|typography|spacing|etc",
    "colors": [...],
    "spacing": [...],
    "typography": {...}
  },
  "component": {
    // For components
    "name": "ComponentName",
    "variants": [...],
    "states": [...],
    "properties": [...],
    "usage": [...]
  }
}
```

## 🔧 Usage

### CLI Commands

```bash
# List available PDFs
ingvar pdf-to-json list

# Convert all PDFs
ingvar pdf-to-json convert

# Convert specific directory
ingvar pdf-to-json convert --dir docs/guides/Skapa-foundations --verbose

# Convert with custom output
ingvar pdf-to-json convert --output custom/path
```

### Programmatic Usage

```javascript
const { PDFToJSONConverter } = require('./lib/utils/pdf-to-json-converter');

const converter = new PDFToJSONConverter({
  outputDir: 'docs/guides/Skapa-json',
  verbose: true
});

await converter.init();
await converter.convertAll();
```

### Reading JSON Files

```javascript
const fs = require('fs-extra');
const index = await fs.readJson('docs/guides/Skapa-json/index.json');

// Load a specific component
const button = await fs.readJson('docs/guides/Skapa-json/components/Button.json');

// Load foundation tokens
const colors = await fs.readJson('docs/guides/Skapa-json/foundations/Colour-brand.json');
```

## ⚠️ Important Notes

### PDF Format Limitations

The source PDFs are **image-based** (not text-embedded), which means:

- ✅ Metadata extracted (page count, structure)
- ✅ JSON structure created for all files
- ⚠️  Limited text content extraction
- ⚠️  Design tokens may need manual enhancement

### Future Improvements

Consider adding:
- OCR integration for better text extraction
- Manual curation of design tokens
- Enhanced parsing for specific token types
- Image extraction from PDFs
- Cross-reference linking between components

## 📚 Related Documentation

- **Source PDFs:** `docs/guides/Skapa-foundations/` and `docs/guides/Skapa-components/`
- **Component Index:** `docs/guides/SKAPA_COMPONENT_INDEX.md`
- **Design System Guide:** `docs/guides/INGKA_DESIGN_SYSTEM.md`
- **AI Instructions:** `lib/ai-instructions/frontend-agent-ingka.instructions.md`

## 🛠️ Tools

- **Converter:** `lib/utils/pdf-to-json-converter.js`
- **CLI Command:** `lib/commands/pdf-to-json.js`
- **PDF Parser:** `pdf-parse` (v2.x)

## 📄 License

These specifications are part of IKEA's Ingka Skapa Design System.  
See main project license for usage terms.

---

**Generated by:** Ingvar Kit v6.2.0  
**Date:** November 1, 2025  
**Conversion Tool:** `ingvar pdf-to-json`
