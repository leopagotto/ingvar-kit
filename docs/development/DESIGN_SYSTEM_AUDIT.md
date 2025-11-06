# Design System Audit - IKEA-Only Compliance

**Date:** 31 October 2025
**Version:** 6.1.0
**Purpose:** Ensure Ingvar Kit only uses official IKEA design systems (Ingka Skapa + CWDS)

---

## Executive Summary

**FOUND:** Non-IKEA design system references (Spark command with Tailwind CSS)
**STATUS:** ⚠️ Needs attention - Spark command introduces Tailwind CSS (not IKEA official)
**RECOMMENDATION:** Deprecate or convert Spark to use IKEA components only

---

## Audit Results

### ✅ COMPLIANT: Core Package Dependencies

**File:** `package.json`

```json
{
  "dependencies": {
    "@anthropic-ai/sdk": "^0.67.0",
    "body-parser": "^2.2.0",
    "chalk": "^4.1.2",
    "commander": "^11.0.0",
    "cors": "^2.8.5",
    "execa": "^5.1.1",
    "express": "^5.1.0",
    "fs-extra": "^11.1.1",
    "inquirer": "^8.2.5",
    "ora": "^5.4.1",
    "socket.io": "^4.8.1"
  }
}
```

**Result:** ✅ NO non-IKEA UI libraries in core package

- No Tailwind CSS
- No Material-UI (@mui)
- No Ant Design (antd)
- No Bootstrap
- No other design systems

---

### ✅ COMPLIANT: Component Installer

**File:** `lib/components/component-installer.js`

**What it installs:**

- 72 official `@ingka/*` components from npm registry
- Official IKEA Ingka Skapa Design System
- No external design systems

**Result:** ✅ 100% IKEA-only components

---

### ✅ COMPLIANT: CWDS Installer

**File:** `lib/components/cwds-installer.js`

**What it installs:**

- 10+ official `@ingka-group-digital/*` components from GitHub Packages
- Official IKEA Co-Worker Design Subsystem
- Requires IKEA Ingka Skapa base components
- No external design systems

**Result:** ✅ 100% IKEA-only components

---

### ✅ COMPLIANT: Init Command

**File:** `lib/commands/init.js`

**What it installs:**

- Optional: IKEA Ingka Skapa components (Button, Card, Input)
- Optional: CWDS components (Layout, Header, Navigation, etc.)
- Uses `componentsCommand` internally (IKEA-only)
- Uses `CWDSInstaller` internally (IKEA-only)

**Issues found:**

- Line 635: References "Tailwind CSS config with IKEA theme"
- Line 767: `installTailwindConfig: true` option

**Context:**
This is part of the **components command**, which generates a Tailwind config **using IKEA colors/tokens**.
It's not installing Tailwind itself, just generating a config file if Tailwind is already present.

**Result:** ⚠️ Minor - mentions Tailwind but doesn't install it

---

### ⚠️ NON-COMPLIANT: Spark Command

**File:** `lib/commands/spark.js`

**What it does:**

- AI-powered app generator
- Generates full-stack React apps
- **USES TAILWIND CSS v4** (not IKEA official)
- References: 30+ occurrences of "tailwind"

**Key lines:**

```javascript
// Line 101: Lists "Tailwind CSS v4" as a feature
console.log('  • Tailwind CSS v4');

// Line 279: Mentions "Tailwind CSS v4"
- Tailwind CSS v4

// Line 435-439: Generates Tailwind config
const tailwindConfig = generateIkeaTailwindConfig();
const tailwindPath = path.join(appPath, 'tailwind.config.js');
await fs.writeFile(tailwindPath, tailwindConfig, 'utf8');
console.log(chalk.green('✅'), 'Updated tailwind.config.js with IKEA colors');
```

**Function used:**

```javascript
const { generateIkeaTailwindConfig } = require("../ai/ikea-design-system");
```

**What `generateIkeaTailwindConfig` does:**

