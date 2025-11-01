# Screenshot to JSON Extraction Guide

This guide explains how to convert Skapa Design System screenshots to structured JSON files using AI Vision.

## Overview

The PDF files we have are **image-based** with no extractable text. However, we have **73 high-quality screenshots** from the actual Skapa website at `skapa.ikea.net`. These screenshots contain the real design specifications.

Using **GPT-4 Vision** (or similar AI vision models), we can:

- Read the screenshots and extract structured design information
- Generate proper JSON files with real content
- Create a machine-readable design system specification

## Available Screenshots

Located in: `docs/guides/Skapa SS/`

### Components (55 screenshots)

- Accordion, App-Bar, Badge, Banner, Button, Card, Carousel
- Choice, Combobox, Compact-Card, Divider, Dual-Button
- Hyperlink, Icon-Button, Icon-Pill, Inline-Message, Input-Field
- Jumbo-Button, List-View-Item, Listbox, Loading, Member-Card
- Menu-Item, Modal-Containers, Pill, Price, Product-Identifier
- Progress-Indicator, Prompt, Radio-Button, Rating, Search
- Sheet, Skeleton, Slider, Status, Switch, Table, Tabs
- Tag, Text, Text-Overlay-Card, Toast, Tooltip

### Foundations (8 screenshots)

- All-Icons (icon library)
- Borders (border specifications)
- Corner-Radius (border radius scale)
- Elevation (shadow system)
- Layout-And-Grids (grid system)
- Spacing (8px spacing system)
- Typography (typeface, scale, hierarchy)

### Subsystems (9 screenshots)

- CWDS/Co-Worker components:
  - App-Switcher
  - Bottom-Bar-Navigation
  - Colours (co-worker color palette)
  - Global-Header
  - Navigation-Menu
  - Profile

### Patterns (1 screenshot)

- Filtering pattern

## Usage

### Prerequisites

1. EITHER **OpenAI API Key** (for GPT-4 Vision)

  ```bash
  export OPENAI_API_KEY="sk-your-key-here"
  ```

2. OR use **OCR-only mode** (no API key) with Tesseract.js

  This will extract readable text (tokens, sizes, labels) from screenshots. It won't be as rich as Vision, but produces meaningful JSON instead of empty files.

3. **Install Ingvar Kit** (if not already)
  ```bash
  npm install -g ingvar-kit
  ```

### Commands

#### List Available Screenshots

```bash
ingvar screenshot-to-json list
```

Shows all screenshots organized by type (components, foundations, subsystems, patterns).

#### Convert All Screenshots (Vision)

```bash
ingvar screenshot-to-json
```

This will:

1. Read all 73 screenshots
2. Use GPT-4 Vision to extract design specifications
3. Generate JSON files in `docs/guides/Skapa-json/`
4. Create a master index file

**Note:** This will make ~73 API calls and may take 5-10 minutes.

#### Convert All Screenshots (OCR-only, no API key)

```bash
ingvar screenshot-to-json --ocr-only
```

Falls back to local OCR using Tesseract.js. Extracts text content and basic tokens (colors, spacing, typography) heuristically.

#### Dry Run (Preview)

```bash
ingvar screenshot-to-json --dry-run
```

Shows what would be processed without making API calls.

#### Test Single Screenshot

```bash
ingvar screenshot-to-json test screencapture-skapa-ikea-net-components-button-2025-08-31-15_35_38.png
```

Test extraction on one screenshot before processing all.

#### Custom Options

```bash
ingvar screenshot-to-json \
  --input "path/to/screenshots" \
  --output "path/to/output" \
  --model "gpt-4o" \
  --api-key "sk-..."
```

### Output Structure

Generated JSON files will contain:

#### Component JSON

