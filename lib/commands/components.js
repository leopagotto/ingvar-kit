#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

/**
 * Components Command
 * Install pre-built IKEA Ingka Skapa design system components
 */

async function componentsCommand(options = {}) {
  console.log(chalk.blue.bold('\n🎨 Ingvar Kit - Component Installer\n'));

  // Check if in project directory
  if (!fs.existsSync('package.json')) {
    console.error(chalk.red('❌ No package.json found. Please run this command in your project root.'));
    process.exit(1);
  }

  const action = options.action || await promptAction();

  switch (action) {
    case 'install':
      await installComponents(options);
      break;
    case 'list':
      await listComponents();
      break;
    case 'update':
      await updateComponents();
      break;
    default:
      console.error(chalk.red('❌ Invalid action'));
      process.exit(1);
  }
}

async function promptAction() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        { name: '📦 Install IKEA components to project', value: 'install' },
        { name: '📋 List available components', value: 'list' },
        { name: '🔄 Update existing components', value: 'update' }
      ]
    }
  ]);

  return action;
}

async function installComponents(options = {}) {
  console.log(chalk.blue('📦 Installing IKEA Ingka Skapa components...\n'));

  // Detect framework
  const packageJson = await fs.readJson('package.json');
  const hasReact = packageJson.dependencies?.react || packageJson.devDependencies?.react;
  const hasVue = packageJson.dependencies?.vue || packageJson.devDependencies?.vue;

  if (!hasReact && !hasVue) {
    console.error(chalk.red('❌ No React or Vue detected in package.json'));
    console.log(chalk.yellow('💡 Install React first: npm install react react-dom'));
    process.exit(1);
  }

  // Use provided options or prompt
  let answers;

  if (options.nonInteractive) {
    // Non-interactive mode: use defaults from options
    answers = {
      components: options.components || ['button', 'card', 'input'],
      outputDir: options.outputDir || 'src/components/ingka',
      installDesignTokens: options.installDesignTokens !== false,
      installTailwindConfig: options.installTailwindConfig !== false
    };
  } else {
    // Interactive mode: prompt user
    answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'components',
        message: 'Select components to install:',
        choices: [
          { name: '🔘 Button (Primary, Secondary, Outline, Ghost variants)', value: 'button', checked: true },
          { name: '🗂️  Card (Product cards, content cards)', value: 'card', checked: true },
          { name: '📝 Input (Text input with validation)', value: 'input', checked: true },
          { name: '📊 All components (Button, Card, Input)', value: 'all', checked: false }
        ]
      },
      {
        type: 'input',
        name: 'outputDir',
        message: 'Where should components be installed?',
        default: options.outputDir || 'src/components/ingka',
        validate: (input) => input.length > 0
      },
      {
        type: 'confirm',
        name: 'installDesignTokens',
        message: 'Install design tokens (colors, spacing, typography)?',
        default: true
      },
      {
        type: 'confirm',
        name: 'installTailwindConfig',
        message: 'Generate Tailwind config with IKEA colors?',
        default: true,
        when: (answers) => packageJson.dependencies?.tailwindcss || packageJson.devDependencies?.tailwindcss
      }
    ]);
  }

  // Determine which components to install
  let componentsToInstall = answers.components;
  if (componentsToInstall.includes('all')) {
    componentsToInstall = ['button', 'card', 'input'];
  }

  const outputDir = path.join(process.cwd(), answers.outputDir);

  // Create output directory
  await fs.ensureDir(outputDir);

  // Get templates directory
  const templatesDir = path.join(__dirname, '../../templates/ingka-components');

  // Install selected components
  let installed = [];
  for (const component of componentsToInstall) {
    const componentName = component.charAt(0).toUpperCase() + component.slice(1);
    const sourcePath = path.join(templatesDir, componentName);
    const destPath = path.join(outputDir, componentName);

    if (fs.existsSync(sourcePath)) {
      await fs.copy(sourcePath, destPath);
      installed.push(componentName);
      console.log(chalk.green(`   ✓ ${componentName} installed`));
    }
  }

  // Install design tokens
  if (answers.installDesignTokens) {
    const tokensSource = path.join(__dirname, '../ai/ikea-design-system.js');
    const tokensDest = path.join(outputDir, 'design-tokens.js');
    await fs.copy(tokensSource, tokensDest);
    console.log(chalk.green('   ✓ Design tokens installed'));
  }

  // Generate Tailwind config
  if (answers.installTailwindConfig) {
    await generateTailwindConfig();
    console.log(chalk.green('   ✓ Tailwind config generated'));
  }

  // Create index file for easy imports
  await createIndexFile(outputDir, installed);
  console.log(chalk.green('   ✓ Index file created'));

  // Success message
  console.log(chalk.green.bold('\n✅ IKEA components installed successfully!\n'));

  // Usage instructions
  console.log(chalk.blue('📖 Usage:\n'));
  console.log(chalk.gray('Import components in your React files:\n'));

  const relativeImport = answers.outputDir.replace('src/', '');
  console.log(chalk.cyan(`import { Button, Card, Input } from '${relativeImport}';`));
  console.log(chalk.cyan(`import { IKEA_COLORS, IKEA_SPACING } from '${relativeImport}/design-tokens';\n`));

  console.log(chalk.gray('Use in your components:\n'));
  console.log(chalk.cyan(`<Button variant="primary" size="medium">Add to Cart</Button>`));
  console.log(chalk.cyan(`<Card>\n  <Card.Header>Product Name</Card.Header>\n  <Card.Content>Description</Card.Content>\n</Card>\n`));

  // Next steps
  console.log(chalk.yellow('🚀 Next steps:\n'));
  console.log(chalk.gray('1. Import components in your pages'));
  console.log(chalk.gray('2. Customize components as needed (you own the code!)'));
  console.log(chalk.gray('3. Run: ingvar components update (to get latest versions)'));
  console.log(chalk.gray('4. Enable AI instructions: Add IKEA specs to .github/copilot-instructions.md\n'));
}

