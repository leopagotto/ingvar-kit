# Changelog

All notable changes to Ingvar Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [6.7.1] - 2025-11-05

### 🐛 Fixed

- **React Peer Dependencies:** Added `react` and `react-dom` as peer dependencies (>=16.8.0) for bundled Skapa components

## [6.7.0] - 2025-11-05

### 🎉 BREAKING CHANGE: Skapa Components Now Bundled

**Major Simplification:** All 64 Skapa components are now bundled directly with `ingvar-kit`. No separate package installation needed!

#### Changed

- **Bundled Components:** Skapa components moved from separate `ingvar-skapa-components` package into main `ingvar-kit` package
- **New Import Paths:**
  - Old: `import { Button } from 'ingvar-skapa-components'`
  - New: `import { Button } from 'ingvar-kit/skapa'`
  - Or: `import { Button } from 'ingvar-kit/skapa/ingka-direct'`
- **Simplified Installation:** One package instead of two

  ```bash
  # Old (v6.6.x):
  npm install ingvar-kit
  npm install ingvar-skapa-components

  # New (v6.7.0+):
  npm install ingvar-kit react react-dom
  ```

#### Added

- **Bundled Package Exports:**
  - `ingvar-kit/skapa` - Simplified component wrappers (56 components)
  - `ingvar-kit/skapa/ingka-direct` - Direct @ingka exports (58 components)
- **Merged Dependencies:** All 20+ @ingka packages now included in main package
- **Updated CLI:** `ingvar components` command now shows components are bundled
- **Updated Postinstall:** Displays bundled components info with new import paths

#### Deprecated

- **ingvar-skapa-components@0.1.0:** Deprecated in favor of bundled components in `ingvar-kit@6.7.0+`

#### Fixed

- **Postinstall Syntax Error:** Fixed unterminated template literal in error handling

#### Migration Guide

```javascript
// Before (v6.6.x):
import { Button, TextField } from "ingvar-skapa-components";
import { Card } from "ingvar-skapa-components/ingka-direct";

// After (v6.7.0+):
import { Button, TextField } from "ingvar-kit/skapa";
import { Card } from "ingvar-kit/skapa/ingka-direct";
```

**Benefits:**

- ✅ Simpler installation (one package instead of two)
- ✅ No confusion about separate packages
- ✅ All 64 components included out of the box
- ✅ Same tree-shakeable ES modules
- ✅ Same 97% TypeScript coverage
- ✅ Dual export options maintained

## [6.6.0] - 2025-11-05

### 📦 @ingvar-kit/skapa-components Package & CLI Integration

**Major Feature:** New production-ready npm package with 64 official IKEA Skapa components and integrated CLI installation flow.

#### Added

- **@ingvar-kit/skapa-components Package:**

  - 64 official Skapa components with direct @ingka package exports
  - Dual import strategy: `/ingka-direct` (official names) or main export (wrappers)
  - 328KB optimized ESM bundle with tree-shaking support
  - 97% TypeScript coverage (61/64 components with full types)
  - Production-ready with comprehensive documentation

- **Dual Export Architecture:**

  - Main export (`@ingvar-kit/skapa-components`): Simplified wrappers for rapid prototyping
  - Subpath export (`@ingvar-kit/skapa-components/ingka-direct`): Direct @ingka exports with official names
  - Both bundles optimized with Rollup (CJS + ESM formats)
  - Full TypeScript declarations for both export paths

- **CLI Integration:**

  - Updated `ingvar components` command to offer package or individual components
  - Interactive menu: "npm Package (Recommended)" vs "Individual Components"
  - Package installation with usage examples and documentation links
  - Seamless integration with existing cherry-pick workflow

- **Postinstall Enhancement:**

  - Updated postinstall script to promote @ingvar-kit/skapa-components package
  - Shows both installation options: package vs individual components
  - Clear benefits listed: bundle size, TypeScript, dual strategies
  - Option to install package immediately during CLI setup

