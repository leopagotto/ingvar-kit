# Spark v6.2.0 - Dual Design System Support - Status Report

**Date:** 31 October 2025
**Status:** ⚠️ IMPLEMENTATION INCOMPLETE - Needs Fixing
**Issue:** File editing conflicts in spark.js

---

## Summary

**Goal:** Add CWDS support to Spark generator alongside existing Ingka Skapa support

**Progress:** 80% Complete

- ✅ Concept design complete
- ✅ CLI options defined
- ✅ AI prompts created for both systems
- ✅ Installation functions designed
- ✅ Documentation updated (README, SPARK_DUAL_DESIGN_SYSTEM.md)
- ⚠️ **spark.js has merge conflicts - needs clean implementation**
- ❌ Testing not yet started
- ❌ CHANGELOG not updated
- ❌ Version not bumped

---

## What Needs to Be Done

### 1. Fix spark.js (CRITICAL)

**Problem:** During implementation, spark.js file got corrupted with duplicate code sections and incomplete replacements.

**Solution:** Need to cleanly implement these changes in spark.js:

#### A. Update CLI Option (Line ~43)

```javascript
// OLD
.option('--ikea', 'Use IKEA design system (Swedish minimalist aesthetic)')

// NEW
.option('--design-system <system>', 'Design system: ingka (customer-facing) or cwds (internal tools)', 'ingka')
```

#### B. Update getAppRequirements Function (Line ~156)

```javascript
// OLD
if (!options.ikea) {
  questions.push({
    type: "confirm",
    name: "useIkea",
    message: "🇸🇪 Use IKEA design system?",
    default: false,
  });
}

return {
  prompt: options.prompt || answers.prompt,
  name: options.name || answers.name,
  directory: options.dir,
  useIkea: options.ikea || answers.useIkea,
  install: options.install !== false,
  start: options.start !== false,
};

// NEW
// Only ask if not specified via CLI
if (!options.designSystem) {
  questions.push({
    type: "list",
    name: "designSystem",
    message: "🎨 Which IKEA design system do you want to use?",
    choices: [
      {
        name: "🛍️  Ingka Skapa - Customer-facing apps (e-commerce, public sites)",
        value: "ingka",
        short: "Ingka Skapa",
      },
      {
        name: "🏢 CWDS - Internal co-worker tools (admin panels, dashboards)",
        value: "cwds",
        short: "CWDS",
      },
    ],
    default: "ingka",
  });
}

return {
  prompt: options.prompt || answers.prompt,
  name: options.name || answers.name,
  directory: options.dir || "./spark-apps",
  designSystem: options.designSystem || answers.designSystem || "ingka",
  install: options.install !== false,
  start: options.start !== false,
};
```

#### C. Update generateSparkApp Function (Line ~201)

```javascript
// OLD
const { prompt, name, directory, useIkea, install, start } = config;
if (useIkea) {
  await applyIkeaDesignSystem(appPath);
}

// NEW
const { prompt, name, directory, designSystem, install, start } = config;

console.log(chalk.blue("🔧 Setting up Spark app...\n"));

if (designSystem === "ingka") {
  console.log(
    chalk.yellow(
      "🇸🇪 Using IKEA Ingka Skapa Design System - Customer-facing apps"
    )
  );
  await applyIngkaSkapaDesignSystem(appPath);
} else if (designSystem === "cwds") {
  console.log(chalk.yellow("🏢 Using IKEA CWDS - Internal co-worker tools"));
  await applyCWDSDesignSystem(appPath);
}
```

#### D. Rename applyIkeaDesignSystem → applyIngkaSkapaDesignSystem (Line ~462)

```javascript
// OLD
async function applyIkeaDesignSystem(appPath) {

// NEW
async function applyIngkaSkapaDesignSystem(appPath) {
  console.log(chalk.yellow('\n🇸🇪 Installing IKEA Ingka Skapa Design System...\n'));

  try {
    // Save current directory
    const originalCwd = process.cwd();

    // Change to app directory for component installation
    process.chdir(appPath);

    // Install IKEA components using the component installer
    const componentsCommand = require('./components');

    // Install essential IKEA components for Spark apps
    await componentsCommand({
      action: 'install',
      components: [
        'button', 'card', 'input-field', 'text', 'grid',
        'loading', 'badge', 'modal', 'tabs', 'checkbox', 'select'
      ],
      outputDir: 'src/components/ingka',
      installDesignTokens: true,
      installTailwindConfig: false,
      nonInteractive: true
    });

    // Change back to original directory
    process.chdir(originalCwd);

    console.log(chalk.green('✅'), 'Installed IKEA Ingka Skapa components');

    // ... rest of function (create tokens file, CSS imports)
  } catch (error) {
    console.log(chalk.yellow('⚠️  Warning: Could not apply all IKEA design system changes'));
    console.log(chalk.gray(`Error: ${error.message}`));
    console.log(chalk.gray('\nYou can install IKEA components manually with:'));
    console.log(chalk.cyan('   ingvar components install\n'));
  }
}
```

