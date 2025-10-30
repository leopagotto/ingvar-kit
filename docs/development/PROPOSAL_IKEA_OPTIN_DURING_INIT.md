# Proposal: Add IKEA Design System Opt-In During Initialization

**Date:** October 30, 2025
**For:** ingvar-kit Developer (@leopagotto)
**From:** Test Installation Feedback
**Priority:** Medium (User Experience Enhancement)

---

## 🎯 Problem Statement

Currently, the IKEA Ingka Skapa design system instructions are:

- ✅ **Included** in the package (`lib/ai-instructions/frontend-agent-ingka.instructions.md`)
- ❌ **NOT loaded** during `npx ingvar init`
- ⚠️ Only available when using `npx ingvar spark --style ingka`

**User Impact:**

- Users expecting IKEA design system don't see it in their Copilot instructions
- Design system is not discoverable for ongoing development (only during `spark` generation)
- Users must manually append IKEA instructions if they want them available project-wide

---

## 💡 Proposed Solution

Add an **interactive prompt** during `npx ingvar init` to let users opt-in to the IKEA design system.

### Option A: Interactive Prompt (Recommended)

```javascript
// During init process, after AI assistant selection:

? Which AI assistants do you use? GitHub Copilot
✓ GitHub Copilot selected

? Enable IKEA Ingka Skapa Design System in AI instructions? (y/N)
  ℹ️  This adds 1,257 lines of official IKEA component specs to Copilot instructions.
  ℹ️  You can also activate it per-project using: ingvar spark --style ingka

  [Y] Yes - Always use IKEA design system (adds ~26KB to instructions)
  [N] No - Use default design system (can enable later)
```

### Option B: Command-Line Flag

```bash
# Enable IKEA design system during init
npx ingvar init --design-system ingka

# Or explicitly disable
npx ingvar init --design-system default
```

### Option C: Configuration File

Allow users to set default in `.ingvarrc.json`:

```json
{
  "design-system": "ingka", // or "default"
  "frontend": {
    "style": "ingka",
    "auto-include-specs": true
  }
}
```

---

## 🔧 Implementation Guide

### File to Modify: `lib/commands/init.js`

Add this logic after the AI assistant selection:

```javascript
// After AI assistant selection
const aiAssistants = await promptAISelection();

// NEW: Add IKEA design system prompt
const enableIKEA = await promptIKEADesignSystem();

// Generate AI instructions
if (enableIKEA) {
  console.log("📋 Including IKEA Ingka Skapa design system specifications...");
  await generateAIInstructions(aiAssistants, { includeIngka: true });
} else {
  await generateAIInstructions(aiAssistants, { includeIngka: false });
}
```

### New Function: `promptIKEADesignSystem()`

```javascript
async function promptIKEADesignSystem() {
  const inquirer = require("inquirer");

  const { enableIKEA } = await inquirer.prompt([
    {
      type: "confirm",
      name: "enableIKEA",
      message: "Enable IKEA Ingka Skapa Design System in AI instructions?",
      default: false,
      prefix: "🎨",
    },
  ]);

  if (enableIKEA) {
    console.log(`
