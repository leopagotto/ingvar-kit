#!/usr/bin/env node

// Quick smoke test for leo init interactive prompts
const inquirer = require('inquirer');
const chalk = require('chalk');

async function testPrompts() {
  console.log(chalk.cyan('\n🧪 Testing LEO Init Interactive Prompts\n'));
  
  // Simulate the project choice prompt
  const questions = [
    {
      type: 'list',
      name: 'projectChoice',
      message: 'GitHub Project setup:',
      choices: [
        { name: '📋 Use existing GitHub Project (enter project number)', value: 'existing' },
        { name: '✨ Create new GitHub Project', value: 'new' },
        { name: '⏭️  Skip project setup (I\'ll do it later)', value: 'skip' }
      ],
      default: 'existing'
    }
  ];
  
  const answers = await inquirer.prompt(questions);
  console.log(chalk.green('\n✅ You selected:'), chalk.white(answers.projectChoice));
  
  if (answers.projectChoice === 'new') {
    const projectDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter new project name:',
        default: 'Test Project - LEO Workflow'
      },
      {
        type: 'input',
        name: 'projectDescription',
        message: 'Enter project description (optional):',
        default: 'Spec-driven development workflow with LEO Kit'
      }
    ]);
    console.log(chalk.green('\n✅ Project details:'));
    console.log(chalk.white('  Name:'), chalk.cyan(projectDetails.projectName));
    console.log(chalk.white('  Description:'), chalk.cyan(projectDetails.projectDescription));
  } else if (answers.projectChoice === 'existing') {
    const projectNum = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectNumber',
        message: 'Enter GitHub Project number:',
        validate: (input) => {
          if (!input || input.trim() === '') return 'Project number is required';
          if (isNaN(input)) return 'Please enter a valid project number';
          return true;
        }
      }
    ]);
    console.log(chalk.green('\n✅ Project number:'), chalk.cyan(projectNum.projectNumber));
  } else {
    console.log(chalk.yellow('\n⏭️  Skipping project setup'));
  }
  
  console.log(chalk.green('\n✅ Interactive prompts are working correctly!\n'));
}

testPrompts().catch(console.error);