#### E. Add applyCWDSDesignSystem Function (After applyIngkaSkapaDesignSystem)

```javascript
async function applyCWDSDesignSystem(appPath) {
  console.log(
    chalk.yellow("\n🏢 Installing IKEA Co-Worker Design Subsystem (CWDS)...\n")
  );

  try {
    // Install CWDS components using the CWDS installer
    const { CWDSInstaller } = require("../components/cwds-installer");
    const cwdsInstaller = new CWDSInstaller(appPath);

    // Auto-select recommended CWDS components for Spark apps
    cwdsInstaller.selectedComponents = [
      "cwds-react-layout",
      "iloff-layout-react",
      "cwds-react-header",
      "cwds-react-app-switcher",
      "cwds-react-mobile-navigation",
      "cwds-react-nav-menu",
      "cwds-react-user-profile",
      "cwds-variables",
    ];
    cwdsInstaller.authProvider = "auth0"; // Default to Auth0

    await cwdsInstaller.install();

    console.log(chalk.green("\n✅ IKEA CWDS installed successfully!\n"));
    console.log(chalk.blue("ℹ️  You can now import CWDS components:"));
    console.log(
      chalk.gray(
        "   import { CWDSLayout } from '@ingka-group-digital/cwds-react-layout';"
      )
    );
    console.log(
      chalk.gray(
        "   import { GlobalHeader } from '@ingka-group-digital/cwds-react-header';"
      )
    );
    console.log(
      chalk.gray(
        "   import { AppSwitcher } from '@ingka-group-digital/cwds-react-app-switcher';\n"
      )
    );
  } catch (error) {
    console.log(chalk.yellow("⚠️  Warning: Could not apply all CWDS changes"));
    console.log(chalk.gray(`Error: ${error.message}`));
    console.log(chalk.gray("\nYou can install CWDS components manually with:"));
    console.log(chalk.cyan("   ingvar cwds install\n"));
  }
}
```

#### F. Update generateAppCode Function (Line ~350)

```javascript
// OLD
async function generateAppCode(prompt, appName, useIkea = false) {

// NEW
async function generateAppCode(prompt, appName, designSystem = 'ingka') {
```

#### G. Update Export Function (End of file)

```javascript
// OLD
module.exports = program;

// NEW
module.exports = async function spark(options = {}) {
  console.clear();
  console.log(banner);

  console.log(
    chalk.cyan(
      "🚀 Ingvar Spark - Rapid App Generator with IKEA Design Systems\n"
    )
  );
  console.log(
    chalk.blue("ℹ️  Generates React apps using official IKEA components:\n")
  );
  console.log(
    chalk.gray("   • Ingka Skapa (72 components) - Customer-facing apps")
  );
  console.log(
    chalk.gray("   • CWDS (10+ components) - Internal co-worker tools\n")
  );

  try {
    // Get app requirements (prompt, name, design system)
    const config = await getAppRequirements(options);

    // Generate the Spark app
    await generateSparkApp(config);
  } catch (error) {
    console.error(chalk.red("\n❌ Error:"), error.message);
    console.log(chalk.gray("\nIf the problem persists, try:"));
    console.log(chalk.cyan("   ingvar spark --help"));
    process.exit(1);
  }
};
```

---

### 2. Update bin/cli.js

Already done ✅ (lines 221-232):

```javascript
program
  .command("spark")
  .description(
    "Generate a React app with IKEA design systems: Ingka Skapa (customer) or CWDS (internal)"
  )
  .option("-p, --prompt <prompt>", "Natural language prompt describing the app")
  .option("-n, --name <name>", "Project name")
  .option("-d, --dir <directory>", "Output directory", "./spark-apps")
  .option(
    "--design-system <system>",
    "Design system: ingka (customer-facing) or cwds (internal tools)",
    "ingka"
  )
  .option("--no-install", "Skip npm install after generation")
  .action((options) => {
    const sparkCommand = require("../lib/commands/spark");
    sparkCommand(options);
  });
```

