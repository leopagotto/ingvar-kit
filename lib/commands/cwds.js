#!/usr/bin/env node

const chalk = require('chalk');
const ora = require('ora');
const { CWDSInstaller } = require('../components/cwds-installer');

/**
 * CWDS Command - Install Co-Worker Design Subsystem components
 *
 * Usage:
 *   ingvar cwds install           # Interactive installation
 *   ingvar cwds install --auto    # Auto-install recommended components
 *   ingvar cwds list              # List available components
 */

async function cwdsCommand(action = 'install', options = {}) {
  if (action === 'list') {
    // List available CWDS components
    console.log(chalk.cyan.bold('\n🏢 Co-Worker Design Subsystem Components\n'));

    const { CWDS_COMPONENTS } = require('../components/cwds-installer');

    Object.keys(CWDS_COMPONENTS).forEach(categoryKey => {
      const components = CWDS_COMPONENTS[categoryKey];
      if (components.length > 0) {
        console.log(chalk.yellow(`\n${components[0].category}:`));
        components.forEach(comp => {
          console.log(chalk.white(`  ${comp.label}`));
          console.log(chalk.gray(`    ${comp.description}`));
          console.log(chalk.gray(`    Package: ${comp.package}`));
        });
      }
    });

    console.log(chalk.cyan('\n📚 Documentation:'));
    console.log(chalk.gray('  https://skapa.ikea.com/subsystems/cwds'));
    console.log(chalk.gray('  See also: docs/development/CWDS_COWORKER_DESIGN_SYSTEM.md\n'));

    return;
  }

  if (action === 'install') {
    const installer = new CWDSInstaller();

    if (options.auto) {
      // Auto-install recommended components
      console.log(chalk.cyan.bold('\n🏢 Auto-installing CWDS components...\n'));

      installer.selectedComponents = [
        'cwds-react-layout',
        'iloff-layout-react',
        'cwds-react-header',
        'cwds-react-app-switcher',
        'cwds-react-mobile-navigation',
        'cwds-react-nav-menu',
        'cwds-react-user-profile',
        'cwds-variables'
      ];
      installer.authProvider = 'auth0';

      await installer.install();
    } else {
      // Interactive selection
      await installer.selectComponents();
      await installer.install();
    }

    return;
  }

  console.log(chalk.red('\n❌ Unknown action: ' + action));
  console.log(chalk.yellow('\nUsage:'));
  console.log(chalk.gray('  ingvar cwds install          # Interactive installation'));
  console.log(chalk.gray('  ingvar cwds install --auto   # Auto-install recommended'));
  console.log(chalk.gray('  ingvar cwds list             # List components\n'));
}

module.exports = cwdsCommand;
