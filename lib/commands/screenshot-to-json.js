const { Command } = require('commander');
const chalk = require('chalk');
const ScreenshotToJSONConverter = require('../utils/screenshot-to-json-converter');

const program = new Command();

program
  .name('screenshot-to-json')
  .description('Convert Skapa design system screenshots to JSON specifications')
  .option('-i, --input <dir>', 'Input directory with screenshots', 'docs/guides/Skapa SS')
  .option('-o, --output <dir>', 'Output directory for JSON files', 'docs/guides/Skapa-json')
  .option('-k, --api-key <key>', 'OpenAI API key (or use OPENAI_API_KEY env var)')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o')
  .option('--dry-run', 'Show what would be processed without making API calls')
  .action(async (options) => {
    console.log(chalk.blue.bold('\n🎨 Skapa Screenshot to JSON Converter\n'));

    const converter = new ScreenshotToJSONConverter({
      inputDir: options.input,
      outputDir: options.output,
      openaiApiKey: options.apiKey,
      model: options.model
    });

    if (options.dryRun) {
      console.log(chalk.yellow('Dry run mode - no API calls will be made\n'));
      const fs = require('fs-extra');
      const files = await fs.readdir(options.input);
      const screenshots = files.filter(f =>
        f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
      );

      console.log(chalk.cyan(`Found ${screenshots.length} screenshots:\n`));
      screenshots.forEach(file => {
        const info = converter.parseFilename(file);
        if (info) {
          console.log(chalk.green(`  ✓ ${info.name} (${info.type})`));
        } else {
          console.log(chalk.gray(`  ⊘ ${file} (unrecognized format)`));
        }
      });
      return;
    }

    if (!options.apiKey && !process.env.OPENAI_API_KEY) {
      console.error(chalk.red('❌ Error: OpenAI API key required'));
      console.log(chalk.yellow('\nSet via:'));
      console.log(chalk.cyan('  1. Environment variable: export OPENAI_API_KEY="sk-..."'));
      console.log(chalk.cyan('  2. Command option: --api-key sk-...'));
      process.exit(1);
    }

    try {
      console.log(chalk.cyan('Starting extraction with AI Vision...\n'));

      const results = await converter.convertAll();

      console.log(chalk.blue('\n📊 Generating master index...'));
      await converter.generateIndex();

      console.log(chalk.green.bold('\n✅ Conversion Complete!\n'));
      console.log(chalk.cyan('Results:'));
      console.log(`  Total screenshots: ${results.total}`);
      console.log(`  ${chalk.green('✓')} Successfully processed: ${results.success}`);
      console.log(`  ${chalk.yellow('⊘')} Skipped: ${results.skipped}`);
      console.log(`  ${chalk.red('✗')} Failed: ${results.failed}`);

      if (results.success > 0) {
        console.log(chalk.cyan(`\nJSON files saved to: ${options.output}`));
      }

    } catch (error) {
      console.error(chalk.red('\n❌ Error during conversion:'), error.message);
      process.exit(1);
    }
  });

// Subcommand: test a single screenshot
program
  .command('test <screenshot>')
  .description('Test conversion on a single screenshot')
  .option('-k, --api-key <key>', 'OpenAI API key')
  .option('-m, --model <model>', 'OpenAI model to use', 'gpt-4o')
  .action(async (screenshot, options) => {
    console.log(chalk.blue.bold('\n🧪 Testing Single Screenshot\n'));

    const converter = new ScreenshotToJSONConverter({
      openaiApiKey: options.apiKey,
      model: options.model
    });

    try {
      const result = await converter.convertScreenshot(screenshot);

      if (result.success) {
        console.log(chalk.green('\n✅ Success!'));
        console.log(chalk.cyan('Output:'), result.outputPath);
      } else {
        console.log(chalk.yellow('\n⚠️  Skipped or failed'));
        if (result.reason) {
          console.log(chalk.gray('Reason:'), result.reason);
        }
      }
    } catch (error) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

// Subcommand: list screenshots
program
  .command('list')
  .description('List all screenshots in input directory')
  .option('-i, --input <dir>', 'Input directory', 'docs/guides/Skapa SS')
  .action(async (options) => {
    const fs = require('fs-extra');
    const converter = new ScreenshotToJSONConverter();

    console.log(chalk.blue.bold('\n📷 Skapa Screenshots\n'));

    const files = await fs.readdir(options.input);
    const screenshots = files.filter(f =>
      f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
    );

    console.log(chalk.cyan(`Found ${screenshots.length} screenshots:\n`));

    const byType = {
      components: [],
      foundations: [],
      subsystems: [],
      other: []
    };

    screenshots.forEach(file => {
      const info = converter.parseFilename(file);
      if (info) {
        // Handle subsystems and patterns (new types)
        const type = info.type;
        if (!byType[type]) {
          byType[type] = [];
        }
        byType[type].push({ file, info });
      } else {
        byType.other.push({ file });
      }
    });

    Object.entries(byType).forEach(([type, items]) => {
      if (items.length > 0) {
        console.log(chalk.bold(`\n${type.toUpperCase()} (${items.length}):`));
        items.forEach(({ file, info }) => {
          if (info) {
            console.log(chalk.green(`  ✓ ${info.name}`));
          } else {
            console.log(chalk.gray(`  ⊘ ${file}`));
          }
        });
      }
    });
  });

module.exports = program;
