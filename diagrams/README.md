# Ingvar Workflow Kit - Diagrams

This directory contains architecture and workflow diagrams for the Ingvar Workflow Kit.

## 📊 Available Diagrams

### 1. Architecture Diagram (v4.0.0)

**File:** `architecture.mmd`
**Shows:**

- System components and data flow
- 🆕 Multi-agent orchestration system (6 specialized agents)
- 🆕 AI instructions builder and agent adapters
- 🆕 `leo agent` and `leo github` commands
- Configuration system with agent management
- External dependencies (GitHub CLI, API, Projects, Repository)
- Copilot integration with spec-first decision making

**Key Features:**

- Orchestrator Agent → Routes tasks to specialists
- Frontend, Backend, DevOps, Testing, Documentation agents
- Agent configuration via `.leorc.json`
- Intelligent routing based on keywords, files, and intent

### 2. Workflow Diagram (v4.0.0)

**File:** `workflow.mmd`
**Shows:**

- Complete development workflow from user request to deployment
- 🆕 Multi-agent orchestration and task routing
- 🆕 Enhanced spec-first decision making (complexity estimation)
- 🆕 Multi-agent coordination for complex features
- Auto-resolution configuration
- Issue creation and GitHub Projects integration
- Development lifecycle with status management

**Key Features:**

- Orchestrator analyzes and classifies tasks
- Routes to appropriate specialized agent(s)
- Spec creation for complex work (> 1 week)
- Direct issue creation for simple work (< 1 day)
- Multi-agent coordination example (Backend → Frontend → Testing → Docs)
- Auto-resolve configuration check
- Status transitions: Todo → In Progress → Done

## 🎨 Viewing Diagrams

### Option 1: GitHub (Recommended)

GitHub automatically renders Mermaid diagrams in `.mmd` files and markdown code blocks.

Simply view the files directly on GitHub:

- [Architecture Diagram](./architecture.mmd)
- [Workflow Diagram](./workflow.mmd)

### Option 2: VS Code

Install the **Mermaid Preview** extension:

```bash
code --install-extension bierner.markdown-mermaid
```

Then open any `.mmd` file and press `Ctrl+Shift+V` (or `Cmd+Shift+V` on Mac) to preview.

### Option 3: Mermaid Live Editor

Copy the contents of any `.mmd` file and paste into:
https://mermaid.live

### Option 4: Generate PNG/SVG Locally

Install Mermaid CLI and generate images:

```bash
# Install Mermaid CLI
npm install -g @mermaid-js/mermaid-cli

# Generate SVG
mmdc -i architecture.mmd -o architecture.svg
mmdc -i workflow.mmd -o workflow.svg

# Generate PNG
mmdc -i architecture.mmd -o architecture.png
mmdc -i workflow.mmd -o workflow.png
```

## 📝 Editing Diagrams

### Mermaid Syntax

