#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

// Determine if this is a global or local install
const isGlobalInstall = () => {
  const npmPrefix = process.env.npm_config_prefix || '';
  const localPath = process.env.npm_config_local_prefix || '';
  return npmPrefix && localPath && npmPrefix !== localPath;
};

// Check if we're in a git repository
const isGitRepo = () => {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

// Check if LEO is already initialized
const isLeoInitialized = () => {
  return fs.existsSync('.github/ISSUE_TEMPLATE') ||
         fs.existsSync('docs/specs') ||
         fs.existsSync('.github/copilot-instructions.md');
};

const simpleMessage = `
${chalk.yellow('╔═══════════════════════════════════════════════════════════════════╗')}
${chalk.yellow('║')}                                                                   ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('██╗     ███████╗ ██████╗         ██╗  ██╗██╗████████╗')}  ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('██║     ██╔════╝██╔═══██╗        ██║ ██╔╝██║╚══██╔══╝')}  ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('██║     █████╗  ██║   ██║        █████╔╝ ██║   ██║   ')}  ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('██║     ██╔══╝  ██║   ██║        ██╔═██╗ ██║   ██║   ')}  ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('███████╗███████╗╚██████╔╝███████╗██║  ██╗██║   ██║   ')}  ${chalk.yellow('║')}
${chalk.yellow('║')}  ${chalk.yellow('╚══════╝╚══════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝   ')}  ${chalk.yellow('║')}
${chalk.yellow('║')}                                                                   ${chalk.yellow('║')}
${chalk.yellow('║')}         ${chalk.cyan('🦁  GitHub Workflow Automation Toolkit  🦁')}         ${chalk.yellow('║')}
${chalk.yellow('║')}                    ${chalk.gray('Version 2.2.0')}                            ${chalk.yellow('║')}
${chalk.yellow('║')}                                                                   ${chalk.yellow('║')}
${chalk.yellow('╚═══════════════════════════════════════════════════════════════════╝')}

${chalk.green.bold('✨ Installation Complete! ✨')}

${chalk.white('Transform your development workflow with:')}
  ${chalk.cyan('•')} Spec-driven development methodology
  ${chalk.blue('•')} Automated GitHub Projects integration
  ${chalk.magenta('•')} Comprehensive issue & PR templates
  ${chalk.cyan('•')} Smart label management
  ${chalk.blue('•')} Enhanced Copilot instructions

${chalk.yellow('─────────────────────────────────────────────────────────────────────')}

${chalk.cyan.bold('🚀 Quick Start:')}

  ${chalk.white.bold('1.')} ${chalk.yellow('leo --version')}        ${chalk.gray('→ Verify installation')}
  ${chalk.white.bold('2.')} ${chalk.yellow('leo welcome')}          ${chalk.gray('→ View complete guide')}
  ${chalk.white.bold('3.')} ${chalk.yellow('cd your-project')}      ${chalk.gray('→ Navigate to project')}
  ${chalk.white.bold('4.')} ${chalk.yellow('leo init')}             ${chalk.gray('→ Initialize workflow')}

${chalk.yellow('─────────────────────────────────────────────────────────────────────')}

${chalk.gray('📚 Documentation:')} ${chalk.blue.underline('https://github.com/leonpagotto/leo-kit')}
`;

try {
  // Always show installation message
  console.log(simpleMessage);

  const isGlobal = isGlobalInstall();
  const inGitRepo = isGitRepo();
  const alreadyInitialized = isLeoInitialized();

  // Create a marker file to indicate successful installation
  const homeDir = require('os').homedir();
  const configDir = path.join(homeDir, '.leo-workflow');

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  const installFile = path.join(configDir, '.last-install');
  fs.writeFileSync(installFile, JSON.stringify({
    version: '2.2.0',
    installedAt: new Date().toISOString(),
    installType: isGlobal ? 'global' : 'local'
  }, null, 2));

  // Handle local install in a git repository
  if (!isGlobal && inGitRepo && !alreadyInitialized) {
    console.log(chalk.cyan.bold('\n🎯 Quick Setup Available!\n'));
    console.log(chalk.white('You installed LEO locally in a git repository.'));
    console.log(chalk.white('Would you like to initialize the workflow now?\n'));
    console.log(chalk.gray('This will set up:'));
    console.log(chalk.gray('  • Documentation structure (docs/specs/)'));
    console.log(chalk.gray('  • Issue & PR templates'));
    console.log(chalk.gray('  • GitHub Actions workflows'));
    console.log(chalk.gray('  • VS Code configuration'));
    console.log(chalk.gray('  • Copilot instructions'));
    console.log(chalk.gray('  • GitHub labels\n'));
    console.log(chalk.yellow('Run: ') + chalk.cyan.bold('npx leo init') + chalk.yellow(' (or leo init if installed globally)\n'));
    console.log(chalk.gray('Or set LEO_AUTO_INIT=true before npm install to auto-initialize\n'));
  } else if (!isGlobal && inGitRepo && alreadyInitialized) {
    console.log(chalk.green('\n✅ LEO Workflow already initialized in this project!\n'));
    console.log(chalk.gray('Run ') + chalk.cyan('npx leo status') + chalk.gray(' to check your workflow\n'));
  } else if (isGlobal) {
    // Global install - show standard message (already shown above)
  } else if (!inGitRepo) {
    console.log(chalk.yellow('\n⚠️  Not in a git repository'));
    console.log(chalk.gray('Navigate to your project and run: ') + chalk.cyan('leo init\n'));
  }

} catch (error) {
  // Silently fail if there are issues (e.g., during npm publish)
  console.error(chalk.yellow('Note: Could not complete post-install setup, but the CLI should still work.'));
}
