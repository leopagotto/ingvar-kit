const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Screenshot to JSON Converter
 * Extracts design specifications from Skapa website screenshots using AI Vision
 *
 * Uses GPT-4 Vision to read screenshots and extract:
 * - Component specifications (variants, states, props)
 * - Design tokens (colors, spacing, typography)
 * - Usage guidelines
 * - Accessibility requirements
 */
class ScreenshotToJSONConverter {
  constructor(options = {}) {
    this.options = {
      inputDir: options.inputDir || 'docs/guides/Skapa SS',
      outputDir: options.outputDir || 'docs/guides/Skapa-json',
      openaiApiKey: options.openaiApiKey || process.env.OPENAI_API_KEY,
      model: options.model || 'gpt-4o', // gpt-4o has vision capabilities
      ...options
    };

    if (!this.options.openaiApiKey) {
      console.warn(chalk.yellow('⚠️  Warning: OPENAI_API_KEY not set. Vision extraction will be skipped.'));
    }
  }

  /**
   * Convert all screenshots to JSON
   */
  async convertAll() {
    console.log(chalk.blue('🔍 Scanning for screenshots...'));

    const files = await fs.readdir(this.options.inputDir);
    const screenshots = files.filter(f =>
      f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg')
    );

    console.log(chalk.blue(`Found ${screenshots.length} screenshots`));

    const results = {
      total: screenshots.length,
      processed: 0,
      success: 0,
      failed: 0,
      skipped: 0,
      files: []
    };

    for (const screenshot of screenshots) {
      try {
        const result = await this.convertScreenshot(screenshot);
        if (result.success) {
          results.success++;
        } else if (result.skipped) {
          results.skipped++;
        } else {
          results.failed++;
        }
        results.processed++;
        results.files.push(result);
      } catch (error) {
        console.error(chalk.red(`✗ Error processing ${screenshot}:`), error.message);
        results.failed++;
        results.processed++;
      }
    }

    return results;
  }

  /**
   * Convert a single screenshot to JSON
   */
  async convertScreenshot(filename) {
    const inputPath = path.join(this.options.inputDir, filename);

    // Parse the filename to determine type and name
    const info = this.parseFilename(filename);

    if (!info) {
      console.log(chalk.gray(`⊘ Skipping ${filename} (unrecognized format)`));
      return { filename, success: false, skipped: true };
    }

    console.log(chalk.cyan(`→ Processing: ${info.name} (${info.type})`));

    // Check if we have OpenAI API key
    if (!this.options.openaiApiKey) {
      console.log(chalk.yellow(`⚠️  Skipping ${filename} (no API key)`));
      return { filename, success: false, skipped: true, reason: 'no-api-key' };
    }

    try {
      // Extract content using GPT-4 Vision
      const extractedData = await this.extractWithVision(inputPath, info);

      // Create JSON structure
      const jsonData = this.createJSONStructure(info, extractedData);

      // Save to appropriate location
      const outputPath = this.getOutputPath(info);
      await fs.ensureDir(path.dirname(outputPath));
      await fs.writeJSON(outputPath, jsonData, { spaces: 2 });

      console.log(chalk.green(`✓ Saved: ${outputPath}`));

      return {
        filename,
        success: true,
        outputPath,
        info
      };
    } catch (error) {
      console.error(chalk.red(`✗ Failed: ${filename}`), error.message);
      return {
        filename,
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Parse screenshot filename to extract type and component name
   */
  parseFilename(filename) {
    // Format: screencapture-skapa-ikea-net-{type}-{name}-{timestamp}.png
    const match = filename.match(/screencapture-skapa-ikea-net-(components|foundations|subsystems|patterns)-(.+?)-\d{4}-\d{2}-\d{2}/);

    if (!match) {
      return null;
    }

    const [, type, rawName] = match;

    // Clean up the name (convert hyphenated to proper case)
    const name = rawName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');

    return { type, name, rawName };
  }

  /**
   * Extract design specifications using GPT-4 Vision
   */
  async extractWithVision(imagePath, info) {
    // Read image as base64
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const imageUrl = `data:image/png;base64,${base64Image}`;

    // Create prompt based on type
    const prompt = this.createVisionPrompt(info);

    try {
      // Call OpenAI Vision API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.options.openaiApiKey}`
        },
        body: JSON.stringify({
          model: this.options.model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl,
                    detail: 'high'
                  }
                }
              ]
            }
          ],
          max_tokens: 4096,
          temperature: 0.1 // Low temperature for consistent extraction
        })
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`OpenAI API error: ${response.status} - ${error}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse JSON response
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.warn(chalk.yellow('⚠️  Could not parse JSON response, using raw text'));
        return { rawExtraction: content };
      }
    } catch (error) {
      console.error(chalk.red('Vision API error:'), error.message);
      throw error;
    }
  }

  /**
   * Create vision prompt based on component/foundation type
   */
  createVisionPrompt(info) {
    const basePrompt = `You are analyzing a screenshot from the IKEA Skapa Design System website. Extract structured design specification data.

