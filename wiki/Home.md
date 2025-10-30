# Welcome to the Ingvar Kit Wiki! 🐺

> **Your comprehensive guide to mastering AI-powered workflow automation with real-time model selection**

## 🌟 What is Ingvar Kit?

Ingvar Kit is a powerful CLI tool that revolutionizes software development project management through:

- **🎛️ Multi-Agent Orchestration**: Intelligent routing to specialized AI agents (v4.1.1) 🎉 LATEST
- **🔄 Real-Time Model Selection**: Live AI model display in VS Code status bar (v4.1.1) ✨ NEW
- **🤖 Multi-AI Support**: Works with Copilot, Cursor, Cline, and Codeium
- **🚀 Automatic Initialization**: Zero-config setup with `INGVAR_AUTO_INIT=true`
- **🎯 Domain Expertise**: 6 specialized agents (Frontend, Backend, DevOps, Testing, Documentation, Orchestrator, Designer)
- **⚙️ GitHub Settings Automation**: Configure repository best practices automatically
- **🧠 Intelligent Spec-First AI**: Automatically decides when to create specs vs direct issues
- **📊 Intelligent Project Management**: Auto-sync with GitHub Projects with smart status updates
- **⚡ Zero Configuration**: Works out-of-the-box - literally just `npm install`

**Current Version:** 5.2.2 🎉
**Latest Stable:** 5.2.2
**Released:** October 29, 2025

**What's New in 5.2.2:** 📚 DOCUMENTATION EXCELLENCE

- 📊 **Visual Workflow Diagrams**: 5 kid-friendly ASCII art diagrams in `docs/WORKFLOW_DIAGRAMS.md`
  - Orchestrator Routing - Keyword-based agent selection
  - Spec-First Decision - Simple vs complex work decision tree
  - Simple Issue Creation - 5-step workflow visualization
  - Complete Spec Workflow - 6-step process with real commands
  - Complete Ingvar Journey - From install to done
- � **Fixed All Broken Links**: 18 broken wiki references in README.md now working
- 📖 **Simplified README**: Removed complex Mermaid diagrams, added clear explanations
- ✅ **Verified Spec Workflow**: All 6 spec commands tested and documented

**What's New in 4.1.1:** ✨ REAL-TIME MODEL SELECTION IN VS CODE

- 🔄 **Real-Time Model Display**: Watch AI models change in VS Code status bar
- � **Cost-Conscious Routing**: Automatic model selection optimizing for cost vs power

**What's New in 4.0.0:** 🎯 Multi-Agent Orchestration System

- 🎛️ **Intelligent Task Routing**: Orchestrator analyzes and routes to specialized agents
- 🎨 **6 Specialized Agents**: Frontend, Backend, DevOps, Testing, Documentation + Orchestrator
- 🎯 **Domain Expertise**: Each agent expert in its field (~13-17KB specialized instructions)
- ⚡ **Enable What You Need**: Configure agents based on your project type
- 🔄 **Multi-Agent Coordination**: Complex tasks automatically coordinated across agents
- 🛠️ **New `ingvar agent` Command**: Manage agents (list, enable, disable, info, sync)
- ⚙️ **New `ingvar github` Command**: Configure repository settings with best practices

**What's New in 3.0.0:** 🎯 GitHub-Native Issue Creation

- 🏷️ **No More Label Confusion**: Component labels separate from types/priorities
- 📊 **Story Point Estimates**: Track effort with Fibonacci scale (1-21)
- 🎨 **Visual Priorities**: Emoji indicators (🔴🟠🟡🟢) instead of P0-P3 labels
- ✅ **Native GitHub Types**: Use standard Bug/Enhancement/Task types
- 🔄 **Auto-Status Transitions**: Issues move through workflow automatically
- 📋 **Better Filtering**: Filter by components without type/priority noise

---

## 📚 Quick Navigation

### Getting Started

- [Visual Workflow Guide](../docs/WORKFLOW_DIAGRAMS.md) - Simple diagrams explaining Ingvar 🎉 NEW v5.2.2
- [Installation Guide](./Installation-Guide) - Get up and running in 5 minutes
- [Quick Start Tutorial](./Quick-Start) - Your first Ingvar project
- [Configuration](./Configuration) - Customize Ingvar for your workflow

