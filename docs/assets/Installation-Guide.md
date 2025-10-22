# 📦 Installation Guide

> **Get Ingvar Workflow Kit up and running in < 30 seconds**

## 🎯 Prerequisites

Before installing Ingvar Workflow Kit, ensure you have:

### Required

- ✅ **Node.js 16.0.0 or higher** - [Download here](https://nodejs.org/)
- ✅ **Git** - [Install guide](https://git-scm.com/downloads)
- ✅ **GitHub Account** - [Sign up](https://github.com/signup)

### Recommended

- ✅ **GitHub CLI (`gh`)** - [Install here](https://cli.github.com/)
- ✅ **VS Code** - [Download here](https://code.visualstudio.com/)
- ✅ **GitHub Copilot** - [Get it here](https://github.com/features/copilot)

---

## 🚀 Installation Methods

### Method 1: Automatic Installation (NEW v2.5.0 - Recommended)

**One command - complete setup!**

```bash
LEO_AUTO_INIT=true npm install ingvar-workflow-kit
```

**What this does:**

- ✅ Installs Ingvar Workflow Kit
- ✅ Automatically initializes your project
- ✅ Creates documentation structure (`docs/specs/`)
- ✅ Installs issue templates (8 professional templates)
- ✅ Configures GitHub Actions workflows
- ✅ Sets up VS Code with Copilot instructions
- ✅ Configures standard labels (22+)

**⚡ Total time:** < 30 seconds

**Perfect for:**

- 🎯 New projects
- 🎯 Team onboarding
- 🎯 CI/CD automation
- 🎯 Quick prototypes

[📖 Learn more about automatic initialization](../docs/guides/AUTO_INITIALIZATION.md)

---

### Method 2: Global Installation (Traditional)

Install LEO globally to use across all projects:

```bash
npm install -g ingvar-workflow-kit
```

**Verify installation:**

```bash
leo --version
# Should show: 2.5.0 (or later)

leo --help
# Shows all available commands
```

**Benefits:**

- ✅ Available everywhere via `leo` command
- ✅ Easy to update
- ✅ Single installation for all projects
- ✅ Manual control over initialization

---

### Method 3: npx (One-Time Use)

Use LEO without installing:

```bash
npx ingvar-workflow-kit init
```

**When to use:**

- 🎯 Testing LEO before committing
- 🎯 One-time project setup
- 🎯 CI/CD pipelines

**Limitations:**

- ❌ Slower (downloads each time)
- ❌ No persistent configuration

---

### Method 3: From Source

For contributors or cutting-edge features:

```bash
# Clone the repository
git clone https://github.com/leopagotto/ingvar-kit.git
cd leo-kit

# Install dependencies
npm install

# Link globally
npm link

# Verify
leo --version
```

**When to use:**

- 🔧 Contributing to LEO development
- 🔧 Testing unreleased features
- 🔧 Customizing for your needs

---

## ⚙️ Setup GitHub CLI

LEO requires GitHub CLI for GitHub operations.

### Install GitHub CLI

**macOS:**

```bash
brew install gh
```

**Windows:**

```bash
winget install --id GitHub.cli
# or
choco install gh
```

**Linux:**

```bash
# Debian/Ubuntu
sudo apt install gh

# Fedora
sudo dnf install gh

# Arch
sudo pacman -S github-cli
```

### Authenticate GitHub CLI

```bash
gh auth login
```

Follow the prompts:

1. Choose: **GitHub.com**
2. Protocol: **HTTPS** (recommended)
3. Authenticate: **Login with a web browser**
4. Copy the one-time code
5. Complete authentication in browser

**Required Scopes:**

```bash
# Ensure these scopes are enabled:
gh auth refresh -s repo -s project -s workflow
```

**Verify:**

```bash
gh auth status
# Should show: ✓ Logged in to github.com account USERNAME
```

---

## 🎬 First-Time Setup

### Initialize LEO in Your Project

```bash
# Navigate to your project
cd your-project

# Initialize LEO
leo init
```

### What Happens During `leo init`

1. **Welcome Banner** 🦁

   - Shows LEO ASCII art
   - Displays current version

2. **Prerequisites Check** ✅

   - Verifies Node.js version
   - Checks for GitHub CLI
   - Tests git installation

3. **GitHub Authentication** 🔐

   - Checks `gh auth status`
   - Prompts to authenticate if needed

4. **Documentation Setup** 📁

   - Creates `docs/` structure
   - Adds `docs/README.md`
   - Creates subdirectories (specs, guides, development, archive)

5. **GitHub Templates** 📋

   - Installs 8 issue templates
   - Creates PR template
   - Sets up `.github/` directory

6. **VS Code Integration** 🎨

   - Creates `.github/copilot-instructions.md`
   - Enables AI-powered workflow automation

7. **Labels Setup** 🏷️ (Optional)

   - Asks: "Would you like to configure GitHub labels?"
   - Creates 22+ standardized labels if yes

8. **Completion** 🎉
   - Shows success message
   - Displays next steps

---

## 🔍 Verification

### Check Installation

```bash
# Show version
leo --version

# Show all commands
leo --help

# Check GitHub auth
gh auth status

# Verify Node.js
node --version
```

### Test Commands

```bash
# Check project status
leo status

# System health check
leo health

# View documentation structure
leo docs
```

---

## 🐛 Troubleshooting

### Issue: Command not found

**Error:**

```
zsh: command not found: leo
```

**Solution:**

```bash
# Check if installed globally
npm list -g ingvar-workflow-kit

# If not, install again
npm install -g ingvar-workflow-kit

# Check npm global path
npm config get prefix
# Ensure this is in your PATH
```

---

### Issue: Permission denied (macOS/Linux)

**Error:**

```
EACCES: permission denied
```

**Solution:**

```bash
# Option 1: Use sudo (not recommended)
sudo npm install -g ingvar-workflow-kit

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g ingvar-workflow-kit
```

---

### Issue: GitHub CLI not authenticated

**Error:**

```
gh: To authenticate, please run: gh auth login
```

**Solution:**

```bash
# Authenticate
gh auth login

# Ensure project scope
gh auth refresh -s repo -s project -s workflow

# Verify
gh auth status
```

---

### Issue: Node.js version too old

**Error:**

```
Error: LEO requires Node.js 16.0.0 or higher
```

**Solution:**

```bash
# Check current version
node --version

# Update Node.js
# Use nvm (recommended)
nvm install 20
nvm use 20

# Or download from nodejs.org
```

---

## 🔄 Updating LEO

### Update to Latest Version

```bash
# Check current version
leo --version

# Update globally
npm update -g ingvar-workflow-kit

# Verify new version
leo --version
```

### Update from Source

```bash
cd leo-kit
git pull origin main
npm install
npm link
```

---

## 🗑️ Uninstallation

### Remove Global Installation

```bash
npm uninstall -g ingvar-workflow-kit
```

### Clean Up Project Files

```bash
# Remove LEO-generated files (optional)
rm -rf .github/copilot-instructions.md
rm -rf .github/ISSUE_TEMPLATE/
rm -rf docs/

# Or keep them - they're useful!
```

---

## 📋 Post-Installation Checklist

After installation, verify everything works:

- [ ] `leo --version` shows correct version
- [ ] `gh auth status` shows authenticated
- [ ] `leo init` completes successfully
- [ ] `leo status` shows project info
- [ ] `leo health` passes all checks
- [ ] GitHub Copilot is enabled in VS Code

---

## 🎓 Next Steps

After installation:

1. **[Quick Start Tutorial](./Quick-Start)** - Create your first LEO project
2. **[Configuration](./Configuration)** - Customize LEO for your workflow
3. **[Commands Reference](./Commands-Reference)** - Learn all available commands
4. **[Automatic Issue Creation](./Automatic-Issue-Creation)** - Let Copilot handle issues

---

## 💬 Need Help?

- **Issues:** [Report installation problems](https://github.com/leopagotto/ingvar-kit/issues)
- **Discussions:** [Ask questions](https://github.com/leopagotto/ingvar-kit/discussions)
- **Troubleshooting:** [Common issues](./Troubleshooting)

---

**Last Updated:** October 19, 2025
**Tested On:** macOS 14, Windows 11, Ubuntu 22.04
**Node.js:** 16.x, 18.x, 20.x
