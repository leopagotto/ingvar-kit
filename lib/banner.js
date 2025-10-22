const chalk = require('chalk');
const path = require('path');

// Read version from package.json
const getVersion = () => {
  try {
    const packageJson = require(path.join(__dirname, '../package.json'));
    return packageJson.version;
  } catch (error) {
    return '2.6.2'; // Fallback version
  }
};

// Helper function to center text within a given width
const centerText = (text, width) => {
  const strippedLength = text.replace(/\u001b\[[0-9;]*m/g, '').length; // Remove ANSI codes for length calculation
  const totalPadding = width - strippedLength;
  const leftPadding = Math.floor(totalPadding / 2);
  const rightPadding = totalPadding - leftPadding;
  return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
};

// Function to create the main banner with gradient-like effects (IKEA Blue & Yellow)
function getBanner() {
  const version = getVersion();
  const versionText = `Version ${version}  •  Inspired by Ingvar Kamprad & Ingka Way of Working`;

  return `
${chalk.hex('#0051BA')('     ██╗███╗   ██╗ ██████╗ ██╗   ██╗ █████╗ ██████╗         ██╗  ██╗██╗████████╗')}
${chalk.hex('#0058D6')('     ██║████╗  ██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗        ██║ ██╔╝██║╚══██╔══╝')}
${chalk.hex('#0066FF')('     ██║██╔██╗ ██║██║  ███╗██║   ██║███████║██████╔╝        █████╔╝ ██║   ██║   ')}
${chalk.hex('#FFCC00')('     ██║██║╚██╗██║██║   ██║╚██╗ ██╔╝██╔══██║██╔══██╗        ██╔═██╗ ██║   ██║   ')}
${chalk.hex('#FFDB00')('     ██║██║ ╚████║╚██████╔╝ ╚████╔╝ ██║  ██║██║  ██║███████╗██║  ██╗██║   ██║   ')}
${chalk.hex('#FFE44D')('     ╚═╝╚═╝  ╚═══╝ ╚═════╝   ╚═══╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝   ╚═╝   ')}

${centerText(chalk.hex('#0051BA')('�  Ingka GitHub Workflow Automation Toolkit  🇸🇪'), 87)}

${centerText(chalk.white('⚡ Initialize  •  🎯 Issues  •  📋 Labels  •  🔄 Automation  •  🛠️ Ingka Way'), 87)}

${centerText(chalk.gray(versionText), 87)}
`;
}// Compact banner for smaller displays
function getCompactBanner() {
  return `
${chalk.hex('#0051BA')('    �')}  ${chalk.hex('#0051BA').bold('INGVAR-KIT')} ${chalk.hex('#FFDB00')('🇸🇪')}
    ${chalk.gray('Ingka GitHub Workflow Automation Toolkit')}
`;
}

// Welcome message for installation
function getWelcomeMessage() {
  return `
${chalk.hex('#0051BA')('    ╔═══════════════════════════════════════════════════════════════╗')}
${chalk.hex('#0051BA')('    ║                                                               ║')}
${chalk.hex('#0051BA')('    ║              ')}${chalk.hex('#FFDB00')('�  ')}${chalk.hex('#0051BA').bold('INGVAR-KIT')}${chalk.hex('#FFDB00')('  🇸🇪')}${chalk.hex('#0051BA')('                    ║')}
${chalk.hex('#0051BA')('    ║                                                               ║')}
${chalk.hex('#0051BA')('    ║')}        ${chalk.white.bold('Ingka GitHub Workflow Automation Toolkit')}         ${chalk.hex('#0051BA')('║')}
${chalk.hex('#0051BA')('    ║                                                               ║')}
${chalk.hex('#0051BA')('    ╚═══════════════════════════════════════════════════════════════╝')}

    ${chalk.green.bold('✨ Successfully installed Ingvar Workflow Kit! ✨')}

    ${chalk.white('Transform your development workflow with Ingka Way of Working:')}
    ${chalk.hex('#0051BA')('  •')} ${chalk.white('Spec-driven development methodology')}
    ${chalk.hex('#FFDB00')('  •')} ${chalk.white('Automated GitHub Projects integration')}
    ${chalk.hex('#0051BA')('  •')} ${chalk.white('Comprehensive issue templates')}
    ${chalk.hex('#FFDB00')('  •')} ${chalk.white('Smart label management')}
    ${chalk.hex('#0051BA')('  •')} ${chalk.white('VS Code Copilot integration')}

${chalk.hex('#0051BA')('    ═══════════════════════════════════════════════════════════════')}

    ${chalk.hex('#0051BA').bold('🚀 Quick Start Guide:')}

    ${chalk.white.bold('Step 1:')} Navigate to your project
       ${chalk.gray('$')} ${chalk.hex('#FFDB00')('cd your-project')}

    ${chalk.white.bold('Step 2:')} Initialize Ingvar workflow (one-time setup)
       ${chalk.gray('$')} ${chalk.hex('#FFDB00')('ingvar init')}
       ${chalk.gray('   → Sets up docs, templates, labels, and VS Code config')}

    ${chalk.white.bold('Step 3:')} Create your first spec-driven issue
       ${chalk.gray('$')} ${chalk.hex('#FFDB00')('ingvar issue')}
       ${chalk.gray('   → Choose from 8 professional templates')}

${chalk.hex('#0051BA')('    ═══════════════════════════════════════════════════════════════')}

    ${chalk.hex('#0051BA').bold('📦 Available Commands:')}

       ${chalk.hex('#FFDB00').bold('ingvar init')}        ${chalk.gray('→')} ${chalk.white('Set up complete workflow in current project')}
       ${chalk.hex('#FFDB00').bold('ingvar issue')}       ${chalk.gray('→')} ${chalk.white('Create spec-driven issue from templates')}
       ${chalk.hex('#FFDB00').bold('ingvar labels')}      ${chalk.gray('→')} ${chalk.white('Configure GitHub labels (P0-P3, types, status)')}
       ${chalk.hex('#FFDB00').bold('ingvar vscode')}      ${chalk.gray('→')} ${chalk.white('Install VS Code Copilot instructions')}
       ${chalk.hex('#FFDB00').bold('ingvar status')}      ${chalk.gray('→')} ${chalk.white('Check workflow setup status')}
       ${chalk.hex('#FFDB00').bold('ingvar docs')}        ${chalk.gray('→')} ${chalk.white('Open documentation in browser')}

    ${chalk.gray('Aliases:')} ${chalk.hex('#FFDB00')('ingvar i')} ${chalk.gray('(issue),')} ${chalk.hex('#FFDB00')('ingvar l')} ${chalk.gray('(labels),')} ${chalk.hex('#FFDB00')('ingvar vs')} ${chalk.gray('(vscode),')} ${chalk.hex('#FFDB00')('ingvar s')} ${chalk.gray('(status)')}

${chalk.hex('#0051BA')('    ═══════════════════════════════════════════════════════════════')}

    ${chalk.hex('#0051BA').bold('📚 Learn More:')}

    ${chalk.white('Documentation:')} ${chalk.blue.underline('https://github.com/ingka-group/ingvar-kit#readme')}
    ${chalk.white('Report Issues:  ')} ${chalk.blue.underline('https://github.com/ingka-group/ingvar-kit/issues')}
    ${chalk.white('Ingka Digital:  ')} ${chalk.blue.underline('https://www.ingka.com')}

${chalk.hex('#0051BA')('    ═══════════════════════════════════════════════════════════════')}

    ${chalk.green.bold('🎉 Ready to streamline your workflow!')} ${chalk.gray('Start with')} ${chalk.hex('#FFDB00')('ingvar init')}

`;
}

// Small inline logo for command outputs
const smallLogo = chalk.hex('#0051BA')('�');

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