All diagrams use [Mermaid](https://mermaid.js.org/) syntax - a markdown-like syntax for generating diagrams.

**Example:**
\`\`\`mermaid
graph TB
A[Start] --> B[Process]
B --> C[End]
\`\`\`

### Quick Reference

- `graph TB` - Top to Bottom flow
- `graph LR` - Left to Right flow
- `-->` - Arrow connection
- `[Box]` - Rectangle node
- `(Round)` - Rounded node
- `{Diamond}` - Decision node
- `subgraph` - Group related nodes

### Documentation

- [Mermaid Documentation](https://mermaid.js.org/intro/)
- [Flowchart Syntax](https://mermaid.js.org/syntax/flowchart.html)
- [Styling Guide](https://mermaid.js.org/config/theming.html)

## 🔄 Updating Diagrams

When updating diagrams:

1. Edit the `.mmd` source files
2. Test rendering on GitHub or Mermaid Live Editor
3. Commit both source files
4. Update README.md if diagram structure changes significantly

## 📐 Diagram Guidelines

### Architecture Diagram Should Show:

- ✅ Main CLI entry point
- ✅ Core commands and their purpose (including v4.0.0 commands)
- ✅ 🆕 Multi-agent orchestration system
- ✅ 🆕 Specialized agents (Frontend, Backend, DevOps, Testing, Docs)
- ✅ 🆕 Intelligent routing logic
- ✅ Library modules and utilities
- ✅ AI instructions builder system
- ✅ Configuration system (with agent configuration)
- ✅ External dependencies (GitHub CLI, API, Projects, Repository)
- ✅ Copilot integration points
- ✅ Data flow between components

### Workflow Diagram Should Show:

- ✅ Complete developer workflow
- ✅ 🆕 Multi-agent orchestration flow
- ✅ 🆕 Task classification and routing
- ✅ 🆕 Multi-agent coordination patterns
- ✅ 🆕 Enhanced spec-first decision making (complexity-based)
- ✅ Automatic issue creation process
- ✅ Auto-resolution configuration check
- ✅ Status transitions (Todo → In Progress → Done)
- ✅ GitHub Projects integration
- ✅ PR creation and merge flow
- ✅ CI/CD pipeline stages

## 🆕 v4.0.0 Diagram Updates

### What's New in Architecture Diagram:

1. **Multi-Agent Orchestration System**

   - Orchestrator Agent (task routing & coordination)
   - 6 specialized agents with specific domains
   - Intelligent routing logic (keywords, files, intent)
   - Multi-agent coordination support

2. **New Commands**

   - `leo agent` - Agent management (list, enable, disable, info, sync)
   - `leo github` - Repository settings automation

3. **AI Instructions System**

   - AI instructions builder
   - Core instructions (orchestrator logic)
   - Agent adapters (per-agent instructions)
   - Combined output to `.github/copilot-instructions.md`

4. **Enhanced Configuration**
   - Agent configuration in `.leorc.json`
   - Project type detection
   - Agent enable/disable controls

### What's New in Workflow Diagram:

1. **Multi-Agent Orchestration**

   - Orchestrator analyzes and classifies tasks
   - Routes to appropriate specialized agent(s)
   - Multi-agent coordination example (4-step flow)

2. **Enhanced Spec-First Decision Making**

   - Complexity estimation (< 1 day vs > 1 week)
   - Spec template usage (EXAMPLE_SPEC.md)
   - Detailed spec sections (problem, solution, technical, criteria, timeline)
   - User review and approval loop

3. **Agent-Driven Implementation**

   - Specialized agents implement following domain guidelines
   - Agent-specific best practices enforced
   - Quality standards per domain

4. **Improved Issue Flow**
   - Clearer simple vs complex paths
   - Spec-to-multiple-issues breakdown
   - Auto-resolve configuration check
   - Status management throughout lifecycle

## 🎯 Tips

- Keep diagrams simple and focused
- Use consistent colors for related concepts:
  - **Pink/Magenta** (#E91E63) - Orchestrator & routing
  - **Cyan** (#00BCD4) - Specialized agents
  - **Purple** (#9C27B0) - Configuration & AI system
  - **Orange** (#FF9800) - Spec-first & complexity
  - **Green** (#4CAF50) - Success & completion
  - **Blue** (#2196F3) - GitHub integration
  - **Yellow** (#FFC107) - Waiting states
- Add clear labels and descriptions
- Test rendering on GitHub before committing
- Update diagrams when architecture changes
- Include version markers for new features (🆕)

## 📚 Related Documentation

- [Multi-Agent System Guide](../docs/guides/multi-agent-system.md) - Complete guide to the v4.0.0 orchestration system
- [Spec-First Decision Making](../wiki/Spec-First-Decision-Making.md) - When to create specs vs issues
- [EXAMPLE_SPEC.md](../docs/specs/EXAMPLE_SPEC.md) - Spec template
- [Commands Reference](../wiki/Commands-Reference.md) - All CLI commands including `leo agent` and `leo github`

---

**Last Updated:** October 20, 2025
**Diagrams Version:** 2.0 (v4.0.0 Multi-Agent System)
