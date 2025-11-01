#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { PDFToJSONConverter } = require('../utils/pdf-to-json-converter');

const program = new Command();

/**
 * Ingvar PDF to JSON Converter
 *
 * Converts IKEA Skapa PDF design specifications to structured JSON
 */

program
  .name('pdf-to-json')
  .description('Convert Skapa PDF specifications to JSON format')
  .version('1.0.0');

program
  .command('convert')
  .alias('c')
  .description('Convert PDF files to JSON')
  .option('-d, --dir <directory>', 'Specific directory to convert')
  .option('-o, --output <directory>', 'Output directory', 'docs/guides/Skapa-json')
  .option('-v, --verbose', 'Verbose output')
  .action(async (options) => {
    try {
      const converter = new PDFToJSONConverter({
        outputDir: options.output,
        verbose: options.verbose
      });

      // Initialize PDF parser
      const initialized = await converter.init();
      if (!initialized) {
        console.error(chalk.red('\n❌ Failed to initialize PDF parser'));
        process.exit(1);
      }

      // Convert based on options
      if (options.dir) {
        await converter.convertDirectory(options.dir);
      } else {
        await converter.convertAll();
      }

      console.log(chalk.green.bold('\n🎉 Conversion complete!'));
      console.log(chalk.cyan(`\n📁 Output directory: ${options.output}`));
      console.log(chalk.gray('\nView the index file for a complete list of converted files.'));

    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      if (options.verbose) {
        console.error(error.stack);
      }
      process.exit(1);
    }
  });

program
  .command('install-deps')
  .description('Install required dependencies (pdf-parse)')
  .action(async () => {
    console.log(chalk.cyan('📦 Installing pdf-parse...'));

    try {
      const { execSync } = require('child_process');
      execSync('npm install pdf-parse', { stdio: 'inherit', cwd: process.cwd() });
      console.log(chalk.green('\n✅ Dependencies installed successfully!'));
    } catch (error) {
      console.error(chalk.red('\n❌ Failed to install dependencies'));
      console.error(error.message);
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List available PDF files')
  .action(async () => {
    const fs = require('fs-extra');
    const path = require('path');

    console.log(chalk.cyan.bold('\n📚 Available Skapa PDF Specifications\n'));

    // List foundations
    const foundationsDir = path.join(process.cwd(), 'docs/guides/Skapa-foundations');
    if (await fs.pathExists(foundationsDir)) {
      const foundations = (await fs.readdir(foundationsDir)).filter(f => f.endsWith('.pdf'));
      console.log(chalk.yellow('Foundations:'), chalk.gray(`(${foundations.length} files)`));
      foundations.forEach(f => console.log(`  • ${f}`));
    }

    console.log();

    // List components
    const componentsDir = path.join(process.cwd(), 'docs/guides/Skapa-components');
    if (await fs.pathExists(componentsDir)) {
      const components = (await fs.readdir(componentsDir)).filter(f => f.endsWith('.pdf'));
      console.log(chalk.yellow('Components:'), chalk.gray(`(${components.length} files)`));
      components.forEach(f => console.log(`  • ${f}`));
    }

    console.log(chalk.gray('\nTotal PDFs available for conversion'));
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

module.exports = program;