- **Comprehensive Documentation:**
  - Complete package README with 5 usage examples
  - Component catalog (COMPONENT_STATUS.md) with 64 components
  - Architecture guide (DIRECT_EXPORT_ARCHITECTURE.md)
  - Component name mapping reference (SKAPA_COMPONENT_MAPPING.md)
  - Integration test report (TEST_RESULTS.md)
  - Main README updated with package Quick Start section

#### Changed

- **Component Installation Flow:**

  - CLI now offers package installation first (recommended)
  - Individual component installation still available (75+ components)
  - Clear use case guidance for each approach
  - Updated README Quick Start to show both options

- **Package Build System:**

  - Rollup config updated to build dual exports
  - Generates both main and ingka-direct bundles
  - Separate sourcemaps and TypeScript declarations
  - Optimized builds with peer dependency externalization

#### Technical Details

- **Package Structure:**

  ```
  dist/
  ├── index.js + index.esm.js (328KB - wrappers)
  ├── ingka-direct.js + ingka-direct.esm.js (424KB - direct exports)
  ├── index.d.ts + ingka-direct.d.ts (TypeScript)
  └── styles.css (optimized CSS)
  ```

- **Import Examples:**

  ```typescript
  // Direct @ingka exports (recommended for Skapa projects)
  import {
    Button,
    InputField,
  } from "@ingvar-kit/skapa-components/ingka-direct";

  // Simplified wrappers (rapid prototyping)
  import { Button, TextField } from "@ingvar-kit/skapa-components";
  ```

- **Component Coverage:**
  - Actions (4): Button, IconButton, DualButton, Hyperlink
  - Inputs (13): InputField, TextArea, Checkbox, RadioButton, Select, Switch, etc.
  - Indicators (5): Badge, Loading, ProgressBar, ProgressIndicator, Status
  - Messages (5): Banner, Toast, AlertDialog, InformationDialog, DecisionDialog
  - Navigation (3): Breadcrumb, Tabs, Stepper
  - Layout (15): Grid, Stack, Container, Spacer, Divider, etc.
  - Containers (9): Card, Accordion, Drawer, Sheet, Popover, etc.
  - Product Range (3): Price, ProductID, Pill
  - Foundation (1): Theme

#### Impact

- Streamlined component installation (single package vs 64 individual installs)
- Better DX with TypeScript support and dual import options
- Consistent versioning (all components bundled together)
- Faster Spark app generation (pre-bundled components)
- Choice preserved: users can still cherry-pick individual components

#### Migration Guide

**From Individual Components to Package:**

```bash
# Install package
npm install @ingvar-kit/skapa-components

# Update imports
- import Button from '@ingka/button';
+ import { Button } from '@ingvar-kit/skapa-components/ingka-direct';
```

**For New Projects:**

```bash
# Option 1: Use CLI (recommended)
ingvar components
# → Choose "npm Package"

# Option 2: Direct install
npm install @ingvar-kit/skapa-components
```

## [6.5.1] - 2025-11-02

### 🐛 Spark Generator Fixes

**Bug Fixes:** Improved Spark workflow to require initialization and provide voice command guidance.

#### Fixed

- **Initialization Check:**

  - Spark now verifies that `ingvar init` was run before allowing app generation
  - Prompts user to run initialization if not configured
  - Prevents "appearing too early" issue by enforcing proper setup flow

- **Voice Command Support:**

  - Added clear voice command instructions for input
  - macOS: "Press Fn key twice to enable dictation"
  - Windows: "Press Win + H for voice typing"
  - Users can still type manually if preferred

- **Better Error Handling:**
  - Clear guidance when design system not configured
  - Option to run `ingvar init` directly from Spark
  - Improved error messages and user guidance

#### Impact

- Users must complete `ingvar init` before using Spark (proper workflow)
- Voice input is encouraged but text input still available
- Better onboarding experience with clear setup steps