```json
{
  "name": "Button",
  "category": "Skapa-components",
  "source": "Screenshot from skapa.ikea.net",
  "extractedAt": "2025-11-01T10:00:00.000Z",
  "extractionMethod": "gpt-4-vision",
  "description": "Primary interactive element for actions",
  "variants": [
    {
      "name": "primary",
      "description": "Main call-to-action button"
    },
    {
      "name": "secondary",
      "description": "Less prominent actions"
    }
  ],
  "states": [
    {
      "name": "default",
      "description": "Normal interactive state"
    },
    {
      "name": "hover",
      "description": "Mouse hover state"
    },
    {
      "name": "disabled",
      "description": "Non-interactive state"
    }
  ],
  "properties": [
    {
      "name": "variant",
      "type": "string",
      "required": false,
      "description": "Button style variant"
    }
  ],
  "anatomy": {
    "parts": ["label", "icon (optional)", "background", "border"],
    "structure": "Container with label and optional icon"
  },
  "usage": {
    "when": "User needs to trigger an action or navigate",
    "whenNot": "For navigation, use links instead",
    "bestPractices": [
      "Use descriptive labels",
      "Limit to 1-2 primary buttons per screen"
    ]
  },
  "accessibility": {
    "keyboardSupport": ["Enter", "Space"],
    "ariaAttributes": ["aria-label", "aria-disabled"],
    "focusManagement": "Focusable by default, visible focus indicator"
  }
}
```

#### Foundation JSON

```json
{
  "name": "Spacing",
  "category": "Skapa-foundations",
  "source": "Screenshot from skapa.ikea.net",
  "extractedAt": "2025-11-01T10:00:00.000Z",
  "extractionMethod": "gpt-4-vision",
  "type": "spacing",
  "description": "8px-based spacing system",
  "tokens": [
    {
      "name": "spacing-xs",
      "value": "8px",
      "usage": "Tight spacing between related elements"
    },
    {
      "name": "spacing-sm",
      "value": "16px",
      "usage": "Small spacing, component padding"
    },
    {
      "name": "spacing-md",
      "value": "24px",
      "usage": "Medium spacing, default gaps"
    }
  ],
  "scale": {
    "description": "8px base grid system",
    "values": ["8px", "16px", "24px", "32px", "40px", "48px"]
  },
  "guidelines": [
    "Always use multiples of 8",
    "Mobile: prefer smaller values (8, 16)",
    "Desktop: use larger values (24, 32, 48)"
  ]
}
```

## Cost Estimation

Using GPT-4 Vision (gpt-4o model):

- ~73 screenshots
- ~$0.01-0.05 per screenshot (varies by image size and response length)
- **Total estimated cost: $0.73 - $3.65**
 
OCR-only mode: $0.00 (local processing). Results are less detailed but useful (tokens, sizes, common variants/states).

## Benefits

✅ **Real Content:** Extract actual design specifications from website
✅ **Structured Data:** Machine-readable JSON format
✅ **AI-Ready:** Perfect for agent instructions and code generation
✅ **Version Controlled:** Track design system changes over time
✅ **Searchable:** Easy to query and reference

## Next Steps

After conversion:

1. **Review JSON Files**

   ```bash
   cat docs/guides/Skapa-json/components/Button.json
   ```

2. **Update Agent Instructions**

   - Agents will now read real content from JSON
   - Much more accurate component generation

3. **Test with Spark**

   ```bash
   ingvar spark --prompt "Create a login form" --ikea
   ```

4. **Commit to Repository**
   ```bash
   git add docs/guides/Skapa-json/
   git commit -m "feat(design-system): add extracted Skapa specifications from screenshots"
   ```

## Troubleshooting

### API Key Not Set

```bash
❌ Error: OpenAI API key required
```

**Solution:** Export your API key:

```bash
export OPENAI_API_KEY="sk-..."
```

### Rate Limiting

```bash
⚠️  OpenAI API error: 429 - Rate limit exceeded
```

**Solution:** Add delays between requests or use a higher rate limit tier.

### Poor Extraction Quality

```bash
⚠️  Could not parse JSON response
```

**Solution:**

- Check screenshot quality
- Try a different model (`--model gpt-4-turbo`)
- Manually review and edit the JSON file

## Manual Curation

After extraction, you can manually enhance the JSON files:

1. Add missing information not visible in screenshots
2. Correct any extraction errors
3. Add code examples
4. Enhance usage guidelines

The AI extraction provides a solid foundation, but human review improves accuracy.

## Alternative: Manual Creation

If you prefer not to use AI Vision, you can manually create JSON files by:

1. Opening each screenshot
2. Reading the specifications
3. Creating JSON files following the structure above
4. This is more time-consuming but gives you full control

---

**Questions?** Open an issue or check the main README for more information.
