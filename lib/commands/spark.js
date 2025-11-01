#!/usr/bin/env node

const { Command } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');
const { execSync } = require('child_process');

const { generateWithAI } = require('../ai/code-generator');
const { banner } = require('../banner');
const { detectIntent } = require('../ai/natural-language-detector');
const {
  generateIkeaTailwindConfig,
  generateIkeaComponentCSS,
  IKEA_DESIGN_TOKENS
} = require('../ai/ikea-design-system');

const program = new Command();

/**
 * Ingvar Spark - Rapid App Generation
 *
 * Generate complete React apps from a single prompt using:
 * - GitHub Spark template (React + TypeScript + Vite)
 * - shadcn/ui components (40+ pre-built components)
 * - Ingvar AI code generation
 * - Modern tooling (Tailwind CSS v4, Framer Motion, etc.)
 */

program
  .name('spark')
  .description('🚀 Generate complete React apps from a single prompt using Spark template + Ingvar AI')
  .version('1.0.0');

program
  .command('create')
  .alias('c')
  .description('Create a new app from a prompt')
  .option('-p, --prompt <text>', 'Describe the app you want to build')
  .option('-n, --name <name>', 'App name (will be slugified)')
  .option('-d, --dir <directory>', 'Output directory', './spark-apps')
  .option('--ikea', 'Use IKEA Ingka Skapa design system (customer-facing)')
  .option('--cwds', 'Add CWDS components (for internal co-worker tools, extends Ingka Skapa)')
  .option('--no-install', 'Skip npm install')
  .option('--no-start', 'Skip starting dev server')
  .action(async (options) => {
    console.clear();
    banner();

    console.log(chalk.cyan('🚀 Ingvar Spark - Rapid App Generator\n'));
    console.log(chalk.blue('ℹ️  Generate React apps with IKEA Ingka Skapa Design System\n'));
    console.log(chalk.gray('   • Ingka Skapa (75+ components) - Customer-facing apps'));
    console.log(chalk.gray('   • Optional: Add CWDS (10+ components) for internal co-worker tools\n'));

    try {
      // Detect natural language intent if prompt looks like natural language
      if (options.prompt && !options.name) {
        const intent = await detectIntent(options.prompt);
        if (intent.type === 'app_creation' && intent.confidence > 0.7) {
          console.log(chalk.green('🧠 Natural language detected:'), intent.description);
          if (intent.appName) {
            options.name = intent.appName;
            console.log(chalk.blue('📛 Auto-detected app name:'), intent.appName);
          }
        }
      }

      // Get user input
      const answers = await getAppRequirements(options);

      // Generate app
      await generateSparkApp(answers);

    } catch (error) {
      console.error(chalk.red('❌ Error creating Spark app:'), error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .alias('ls')
  .description('List available templates and components')
  .action(async () => {
    console.clear();
    banner();

    console.log(chalk.cyan('📦 Available Spark Resources\n'));

    // List UI components
    console.log(chalk.yellow('🎨 UI Components (40+ available):'));
    const components = [
      'Button', 'Card', 'Dialog', 'Form', 'Input', 'Table', 'Chart',
      'Navigation', 'Accordion', 'Alert', 'Avatar', 'Badge', 'Calendar',
      'Carousel', 'Checkbox', 'Command', 'Dropdown', 'Progress', 'Tabs',
      'Tooltip', 'Sidebar', 'Sheet', 'Select', 'Slider', 'Switch', 'and more...'
    ];

    console.log(components.map(c => `  • ${c}`).join('\n'));

    console.log(chalk.yellow('\n⚡ Features:'));
    console.log('  • React 19 + TypeScript');
    console.log('  • Vite (lightning fast)');
    console.log('  • Tailwind CSS v4');
    console.log('  • shadcn/ui components');
    console.log('  • Framer Motion animations');
    console.log('  • Form handling (react-hook-form)');
    console.log('  • State management (@tanstack/react-query)');
    console.log('  • Icons (Lucide, Heroicons, Phosphor)');
    console.log('  • Charts (Recharts)');
    console.log('  • 3D graphics (Three.js)');

    console.log(chalk.yellow('\n🎨 Design Systems:'));
    console.log('  • Default (shadcn/ui)');
    console.log('  • 🇸🇪 IKEA (Swedish minimalist with blue/yellow)');

    console.log(chalk.green('\n✨ Example prompts:'));
    console.log('  • "Create a todo app with dark mode"');
    console.log('  • "Build a dashboard with charts and tables"');
    console.log('  • "Make a landing page with hero section and pricing"');
    console.log('  • "Create a blog with markdown support"');
    console.log('  • "Build an e-commerce product catalog"');

    console.log(chalk.blue('\n🚀 Natural Language Support:'));
    console.log('  • "create an app for managing tasks"');
    console.log('  • "build me a portfolio website"');
    console.log('  • "make a dashboard for analytics"');
    console.log('  • "generate an app for tracking expenses"');

    console.log(chalk.yellow('\n💡 Pro Tips:'));
    console.log('  • Use --ikea flag for Swedish minimalist design');
    console.log('  • Natural language detection works automatically');
    console.log('  • Apps are production-ready with modern tooling');
  });

async function getAppRequirements(options) {
  const questions = [];

  if (!options.prompt) {
    questions.push({
      type: 'input',
      name: 'prompt',
      message: '🎯 Describe the app you want to build:',
      validate: input => input.length > 10 || 'Please provide a more detailed description (at least 10 characters)'
    });
  }

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: '📛 App name:',
      default: (answers) => generateAppName(answers.prompt || options.prompt),
      validate: input => /^[a-zA-Z0-9-_]+$/.test(input) || 'Name must contain only letters, numbers, hyphens, and underscores'
    });
  }

  // Ask about IKEA Ingka Skapa design system if not specified
  if (!options.ikea) {
    questions.push({
      type: 'confirm',
      name: 'useIkea',
      message: '🇸🇪 Use IKEA Ingka Skapa design system? (75+ components, customer-facing apps)',
      default: true
    });
  }

  // Ask about CWDS if using Ingka Skapa
  const willUseIkea = options.ikea || (questions.length === 0 && !options.ikea);
  if (willUseIkea && !options.cwds) {
    questions.push({
      type: 'confirm',
      name: 'useCwds',
      message: '🏢 Add CWDS components? (For internal co-worker tools, extends Ingka Skapa)',
      default: false,
      when: (answers) => options.ikea || answers.useIkea
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    prompt: options.prompt || answers.prompt,
    name: options.name || answers.name,
    directory: options.dir || './spark-apps',
    useIkea: options.ikea || answers.useIkea || false,
    useCwds: options.cwds || answers.useCwds || false,
    install: options.install !== false,
    start: options.start !== false
  };
}

function generateAppName(prompt) {
  // Extract key words and create a name
  const words = prompt.toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2)
    .slice(0, 3);

  return words.join('-') || 'spark-app';
}

async function generateSparkApp(config) {
  const { prompt, name, directory, useIkea, useCwds, install, start } = config;

  console.log(chalk.blue('🔧 Setting up Spark app...\n'));

  if (useIkea && useCwds) {
    console.log(chalk.yellow('🇸🇪 Using IKEA Ingka Skapa + CWDS (Internal co-worker tools)'));
  } else if (useIkea) {
    console.log(chalk.yellow('🇸🇪 Using IKEA Ingka Skapa Design System (Customer-facing)'));
  }

  // 1. Copy template
  const templatePath = path.join(__dirname, '../../template-main');
  const appPath = path.join(process.cwd(), directory, name);

  console.log(`📁 Creating app directory: ${chalk.cyan(appPath)}`);
  await fs.ensureDir(appPath);
  await fs.copy(templatePath, appPath);

  // 2. Update package.json
  console.log('📦 Updating package.json...');
  const packageJsonPath = path.join(appPath, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);
  packageJson.name = name;
  packageJson.description = `Generated by Ingvar Spark: ${prompt}`;
  if (useIkea && useCwds) {
    packageJson.description += ' (IKEA Ingka Skapa + CWDS)';
  } else if (useIkea) {
    packageJson.description += ' (IKEA Ingka Skapa Design System)';
  }
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });

  // 3. Apply IKEA Ingka Skapa design system if requested
  if (useIkea) {
    await applyIngkaSkapaDesignSystem(appPath);

    // 3b. Add CWDS components if requested (extends Ingka Skapa)
    if (useCwds) {
      await applyCWDSDesignSystem(appPath);
    }
  }

  // 4. Generate AI code
  console.log(chalk.yellow('🤖 Generating app code with AI...\n'));

  const appCode = await generateAppCode(prompt, name, useIkea, useCwds);

  // 5. Write generated files
  await writeGeneratedFiles(appPath, appCode);

  // 6. Install dependencies
  if (install) {
    console.log(chalk.blue('📥 Installing dependencies...\n'));
    try {
      execSync('npm install', { cwd: appPath, stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Manual install required: cd ' + appPath + ' && npm install'));
    }
  }

  // 7. Success message
  console.log(chalk.green('\n🎉 Spark app created successfully!\n'));

  console.log(chalk.cyan('📍 Location:'), appPath);
  if (useIkea && useCwds) {
    console.log(chalk.yellow('🇸🇪 Design System:'), 'IKEA Ingka Skapa + CWDS');
    console.log(chalk.blue('🎨 Components:'), '75+ Ingka Skapa + 10+ CWDS (Internal tools)');
    console.log(chalk.gray('   • Global Header, App Switcher, ILOFF Layout'));
  } else if (useIkea) {
    console.log(chalk.yellow('🇸🇪 Design System:'), 'IKEA Ingka Skapa');
    console.log(chalk.blue('🎨 Colors:'), 'IKEA Blue (#0051BA) & Yellow (#FFDB00)');
  }
  console.log(chalk.cyan('🚀 Next steps:'));
  console.log(`  cd ${path.relative(process.cwd(), appPath)}`);
  if (!install) console.log('  npm install');
  console.log('  npm run dev');

  // 8. Start dev server
  if (start && install) {
    console.log(chalk.blue('\n🌟 Starting development server...\n'));
    try {
      execSync('npm run dev', { cwd: appPath, stdio: 'inherit' });
    } catch (error) {
      console.log(chalk.yellow('⚠️  Start manually: cd ' + appPath + ' && npm run dev'));
    }
  }
}

async function generateAppCode(prompt, appName, useIkea = false, useCwds = false) {
  // Use Ingvar's AI code generator with proper options
  const { generateSparkApp } = require('../ai/code-generator');

  return generateSparkApp(prompt, appName, { useIkea, useCwds });
}

function parseAIResponse(response) {
  // Parse the AI response to extract different files
  const files = {};

  // Simple parsing - look for file markers
  const filePattern = /```(?:tsx?|typescript|jsx?)?\s*\/\/ ([\w\/.-]+)\n([\s\S]*?)```/g;
  let match;

  while ((match = filePattern.exec(response)) !== null) {
    const filePath = match[1];
    const content = match[2].trim();
    files[filePath] = content;
  }

  // If no files found, treat entire response as App.tsx
  if (Object.keys(files).length === 0) {
    files['App.tsx'] = response.replace(/```[^`]*```/g, '').trim();
  }

  return files;
}

function generateFallbackApp(prompt, appName, useIkea = false) {
  const ikeaClasses = useIkea ? {
    background: 'bg-white',
    primary: 'bg-[#0046be]',
    accent: 'bg-[#fdc935]',
    text: 'text-[#0046be]',
    card: 'bg-white border-gray-200 shadow-sm rounded-lg',
    button: 'bg-[#0046be] hover:bg-[#003399] text-white rounded-lg px-6 py-3 font-medium transition-colors'
  } : {
    background: 'bg-background',
    primary: 'bg-primary',
    accent: 'bg-accent',
    text: 'text-foreground',
    card: '',
    button: ''
  };

  return {
    'App.tsx': `import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

function App() {
  return (
    <div className="min-h-screen ${ikeaClasses.background} p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight ${ikeaClasses.text}">
            ${appName}
          </h1>
          <p className="text-xl text-gray-600">
            ${prompt}
          </p>
          <div className="flex justify-center gap-2">
            <Badge variant="secondary">Generated by Ingvar Spark</Badge>
            ${useIkea ? '<Badge className="bg-[#fdc935] text-[#0046be] hover:bg-[#e6b82f]">IKEA Design</Badge>' : ''}
          </div>
        </header>

        <Card className="${ikeaClasses.card}">
          <CardHeader>
            <CardTitle className="${ikeaClasses.text}">🚀 Your App is Ready!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">This is your generated Spark app${useIkea ? ' with IKEA\'s Swedish minimalist design' : ''}. Start building amazing things!</p>
            <Button className="${ikeaClasses.button}">Get Started</Button>
          </CardContent>
        </Card>

        ${useIkea ? `
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="${ikeaClasses.card}">
            <CardHeader>
              <CardTitle className="${ikeaClasses.text}">🇸🇪 Swedish Design</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Built with IKEA's minimalist design principles - clean, functional, and accessible.</p>
            </CardContent>
          </Card>

          <Card className="${ikeaClasses.card}">
            <CardHeader>
              <CardTitle className="${ikeaClasses.text}">🎨 Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded ${ikeaClasses.primary}"></div>
                <span className="text-sm text-gray-600">Swedish Blue (#0046be)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded ${ikeaClasses.accent}"></div>
                <span className="text-sm text-gray-600">Swedish Yellow (#fdc935)</span>
              </div>
            </CardContent>
          </Card>
        </div>
        ` : ''}
      </div>
    </div>
  );
}

export default App;`
  };
}

async function writeGeneratedFiles(appPath, files) {
  for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(appPath, 'src', filePath);
    await fs.ensureDir(path.dirname(fullPath));
    await fs.writeFile(fullPath, content, 'utf8');
    console.log(chalk.green('✅'), `Generated ${filePath}`);
  }
}

async function applyIngkaSkapaDesignSystem(appPath) {
  console.log(chalk.yellow('\n🇸🇪 Installing IKEA Ingka Skapa Design System...\n'));

  try {
    // Save current directory
    const originalCwd = process.cwd();

    // Change to app directory for component installation
    process.chdir(appPath);

    // Install IKEA components using the component installer
    const componentsCommand = require('./components');

    // Install essential IKEA Ingka Skapa components for Spark apps
    await componentsCommand({
      action: 'install',
      components: [
        'button', 'card', 'input-field', 'text', 'grid',
        'loading', 'badge', 'modal', 'tabs', 'checkbox', 'select'
      ],
      outputDir: 'src/components/ingka',
      installDesignTokens: true,
      installTailwindConfig: false,
      nonInteractive: true
    });

    // Change back to original directory
    process.chdir(originalCwd);

    console.log(chalk.green('✅'), 'Installed IKEA Ingka Skapa components');

    // Create IKEA design tokens file for reference
    const tokensPath = path.join(appPath, 'src', 'lib', 'ikea-design-tokens.ts');
    await fs.ensureDir(path.dirname(tokensPath));
    await fs.writeFile(tokensPath, `// IKEA Ingka Skapa Design System Tokens
// Generated by Ingvar Spark

export const IKEA_TOKENS = ${JSON.stringify(IKEA_DESIGN_TOKENS, null, 2)};

// Usage examples:
// className="bg-ikea-blue text-white"
// className="bg-ikea-yellow text-ikea-blue"
// className="bg-ikea-gray-50 border border-ikea-gray-200"
`, 'utf8');
    console.log(chalk.green('✅'), 'Created IKEA design tokens reference');

    // Create CSS imports file for IKEA components
    const cssImportsPath = path.join(appPath, 'src', 'styles', 'ingka.css');
    await fs.ensureDir(path.dirname(cssImportsPath));
    await fs.writeFile(cssImportsPath, `/* IKEA Ingka Skapa Design System Styles */
/* Auto-generated by Ingvar Spark */

/* Base Styles */
@import "@ingka/base/dist/style.css";

/* Component Styles */
@import "@ingka/button/dist/style.css";
@import "@ingka/card/dist/style.css";
@import "@ingka/input-field/dist/style.css";
@import "@ingka/text/dist/style.css";
@import "@ingka/grid/dist/style.css";
@import "@ingka/loading/dist/style.css";
@import "@ingka/badge/dist/style.css";
@import "@ingka/modal/dist/style.css";
@import "@ingka/tabs/dist/style.css";
@import "@ingka/checkbox/dist/style.css";
@import "@ingka/select/dist/style.css";

/* Design Tokens */
@import "@ingka/focus/dist/style.css";
@import "@ingka/svg-icon/dist/style.css";
`, 'utf8');
    console.log(chalk.green('✅'), 'Created IKEA CSS imports file');

    // Update main CSS to import IKEA styles
    const mainCSSPath = path.join(appPath, 'src', 'index.css');
    if (await fs.pathExists(mainCSSPath)) {
      const currentCSS = await fs.readFile(mainCSSPath, 'utf8');
      if (!currentCSS.includes('./styles/ingka.css')) {
        const updatedCSS = `@import './styles/ingka.css';\n\n${currentCSS}`;
        await fs.writeFile(mainCSSPath, updatedCSS, 'utf8');
        console.log(chalk.green('✅'), 'Updated index.css to import IKEA styles');
      }
    }

    console.log(chalk.green('\n✅ IKEA Ingka Skapa Design System installed successfully!\n'));
    console.log(chalk.blue('ℹ️  You can now import IKEA components:'));
    console.log(chalk.gray('   import { Button } from \'@ingka/button\';'));
    console.log(chalk.gray('   import { Card } from \'@ingka/card\';'));
    console.log(chalk.gray('   import { IKEA_DESIGN_TOKENS } from \'./lib/ikea-design-tokens\';\n'));

  } catch (error) {
    console.log(chalk.yellow('⚠️  Warning: Could not apply all IKEA design system changes'));
    console.log(chalk.gray(`Error: ${error.message}`));
    console.log(chalk.gray('\nYou can install IKEA components manually with:'));
    console.log(chalk.cyan('   ingvar components install\n'));
  }
}

async function applyCWDSDesignSystem(appPath) {
  console.log(chalk.yellow('\n🏢 Installing IKEA CWDS (extends Ingka Skapa)...\n'));

  try {
    // Install CWDS components using the CWDS installer
    const { CWDSInstaller } = require('../components/cwds-installer');
    const cwdsInstaller = new CWDSInstaller(appPath);

    // Auto-select recommended CWDS components for Spark apps
    cwdsInstaller.selectedComponents = [
      'cwds-react-layout',
      'iloff-layout-react',
      'cwds-react-header',
      'cwds-react-app-switcher',
      'cwds-react-mobile-navigation',
      'cwds-react-nav-menu',
      'cwds-react-user-profile',
      'cwds-variables'
    ];
    cwdsInstaller.authProvider = 'auth0'; // Default to Auth0

    await cwdsInstaller.install();

    console.log(chalk.green('\n✅ IKEA CWDS installed successfully!\n'));
    console.log(chalk.blue('ℹ️  You can now import CWDS components:'));
    console.log(chalk.gray('   import { CWDSLayout } from \'@ingka-group-digital/cwds-react-layout\';'));
    console.log(chalk.gray('   import { GlobalHeader } from \'@ingka-group-digital/cwds-react-header\';'));
    console.log(chalk.gray('   import { AppSwitcher } from \'@ingka-group-digital/cwds-react-app-switcher\';\n'));

  } catch (error) {
    console.log(chalk.yellow('⚠️  Warning: Could not apply all CWDS changes'));
    console.log(chalk.gray(`Error: ${error.message}`));
    console.log(chalk.gray('\nYou can install CWDS components manually with:'));
    console.log(chalk.cyan('   ingvar cwds install\n'));
  }
}

/**
 * Export Spark function (called from CLI)
 */
module.exports = async function spark(options = {}) {
  console.clear();
  console.log(banner);

  console.log(chalk.cyan('🚀 Ingvar Spark - Rapid App Generator with IKEA Ingka Skapa\n'));
  console.log(chalk.blue('ℹ️  Generate React apps with IKEA components:\n'));
  console.log(chalk.gray('   • Ingka Skapa (75+ components) - Customer-facing apps'));
  console.log(chalk.gray('   • Optional: Add CWDS (10+ components) for internal tools\n'));

  try {
    // Get app requirements (prompt, name, IKEA, CWDS)
    const config = await getAppRequirements(options);

    // Generate the Spark app
    await generateSparkApp(config);

  } catch (error) {
    console.error(chalk.red('\n❌ Error:'), error.message);
    console.log(chalk.gray('\nIf the problem persists, try:'));
    console.log(chalk.cyan('   ingvar spark --help'));
    process.exit(1);
  }
};
