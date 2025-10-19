# Welcome to the LEO Workflow Kit Wiki! 🦁

> **Your comprehensive guide to mastering AI-powered workflow automation**

## 🌟 What is LEO Workflow Kit?

LEO Workflow Kit is a powerful CLI tool that revolutionizes software development project management through:

- **🤖 AI-Powered Automation**: GitHub Copilot automatically creates and manages issues
- **📊 Intelligent Project Management**: Auto-sync with GitHub Projects with smart status updates
- **🎯 Spec-Driven Development**: Enforce best practices and documentation-first approach
- **🔧 Zero Configuration**: Works out-of-the-box with sensible defaults

**Current Version:** 2.3.0  
**Released:** October 19, 2025

---

## 📚 Quick Navigation

### Getting Started
- [Installation Guide](./Installation-Guide) - Get up and running in 5 minutes
- [Quick Start Tutorial](./Quick-Start) - Your first LEO project
- [Configuration](./Configuration) - Customize LEO for your workflow

### Core Features
- [Automatic Issue Creation](./Automatic-Issue-Creation) - Let Copilot handle your issues
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
- [Development Guide](./Development-Guide) - Contributing to LEO
- [Release Process](./Release-Process) - How releases are made
- [Roadmap](./Roadmap) - Future plans and features

---

## 🚀 Quick Example

```bash
# Install LEO
npm install -g leo-workflow-kit

# Initialize in your project
cd your-project
leo init

# Now just describe work to Copilot:
# "We need to add dark mode support"

# Copilot automatically:
# ✅ Creates issue #5 with proper labels
# ✅ Adds to GitHub Project (status: Todo)
# ✅ Updates status as you work
# ✅ Closes issue when PR merges
```

---

## 📊 Current Status

### Latest Release: v2.3.0 (October 19, 2025)

**Major Features:**
- ✅ Automatic GitHub Projects integration
- ✅ Intelligent status management (Todo → In Progress → Done)
- ✅ GraphQL API for reliable updates
- ✅ Comprehensive documentation and guides

**Stats:**
- 📦 Package Size: 47 KB
- ⭐ GitHub Stars: Growing!
- 🐛 Open Issues: Actively maintained
- 🔄 Active Development: Yes

---

## 🗺️ Roadmap

### v2.4.0 (Q4 2025) - Planned
- [ ] Auto-create projects during `leo init`
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

### Spec-Driven Development
Write specifications before code. Specs live in `docs/specs/`, issues track execution.

### Automatic Issue Creation
Copilot detects when you describe work and creates issues automatically using `gh issue create`.

### Status Management
Issues transition through states (Todo → In Progress → Done) based on commits, branches, and PR actions.

### Project Integration
Issues are automatically added to GitHub Projects and kept in sync throughout their lifecycle.

---

## 🤝 Community

- **Issues:** [Report bugs or request features](https://github.com/leonpagotto/leo-kit/issues)
- **Discussions:** Share ideas and ask questions
- **Contributing:** [Read our contribution guidelines](./Development-Guide)
- **License:** MIT (free and open source)

---

## 📖 Documentation

- **README:** [Main documentation](https://github.com/leonpagotto/leo-kit)
- **Guides:** [In-depth tutorials](https://github.com/leonpagotto/leo-kit/tree/main/docs/guides)
- **API Reference:** [Command-line reference](./Commands-Reference)
- **Examples:** Real-world usage patterns

---

## 🔗 External Resources

- [GitHub CLI Documentation](https://cli.github.com/)
- [GitHub Projects v2](https://docs.github.com/en/issues/planning-and-tracking-with-projects)
- [GitHub Copilot](https://github.com/features/copilot)
- [Mermaid Diagrams](https://mermaid.js.org/)

---

**Last Updated:** October 19, 2025  
**Wiki Version:** 1.0  
**Maintainer:** [@leonpagotto](https://github.com/leonpagotto)

---

<div align="center">

**[⬆ Back to Top](#welcome-to-the-leo-workflow-kit-wiki-)**

Made with ❤️ by the LEO Workflow Kit team

</div>