## [6.5.0] - 2025-11-02

### 📦 CWDS Installation Priority & npm Package Enhancements

**Major Improvement:** CWDS components now prioritize official npm packages over local templates, with comprehensive documentation updates and production-ready deployment.

#### Added

- **Installation Priority Documentation:**

  - Two-tier installation strategy: official @ingka/\* npm packages first, local templates as fallback
  - Clear guidance in README and component documentation
  - CLI instructions show npm search commands before local installation
  - Rationale documentation (automatic updates, versioning, IKEA team maintenance)

- **Enhanced Installer Messages:**

  - CWDS installer now displays installation priority tips
  - Suggests checking npm registry first: `npm search @ingka/global-header`
  - Clear fallback messaging when using local templates

- **Comprehensive Documentation:**
  - Updated templates/cwds-components/README.md with two-tier installation strategy
  - Added official package search examples
  - Installation priority clearly documented in main README
  - JSON specifications section with 6 CWDS subsystem files documented

#### Changed

- **CWDS Installation Flow:**

  - Prioritizes official npm package installation over local templates
  - Local templates explicitly positioned as fallback option
  - Installer displays installation priority tips at runtime

- **Documentation Structure:**

  - Reorganized installation section with Option 1 (npm) and Option 2 (local)
  - Added "Why this approach?" section explaining benefits
  - Updated all CWDS references to clarify package priority

- **CLI Messages:**
  - Updated cwds-installer.js console output
  - Added npm search command suggestions
  - Clearer distinction between official packages and local templates

#### Impact

- Users try official IKEA packages first (better maintenance, automatic updates)
- Local templates provide reliable fallback when npm packages unavailable
- Clear documentation reduces confusion about installation methods
- Consistent with IKEA team development practices

## [6.2.0] - 2025-11-01

### 🎨 Dual Design System Support in Spark

**Major Feature:** Spark now supports both IKEA Ingka Skapa and CWDS design systems with a unified CLI interface.

#### Added

- **Dual Design System Support:**

  - New `--design-system <system>` flag replaces legacy `--ikea` and `--cwds` flags
  - Options: `ingka` (customer-facing) or `cwds` (internal co-worker tools)
  - Interactive mode prompts for design system selection
  - Defaults to `ingka` if not specified

- **AI Code Generation:**

  - Separate system prompts for Ingka Skapa and CWDS
  - CWDS prompt includes Global Header, App Switcher, CWDS Layouts
  - Ingka Skapa prompt focuses on customer-facing components
  - Code generator respects `designSystem` parameter throughout

- **Component Installation:**
  - Ingka Skapa components installed for both design systems
  - CWDS components added when `--design-system cwds` specified
  - CWDSInstaller automatically configures recommended components
  - Auth0 default provider for CWDS authentication

#### Changed

- **CLI Interface:**

  - `ingvar spark --ikea` → `ingvar spark --design-system ingka`
  - `ingvar spark --ikea --cwds` → `ingvar spark --design-system cwds`
  - Added `--no-start` option for consistency
  - Cleaner command structure with unified parameter

- **Code Structure:**
  - Refactored `generateSparkApp` to use `designSystem` parameter
  - Updated `getAppRequirements` with interactive design system selection
  - Simplified helper functions (`generateAppCode`, `generateFallbackApp`)
  - Removed obsolete Commander-based CLI implementation from spark.js

#### Fixed

- Removed legacy boolean flags (`useIkea`, `useCwds`) causing confusion
- Fixed code generator to handle `designSystem` instead of separate booleans
- Cleaned up spark.js merge conflicts from previous implementations

#### Documentation

- Updated README.md with `--design-system` examples
- Added CHANGELOG entry for v6.2.0
- Issue #6 tracking implementation progress

## [6.1.0] - 2025-10-31

### 🎯 Component Registry: 100% Coverage Achieved

**Major Improvements:** Complete Ingka registry integration with automatic package name mapping.

