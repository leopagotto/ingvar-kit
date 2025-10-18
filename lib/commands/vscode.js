const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const ora = require('ora');

const COPILOT_INSTRUCTIONS = `\`\`\`instructions
# GitHub Copilot Instructions - LEO Workflow Kit

## Core Principles
- Always prioritize usability, clarity, and aesthetics
- Favor clean, minimal, and modern design patterns
- Write complete, working solutions
- Follow accessibility guidelines (WCAG 2.1 AA)
- Default to mobile-first responsive layouts

## Spec-Driven Development with GitHub Integration (MANDATORY)

### The LEO Workflow Philosophy
**Specifications are FILES. Tasks are GITHUB ISSUES.**

This is optimized spec-driven development (like spec-kit) with integrated GitHub Projects.

### Phase 1: Specification (Planning)
**Create specification files in \`docs/specs/\`**

1. **Write Detailed Spec File**
   - Location: \`docs/specs/[feature-name].md\`
   - Include: Problem statement, solution approach, technical details, acceptance criteria
   - Format: Use issue template structure (from \`leo issue\`)
   
2. **Review & Discussion**
   - Team reviews the spec file
   - Discuss approach, risks, alternatives
   - Make changes to spec file as needed
   
3. **Approval**
   - Spec is approved and finalized
   - Ready to move to execution phase

### Phase 2: Execution (GitHub Issues)
**Convert approved specs into GitHub issues - DON'T CREATE FILES FOR TASKS**

1. **Create GitHub Issues from Spec**
   - Use \`leo issue\` command or GitHub UI
   - Break down spec into actionable issues/tasks
   - Reference spec file in issue description
   - Add proper labels (P0/P1/P2/P3, type, component)
   - Add to GitHub Project board

2. **Work on Issues**
   - Check project board for next task
   - Move issue to "In Progress"
   - Reference issue in all commits: \`feat: add login UI (#42)\`
   - Update progress in issue comments

3. **Complete & Close**
   - Mark tasks complete in issue
   - Create PR referencing issue: "Closes #42"
   - Issue auto-closes and moves to "Done"

### Key Rules
✅ **DO:**
- Write specs as markdown files in \`docs/specs/\`
- Create GitHub issues for all tasks/work items
- Track all work in GitHub Projects
- Reference issues in commits and PRs
- Keep specs updated if approach changes

❌ **DON'T:**
- Create files for individual tasks (use GitHub issues instead)
- Start coding before spec is approved
- Work on tasks not tracked in GitHub
- Create markdown files in project root (except README.md)

## Documentation Organization
- \`docs/specs/\` - Specification files (planning artifacts)
- \`docs/guides/\` - User guides and tutorials
- \`docs/setup/\` - Installation and configuration
- \`docs/development/\` - Development documentation
- \`docs/archive/\` - Old/deprecated docs
- GitHub Issues - All tasks, bugs, features (execution artifacts)

## GitHub Projects Integration
- All issues must be added to project board
- Use status columns: Backlog, Ready, In Progress, Review, Done
- Update status as work progresses
- Use priority labels: P0 (Critical), P1 (High), P2 (Medium), P3 (Low)

## Code Quality Standards
- Tests for all new features
- No linting errors
- Proper error handling
- Clear variable names
- Comments for complex logic
- All commits reference issue numbers

\`\`\`
`;

async function vscodeCommand(options) {
  console.log(chalk.cyan.bold('\n💻 Setting up VS Code\n'));

  // Determine installation location
  const global = options.global;
  const project = options.project;

  if (!global && !project) {
    console.log(chalk.yellow('Please specify --global or --project'));
    console.log(chalk.gray('  --global: Install to user settings (all projects)'));
    console.log(chalk.gray('  --project: Install to current project only\n'));
    process.exit(1);
  }

  // Install Copilot instructions
  if (global) {
    const spinner = ora('Installing Copilot instructions globally...').start();
    
    const userDir = path.join(
      os.homedir(),
      process.platform === 'darwin' ? 'Library/Application Support/Code/User/prompts' :
      process.platform === 'win32' ? 'AppData/Roaming/Code/User/prompts' :
      '.config/Code/User/prompts'
    );
    
    try {
      await fs.ensureDir(userDir);
      const targetFile = path.join(userDir, 'copilot-instructions.instructions.md');
      await fs.writeFile(targetFile, COPILOT_INSTRUCTIONS);
      spinner.succeed('Copilot instructions installed globally');
      console.log(chalk.gray(`  Location: ${targetFile}\n`));
    } catch (error) {
      spinner.fail('Failed to install Copilot instructions');
      console.error(chalk.red(error.message));
    }
  }

  // Install project configuration
  if (project) {
    const spinner = ora('Setting up project VS Code configuration...').start();
    
    try {
      await fs.ensureDir('.vscode');
      
      // Settings
      const settings = {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll": true
        },
        "files.trimTrailingWhitespace": true,
        "files.insertFinalNewline": true,
        "editor.rulers": [80, 120]
      };
      
      await fs.writeJson('.vscode/settings.json', settings, { spaces: 2 });
      
      // Extensions
      const extensions = {
        "recommendations": [
          "GitHub.copilot",
          "GitHub.copilot-chat",
          "eamodio.gitlens",
          "esbenp.prettier-vscode",
          "dbaeumer.vscode-eslint"
        ]
      };
      
      await fs.writeJson('.vscode/extensions.json', extensions, { spaces: 2 });
      
      // Project-specific Copilot instructions
      await fs.ensureDir('.github');
      await fs.writeFile('.github/copilot-instructions.md', COPILOT_INSTRUCTIONS);
      
      spinner.succeed('Project VS Code configuration created');
      console.log(chalk.gray('  Files: .vscode/settings.json, .vscode/extensions.json'));
      console.log(chalk.gray('  Copilot: .github/copilot-instructions.md\n'));
    } catch (error) {
      spinner.fail('Failed to set up VS Code configuration');
      console.error(chalk.red(error.message));
    }
  }

  console.log(chalk.green('✅ VS Code setup complete!\n'));
  console.log(chalk.gray('Restart VS Code to apply changes\n'));
}

module.exports = vscodeCommand;
