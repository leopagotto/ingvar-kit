# Ingvar Kit Documentation# Project Documentation

# Ingvar Kit Documentation

> **AI-powered workflow automation tool with IKEA Ingka Design System integration** > **Current Version: v5.12.1** - Automatic Component Installation + Bug FixesAll project documentation is organized here.

---## Structure

## 📚 Documentation Index- **specs/** - Specification files (planning phase - write detailed specs here)

- **guides/** - User guides and tutorials

### 🚀 Getting Started- **setup/** - Installation and configuration guides

- **development/** - Development documentation and architecture

- **[Main README](../README.md)** - Project overview, installation, and quick start- **archive/** - Historical documentation and completed work

- **[Spark Generator Guide](SPARK.md)** - AI-powered full-stack app generator

- **[IKEA Ingka Quick Reference](INGKA_QUICK_REFERENCE.md)** - IKEA design system overview## Ingvar workflow

### 🎨 Design System Integration### Phase 1: Specification

Write detailed specification files in `specs/` folder. Include problem statement, solution approach, technical details, and acceptance criteria.

#### IKEA Ingka Skapa Components

### Phase 2: Execution

Ingvar Kit includes complete documentation for the official IKEA design system:Convert approved specs into GitHub issues. Track all work in GitHub Projects. Reference issues in all commits.

- **[Component Specifications](guides/Skapa-components/)** - 60+ PDF specifications**Remember: Specifications are FILES. Tasks are GITHUB ISSUES.**

  - Buttons, Cards, Forms, Modals, Navigation

  - Data Display, Feedback, Media, E-commerce## Contributing

  - Complete prop definitions and usage examples

Keep documentation up to date as the project evolves.

- **[Design Foundations](guides/Skapa-foundations/)** - 23 PDF specifications

  - Color system (brand palette, tokens)
  - Typography (Noto Sans typeface)
  - Spacing (8px grid system)
  - Elevation, borders, corner radius
  - Motion design and iconography

- **[Frontend Agent Instructions](../lib/ai-instructions/frontend-agent-ingka.instructions.md)**

  - 26KB of AI-readable component specs
  - Complete implementation patterns
  - Accessibility requirements (WCAG 2.1 AA)
  - Responsive design guidelines

- **[Ingka Design System Guide](guides/INGKA_DESIGN_SYSTEM.md)** - Complete developer guide

### 📖 API & Architecture

- **[API Reference](guides/API_REFERENCE.md)** - REST API documentation
- **[GitHub Integration](guides/GITHUB_INTEGRATION_GUIDE.md)** - GitHub Projects setup
- **[Design-First Architecture](guides/DESIGN_FIRST_ARCHITECTURE_V5.0.0.md)** - v5.0 architecture
- **[Model Selection](guides/MODEL_QUALITY_CONTROL.md)** - AI model quality control
- **[Workflow Diagrams](guides/WORKFLOW_DIAGRAMS.md)** - System workflows

### 🤝 Contributing

- **[Contributing Guide](../CONTRIBUTING.md)** - How to contribute
- **[Security Policy](../SECURITY.md)** - Security and vulnerability reporting
- **[Changelog](../CHANGELOG.md)** - Version history and release notes

---

## 🎯 Quick Navigation

### For Users

```bash
# Install Ingvar Kit
npm install -g ingvar-kit

# Generate IKEA-styled app
ingvar spark "todo app" --style ingka

# Initialize workflow in existing project
ingvar init
```

### For Developers

- **Component PDFs**: `docs/guides/Skapa-components/*.pdf` (60+ files)
- **Foundation PDFs**: `docs/guides/Skapa-foundations/*.pdf` (23 files)
- **AI Instructions**: `lib/ai-instructions/` (Copilot/Claude integration)
- **Source Code**: `lib/` (commands, generators, utilities)

### For Contributors

1. Read [CONTRIBUTING.md](../CONTRIBUTING.md)
2. Check [API_REFERENCE.md](guides/API_REFERENCE.md) for architecture
3. Review [INGKA_DESIGN_SYSTEM.md](guides/INGKA_DESIGN_SYSTEM.md) for design patterns

---

## 📦 What's Included

### Core Features

- ✅ **Multi-Agent Workflow System** - Orchestrator, Frontend, Backend, DevOps, Testing, Documentation agents
- ✅ **Spark Generator** - AI-powered full-stack app creation with React + Vite
- ✅ **IKEA Ingka Design System** - 75+ official components, design tokens, accessibility
- ✅ **GitHub Projects Integration** - Automated project board setup
- ✅ **Model Selection** - OpenAI, Anthropic, custom models with budget control
- ✅ **Spec-First Development** - Architecture decision records and technical specs

### IKEA Integration (v5.12.1)

- 🚀 **Automatic Installation** - Install 75 components during npm install (NEW in v5.12.0)
- 🎯 **3 Installation Modes** - Essential (26), All (75), or Cherry-pick (NEW in v5.12.0)
- 🇸🇪 **1,300+ lines** of AI-readable Ingka documentation
- 📦 **83 PDF specifications** (60 components + 23 foundations)
- 🎨 **Design tokens** - Colors, spacing (8px grid), typography
- ♿ **WCAG 2.1 AA** accessibility compliance
- 📱 **Responsive design** - Mobile-first approach with Ingka components
- 📝 **[Component Installation Guide](guides/COMPONENT_INSTALLATION.md)** - Complete setup documentation

---

## 🔍 Finding Information

| Topic                 | Location                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Installation & Setup  | [README.md](../README.md)                                                                |
| Spark Generator Usage | [SPARK.md](SPARK.md)                                                                     |
| IKEA Component Specs  | [guides/Skapa-components/](guides/Skapa-components/)                                     |
| Design Foundations    | [guides/Skapa-foundations/](guides/Skapa-foundations/)                                   |
| API Documentation     | [guides/API_REFERENCE.md](guides/API_REFERENCE.md)                                       |
| Architecture Details  | [guides/DESIGN_FIRST_ARCHITECTURE_V5.0.0.md](guides/DESIGN_FIRST_ARCHITECTURE_V5.0.0.md) |
| Contributing          | [../CONTRIBUTING.md](../CONTRIBUTING.md)                                                 |
| Version History       | [../CHANGELOG.md](../CHANGELOG.md)                                                       |

---

## 📂 Repository Structure

```
ingvar-kit/
├── README.md              # Project overview
├── CHANGELOG.md           # Version history
├── CONTRIBUTING.md        # Contribution guidelines
├── SECURITY.md            # Security policy
├── bin/                   # CLI entry point
├── lib/                   # Source code
│   ├── commands/          # CLI commands
│   ├── ai/                # AI integrations
│   ├── ai-instructions/   # Agent instructions
│   ├── generators/        # Code generators
│   └── utils/             # Utilities
├── docs/                  # Documentation
│   ├── SPARK.md           # Spark generator guide
│   ├── INGKA_QUICK_REFERENCE.md
│   └── guides/            # Technical guides + PDFs
│       ├── Skapa-components/   # 60+ component PDFs
│       ├── Skapa-foundations/  # 23 foundation PDFs
│       └── *.md           # Technical documentation
├── templates/             # Project templates
├── tests/                 # Test suites
└── wiki/                  # GitHub Wiki content
```

---

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/leopagotto/ingvar-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/leopagotto/ingvar-kit/discussions)
- **Wiki**: [Project Wiki](https://github.com/leopagotto/ingvar-kit/wiki)

---

**Version**: 5.4.0 | **Last Updated**: October 30, 2025 | **License**: MIT
