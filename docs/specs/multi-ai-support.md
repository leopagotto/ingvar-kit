# Multi-AI Assistant Support Specification

**Status:** 📝 Draft
**Created:** 2025-10-19
**Author:** Leo Pagotto
**Priority:** P1 - High Impact Feature

---

## 🎯 Executive Summary

Expand Ingvar Workflow Kit beyond GitHub Copilot to support multiple AI coding assistants, enabling developers to use LEO's workflow standards with their preferred AI tools (Cursor, AWS CodeWhisperer, Codeium, etc.).

---

## 📋 Problem Statement

### Current Limitations

1. **Single AI Lock-In**: Ingvar Kit only supports GitHub Copilot
2. **Market Reality**: Developers use various AI assistants:
   - Cursor (Claude-powered) - Very popular
   - AWS CodeWhisperer - Enterprise teams
   - Google Gemini Code Assist - GCP users
   - Codeium - Free alternative
   - Tabnine - Privacy-focused teams
   - Replit AI - Web-based developers
3. **Missed Opportunity**: LEO's workflow methodology is universal, but instructions are Copilot-only
4. **User Requests**: Growing demand for multi-AI support

### User Impact

- **Developers** can't use Ingvar Kit if they use non-Copilot AIs
- **Teams** with mixed AI preferences can't standardize on LEO
- **Enterprise** customers may require specific AI vendors (AWS, Google)

---

## 🎨 Proposed Solution

### Core Concept: Universal AI Configuration System

Create a **modular, AI-agnostic instruction system** that:

1. Maintains LEO's workflow standards as a single source of truth
2. Generates AI-specific instruction files from universal templates
3. Allows users to select which AIs to configure during initialization
4. Supports multiple AIs simultaneously in the same project

---

## 🤖 Supported AI Assistants

### Phase 1 (v3.0.0) - Priority Assistants

| AI Assistant       | Instruction File                  | Location     | Priority | Notes                        |
| ------------------ | --------------------------------- | ------------ | -------- | ---------------------------- |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Project root | P0       | Current support              |
| **Cursor**         | `.cursorrules`                    | Project root | P0       | Very popular, Claude-powered |
| **Cline (VSCode)** | `.clinerules`                     | Project root | P1       | Growing adoption             |
| **Codeium**        | `.codeium/instructions.md`        | Project root | P1       | Free alternative             |

### Phase 2 (v3.1.0) - Enterprise & Cloud Assistants

| AI Assistant           | Instruction File                       | Location     | Priority | Notes                |
| ---------------------- | -------------------------------------- | ------------ | -------- | -------------------- |
| **AWS CodeWhisperer**  | `.aws/codewhisperer/instructions.json` | Project root | P1       | Enterprise AWS users |
| **Google Gemini Code** | `.google/gemini-code.md`               | Project root | P2       | GCP ecosystem        |
| **Tabnine**            | `.tabnine/instructions.yml`            | Project root | P2       | Privacy-focused      |

### Phase 3 (Future) - Specialized Assistants

- Replit AI
- JetBrains AI
- Windsurf
- Others as requested

---

## 🏗️ Architecture Design

### 1. Universal Template System

```
lib/
  ai-instructions/
    core/
      template-base.js          # Universal workflow template
      sections/                 # Modular content sections
        workflow.md
        git-standards.md
        code-quality.md
        project-specific.md
    adapters/
      copilot-adapter.js       # Copilot-specific formatter
      cursor-adapter.js        # Cursor-specific formatter
      codeium-adapter.js       # Codeium-specific formatter
      cline-adapter.js         # Cline-specific formatter
      aws-adapter.js           # AWS CodeWhisperer adapter
    builder.js                 # Main builder orchestrator
    config.js                  # AI configuration mapping
```

### 2. Configuration Schema

Add to `.leorc.json`:

```json
{
  "ai-assistants": {
    "enabled": ["copilot", "cursor", "cline"],
    "primary": "copilot",
    "generate-all": false,
    "sync-on-update": true
  },
  "ai-config": {
    "copilot": {
      "enabled": true,
      "file": ".github/copilot-instructions.md",
      "sections": ["workflow", "git", "quality", "ui", "seo"]
    },
    "cursor": {
      "enabled": true,
      "file": ".cursorrules",
      "format": "markdown",
      "sections": ["workflow", "git", "quality", "ui"]
    },
    "cline": {
      "enabled": true,
      "file": ".clinerules",
      "format": "markdown"
    }
  }
}
```

