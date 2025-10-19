# LEO Workflow Kit v2.0.3 - Enhanced Features

## 🎉 What's New

### ✨ Major Enhancements

#### 1. **Stylish ASCII Banner Restored** 🎨
- Beautiful ASCII art banner with gradient effects
- Shows on all CLI commands
- Simplified banner for npm install (clean and professional)
- Enhanced visual experience throughout the CLI

#### 2. **GitHub Pull Request Templates** 📝
- Comprehensive PR template with all sections:
  - Description and related issues
  - Type of change checkboxes
  - Screenshots/videos section
  - Testing checklist
  - Responsive design verification
  - Accessibility checklist
  - SEO checklist
  - Performance impact assessment
  - Breaking changes documentation
  - Deployment notes
  - Reviewer checklist

#### 3. **GitHub Actions Workflows** 🤖
Three powerful automation workflows:

**Auto-Label Issues**
- Automatically labels issues based on title and content
- Detects priority (P0-P3)
- Identifies type (bug, feature, docs, etc.)
- Recognizes components (frontend, backend, database, etc.)

**Auto-Add to Project**
- Automatically adds new issues and PRs to project board
- Configurable via secrets

**Stale Issues Management**
- Marks stale issues after 60 days
- Closes after 7 more days
- Different rules for PRs (30 days stale, 14 days close)
- Exempts critical priorities (P0, P1)
- Customizable messages

#### 4. **Project Type Detection** 🔍
Smart detection system that identifies:
- **Frameworks**: Next.js, React, Vue, Angular, Svelte, Express, NestJS, Django, Flask
- **Languages**: TypeScript, JavaScript, Python, Go, Rust
- **Build Tools**: Vite, Webpack, Parcel, esbuild
- **Features**: Tailwind CSS, Testing frameworks, Linters, Databases
- **State Management**: Redux, Zustand, Recoil
- **UI Libraries**: Material-UI, Ant Design, Chakra UI
- **Package Managers**: npm, yarn, pnpm, bun

#### 5. **Enhanced Copilot Instructions** 🤝
- **Project-Aware**: Automatically detects your project type
- **Context-Specific Guidelines**:
  - Next.js: App Router, Server Components, Image optimization
  - React: Hooks, memoization, component patterns
  - Tailwind: Utility classes, custom components
  - TypeScript: Type safety, interfaces, strict mode
- **Dynamic Content**: Instructions adapt to your tech stack
- **Version Tracking**: Instructions include project context

#### 6. **Comprehensive Health Check** 🏥
New `leo health` command with scoring system:

**Checks Include:**
- Git setup (10 points)
- GitHub CLI & auth (10 points)
- Documentation structure (20 points)
- Issue templates (15 points)
- PR template (10 points)
- VS Code configuration (15 points)
- GitHub Actions (10 points)
- Project type detection (10 points)

**Grading System:**
- 90-100%: Grade A (Excellent)
- 75-89%: Grade B (Great)
- 60-74%: Grade C (Good)
- 40-59%: Grade D (Needs Improvement)
- 0-39%: Grade F (Setup Required)

**Features:**
- Detailed breakdown by category
- Actionable fix recommendations
- Point-based scoring
- Visual indicators (✓, ⚠, ✗, ℹ)

---

## 🚀 New Commands

```bash
leo health        # Comprehensive health check with scoring (alias: leo h)
leo welcome       # Show welcome guide anytime (alias: leo w)
```

---

## 📦 Updated Commands

### `leo init` - Enhanced Initialization

**What's New:**
- Installs PR template automatically
- Optional GitHub Actions workflows installation
- Project-aware Copilot instructions
- Detects and adapts to your framework
- Shows detected project type during setup
- Enhanced success message with all features

**Interactive Prompts:**
- GitHub Actions workflows (yes/no)
- All previous options maintained

### `leo status` - Quick Status Check

**What's New:**
- Now suggests running `leo health` for comprehensive check
- Faster, simpler overview
- Clear visual indicators

---

## 🎯 File Structure Enhancements

### New Template Files

```
templates/github-workflow/
├── pull-request-template.md          # NEW: Comprehensive PR template
├── workflows/                        # NEW: GitHub Actions
│   ├── auto-label-issues.yml        # NEW: Auto-labeling
│   ├── auto-add-to-project.yml      # NEW: Auto-project assignment
│   └── stale.yml                    # NEW: Stale issue management
└── issue-templates/                  # Existing templates
```

### New Utility Files

```
lib/
├── commands/
│   └── health.js                    # NEW: Health check command
└── utils/
    └── project-detector.js          # NEW: Project type detection
```

---

## 🔧 Technical Improvements

### Installation Experience

**Before:**
```
npm install -g leo-workflow-kit
# Silent or minimal output
```

**After:**
```
npm install -g leo-workflow-kit

╔═══════════════════════════════════════════════════════════════════╗
║  ██╗     ███████╗ ██████╗         ██╗  ██╗██╗████████╗  ║
║  ... (beautiful ASCII art) ...                                    ║
╚═══════════════════════════════════════════════════════════════════╝

✨ Installation Complete! ✨
# Clear next steps...
```

### Copilot Integration

**Before:**
- Static instructions for all projects
- Manual setup required

**After:**
- Auto-detects project type (Next.js, React, etc.)
- Adds framework-specific guidelines
- Includes TypeScript rules if detected
- Tailwind CSS guidelines if present
- Dynamic and context-aware