#### 1. 🔄 Automatic Package Name Mapping (Issue #3)

**Problem:**

- 10/72 components appeared "unavailable" from registry
- Users thought they needed local templates
- Component names didn't match actual npm package names
- Installation failed for components with different package names

**Solution:**

- Discovered all 10 "missing" components have alternative package names
- Implemented automatic PACKAGE_NAME_MAP in component installer
- Installer transparently maps component names to actual packages
- **Result: 100% coverage (72/72 components from registry)**

**Package Mappings:**

```javascript
const PACKAGE_NAME_MAP = {
  colours: "variables", // @ingka/variables includes color tokens
  "expanding-button": "button", // Variant in @ingka/button
  "icon-button": "button", // Variant in @ingka/button
  "icon-pill": "pill", // Variant in @ingka/pill
  "modal-sheets": "modal", // Variant in @ingka/modal
  "modal-theatre": "modal", // Variant in @ingka/modal
  logos: "ssr-icon", // @ingka/ssr-icon package
  "commercial-messages": "commercial-message", // Singular form
};
```

**User Experience:**

```bash
📦 Installing Ingka npm packages...
   ✓ variables (from registry)
   ✓ button (from registry)
   ✓ colours → variables (from registry)  # Automatic mapping!
   ✓ icon-button → button (from registry) # Transparent!
   ✓ logos → ssr-icon (from registry)     # Works perfectly!

✅ Installed 72 packages from Ingka registry
```

#### 2. 📦 Individual Package Installation

**Problem:**

- Installer tried to install all packages in one big `npm install` command
- If ANY package failed, entire installation failed
- 62 working packages couldn't install because 10 seemed unavailable

**Solution:**

- Install packages one-by-one instead of bulk installation
- Each package failure is isolated
- Successful packages install even if others fail
- Better error handling and progress feedback

**Before:**

```bash
npm install @ingka/button @ingka/card @ingka/colours ... (72 packages)
# Error: @ingka/colours not found
# ENTIRE INSTALLATION FAILS - 0 packages installed
```

**After:**

```bash
# Installing packages individually...
✓ button (from registry)
✓ card (from registry)
✓ colours → variables (from registry)  # Mapped and succeeded!
✓ radio-button (from registry)
... 72 packages installed successfully
```

#### 3. 🔧 Registry Configuration Improvements

**Problem:**

- `.npmrc` file created but not fully applied before npm install
- Race condition between file write and npm reading config
- Some packages failed due to timing issues

**Solution:**

- Ensure `.npmrc` is written and flushed to disk
- Use `npm config set --location=project` for immediate effect
- Added `fs.fsync()` to guarantee file persistence
- Configure registry BEFORE attempting any installations

#### 4. 📚 Comprehensive Documentation

**Added:** Complete registry availability report

- **File:** `docs/development/INGKA_REGISTRY_COMPONENTS.md`
- Tested all 72 components individually
- Documented package name mappings
- Installation guide with correct package names
- Category-by-category availability breakdown

**Key Findings:**

- ✅ Design Foundations: 3/3 (100%)
- ✅ Layout & Structure: 5/5 (100%)
- ✅ Display & Content: 14/14 (100%)
- ✅ Buttons & Actions: 8/8 (100%)
- ✅ Form Inputs: 13/13 (100%)
- ✅ Feedback & Status: 9/9 (100%)
- ✅ Modals & Overlays: 4/4 (100%)
- ✅ Media & Rich Content: 6/6 (100%)
- ✅ E-commerce: 8/8 (100%)
- ✅ Utilities: 2/2 (100%)

#### 5. 🐛 Spark Model Selection Fix

**Problem:**

- Spark rapid app generator hardcoded to use `'sonnet-3-5'` model
- Ignored user's model configuration in `.ingvarrc.json`
- Users couldn't use their preferred models (GPT-4, custom, etc.)

**Solution:**