---

### 3. Update lib/ai/code-generator.js

**Already done ✅** - Added dual design system prompts:

- `ingkaSkapaSystemPrompt` - Ingka Skapa components and guidelines
- `cwdsSystemPrompt` - CWDS components and guidelines

File: `lib/ai/code-generator.js` (lines ~50-120)

---

### 4. Testing Plan

Once spark.js is fixed:

#### Test 1: Ingka Skapa (Customer-facing)

```bash
mkdir /tmp/test-ingka && cd /tmp/test-ingka
git init
ingvar spark -p "todo app" -n "test-app" --design-system ingka --no-install

# Verify:
# ✅ @ingka/* packages installed
# ✅ src/styles/ingka.css created
# ✅ src/lib/ikea-design-tokens.ts created
# ✅ AI-generated code uses @ingka/* components
```

#### Test 2: CWDS (Internal tools)

```bash
mkdir /tmp/test-cwds && cd /tmp/test-cwds
git init
ingvar spark -p "admin dashboard" -n "test-admin" --design-system cwds --no-install

# Verify:
# ✅ @ingka-group-digital/* packages installed
# ✅ CWDS layout components included
# ✅ AI-generated code uses CWDS components
# ✅ Global Header, App Switcher configured
```

#### Test 3: Interactive Selection

```bash
mkdir /tmp/test-interactive && cd /tmp/test-interactive
git init
ingvar spark -p "project management tool" -n "test-project"

# Should prompt:
# 🎨 Which IKEA design system do you want to use?
#   🛍️  Ingka Skapa - Customer-facing apps
#   🏢 CWDS - Internal co-worker tools
```

---

### 5. Version Bump & Deployment

After testing passes:

1. **Update CHANGELOG.md** - Add v6.2.0 entry:

```markdown
## [6.2.0] - 2025-10-31

### Added

- **Dual Design System Support in Spark:**
  - Ingka Skapa (72 components) - Customer-facing apps
  - CWDS (10+ components) - Internal co-worker tools
  - Interactive design system selection
  - CLI option: `--design-system ingka|cwds`
  - Auto-installs appropriate components based on choice
  - AI generates code for chosen design system

### Changed

- Spark now supports both IKEA design systems (was Ingka Skapa only)
- Updated AI prompts for both design systems
- Renamed `applyIkeaDesignSystem` → `applyIngkaSkapaDesignSystem`

### Fixed

- Component installer now works when generating apps in different directories
```

2. **Update package.json version:**

```json
{
  "version": "6.2.0"
}
```

3. **Git commit:**

```bash
git add -A
git commit -m "feat(spark): add dual design system support (Ingka Skapa + CWDS) (#XX)

- Users can choose between Ingka Skapa (customer) or CWDS (internal)
- Interactive prompt or CLI option --design-system
- Auto-installs appropriate components
- AI generates system-specific code
- 100% IKEA compliance maintained"
```

4. **npm publish:**

```bash
npm publish
```

5. **Verify published:**

```bash
npm install ingvar-kit@6.2.0
ingvar spark --help  # Should show --design-system option
```

---

## Files Already Updated ✅

1. ✅ **bin/cli.js** - Updated spark command options
2. ✅ **lib/ai/code-generator.js** - Added dual design system prompts
3. ✅ **README.md** - Updated Spark description and examples
4. ✅ **docs/development/SPARK_DUAL_DESIGN_SYSTEM.md** - Complete documentation

---

## Files Need Fixing ⚠️

1. ⚠️ **lib/commands/spark.js** - Has merge conflicts, needs clean implementation

---

## Next Immediate Steps

1. **FIX lib/commands/spark.js** - Clean implementation of all changes listed above
2. **Test Ingka Skapa** - Verify customer-facing app generation
3. **Test CWDS** - Verify internal tool generation
4. **Update CHANGELOG** - Document v6.2.0 changes
5. **Version bump** - package.json → 6.2.0
6. **Git commit** - With proper message
7. **npm publish** - Deploy to npm registry

---

**Status:** Ready to implement clean spark.js changes and proceed with testing/deployment

**Estimated Time:** 30-60 minutes to complete remaining work

**Risk:** Low - All design work complete, just needs clean file implementation
