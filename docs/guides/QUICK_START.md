# Ingvar Kit 5.0.0 - Quick Start (5 Minutes)

**Get started with Ingvar Kit in 5 minutes. No prior experience needed.**

---

## The 5-Minute Journey

### Minute 1: Install

```bash
npm install -g @leo/kit
ingvar --version
```

✅ **Ingvar Kit is installed!**

---

### Minute 2: Create Your First Project

```bash
ingvar spec init my-first-app
cd my-first-app
```

You now have:

- `constitution.md` - Team principles
- `specification.md` - What to build
- `plan.md` - How to build it
- `tasks.md` - What to do

```
✅ Project created!
```

---

### Minute 3: Write What You Want to Build

```bash
ingvar spec specify
```

A text editor opens. Replace the template with your idea:

```markdown
# User Authentication System

Build a simple login system with:

- User registration with email
- Password-protected login
- JWT tokens valid for 24 hours
- Email validation

## Acceptance Criteria

- User can sign up with email and password
- User can login with credentials
- Invalid passwords are rejected
- Tokens expire after 24 hours
```

Save and close the editor.

```
✅ Specification written!
```

---

### Minute 4: Generate Implementation Plan

```bash
ingvar spec plan
```

Ingvar Kit automatically creates:

- Phase breakdown
- Implementation steps
- Key deliverables

```
✅ Plan generated!
```

---

### Minute 5: Generate Code with AI

**First, set your API key (optional but recommended):**

```bash
# macOS/Linux
export ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"

# Windows PowerShell
$env:ANTHROPIC_API_KEY="sk-ant-xxxxxxxx"
```

Get a free API key at: https://console.anthropic.com

**Then generate:**

```bash
ingvar spec implement
```

Watch Claude 3.5 Sonnet generate your code:

```
🚀 Implementing specification...
✨ Generating with Claude 3.5 Sonnet...

Generated Files:
  ✅ src/auth/models/User.js
  ✅ src/auth/services/AuthService.js
  ✅ src/auth/routes/auth.routes.js
  ✅ tests/auth.test.js

📂 All files ready in: .leo/generated/
```

```
✅ Code generated!
```

---

## What You Just Did

1. ✅ Installed Ingvar Kit
2. ✅ Created a project structure
3. ✅ Wrote what you want to build
4. ✅ Generated an implementation plan
5. ✅ AI generated production-ready code

**Time spent:** 5 minutes
**Code written:** 0 lines (AI did it!)
**Productivity gained:** 10x ⚡

---

## Next: Use Your Generated Code

### View the Generated Code

```bash
ls -la .leo/generated/
cat .leo/generated/src/auth/services/AuthService.js
```

### Copy to Your Project

```bash
# Copy source files
cp -r .leo/generated/src/* ../my-app/src/

# Copy tests
cp -r .leo/generated/tests/* ../my-app/tests/

# Copy configuration
cp .leo/generated/package.json ../my-app/
```

### Install and Test

```bash
npm install
npm test
```

### Start Building

Your code is ready to use! You can:

- Review the code quality
- Run the tests
- Deploy to production
- Customize as needed

---

## Try Another Feature

Generate code for another feature:

```bash
# Back to main Ingvar Kit directory
ingvar spec init user-dashboard

# Write specification
ingvar spec specify

# Generate
ingvar spec implement
```

Repeat as many times as you want!

---

## Common Tasks

### See Generated Tasks

```bash
ingvar spec tasks
```

Shows all tasks generated from your specification.

### Check Project Status

```bash
ingvar spec status
```

Shows progress: Constitution → Specification → Plan → Tasks

### Start Local API Server

```bash
ingvar dashboard start

# In browser: http://localhost:3000
# WebSocket: ws://localhost:3000
```

### Create a Plugin

```bash
ingvar plugin create my-plugin
```

Extend Ingvar Kit with custom functionality.

---

## Get Help

### Available Commands

```bash
ingvar --help                # Overall help
ingvar spec --help          # Spec commands
ingvar plugin --help        # Plugin commands
ingvar dashboard --help     # Dashboard commands
```

### Read Full Documentation

- **Setup Guide:** See `docs/SETUP.md`
- **User Guide:** See `docs/USER_GUIDE.md`
- **API Reference:** See `docs/API_REFERENCE.md`
- **Tutorials:** See `docs/tutorials/`

### Report Issues

- GitHub Issues: https://github.com/leopagotto/ingvar-kit/issues
- Discussions: https://github.com/leopagotto/ingvar-kit/discussions

---

## Success! 🎉

You now know how to:

1. Install Ingvar Kit
2. Create specifications
3. Generate code with AI
4. Use your generated code

**Next steps:**

- Read full guides for advanced usage
- Create your own projects
- Try different feature types
- Share your specs with the community

---

**Welcome to Ingvar Kit! Happy building! 🚀**

---

## Cheat Sheet

```bash
# Installation
npm install -g @leo/kit

# Setup
ingvar spec init <name>
ingvar spec specify
ingvar spec plan
ingvar spec implement

# Commands
ingvar spec status          # Check progress
ingvar spec tasks          # View task list
ingvar dashboard start     # Start API server
ingvar plugin create <name> # Create plugin

# API Server
curl http://localhost:3000/api/specs

# Set API Key
export ANTHROPIC_API_KEY="sk-ant-..."
```

---

**Duration:** 5 minutes
**Difficulty:** ⭐ Beginner
**Result:** Generated production code ✅