### 3. Adapter Interface

Each AI adapter implements:

```javascript
class AIAdapter {
  constructor(projectType, config) {}

  // Generate AI-specific instruction file
  generateInstructions(universalTemplate) {}

  // Get file path for this AI
  getFilePath() {}

  // Get file format (markdown, json, yaml)
  getFormat() {}

  // AI-specific optimizations
  optimizeContent(content) {}

  // Validate generated instructions
  validate(content) {}
}
```

---

## 💻 User Experience Flow

### During `leo init`

```bash
$ leo init

🦁 Ingvar Workflow Kit - Initialization

✓ Project detected: Next.js (TypeScript)
✓ Git repository found

📦 Which AI assistants do you use? (Select multiple)
  ◉ GitHub Copilot
  ◉ Cursor (Claude)
  ◯ Cline (VSCode)
  ◉ Codeium
  ◯ AWS CodeWhisperer
  ◯ Google Gemini Code

  [Space to select, Enter to continue]

✓ Selected: Copilot, Cursor, Codeium

🚀 Generating AI instruction files...
  ✓ .github/copilot-instructions.md
  ✓ .cursorrules
  ✓ .codeium/instructions.md

✓ Configuration saved to .leorc.json
```

### New Command: `leo ai`

```bash
# List configured AIs
$ leo ai list
Configured AI Assistants:
  ✓ GitHub Copilot (.github/copilot-instructions.md)
  ✓ Cursor (.cursorrules)
  ✓ Codeium (.codeium/instructions.md)

# Add new AI
$ leo ai add cursor
✓ Generated .cursorrules
✓ Added to .leorc.json

# Remove AI
$ leo ai remove codeium
✓ Removed .codeium/instructions.md
✓ Updated .leorc.json

# Regenerate all AI instructions
$ leo ai sync
🔄 Regenerating AI instruction files...
  ✓ .github/copilot-instructions.md (updated)
  ✓ .cursorrules (updated)
  ✓ .codeium/instructions.md (updated)

# Show differences between AI configs
$ leo ai diff copilot cursor
Comparing Copilot vs Cursor instructions:
  ✓ Core workflow: Identical
  ✓ Git standards: Identical
  ⚠ SEO section: Only in Copilot (Cursor uses shorter format)
```

---

## 📁 File Structure Changes

### New Files

```
.github/
  copilot-instructions.md        # Existing
.cursorrules                     # NEW - Cursor instructions
.clinerules                      # NEW - Cline instructions
.codeium/
  instructions.md                # NEW - Codeium instructions
.aws/
  codewhisperer/
    instructions.json            # NEW - AWS CodeWhisperer
.leorc.json                      # UPDATED - AI config section
```

### Updated Commands

- `leo init` - Multi-AI selection
- `leo vscode` → `leo ai install` (deprecated alias supported)
- NEW: `leo ai list`
- NEW: `leo ai add <ai-name>`
- NEW: `leo ai remove <ai-name>`
- NEW: `leo ai sync`
- NEW: `leo ai diff <ai1> <ai2>`

---

## 🎯 Acceptance Criteria

### Must Have (Phase 1)

- [ ] Universal template system with modular sections
- [ ] Support for 4 AI assistants: Copilot, Cursor, Cline, Codeium
- [ ] AI adapter architecture implemented
- [ ] `leo init` allows multi-AI selection
- [ ] `leo ai` command with subcommands (list, add, remove, sync)
- [ ] Configuration stored in `.leorc.json`
- [ ] All AI instruction files properly formatted
- [ ] Backward compatibility with existing Copilot-only projects
- [ ] Documentation updated for multi-AI usage
- [ ] Migration guide for existing users

### Should Have (Phase 1)

- [ ] `leo ai diff` command
- [ ] Smart defaults based on detected tools (VSCode extensions, etc.)
- [ ] Warning if AI tool not detected in project
- [ ] Template sections optimized per AI (e.g., shorter for Cursor)

### Could Have (Phase 2)

- [ ] AWS CodeWhisperer support
- [ ] Google Gemini Code support
- [ ] Tabnine support
- [ ] Auto-sync on template changes
- [ ] AI-specific best practices sections
- [ ] Performance benchmarking across AIs

---

## 🔄 Migration Path

### For Existing Users