async function listComponents() {
  console.log(chalk.blue.bold('📋 Available IKEA Components:\n'));

  const templatesDir = path.join(__dirname, '../../templates/ingka-components');
  const components = await fs.readdir(templatesDir);

  const componentInfo = {
    'Button': {
      variants: 'Primary, Secondary, Outline, Ghost',
      sizes: 'Small, Medium, Large',
      features: 'Loading state, Disabled state, Icons, Accessible'
    },
    'Card': {
      variants: 'Default, Elevated, Outlined',
      subComponents: 'Header, Content, Footer, Title, Description',
      features: 'Clickable, Images, Responsive, Shadows'
    },
    'Input': {
      types: 'Text, Email, Password, Number',
      features: 'Validation, Error messages, Icons, Labels, Helper text',
      validation: 'Built-in validation rules'
    }
  };

  for (const component of components) {
    if (fs.statSync(path.join(templatesDir, component)).isDirectory()) {
      console.log(chalk.green.bold(`\n🎨 ${component}`));

      const info = componentInfo[component];
      if (info) {
        for (const [key, value] of Object.entries(info)) {
          console.log(chalk.gray(`   ${key}: ${value}`));
        }
      }

      // Check if component files exist
      const componentPath = path.join(templatesDir, component);
      const files = await fs.readdir(componentPath);
      console.log(chalk.gray(`   Files: ${files.join(', ')}`));
    }
  }

  console.log(chalk.blue.bold('\n📦 Installation:\n'));
  console.log(chalk.gray('Install components: ') + chalk.cyan('ingvar components install'));
  console.log(chalk.gray('Install specific: ') + chalk.cyan('ingvar components install --components button,card\n'));
}

async function updateComponents() {
  console.log(chalk.blue('🔄 Updating IKEA components...\n'));

  // Find installed components
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'componentsDir',
      message: 'Where are components currently installed?',
      default: 'src/components/ingka'
    },
    {
      type: 'confirm',
      name: 'confirmUpdate',
      message: chalk.yellow('⚠️  This will overwrite existing components. Continue?'),
      default: false
    }
  ]);

  if (!answers.confirmUpdate) {
    console.log(chalk.yellow('Update cancelled.'));
    return;
  }

  const componentsDir = path.join(process.cwd(), answers.componentsDir);

  if (!fs.existsSync(componentsDir)) {
    console.error(chalk.red(`❌ Components directory not found: ${componentsDir}`));
    process.exit(1);
  }

  // Find which components exist
  const existingComponents = await fs.readdir(componentsDir);
  const templatesDir = path.join(__dirname, '../../templates/ingka-components');

  let updated = [];
  for (const component of existingComponents) {
    const sourcePath = path.join(templatesDir, component);
    const destPath = path.join(componentsDir, component);

    if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isDirectory()) {
      await fs.copy(sourcePath, destPath, { overwrite: true });
      updated.push(component);
      console.log(chalk.green(`   ✓ ${component} updated`));
    }
  }

  console.log(chalk.green.bold(`\n✅ Updated ${updated.length} components!\n`));
}

async function createIndexFile(outputDir, components) {
  const indexContent = `/**
 * IKEA Ingka Skapa Design System Components
 *
 * Auto-generated by Ingvar Kit
 * https://github.com/leopagotto/ingvar-kit
 */

${components.map(comp => `export { default as ${comp} } from './${comp}/${comp}';`).join('\n')}

// Design tokens
export * from './design-tokens';
`;

  await fs.writeFile(path.join(outputDir, 'index.js'), indexContent);
}

async function generateTailwindConfig() {
  const { generateIkeaTailwindConfig } = require('../ai/ikea-design-system');
  const config = generateIkeaTailwindConfig();

  const configPath = path.join(process.cwd(), 'tailwind.config.js');

  if (fs.existsSync(configPath)) {
    console.log(chalk.yellow('   ⚠️  tailwind.config.js already exists. Backing up to tailwind.config.backup.js'));
    await fs.copy(configPath, 'tailwind.config.backup.js');
  }

  const configContent = `/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(config, null, 2)};
`;

  await fs.writeFile(configPath, configContent);
}

module.exports = componentsCommand;