- Integrated ModelSelector into `lib/ai/code-generator.js`
- Uses dynamic model selection based on agent type (frontend) and complexity (moderate)
- Respects user's fixed-model configuration
- Falls back to intelligent selection if not specified

**Before:**

```javascript
const model = options.model || "sonnet-3-5"; // Hardcoded
```

**After:**

```javascript
let model = options.model;
if (!model) {
  const modelSelector = new ModelSelector(options.modelConfig || {});
  model = await modelSelector.selectModel(
    "frontend",
    {
      description: userPrompt,
      type: "spark_generation",
    },
    "moderate"
  );
}
// Now respects .ingvarrc.json configuration!
```

### 📊 Statistics

**Component Coverage:**

- Before: 62/72 available (86%)
- After: 72/72 available (100%) ✅

**Installation Success Rate:**

- Before: Single failure blocks all (0/72 on error)
- After: Individual package handling (72/72 succeed)

**Package Mappings:**

- Automatic mappings: 8 components
- Manual mapping needed: 0 components
- User-visible complexity: Zero (handled automatically)

### 🔧 Technical Improvements

- **Component Installer:** Added PACKAGE_NAME_MAP for automatic translation
- **Installation Method:** Bulk → Individual package installation
- **Registry Setup:** Added fsync() and npm config commands
- **Model Selection:** Dynamic model selection in Spark generator
- **Documentation:** Comprehensive registry testing and mapping guide

### 📝 Documentation Updates

- ✅ `docs/development/INGKA_REGISTRY_COMPONENTS.md` - Complete registry guide
- ✅ Package name mapping reference tables
- ✅ Installation examples with correct package names
- ✅ Category-by-category availability breakdown
- ✅ Updated component installer to reflect 100% coverage

### 🚀 Upgrade Notes

**No breaking changes.** Existing configurations work seamlessly.

**What's New:**

- Select any component by logical name (e.g., "colours")
- Installer automatically maps to actual package (e.g., @ingka/variables)
- 100% of Ingka Skapa components now available
- Spark respects your model preferences

**Recommendations:**

- Use `@ingka/variables` for design tokens (replaces colours/design-tokens)
- Use `@ingka/modal` for all modal variants
- Use `@ingka/button` for all button variants (includes icon-button, expanding-button)

## [6.0.0] - 2025-10-31

### 🎯 Major: Modular AI Instructions Architecture

**Breaking Changes:** None for users, but AI instruction generation completely refactored.

#### 1. 🎨 Copilot Instructions Refactor (90.7% Size Reduction)

**Problem:**