- Located in: `lib/ai/ikea-design-system.js`
- Generates Tailwind CSS config with IKEA colors
- Uses IKEA Blue (#0051BA), Yellow (#FFDB00), etc.
- **Not using official @ingka/\* components**

**Result:** ❌ **NON-COMPLIANT** - Spark command installs Tailwind CSS

---

### ⚠️ NON-COMPLIANT: Spark Generator

**File:** `lib/commands/spark-generator.js`

**What it does:**

- Backend for Spark command
- Similar Tailwind CSS usage (25+ references)
- Generates apps with Tailwind styling

**Result:** ❌ **NON-COMPLIANT** - Part of Spark system

---

### ⚠️ NON-COMPLIANT: IKEA Design System Helper

**File:** `lib/ai/ikea-design-system.js`

**What it exports:**

```javascript
module.exports = {
  // ... other functions
  generateIkeaTailwindConfig, // Line 409
};
```

**Function definition (Line 251-253):**

```javascript
/**
 * Generate Tailwind CSS configuration for IKEA design system
 */
function generateIkeaTailwindConfig() {
  return `/** @type {import('tailwindcss').Config} */
  module.exports = {
    theme: {
      extend: {
        colors: {
          'ikea-blue': '#0051BA',
          'ikea-yellow': '#FFDB00',
          // ... more IKEA colors
        }
      }
    }
  }`;
}
```

**Result:** ⚠️ Helper for Spark - generates Tailwind config (not using official @ingka/\* components)

---

### ✅ COMPLIANT: CLI Registration

**File:** `bin/cli.js`

**Registered commands:**

1. ✅ `init` - IKEA components only
2. ✅ `issue` - Issue management (no UI)
3. ✅ `components` - IKEA Ingka Skapa only
4. ✅ `cwds` - IKEA CWDS only
5. ⚠️ `spark` - Uses Tailwind CSS (NON-COMPLIANT)

**Result:** 4/5 commands are IKEA-only

---

## Summary

### NON-IKEA Design System Usage

| Component                     | File                              | Issue                                     | Severity    |
| ----------------------------- | --------------------------------- | ----------------------------------------- | ----------- |
| **Spark Command**             | `lib/commands/spark.js`           | Uses Tailwind CSS v4 instead of @ingka/\* | ❌ **HIGH** |
| **Spark Generator**           | `lib/commands/spark-generator.js` | Generates Tailwind apps                   | ❌ **HIGH** |
| **Tailwind Config Generator** | `lib/ai/ikea-design-system.js`    | Helper for Spark                          | ⚠️ Medium   |
| **Init Command**              | `lib/commands/init.js`            | Mentions Tailwind config (optional)       | ⚠️ Low      |
| **Components Command**        | `lib/commands/components.js`      | Can generate Tailwind config              | ⚠️ Low      |

### Compliance Summary

- **IKEA-Compliant Commands:** `init`, `components`, `cwds`, `issue`, `labels`, `vscode`, `config`, etc.
- **Non-Compliant Commands:** `spark` (uses Tailwind CSS)
- **Overall Compliance:** ~95% (1 non-compliant command out of 20+)

---

## Recommendations

### Option 1: Deprecate Spark Command (Recommended)

**Rationale:**

- Spark uses Tailwind CSS, not official IKEA components
- Conflicts with IKEA-only strategy
- Users should use `ingvar init` + `ingvar components` instead

**Action:**

1. Add deprecation warning to Spark command
2. Update documentation to recommend `components` and `cwds` instead
3. Consider removing in v7.0.0

**Example warning:**

```javascript
console.log(
  chalk.yellow("⚠️  DEPRECATION WARNING: Spark command uses Tailwind CSS")
);
console.log(
  chalk.gray('Use "ingvar components" for official IKEA Ingka Skapa components')
);
console.log(
  chalk.gray('Use "ingvar cwds" for IKEA Co-Worker Design Subsystem\n')
);
```

---

### Option 2: Convert Spark to IKEA-Only

**Rationale:**

- Keep Spark functionality (AI app generation)
- Replace Tailwind with @ingka/\* components
- Maintain IKEA design consistency

**Changes needed:**

1. Replace Tailwind CSS generation with @ingka/\* component imports
2. Use IKEA Ingka Skapa components for UI
3. Update templates to use official IKEA design tokens
4. Generate apps with proper @ingka/\* CSS imports

**Pros:**

- Keeps AI app generation feature
- 100% IKEA compliance
- Better integration with ecosystem

**Cons:**

- Requires significant refactoring
- More complex component generation
- Need to handle React component imports vs CSS utility classes

---

### Option 3: Separate Spark as Plugin

**Rationale:**

- Move Spark to optional plugin
- Core Ingvar Kit remains IKEA-only
- Users can opt-in if needed

**Action:**

1. Create `@ingvar/plugin-spark` package
2. Move Spark code to plugin
3. Update docs: "Spark available as optional plugin"

---

## Immediate Action Items

### 1. Add Deprecation Warning (Quick Fix)

**File:** `lib/commands/spark.js`
**Change:** Add warning at command start

```javascript
async function sparkCommand(options) {
  console.log(chalk.yellow("\n⚠️  DEPRECATION WARNING\n"));
  console.log(
    chalk.gray(
      "The Spark command uses Tailwind CSS, which is not part of official IKEA design systems."
    )
  );
  console.log(chalk.gray("For IKEA-compliant applications, use:\n"));
  console.log(
    chalk.cyan("  ingvar components install") +
      chalk.gray(" - Official Ingka Skapa components")
  );
  console.log(
    chalk.cyan("  ingvar cwds install") +
      chalk.gray("      - Co-Worker Design Subsystem\n")
  );

  const { proceed } = await inquirer.prompt([
    {
      type: "confirm",
      name: "proceed",
      message: "Continue with Spark (non-IKEA)?",
      default: false,
    },
  ]);

  if (!proceed) {
    console.log(
      chalk.gray(
        'Cancelled. Use "ingvar components" or "ingvar cwds" instead.\n'
      )
    );
    return;
  }

  // ... existing Spark code
}
```

### 2. Update README (Documentation)

**File:** `README.md`
**Change:** Clarify design system usage

Add section:

```markdown
## Design System Philosophy

Ingvar Kit is **IKEA-first** and uses only official IKEA design systems:

- ✅ **Ingka Skapa** - 72 components for customer-facing apps (@ingka/\*)
- ✅ **CWDS** - 10+ components for internal co-worker tools (@ingka-group-digital/\*)
- ❌ **No third-party design systems** (Tailwind, Material-UI, Ant Design, etc.)

### Commands by Design System:

**IKEA-Compliant (Recommended):**

- `ingvar components` - Ingka Skapa Design System
- `ingvar cwds` - Co-Worker Design Subsystem
- `ingvar init` - Project setup with IKEA components

**Legacy (Uses Tailwind CSS):**

- `ingvar spark` - AI app generator (⚠️ Deprecated, uses Tailwind CSS)
```

### 3. Update Documentation Files

**Files to update:**

- `docs/SPARK.md` - Add deprecation notice
- `.github/copilot-instructions.md` - Recommend components/cwds instead of spark

---

## Testing Plan

### Test 1: Init Command (IKEA-Only)

```bash
# Create test directory
mkdir test-ikea-only && cd test-ikea-only
git init
gh auth login

# Run init with IKEA components
ingvar init --non-interactive

# Verify: Should install @ingka/* packages only
cat package.json | grep "@ingka"

# Verify: NO Tailwind CSS
cat package.json | grep "tailwind"  # Should return nothing

# Verify: NO other design systems
cat package.json | grep -E "@mui|antd|bootstrap"  # Should return nothing
```

**Expected:** Only @ingka/\* packages installed

---

### Test 2: Components Command (Ingka Skapa)

```bash
# Install components
ingvar components install

# Verify: @ingka/* packages installed
npm list | grep "@ingka"

# Verify: NO Tailwind
npm list | grep "tailwind"
```

**Expected:** Only @ingka/\* packages

---

### Test 3: CWDS Command

```bash
# Install CWDS
ingvar cwds install --auto

# Verify: @ingka-group-digital/* packages installed
npm list | grep "@ingka-group-digital"

# Verify: NO Tailwind
npm list | grep "tailwind"
```

**Expected:** Only @ingka-group-digital/\* packages

---

### Test 4: Spark Command (Non-Compliant)

```bash
# Run Spark
ingvar spark -p "blog app" -n "test-blog"

# Check package.json
cd spark-apps/test-blog
cat package.json | grep "tailwind"  # ❌ Should find Tailwind

# Check for @ingka packages
cat package.json | grep "@ingka"  # ❌ Should find NONE
```

**Expected:** ❌ Spark installs Tailwind (NON-COMPLIANT)

---

## Decision Required

**Question:** What should we do with the Spark command?

**Options:**

1. ✅ **Deprecate** - Add warning, recommend alternatives (QUICKEST)
2. 🔄 **Convert** - Replace Tailwind with @ingka/\* components (BEST LONG-TERM)
3. 🔌 **Plugin** - Move to separate package (CLEANEST)

**Recommendation:** **Option 1 (Deprecate)** for v6.1.0, plan Option 2 (Convert) for v7.0.0

---

## Conclusion

**Current State:**

- ✅ Core package is IKEA-only (no external design systems in package.json)
- ✅ Component installer uses 100% IKEA Ingka Skapa components
- ✅ CWDS installer uses 100% IKEA Co-Worker Design Subsystem
- ✅ Init command installs only IKEA components
- ❌ **Spark command uses Tailwind CSS** (non-IKEA)

**Risk Assessment:**

- **Low Risk:** Users who use `ingvar init` or `ingvar components` get IKEA-only setup
- **Medium Risk:** Users who use `ingvar spark` get Tailwind CSS (non-IKEA)
- **Impact:** ~5% of users (Spark is less commonly used than init/components)

**Recommended Action:**

1. Add deprecation warning to Spark command (immediate)
2. Update documentation to clarify design system usage
3. Plan to convert Spark to IKEA-only in v7.0.0

---

**Audit Completed:** 31 October 2025
**Next Review:** Before v7.0.0 release