```bash
# Existing project with Copilot only
$ leo ai list
Current configuration:
  ✓ GitHub Copilot (.github/copilot-instructions.md)

# Add Cursor support
$ leo ai add cursor
✓ Generated .cursorrules from existing Copilot instructions
✓ Maintained all custom sections
✓ Updated .leorc.json

# No breaking changes - existing Copilot setup continues to work
```

### Automatic Detection

```bash
# LEO detects .cursorrules file
$ leo init
⚠️  Found existing .cursorrules file
   Import Cursor configuration? (y/n): y

✓ Imported Cursor rules
✓ Merged with LEO workflow standards
✓ Generated unified configuration
```

---

## 🧪 Testing Strategy

### Unit Tests

- [ ] Universal template generation
- [ ] Each AI adapter (input → output validation)
- [ ] Configuration parsing and validation
- [ ] File path resolution for each AI

### Integration Tests

- [ ] `leo init` with multiple AI selections
- [ ] `leo ai add/remove` commands
- [ ] `leo ai sync` updates all files correctly
- [ ] Backward compatibility with Copilot-only projects

### Manual Testing Checklist

- [ ] Test with real Cursor project
- [ ] Test with real Codeium setup
- [ ] Test with mixed AI configurations
- [ ] Verify AI assistants actually read generated files
- [ ] Test migration from v2.x to v3.0

---

## 📊 Success Metrics

### Adoption Metrics

- **Target**: 40% of users configure 2+ AI assistants
- **Measure**: `.leorc.json` analysis in telemetry (opt-in)

### AI Distribution

- Track which AIs are most popular
- Prioritize improvements for top 3

### User Feedback

- GitHub issues mentioning "multi-AI"
- npm downloads trend after v3.0 release
- Community feedback on AI coverage

---

## 🚀 Implementation Phases

### Phase 1: Foundation (v3.0.0) - 2 weeks

**Week 1: Architecture**

- [ ] Design universal template system
- [ ] Create adapter interface
- [ ] Implement Copilot adapter (refactor existing)
- [ ] Implement Cursor adapter
- [ ] Update configuration schema

**Week 2: Commands & Polish**

- [ ] Implement `leo ai` command
- [ ] Update `leo init` for multi-AI
- [ ] Add Cline and Codeium adapters
- [ ] Write documentation
- [ ] Migration guide

### Phase 2: Enterprise AIs (v3.1.0) - 1 week

- [ ] AWS CodeWhisperer adapter
- [ ] Google Gemini Code adapter
- [ ] Tabnine adapter
- [ ] Enterprise documentation

### Phase 3: Advanced Features (v3.2.0) - 1 week

- [ ] `leo ai diff` command
- [ ] Auto-sync on changes
- [ ] AI-specific optimizations
- [ ] Performance improvements

---

## 💰 Business Impact

### Value Proposition

1. **Broader Market**: Support 80%+ of AI coding assistant users (not just Copilot)
2. **Enterprise Appeal**: AWS/Google users can adopt LEO
3. **Community Growth**: Multi-AI = more contributors
4. **Competitive Edge**: No other workflow tool supports multiple AIs

### Risk Mitigation

- **Backward Compatibility**: Existing Copilot users unaffected
- **Incremental Rollout**: Phase 1 focuses on popular AIs
- **Easy Opt-Out**: Users can stick with single AI if preferred

---

## 🤔 Open Questions

1. **Instruction Format Standards**: Should we define a LEO standard format that AIs adopt? Or adapt to each AI's preferences?

2. **Sync Strategy**: Auto-sync all AI files on change, or manual sync only?

3. **AI Detection**: How reliable is auto-detection of AI tools? Should we require manual selection?

4. **Custom Sections**: How do users add AI-specific custom sections?

5. **Performance**: Does maintaining 4+ instruction files impact performance?

6. **Conflicts**: What if AIs have conflicting best practices?

---

## 📚 Research Links

- Cursor Rules: https://docs.cursor.com/context/rules-for-ai
- AWS CodeWhisperer: https://docs.aws.amazon.com/codewhisperer/
- Codeium: https://codeium.com/blog/context-awareness
- Cline: https://github.com/cline/cline
- Tabnine: https://www.tabnine.com/

---

## 🎬 Next Steps

1. **Review & Approve**: Team review this spec
2. **Prototype**: Build Cursor adapter proof-of-concept
3. **User Research**: Survey which AIs users want supported
4. **Implementation**: Start Phase 1 development
5. **Beta Release**: v3.0.0-beta for testing

---

**Ready to proceed?** Let's make LEO the universal workflow standard for ALL AI coding assistants! 🚀