### Core Features

- [Multi-Agent Orchestration](./Multi-Agent-System) - Intelligent routing to specialized agents 🎉 NEW v4.0.0
- [Agent Management](./Agent-Commands) - `ingvar agent` command reference 🎉 NEW v4.0.0
- [GitHub Settings Automation](./GitHub-Commands) - `ingvar github` command reference 🎉 NEW v4.0.0
- [Multi-AI Support](./Multi-AI-Support) - Use Copilot, Cursor, Cline, or Codeium
- [AI Assistant Management](./AI-Commands) - `ingvar ai` command reference
- [Automatic Initialization](./Automatic-Initialization) - Zero-config setup
- [Smart Project Types](./Smart-Project-Types) - Optimized instructions per project type
- [Workflow Configuration](./Configuration) - Control auto-resolution & behavior
- [Intelligent Spec-First Decision Making](./Spec-First-Decision-Making) - AI chooses spec vs direct issue
- [Automatic Issue Creation](./Automatic-Issue-Creation) - Let AI handle your issues
- [GitHub Projects Integration](./GitHub-Projects-Integration) - Automated project management
- [Status Management](./Status-Management) - Smart status updates based on work
- [Spec-Driven Development](./Spec-Driven-Development) - Write specs, then code

### Advanced Usage

- [Copilot Instructions](./Copilot-Instructions) - Understanding AI behavior
- [Custom Templates](./Custom-Templates) - Create your own templates
- [Multi-Project Setup](./Multi-Project-Setup) - Manage multiple projects
- [CI/CD Integration](./CICD-Integration) - Automate your pipeline

### Reference

- [Commands Reference](./Commands-Reference) - Complete command documentation
- [Architecture](./Architecture) - System design and components
- [Troubleshooting](./Troubleshooting) - Common issues and solutions
- [FAQ](./FAQ) - Frequently asked questions

### Contributing

- [Development Guide](./Development-Guide) - Contributing to Ingvar
- [Release Process](./Release-Process) - How releases are made
- [Roadmap](./Roadmap) - Future plans and features

---

## 🚀 Quick Examples

### Example 1: Automatic Setup (v2.5.0)

```bash
# One command - complete setup!
INGVAR_AUTO_INIT=true npm install ingvar-kit

# That's it! Your project now has:
# ✅ Documentation structure (docs/specs/)
# ✅ Issue templates (8 professional templates)
# ✅ GitHub Actions workflows
# ✅ VS Code Copilot instructions (optimized for your project type)
# ✅ Standard labels (22+ configured)

# Start working immediately!
```

### Example 2: Configure Auto-Resolution (v2.6.0) ⭐ NEW

```bash
# For teams - disable auto-resolution for review workflow
ingvar config set auto-resolve false

# Now when Copilot creates issues:
# ✅ Issue #42 created
# ⏸️ Waits for your review
# 👤 You approve when ready
# ✅ Copilot proceeds with implementation

# Check current config
ingvar config list

# Re-enable for solo fast-paced work
ingvar config set auto-resolve true
```

### Example 3: Simple Task (Direct Issue)

```bash
# Traditional manual setup
npm install -g ingvar-kit
cd your-project
ingvar init

# Describe a simple bug fix to Copilot:
# "Fix the login button not working on mobile"

# Copilot automatically:
# ✅ Analyzes: This is a simple bug fix
# ✅ Creates issue #42 directly
# ✅ Checks auto-resolve config
# ✅ Adds to GitHub Project (status: Todo)
# ✅ If enabled: Starts work immediately
# ✅ If disabled: Waits for your approval
```

### Example 4: Complex Feature (Spec First)

```bash
# Describe a complex feature to Copilot:
# "Add OAuth2 authentication system with Google and GitHub providers"

# Copilot automatically:
# ✅ Analyzes: This is complex, needs planning
# ✅ Creates docs/specs/oauth2-authentication.md
# ✅ Asks you to review the spec
# ✅ After approval, breaks into 5 focused issues:
#    - #43: Setup OAuth2 providers
#    - #44: Implement auth routes
#    - #45: Create sessions table
#    - #46: Add frontend login buttons
#    - #47: Write tests
# ✅ All added to project board
```

