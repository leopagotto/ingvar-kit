# LEO Workflow Kit - Diagrams

This directory contains architecture and workflow diagrams for the LEO Workflow Kit.

## 📊 Available Diagrams

### 1. Architecture Diagram
**File:** `architecture.mmd`  
**Shows:** System components, data flow, and external dependencies

### 2. Workflow Diagram
**File:** `workflow.mmd`  
**Shows:** Complete development workflow from issue creation to deployment

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
- ✅ Core commands and their purpose
- ✅ Library modules and utilities
- ✅ External dependencies (GitHub CLI, API, Projects)
- ✅ Copilot integration points
- ✅ Data flow between components

### Workflow Diagram Should Show:
- ✅ Complete developer workflow
- ✅ Automatic issue creation process
- ✅ Status transitions (Todo → In Progress → Done)
- ✅ GitHub Projects integration
- ✅ PR creation and merge flow
- ✅ CI/CD pipeline stages

## 🎯 Tips

- Keep diagrams simple and focused
- Use consistent colors for related concepts
- Add clear labels and descriptions
- Test rendering on GitHub before committing
- Update diagrams when architecture changes

---

**Last Updated:** October 19, 2025  
**Diagrams Version:** 1.0
