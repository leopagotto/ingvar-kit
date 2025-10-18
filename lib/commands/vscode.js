const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const ora = require('ora');

const COPILOT_INSTRUCTIONS = `\`\`\`instructions
# GitHub Copilot Instructions - OSP Workflow

## Core Principles
- Always prioritize usability, clarity, and aesthetics
- Favor clean, minimal, and modern design patterns
- Write complete, working solutions
- Follow accessibility guidelines (WCAG 2.1 AA)
- Default to mobile-first responsive layouts

## GitHub Projects Workflow (MANDATORY)
**All work must be tracked in GitHub Projects.**

### Before Starting Work
1. Check project board
2. Verify issue exists
3. Update status to "In Progress"

### Creating Issues
- ALWAYS create GitHub Issue first
- Use proper labels (P0/P1/P2/P3)
- Add to project board immediately
- Include acceptance criteria

### During Development
- Reference issues in commits: "Fixes #X"
- Update progress frequently
- Check off tasks as completed

### When Completing
- Mark all tasks complete
- Close issue (auto-moves to Done)
- Update related issues

## Documentation Organization
- All docs in \`docs/\` folder
- Never create markdown in root (except README.md)
- Use proper structure: guides/, setup/, development/, archive/

## Code Quality Standards
- Tests for all new features
- No linting errors
- Proper error handling
- Clear variable names
- Comments for complex logic

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