Component/Foundation: ${info.name}
Type: ${info.type}

`;

    if (info.type === 'components') {
      return basePrompt + `Extract the following information and respond with ONLY a valid JSON object:

{
  "name": "component name",
  "description": "brief description",
  "variants": [
    { "name": "variant name", "description": "what it's for" }
  ],
  "states": [
    { "name": "state name (e.g., default, hover, disabled)", "description": "visual appearance" }
  ],
  "properties": [
    { "name": "prop name", "type": "string|number|boolean", "required": true/false, "description": "what it does" }
  ],
  "anatomy": {
    "parts": ["list of visual parts/elements"],
    "structure": "how elements are composed"
  },
  "usage": {
    "when": "when to use this component",
    "whenNot": "when NOT to use",
    "bestPractices": ["list of best practices"]
  },
  "accessibility": {
    "keyboardSupport": ["supported keyboard interactions"],
    "ariaAttributes": ["required ARIA attributes"],
    "focusManagement": "focus behavior description"
  },
  "examples": [
    { "title": "example name", "description": "what it demonstrates" }
  ]
}

Extract as much detail as visible in the screenshot. If information is not visible, omit that field.`;
    } else if (info.type === 'foundations') {
      return basePrompt + `Extract the following design tokens and respond with ONLY a valid JSON object:

{
  "name": "foundation name",
  "type": "color|typography|spacing|elevation|border|motion",
  "description": "what this foundation covers",
  "tokens": [
    {
      "name": "token name (e.g., primary-blue, spacing-md)",
      "value": "actual value (e.g., #0051BA, 16px)",
      "usage": "when/how to use this token"
    }
  ],
  "scale": {
    "description": "scale system description (e.g., 8px base grid)",
    "values": ["list of scale values"]
  },
  "guidelines": ["list of usage guidelines"]
}

Extract all visible tokens, values, and guidelines.`;
    } else if (info.type === 'subsystems') {
      return basePrompt + `Extract the CWDS/Co-Worker subsystem specifications and respond with ONLY a valid JSON object:

{
  "name": "subsystem component name",
  "subsystem": "ingka-co-worker",
  "description": "what this component is for",
  "variants": [],
  "usage": {
    "context": "where this is used (internal tools, co-worker apps)",
    "guidelines": ["usage guidelines"]
  },
  "differences": "how this differs from standard Skapa components"
}`;
    }

    return basePrompt + 'Extract all visible design specifications as structured JSON.';
  }

  /**
   * Create JSON structure with extracted data
   */
  createJSONStructure(info, extractedData) {
    const base = {
      name: info.name,
      category: `Skapa-${info.type}`,
      source: `Screenshot from skapa.ikea.net`,
      extractedAt: new Date().toISOString(),
      extractionMethod: 'gpt-4-vision'
    };

    // Merge with extracted data
    return {
      ...base,
      ...extractedData
    };
  }

  /**
   * Get output path for JSON file
   */
  getOutputPath(info) {
    const subdir = info.type === 'subsystems' ? 'subsystems' :
                   info.type === 'foundations' ? 'foundations' :
                   'components';

    return path.join(
      this.options.outputDir,
      subdir,
      `${info.name}.json`
    );
  }

  /**
   * Generate master index of all files
   */
  async generateIndex() {
    console.log(chalk.blue('📋 Generating master index...'));

    const index = {
      generated: new Date().toISOString(),
      version: '2.0.0',
      description: 'IKEA Skapa Design System - Extracted from Website Screenshots',
      extractionMethod: 'gpt-4-vision',
      foundations: await this.indexDirectory('foundations'),
      components: await this.indexDirectory('components'),
      subsystems: await this.indexDirectory('subsystems')
    };

    const indexPath = path.join(this.options.outputDir, 'index.json');
    await fs.writeJSON(indexPath, index, { spaces: 2 });

    console.log(chalk.green(`✓ Created index: ${indexPath}`));

    return index;
  }

  /**
   * Index files in a directory
   */
  async indexDirectory(dirName) {
    const dirPath = path.join(this.options.outputDir, dirName);

    try {
      await fs.ensureDir(dirPath);
      const files = await fs.readdir(dirPath);
      const jsonFiles = files
        .filter(f => f.endsWith('.json'))
        .sort();

      return {
        count: jsonFiles.length,
        files: jsonFiles.map(f => `${dirName}/${f}`)
      };
    } catch (error) {
      return {
        count: 0,
        files: []
      };
    }
  }
}

module.exports = ScreenshotToJSONConverter;
