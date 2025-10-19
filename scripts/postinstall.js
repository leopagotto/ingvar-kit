#!/usr/bin/env node

const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

// Determine if this is a global or local install
const isGlobalInstall = () => {
  const npmPrefix = process.env.npm_config_prefix || '';
  const localPath = process.env.npm_config_local_prefix || '';
  return npmPrefix && localPath && npmPrefix !== localPath;
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
${chalk.yellow('║')}                    ${chalk.gray('Version 2.1.0')}                            ${chalk.yellow('║')}
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
  
  // Create a marker file to indicate successful installation
  const homeDir = require('os').homedir();
  const configDir = path.join(homeDir, '.leo-workflow');
  
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const installFile = path.join(configDir, '.last-install');
  fs.writeFileSync(installFile, JSON.stringify({
    version: '2.0.3',
    installedAt: new Date().toISOString(),
    installType: isGlobalInstall() ? 'global' : 'local'
  }, null, 2));
  
} catch (error) {
  // Silently fail if there are issues (e.g., during npm publish)
  console.error('Note: Could not complete post-install setup, but the CLI should still work.');
}
