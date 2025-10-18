const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

async function initCommand(options) {
  console.log(chalk.yellow('\n🦁 ') + chalk.cyan.bold('Initializing LEO Workflow Kit') + chalk.yellow(' 🦁\n'));

  // Check prerequisites
  const spinner = ora('Checking prerequisites...').start();
  
  try {
    execSync('gh --version', { stdio: 'ignore' });
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    spinner.succeed('Prerequisites check passed');
  } catch (error) {
    spinner.fail('Prerequisites check failed');
    console.log(chalk.red('\n❌ Error: GitHub CLI and Git are required'));
    console.log(chalk.yellow('Install GitHub CLI: https://cli.github.com/'));
    process.exit(1);
  }

  // Get repository info
  let repoInfo;
  let isOrgRepo = false;
  try {
    const repoUrl = execSync('gh repo view --json nameWithOwner -q .nameWithOwner', {
      encoding: 'utf8'
    }).trim();
    repoInfo = repoUrl;
    // Check if it's an organization repo (contains a slash and first part is not a user)
    const parts = repoInfo.split('/');
    isOrgRepo = parts.length === 2 && parts[0] !== '';
  } catch (error) {
    console.log(chalk.yellow('\n⚠️  Not in a GitHub repository or not authenticated'));
    console.log(chalk.gray('Run: gh auth login\n'));
    process.exit(1);
  }

  console.log(chalk.gray(`Repository: ${repoInfo}\n`));

  // Interactive prompts if options not provided
  let config = { ...options };
  
  // Make organization optional - only prompt if not provided
  const questions = [];
  
  if (!config.org && isOrgRepo) {
    questions.push({
      type: 'input',
      name: 'org',
      message: 'GitHub organization name (leave empty for personal repo):',
      default: repoInfo.split('/')[0]
    });
  }
  
  if (!config.project) {
    questions.push({
      type: 'input',
      name: 'project',
      message: 'GitHub project number (leave empty to skip):',
      default: ''
    });
  }
  
  if (questions.length > 0) {
    const answers = await inquirer.prompt(questions);
    config = { ...config, ...answers };
  }

  // Confirm setup
  console.log(chalk.cyan('\n📋 Setup Configuration:\n'));
  console.log(`  Organization: ${chalk.white(config.org || 'N/A')}`);
  console.log(`  Project: ${chalk.white(config.project || 'N/A')}`);
  console.log(`  Skip Labels: ${chalk.white(config.skipLabels ? 'Yes' : 'No')}`);
  console.log(`  Skip VS Code: ${chalk.white(config.skipVscode ? 'Yes' : 'No')}`);
  console.log();

  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: 'Proceed with setup?',
      default: true
    }
  ]);

  if (!confirm) {
    console.log(chalk.yellow('\n❌ Setup cancelled\n'));
    process.exit(0);
  }

  // Step 1: Create documentation structure
  const docsSpinner = ora('Creating documentation structure...').start();
  try {
    await fs.ensureDir('docs/guides');
    await fs.ensureDir('docs/setup');
    await fs.ensureDir('docs/development');
    await fs.ensureDir('docs/archive');
    
    // Copy docs README
    const docsReadme = `# Project Documentation

All project documentation is organized here.

## Structure

- **guides/** - User guides and tutorials
- **setup/** - Installation and configuration guides
- **development/** - Development documentation and architecture
- **archive/** - Historical documentation and completed work

## Contributing

Keep documentation up to date as the project evolves.
`;
    await fs.writeFile('docs/README.md', docsReadme);
    docsSpinner.succeed('Documentation structure created');
  } catch (error) {
    docsSpinner.fail('Failed to create documentation structure');
    console.error(chalk.red(error.message));
  }

  // Step 2: Copy issue templates
  const templatesSpinner = ora('Installing issue templates...').start();
  try {
    await fs.ensureDir('.github/ISSUE_TEMPLATE');
    
    // Copy templates from embedded templates
    const templatesDir = path.join(__dirname, '../../templates/github-workflow/issue-templates');
    await fs.copy(templatesDir, '.github/ISSUE_TEMPLATE');
    
    templatesSpinner.succeed('Issue templates installed');
  } catch (error) {
    templatesSpinner.fail('Failed to install issue templates');
    console.error(chalk.red(error.message));
  }

  // Step 3: Set up labels (if not skipped)
  if (!config.skipLabels) {
    const labelsSpinner = ora('Setting up GitHub labels...').start();
    try {
      require('./labels')({ clean: false });
      labelsSpinner.succeed('GitHub labels configured');
    } catch (error) {
      labelsSpinner.fail('Failed to set up labels');
      console.error(chalk.red(error.message));
    }
  }

  // Step 4: Set up VS Code (if not skipped)
  if (!config.skipVscode) {
    const vscodeSpinner = ora('Configuring VS Code...').start();
    try {
      await fs.ensureDir('.vscode');
      
      // Create settings.json
      const settings = {
        "editor.formatOnSave": true,
        "editor.codeActionsOnSave": {
          "source.fixAll": true
        },
        "files.trimTrailingWhitespace": true,
        "files.insertFinalNewline": true
      };
      await fs.writeJson('.vscode/settings.json', settings, { spaces: 2 });
      
      // Create extensions.json
      const extensions = {
        "recommendations": [
          "GitHub.copilot",
          "GitHub.copilot-chat",
          "eamodio.gitlens",
          "esbenp.prettier-vscode"
        ]
      };
      await fs.writeJson('.vscode/extensions.json', extensions, { spaces: 2 });
      
      vscodeSpinner.succeed('VS Code configured');
    } catch (error) {
      vscodeSpinner.fail('Failed to configure VS Code');
      console.error(chalk.red(error.message));
    }
  }

  // Step 5: Add to project board (if project number provided)
  if (config.project) {
    const projectSpinner = ora('Adding repository to project board...').start();
    try {
      const repoUrl = `https://github.com/${repoInfo}`;
      const owner = config.org || repoInfo.split('/')[0];
      execSync(
        `gh project item-add ${config.project} --owner ${owner} --url ${repoUrl}`,
        { stdio: 'ignore' }
      );
      projectSpinner.succeed('Added to project board');
    } catch (error) {
      projectSpinner.warn('Could not add to project board (may already exist or no permission)');
    }
  }

  // Step 6: Create initial commit
  const commitSpinner = ora('Creating initial commit...').start();
  try {
    execSync('git add .');
    execSync('git commit -m "chore: initialize LEO workflow\n\n- Add documentation structure\n- Install issue templates\n- Configure VS Code\n- Set up GitHub labels"', { stdio: 'ignore' });
    commitSpinner.succeed('Initial commit created');
  } catch (error) {
    commitSpinner.info('No changes to commit (may already be set up)');
  }

  // Success message
  console.log(chalk.yellow('\n🦁 ') + chalk.green.bold('LEO Workflow Kit initialized successfully!') + chalk.yellow(' 🦁\n'));
  console.log(chalk.cyan('Next steps:\n'));
  console.log(chalk.white('  1. Create your first issue:'));
  console.log(chalk.gray('     leo issue\n'));
  console.log(chalk.white('  2. Check workflow status:'));
  console.log(chalk.gray('     leo status\n'));
  console.log(chalk.white('  3. View documentation:'));
  console.log(chalk.gray('     leo docs\n'));
}

module.exports = initCommand;
