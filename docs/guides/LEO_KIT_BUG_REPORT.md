# 🐛 Bug Report: Copilot Instructions File Not Generated During `ingvar init`

**Date:** October 20, 2025
**Ingvar Kit Version:** 3.0.2
**Reporter:** Leo de Souza (leonpagotto)

---

## 📋 Summary

During the `ingvar init` process, the GitHub Copilot instructions file (`.github/copilot-instructions.md`) was **not generated automatically**, even though:

- GitHub Copilot was selected as an AI assistant
- The configuration was saved in `.ingvarrc.json`
- VS Code extensions were configured correctly
- All other files were created successfully

## 🔍 What Happened

### Terminal Output Analysis

Looking at the `ingvar init` output:

```
🤖 AI Assistant Configuration

Ingvar supports multiple AI coding assistants. Select the ones you use:

? Which AI assistants do you use? (Space to select, Enter to confirm) 🤖 GitHub Copilot - AI pair
programmer from GitHub
✔ Generated 0 AI instruction file    ← ⚠️ ISSUE: Shows "0 files generated"
```

**Key Issue:** The message says "Generated **0** AI instruction file" instead of "Generated **1** AI instruction file"

### Files Actually Created

✅ **Created successfully:**

- `.github/ISSUE_TEMPLATE/` (8 templates)
- `.github/pull_request_template.md`
- `.github/workflows/` (3 workflow files)
- `.vscode/settings.json`
- `.vscode/extensions.json` (with Copilot extensions)
- `docs/specs/EXAMPLE_SPEC.md`
- `.ingvarrc.json` (with correct AI configuration)

❌ **Missing:**

- `.github/copilot-instructions.md`

### Configuration State

The `.ingvarrc.json` was created correctly:

```json
{
  "ai-assistants": {
    "enabled": ["copilot"],
    "primary": "copilot",
    "sync-on-update": true
  }
}
```

### Workaround That Works

Running `ingvar ai sync` **manually** after init successfully generates the file:

```bash
$ ingvar ai sync
🔄 Syncing AI instruction files...

🚀 Generating AI instruction files...

  ✓ .github/copilot-instructions.md

📊 Summary:
  ✓ Success: 1
```

This confirms:

- The template/generation logic **works correctly**
- The issue is specifically in the **`ingvar init` flow**
- The file generation is being **skipped or failing silently** during init

---

## 🎯 Root Cause Analysis

Based on the terminal output and behavior, the likely issues are:

### Theory 1: AI Instruction Generation Step Failed Silently

- The init process has a step to generate AI instruction files
- This step either:
  - **Failed silently** without throwing an error
  - **Was skipped** due to a conditional check
  - **Returned 0 files** but didn't log why

### Theory 2: Timing/Race Condition

- The `.ingvarrc.json` file might not have been written to disk yet when AI generation runs
- The AI generation step might be reading an empty or incomplete config

### Theory 3: Wrong Code Path

- The interactive prompt might save config but not trigger generation
- There might be separate code paths for:
  - Interactive init (broken) ❌
  - Non-interactive init (works?) ❓
  - Manual sync (works) ✅

---

## 🔧 Expected Behavior

During `ingvar init`, when a user selects AI assistants:

1. ✅ Prompt user to select AI assistants
2. ✅ Save selection to `.ingvarrc.json`
3. ✅ Configure VS Code extensions
4. ❌ **Generate AI instruction files** ← This should happen but doesn't
5. ✅ Show success message

The terminal should show:

```
✔ Generated 1 AI instruction file
  → .github/copilot-instructions.md
```

---

## 🧪 Steps to Reproduce

1. Create a new directory: `mkdir test-leo-init`
2. Initialize git: `cd test-leo-init && git init`
3. Create GitHub repo: `gh repo create test-leo-init --private --source=. --remote=origin`
4. Run: `ingvar init`
5. Follow prompts:
   - Authenticate with GitHub
   - Choose "Create new GitHub Project" (or skip)
   - Select "GitHub Copilot" when asked about AI assistants
   - Complete the init process