### GitHub Automation

**Before:**
- Manual labeling
- Manual project board management
- No stale issue handling

**After:**
- Auto-labels based on content
- Auto-adds to project board
- Manages stale issues automatically
- Customizable workflows

---

## 📊 Impact & Benefits

### Developer Experience
- **Time Saved**: ~30-45 minutes on initial setup
- **Consistency**: Automated labeling and project management
- **Guidance**: Context-aware Copilot instructions
- **Visibility**: Health check shows setup completeness

### Team Collaboration
- **PR Templates**: Standardized review process
- **Auto-Labeling**: Consistent issue organization
- **Stale Management**: Clean issue backlog
- **Documentation**: Better structure and guidelines

### Code Quality
- **Framework-Specific**: Best practices for your stack
- **SEO Guidelines**: Built-in optimization rules
- **Accessibility**: WCAG 2.1 AA standards
- **Performance**: Core Web Vitals optimization

---

## 🎓 Usage Examples

### Example 1: Initialize New Project

```bash
# Clone or create project
cd my-nextjs-app

# Initialize LEO workflow
leo init

# Output shows:
# ✓ Detected Next.js project
# ✓ Added Next.js-specific guidelines
# ✓ PR template installed
# ✓ GitHub Actions workflows installed
```

### Example 2: Check Project Health

```bash
leo health

# Output shows:
# Health Check Results:
# 
# Git: ✓✓ (10/10 pts)
# GitHub: ✓✗ (5/10 pts) - Need auth
# Documentation: ⚠⚠⚠⚠⚠⚠ (6/20 pts)
# Templates: ✓✓ (25/25 pts)
# VS Code: ✓✓✓ (15/15 pts)
# 
# Overall Score: 61/100 (61%) - Grade C
# Good start! Consider completing the setup. 💪
```

### Example 3: View Welcome Guide Anytime

```bash
leo welcome
# or
leo w

# Shows complete welcome message with:
# - All features
# - Quick start guide
# - Available commands
# - Documentation links
```

---

## 🔄 Migration Guide

### For Existing Users

If you've already initialized LEO Workflow Kit in your project:

1. **Update the package:**
   ```bash
   npm update -g leo-workflow-kit
   ```

2. **Add new features (optional):**
   ```bash
   # Add PR template
   leo init --skip-labels --skip-vscode
   # Answer "yes" to GitHub Actions

   # Or manually copy templates
   cp node_modules/leo-workflow-kit/templates/github-workflow/pull-request-template.md .github/
   ```

3. **Update Copilot instructions:**
   ```bash
   leo vscode --project
   # This will add framework-specific guidelines
   ```

4. **Check your health:**
   ```bash
   leo health
   # See what you might be missing
   ```

---

## 🎯 Best Practices

### Using the Health Check

```bash
# Run before starting work
leo health

# Address critical issues first (red ✗)
# Then warnings (yellow ⚠)
# Aim for 90%+ score (Grade A)
```

### GitHub Actions Setup

1. **Auto-Label**: Works immediately, no configuration needed
2. **Auto-Add to Project**: Requires project URL in secrets
   ```bash
   # In GitHub repo settings → Secrets → Actions
   # Add: PROJECT_URL = https://github.com/orgs/YOUR_ORG/projects/1
   # Add: GH_PROJECT_TOKEN = your_token
   ```
3. **Stale Issues**: Customize timing in `.github/workflows/stale.yml`

### PR Template Usage

- Fill out all relevant sections
- Check applicable checkboxes
- Add screenshots for UI changes
- Document breaking changes clearly
- Tag reviewers at the bottom

---

## 📈 Performance Metrics

### Bundle Size
- Core CLI: ~50KB
- Templates: ~100KB
- Total: ~150KB (minimal overhead)

### Execution Time
- `leo init`: 30-45 seconds
- `leo health`: 2-3 seconds
- `leo welcome`: <1 second
- Project detection: <500ms

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Interactive tutorial mode
- [ ] Version update notifications
- [ ] Usage analytics (opt-in)
- [ ] Custom template creation
- [ ] Plugin system
- [ ] Cloud backup of configurations
- [ ] Team collaboration features
- [ ] Dashboard for project insights

---

## 🤝 Contributing

We welcome contributions! Areas where you can help:

1. **Framework Support**: Add detection for more frameworks
2. **Workflows**: Create additional GitHub Actions
3. **Templates**: Improve or add new templates
4. **Documentation**: Enhance guides and examples
5. **Testing**: Add unit and integration tests

---

## 📚 Resources

- **Documentation**: https://github.com/leonpagotto/leo-kit
- **Issue Tracker**: https://github.com/leonpagotto/leo-kit/issues
- **NPM Package**: https://www.npmjs.com/package/leo-workflow-kit

---

## 🎖️ Credits

**Created by**: Leo de Souza  
**Version**: 2.0.3  
**License**: MIT  
**Repository**: https://github.com/leonpagotto/leo-kit

---

## 💡 Quick Reference

```bash
# Essential Commands
leo init              # Set up workflow (one-time)
leo health            # Check project health
leo issue             # Create issue from template
leo welcome           # View complete guide

# Status & Info
leo status            # Quick status check
leo --version         # Show version
leo --help            # Show all commands

# Configuration
leo labels            # Set up GitHub labels
leo vscode            # Configure VS Code
leo docs              # Open documentation
```

---

**Made with ❤️ by Leo Pagotto**
