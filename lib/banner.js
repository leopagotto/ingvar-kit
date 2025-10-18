const chalk = require('chalk');

// Function to create the main banner
function getBanner() {
  return `
${chalk.yellow('                    .-"""""-.')}
${chalk.yellow("                  .'       '.")}
${chalk.yellow('                 /')}     🦁     ${chalk.yellow('\\')}
${chalk.yellow('                ;             ;')}
${chalk.yellow('                |             |')}
${chalk.yellow('                ;             ;')}
${chalk.yellow('                 \\           /')}
${chalk.yellow("                  '.       .'")}
${chalk.yellow('                    ~-...-~')}

${chalk.cyan.bold('     ╦   ╔═╗╔═╗  ')}${chalk.white('╦ ╦╔═╗╦═╗╦╔═╔═╗╦  ╔═╗╦ ╦')}
${chalk.cyan.bold('     ║   ║╣ ║ ║  ')}${chalk.white('║║║║ ║╠╦╝╠╩╗╠╣ ║  ║ ║║║║')}
${chalk.cyan.bold('     ╩═╝ ╚═╝╚═╝  ')}${chalk.white('╚╩╝╚═╝╩╚═╩ ╩╚  ╩═╝╚═╝╚╩╝')}
${chalk.cyan.bold('     ╦╔═╦╔╦╗     ')}${chalk.gray('Spec-Driven Development Made Easy')}
${chalk.cyan.bold('     ╠╩╗║ ║')}
${chalk.cyan.bold('     ╩ ╩╩ ╩')}
`;
}

// Compact banner for smaller displays
function getCompactBanner() {
  return `
${chalk.yellow('    🦁')}  ${chalk.cyan.bold('LEO')} ${chalk.white('WORKFLOW KIT')}
    ${chalk.gray('Spec-Driven Development Made Easy')}
`;
}

// Welcome message for installation
function getWelcomeMessage() {
  return `
${chalk.yellow('    ═══════════════════════════════════════════════════')}
${chalk.yellow('    ')}
${chalk.yellow('             🦁  ')}${chalk.cyan.bold('LEO WORKFLOW KIT')}${chalk.yellow('  🦁')}
${chalk.yellow('    ')}
${chalk.yellow('    ═══════════════════════════════════════════════════')}

    ${chalk.green('✨ Successfully installed LEO Workflow Kit! ✨')}

    ${chalk.cyan.bold('Quick Start:')}
    
    ${chalk.white('1.')} Navigate to your project:
       ${chalk.gray('cd your-project')}

    ${chalk.white('2.')} Initialize LEO workflow:
       ${chalk.yellow('leo init')}

    ${chalk.white('3.')} Create your first issue:
       ${chalk.yellow('leo issue')}

    ${chalk.cyan.bold('Available Commands:')}
    
       ${chalk.yellow('leo init')}      ${chalk.gray('→')} Set up workflow in project
       ${chalk.yellow('leo issue')}     ${chalk.gray('→')} Create spec-driven issue
       ${chalk.yellow('leo labels')}    ${chalk.gray('→')} Configure GitHub labels
       ${chalk.yellow('leo vscode')}    ${chalk.gray('→')} Set up VS Code config
       ${chalk.yellow('leo status')}    ${chalk.gray('→')} Check setup status
       ${chalk.yellow('leo docs')}      ${chalk.gray('→')} Open documentation

    ${chalk.cyan.bold('Documentation:')}
    ${chalk.blue.underline('https://github.com/osp-group/leo-workflow-kit#readme')}

    ${chalk.green('Happy coding with LEO! 🚀')}

${chalk.yellow('    ═══════════════════════════════════════════════════')}
`;
}

// Small inline logo for command outputs
const smallLogo = chalk.yellow('🦁');

// Get appropriate banner based on terminal width
function getResponsiveBanner() {
  const terminalWidth = process.stdout.columns || 80;
  return terminalWidth < 70 ? getCompactBanner() : getBanner();
}

// Export all banners
module.exports = {
  banner: getBanner(),
  compactBanner: getCompactBanner(),
  welcomeMessage: getWelcomeMessage(),
  smallLogo,
  getBanner: getResponsiveBanner
};