6. Check: `ls -la .github/`
7. **Result:** `copilot-instructions.md` is missing

---

## 📊 Verification Commands

```bash
# Check AI configuration
ingvar ai list
# Output: "⚠ GitHub Copilot - .github/copilot-instructions.md (not generated)"

# Check config file
cat .ingvarrc.json
# Output: Shows copilot is enabled

# Manually sync (workaround)
ingvar ai sync
# Output: Successfully generates the file

# Verify file exists now
ls -la .github/copilot-instructions.md
# Output: File now exists
```

---

## 💡 Suggested Fix

### Location to Investigate

Look for the code in `ingvar init` that handles AI assistant configuration, specifically:

- The step after saving `.ingvarrc.json`
- The AI instruction file generation logic
- Error handling that might be swallowing exceptions

### Possible Code Issues

**If there's a try-catch block:**

```javascript
try {
  await generateAIInstructions(config);
} catch (error) {
  // If this is empty or just logging, user won't see the error
  console.log("Generated 0 AI instruction file"); // ← Bug here
}
```

**If there's a conditional check:**

```javascript
if (config.aiAssistants && config.aiAssistants.length > 0) {
  // Might not be reading the right property
  await generateAIInstructions(config);
}
```

**If there's an async timing issue:**

```javascript
// Config write might not be complete
await fs.writeFile(".ingvarrc.json", JSON.stringify(config));
// This might read old/empty config
const instructions = await generateAIInstructions(); // ← Needs to wait
```

### Recommended Solution

1. **Add error logging** - If generation fails, show the actual error
2. **Verify config is saved** - Ensure `.ingvarrc.json` is written before reading it
3. **Call the same logic as `ingvar ai sync`** - Reuse the working code path
4. **Add explicit success confirmation** - Show which files were generated

Example:

```javascript
// After saving AI assistant config
if (config["ai-assistants"]?.enabled?.length > 0) {
  console.log("🚀 Generating AI instruction files...");

  try {
    const generatedFiles = await syncAIInstructions(); // Reuse sync logic

    if (generatedFiles.length > 0) {
      console.log(
        `✔ Generated ${generatedFiles.length} AI instruction file(s)`
      );
      generatedFiles.forEach((file) => console.log(`  → ${file}`));
    } else {
      console.log("⚠ No AI instruction files generated");
    }
  } catch (error) {
    console.error("✖ Failed to generate AI instruction files:", error.message);
    console.log("💡 You can run `ingvar ai sync` later to generate them");
  }
}
```

---

## 🎯 Impact

**Severity:** Medium
**User Impact:** Users don't get the full Ingvar workflow automation during initial setup

**Why it matters:**

- The copilot-instructions.md file is **critical** for the Ingvar workflow
- It guides GitHub Copilot to follow Ingvar's standards
- Users expect it to be set up automatically
- The workaround (`ingvar ai sync`) works, but users shouldn't need to know about it
- New users might not realize the file is missing until they wonder why Copilot isn't following Ingvar patterns

---

## ✅ Workaround for Users

Until fixed, users should run this after `ingvar init`:

```bash
ingvar ai sync
```

This will generate the missing `.github/copilot-instructions.md` file.

---

## 📝 Additional Context

- GitHub CLI version: 2.81.0
- Git version: 2.39.5
- Node.js version: 24.5.0
- OS: macOS
- Installation method: Global (`npm install -g ingvar-kit`)

---

## 🔗 Related Files

- **Config file:** `.ingvarrc.json` (created correctly)
- **Missing file:** `.github/copilot-instructions.md` (should be created, isn't)
- **Working command:** `ingvar ai sync` (generates the file successfully)

---

**Thank you for building Ingvar Kit! This is a minor bug but worth fixing for the best user experience. 🦁**