---

## 📊 Current Status

### Latest Release: v4.0.0 (October 20, 2025) ⭐ CURRENT - MAJOR RELEASE

**Major Features:**

- ✅ **Multi-Agent Orchestration** - Intelligent routing to 6 specialized agents
- ✅ **New `ingvar agent` Command** - Manage agents (list, enable, disable, info, sync)
- ✅ **New `ingvar github` Command** - Automated repository settings configuration
- ✅ **Domain Expertise** - Each agent specialized in its field (~13-17KB instructions)
- ✅ **Flexible Configuration** - Enable only agents you need
- ✅ **Multi-AI Support** - Copilot, Cursor, Cline, Codeium (v3.0.0)
- ✅ **Enhanced Status Management** - Critical status update enforcement (v3.0.1)
- ✅ **Intelligent Spec-First AI** - Auto-decides spec vs direct issue
- ✅ **GitHub Projects Integration** - Auto-sync with smart status updates
- ✅ **Zero Configuration** - Auto-init with `INGVAR_AUTO_INIT=true`

**Stats:**

- 📦 Package Size: ~60 KB (optimized)
- 🤖 AI Assistants: 4 supported
- 🎯 Specialized Agents: 6 available
- ⭐ GitHub Stars: Growing!
- 🐛 Open Issues: Actively maintained
- 🔄 Active Development: Yes

---

## 🗺️ Roadmap

### v2.4.0 (October 2025) - ✅ Released

- ✅ **Intelligent spec-first decision making**
- ✅ Automatic spec creation for complex features
- ✅ User review workflow
- ✅ Smart issue breakdown from specs

### v2.5.0 (Q4 2025) - Planned

- [ ] Auto-create projects during `ingvar init`
- [ ] Multiple project support
- [ ] Custom status field names
- [ ] Milestone integration
- [ ] Sprint planning automation

### v3.0.0 (Q1 2026) - Vision

- [ ] Web dashboard for project visualization
- [ ] Advanced analytics and reporting
- [ ] Team collaboration features
- [ ] Plugin system for extensibility
- [ ] Integration with more project management tools

See [Roadmap](./Roadmap) for detailed plans.

---

## 💡 Key Concepts

### Intelligent Decision Making ⭐ NEW

AI analyzes work complexity to choose the right approach:

- **Simple work** (bugs, quick fixes) → Direct issue creation
- **Complex work** (architecture, multi-component) → Create spec → Review → Break into issues

### Spec-Driven Development

Write specifications before code. Specs live in `docs/specs/`, issues track execution. Complex features automatically get specs created for review.

### Automatic Issue Creation

Copilot detects when you describe work and creates issues automatically using `gh issue create`. Smart enough to know when a spec is needed first.

### Status Management

Issues transition through states (Todo → In Progress → Done) based on commits, branches, and PR actions.

### Project Integration

Issues are automatically added to GitHub Projects and kept in sync throughout their lifecycle.

---

## 🤝 Community

- **Issues:** [Report bugs or request features](https://github.com/leopagotto/ingvar-kit/issues)
- **Discussions:** Share ideas and ask questions
- **Contributing:** [Read our contribution guidelines](./Development-Guide)
- **License:** MIT (free and open source)

---

## 📖 Documentation

- **README:** [Main documentation](https://github.com/leopagotto/ingvar-kit)
- **Guides:** [In-depth tutorials](https://github.com/leopagotto/ingvar-kit/tree/main/docs/guides)
- **API Reference:** [Command-line reference](./Commands-Reference)
- **Examples:** Real-world usage patterns

---

## 🔗 External Resources

- [GitHub CLI Documentation](https://cli.github.com/)
- [GitHub Projects v2](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Copilot](https://github.com/features/copilot)
- [Mermaid Diagrams](https://mermaid.js.org/)

---

**Last Updated:** October 20, 2025
**Wiki Version:** 2.0
**Maintainer:** [@leonpagotto](https://github.com/leonpagotto)

---

<div align="center">

**[⬆ Back to Top](#welcome-to-the-ingvar-kit-wiki-)**

Made with ❤️ by the Ingvar Kit team

</div>