ℹ️  IKEA Design System Features:
   ✓ 1,257 lines of official IKEA component specifications
   ✓ Official IKEA Blue (#0051BA) and Yellow (#FFDA1A) colors
   ✓ 8+ component types with accessibility guidelines
   ✓ WCAG 2.1 AA compliance built-in
   ✓ Typography, spacing, and layout systems

   File size: ~26KB added to Copilot instructions
`);
  }

  return enableIKEA;
}
```

### Modify: `generateAIInstructions()` Function

```javascript
async function generateAIInstructions(assistants, options = {}) {
  const fs = require("fs-extra");
  const path = require("path");

  for (const assistant of assistants) {
    let instructionsContent = "";

    // Load base instructions
    const baseInstructions = await loadBaseInstructions(assistant);
    instructionsContent += baseInstructions;

    // NEW: Optionally append IKEA design system
    if (options.includeIngka) {
      const ingkaPath = path.join(
        __dirname,
        "../ai-instructions/frontend-agent-ingka.instructions.md"
      );

      if (fs.existsSync(ingkaPath)) {
        const ingkaInstructions = await fs.readFile(ingkaPath, "utf-8");
        instructionsContent += "\n\n---\n\n";
        instructionsContent +=
          "# 🇸🇪 IKEA INGKA SKAPA DESIGN SYSTEM (OPT-IN)\n\n";
        instructionsContent += ingkaInstructions;

        console.log("   ✓ IKEA Ingka Skapa specifications included");
      }
    }

    // Write to appropriate file
    await writeInstructionsFile(assistant, instructionsContent);
  }
}
```

---

## 📊 Alternative: Post-Init Command

If you prefer not to modify the init flow, add a dedicated command:

```bash
# Enable IKEA design system after init
npx ingvar design enable ingka

# Disable it
npx ingvar design disable

# Check current status
npx ingvar design status
```

### Implementation:

```javascript
// lib/commands/design.js
async function enableDesignSystem(system) {
  if (system === "ingka") {
    await appendIngkaInstructions();
    console.log("✓ IKEA Ingka Skapa design system enabled");
    console.log("ℹ️  Reload VS Code to apply changes");
  }
}

async function disableDesignSystem() {
  await removeIngkaInstructions();
  console.log("✓ IKEA design system disabled");
}

async function checkDesignSystemStatus() {
  const hasIngka = await checkIfIngkaInstructionsExist();

  if (hasIngka) {
    console.log("🎨 Design System: IKEA Ingka Skapa (ENABLED)");
  } else {
    console.log("🎨 Design System: Default (shadcn/ui)");
  }
}
```

---

## 🎁 Bonus: Add to `ingvar status` Command

Update the status command to show design system configuration:

```bash
$ npx ingvar status

✅ Ingvar Kit Status

Prerequisites:
  ✓ Git installed
  ✓ GitHub CLI installed
  ✓ GitHub authenticated

Configuration:
  ✓ .ingvarrc.json configured
  ✓ Issue templates installed
  ✓ GitHub labels configured
  ✓ AI assistants: Copilot
  🎨 Design System: IKEA Ingka Skapa ✓ ENABLED    # <-- NEW LINE
  ✓ 6 agents enabled

Next steps:
  • Write your first spec: docs/specs/
  • Create an issue: ingvar issue
```

---

## 📝 Documentation Updates Needed

### 1. README.md

Add section:

```markdown
## 🎨 IKEA Design System Integration

Ingvar Kit includes official IKEA Ingka Skapa design system specifications.

### Enable During Setup

During `ingvar init`, select "Yes" when prompted:
```

? Enable IKEA Ingka Skapa Design System in AI instructions? (y/N) Y

````

### Enable After Setup

```bash
npx ingvar design enable ingka
````

### Using IKEA Components

Once enabled, your AI assistant will generate components following official IKEA brand guidelines:

\`\`\`javascript
// Prompt Copilot: "Create an IKEA-style card component"
// AI generates: Component with IKEA Blue, proper spacing, accessibility
\`\`\`

````

### 2. Update `docs/IKEA_DESIGN_SYSTEM.md`

Create comprehensive guide explaining:
- How to enable/disable
- Component specifications available
- Color palette and design tokens
- Example components
- Best practices

---

## 🧪 Testing Checklist

- [ ] Test `ingvar init` with IKEA enabled
- [ ] Test `ingvar init` with IKEA disabled
- [ ] Verify file sizes (base: ~96KB, with IKEA: ~122KB)
- [ ] Test that Copilot loads instructions correctly
- [ ] Test `ingvar design enable ingka` command
- [ ] Test `ingvar design disable` command
- [ ] Test `ingvar status` shows correct design system
- [ ] Update integration tests
- [ ] Update CLI help text

---

## 🎯 Expected Benefits

1. **Better User Experience**
   - Users can choose design system during setup
   - Clear opt-in process
   - Discoverable feature

2. **Flexibility**
   - Not forced on users who don't need IKEA
   - Can enable/disable at any time
   - Per-project configuration

3. **Documentation**
   - Clear that IKEA design system is available
   - Users understand what they're getting
   - Reduces confusion about "missing" features

4. **Bundle Size**
   - Default setup remains lightweight (~96KB)
   - IKEA adds ~26KB only when needed
   - Users choose their own trade-off

---

## 📦 Quick Implementation Script

For immediate implementation, here's a Node.js script:

```javascript
#!/usr/bin/env node
// scripts/enable-ikea-design-system.js

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

async function enableIKEADesignSystem() {
  const copilotPath = path.join(process.cwd(), '.github/copilot-instructions.md');
  const ingkaPath = path.join(
    __dirname,
    '../lib/ai-instructions/frontend-agent-ingka.instructions.md'
  );

  try {
    // Check if files exist
    if (!fs.existsSync(copilotPath)) {
      console.error(chalk.red('❌ Copilot instructions not found. Run: npx ingvar init'));
      process.exit(1);
    }

    if (!fs.existsSync(ingkaPath)) {
      console.error(chalk.red('❌ IKEA design system instructions not found in package'));
      process.exit(1);
    }

    // Check if already enabled
    const currentContent = await fs.readFile(copilotPath, 'utf-8');
    if (currentContent.includes('IKEA INGKA SKAPA DESIGN SYSTEM')) {
      console.log(chalk.yellow('⚠️  IKEA design system is already enabled'));
      return;
    }

    // Read IKEA instructions
    const ingkaContent = await fs.readFile(ingkaPath, 'utf-8');

    // Append to Copilot instructions
    const separator = '\n\n---\n\n# 🇸🇪 IKEA INGKA SKAPA DESIGN SYSTEM (OPT-IN)\n\n';
    await fs.appendFile(copilotPath, separator + ingkaContent);

    console.log(chalk.green('✓ IKEA Ingka Skapa design system enabled'));
    console.log(chalk.blue('ℹ️  File size: ~26KB added to Copilot instructions'));
    console.log(chalk.yellow('⚡ Reload VS Code window to apply changes'));
    console.log(chalk.gray('   Press ⌘+Shift+P (Mac) or Ctrl+Shift+P → "Reload Window"'));
  } catch (error) {
    console.error(chalk.red('❌ Error enabling IKEA design system:'), error.message);
    process.exit(1);
  }
}

enableIKEADesignSystem();
````

Add to `package.json`:

```json
{
  "bin": {
    "ingvar": "bin/cli.js",
    "ingvar-enable-ikea": "scripts/enable-ikea-design-system.js"
  }
}
```

Usage:

```bash
npx ingvar-enable-ikea
```

---

## 📞 Contact & Feedback

**Implementation Questions:**

- Open issue: https://github.com/leopagotto/ingvar-kit/issues
- Tag: `enhancement`, `design-system`

**Test Installation:**

- Repository: leonpagotto/test-ingvar
- Manually enabled IKEA design system successfully
- File size increased from 4,068 to 5,332 lines (~31% increase)

---

**Proposal Created:** October 30, 2025
**Status:** Ready for Implementation
**Estimated Effort:** 2-4 hours
**Priority:** Medium (improves UX, not critical)