- \`.github/copilot-instructions.md\` was 4,967 lines with ALL agent instructions embedded
- Massive duplication of standards and patterns
- Designer Agent existed but wasn't integrated
- Hard to maintain (changes required updating 3 places)

**Solution:**

- Reduced copilot instructions from 4,967 → 464 lines (90.7% reduction!)
- Now references modular agent files in \`lib/ai-instructions/\`
- Added Designer Agent to builder system
- Single source of truth per agent

**Architecture:**

\`\`\`
Before: Monolithic (4,967 lines)
.github/copilot-instructions.md
└── ALL agent instructions embedded

After: Modular (464 lines)
.github/copilot-instructions.md (core rules + routing)
├── References: lib/ai-instructions/orchestrator-main.md
├── References: lib/ai-instructions/designer-agent.md ✨ NEW
├── References: lib/ai-instructions/frontend-agent.md
├── References: lib/ai-instructions/backend-agent.md
├── References: lib/ai-instructions/devops-agent.md
├── References: lib/ai-instructions/testing-agent.md
└── References: lib/ai-instructions/documentation-agent.md
\`\`\`

**Benefits:**

- ✅ 90.7% smaller main instructions file
- ✅ Zero duplication (DRY principle)
- ✅ Designer Agent now fully integrated
- ✅ Update once, applies everywhere
- ✅ Faster for AI to read and understand

#### 2. 🔧 Component Installation Accuracy (Issue #1)

**Problem:**

- Installation claimed "72 components installed" when only 26 succeeded
- Generated \`index.ts\` exported 46 missing components (caused TypeScript errors)
- No validation of actual installation success
- Silent failures for IKEA registry authentication issues

**Solution:**

- Track \`installedComponents\` vs \`failedComponents\` separately
- Only export components that actually exist
- Accurate reporting: "26 installed, 46 failed (registry auth required)"
- Clear warnings about IKEA internal registry requirements

**Example Output:**

\`\`\`bash
✨ Component installation complete!

📊 Installation Summary:
✅ Successfully installed: 26 components (local templates)
⚠️ Failed (registry auth required): 46 components
📁 Components installed to: src/components/ingka/

⚠️ Note: Some components require IKEA internal registry access.
External users receive local templates only.
\`\`\`

**Impact:**

- ✅ No more TypeScript errors from missing imports
- ✅ Transparent about what's available vs requires auth
- ✅ Generated README shows component status
- ✅ Removed broken \`@ingka/design-tokens\` exports

### 🎨 Designer Agent Integration

**Added:** Designer Agent now fully integrated into multi-agent system

- ✅ Imported in \`lib/ai-instructions/builder.js\`
- ✅ Registered in \`getAgentGenerators()\`
- ✅ Available in copilot instructions
- ✅ Designer-first workflow now functional

**Designer-First Workflow:**

\`\`\`
User Request: "Build a login page"
↓
Orchestrator: Detects UI/UX work
↓
Designer: Creates rapid HTML/CSS mockup (30 min)
↓
User: Reviews and approves
↓
Frontend: Implements from Designer specs
↓
Testing: Writes tests
↓
Done! ✅
\`\`\`

### 📚 Documentation

**Added:**

- \`docs/development/COPILOT_INSTRUCTIONS_REFACTOR_V6.md\` - Complete refactor documentation
- Updated component installation README with accurate status

**Changed:**

- \`.github/copilot-instructions.md\` - Now 464 lines (references modular files)
- \`lib/ai-instructions/builder.js\` - Added Designer agent support

**Preserved:**

- \`.github/copilot-instructions.md.backup\` - Original 4,967-line version saved

### 🔄 Migration Notes

**For Users:**

- ✅ No breaking changes - everything works the same
- ✅ Designer Agent now available (bonus feature!)
- ✅ Component installation more transparent

**For Developers:**

- ✅ Update agent logic in ONE place: \`lib/agents/\*-template.js\`
- ✅ Changes automatically apply to all AI assistants (Copilot, Cursor, Cline, Codeium)
- ❌ DON'T update \`.github/copilot-instructions.md\` directly (it references files!)

### 📊 Statistics

- **Copilot Instructions:** 4,967 → 464 lines (90.7% reduction)
- **Agents Available:** 6 → 7 (Designer added)
- **Installation Accuracy:** ~100% false → 100% accurate
- **Component Export Errors:** 46 broken imports → 0 broken imports

### 🐛 Bug Fixes

- Fixed: Copilot instructions missing Designer Agent
- Fixed: Component installation reporting inaccurate metrics (#1)
- Fixed: Broken TypeScript imports for missing @ingka components
- Fixed: Silent failures for registry authentication issues

### ⚠️ Known Issues

- 46 IKEA components require internal registry access (documented)
- External users get 26 local templates (working as intended)
- Design foundation components (design-tokens, colours, typography) require IKEA auth

---

## [5.13.0] - 2025-10-31

### 🚀 Performance: CLI Startup Optimization (20x Faster)

**Problem:** CLI had severe startup performance issues - taking 1.2+ seconds just to display version or help.

**Solution:** Implemented lazy loading - commands load on-demand instead of at startup.

**Results:** 1.2s → 0.06s (20x faster, 95% reduction)

**Impact:**

- Every CLI command now starts instantly
- Reduced module loading overhead
- Better developer experience

---
