#!/usr/bin/env node

/**
 * PDF to JSON Converter for IKEA Skapa Design System
 *
 * Converts PDF design specifications to structured JSON format for:
 * - Machine-readable design tokens
 * - AI agent consumption
 * - Automated code generation
 * - Version control
 *
 * @module pdf-to-json-converter
 */

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * PDFToJSONConverter class
 *
 * Extracts design specifications from PDF files and converts to JSON
 */
class PDFToJSONConverter {
  constructor(options = {}) {
    this.PDFParseClass = null; // Will be initialized in init()
    this.options = {
      outputDir: options.outputDir || 'docs/guides/Skapa-json',
      verbose: options.verbose || false,
      ...options
    };
  }

  /**
   * Initialize PDF parser
   * Checks if pdf-parse is available, installs if needed
   */
  async init() {
    try {
      // pdf-parse v2 exports PDFParse class
      const { PDFParse } = require('pdf-parse');
      this.PDFParseClass = PDFParse;
      return true;
    } catch (error) {
      console.log(chalk.yellow('📦 pdf-parse not found, installing...'));

      try {
        const { execSync } = require('child_process');
        execSync('npm install pdf-parse', { stdio: 'inherit' });
        const { PDFParse } = require('pdf-parse');
        this.PDFParseClass = PDFParse;
        return true;
      } catch (installError) {
        console.error(chalk.red('❌ Failed to install pdf-parse'));
        console.log(chalk.gray('Run manually: npm install pdf-parse'));
        return false;
      }
    }
  }

  /**
   * Convert a single PDF file to JSON
   */
  async convertPDF(pdfPath) {
    if (!this.PDFParseClass) {
      throw new Error('PDF parser not initialized. Call init() first.');
    }

    const fileName = path.basename(pdfPath, '.pdf');
    const category = path.basename(path.dirname(pdfPath));

    if (this.options.verbose) {
      console.log(chalk.gray(`  Processing ${fileName}...`));
    }

    try {
      // Convert to absolute file:// URL
      const absolutePath = path.resolve(pdfPath);
      const fileUrl = 'file://' + absolutePath;

      // Create parser instance with file URL
      const parser = new this.PDFParseClass({ url: fileUrl });

      // Extract text
      const result = await parser.getText();

      // Extract structured data
      const jsonData = this.extractStructuredData(result, fileName, category);

      return jsonData;
    } catch (error) {
      console.error(chalk.red(`  ✗ Failed to parse ${fileName}: ${error.message}`));
      return null;
    }
  }  /**
   * Extract structured data from parsed PDF
   */
  extractStructuredData(result, fileName, category) {
    const text = result.text || '';
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Base structure
    const jsonData = {
      name: fileName,
      category: category,
      source: `${category}/${fileName}.pdf`,
      extractedAt: new Date().toISOString(),
      metadata: {
        pages: result.numpages || result.numPages || 0,
        info: result.info || {}
      },
      content: {
        rawText: text,
        lines: lines
      }
    };

    // Extract design tokens based on file type
    if (category === 'Skapa-foundations') {
      jsonData.tokens = this.extractFoundationTokens(fileName, lines);
    } else if (category === 'Skapa-components') {
      jsonData.component = this.extractComponentSpec(fileName, lines);
    }

    return jsonData;
  }

  /**
   * Extract foundation design tokens
   */
  extractFoundationTokens(fileName, lines) {
    const tokens = {
      type: this.categorizeFoundation(fileName),
      values: []
    };

    // Color extraction
    if (fileName.toLowerCase().includes('colour') || fileName.toLowerCase().includes('color')) {
      tokens.colors = this.extractColors(lines);
    }

    // Spacing extraction
    if (fileName.toLowerCase().includes('spacing')) {
      tokens.spacing = this.extractSpacing(lines);
    }

    // Typography extraction
    if (fileName.toLowerCase().includes('typography')) {
      tokens.typography = this.extractTypography(lines);
    }

    // Corner radius extraction
    if (fileName.toLowerCase().includes('corner') || fileName.toLowerCase().includes('radius')) {
      tokens.borderRadius = this.extractBorderRadius(lines);
    }

    // Elevation/Shadow extraction
    if (fileName.toLowerCase().includes('elevation')) {
      tokens.elevation = this.extractElevation(lines);
    }

    return tokens;
  }

  /**
   * Extract component specifications
   */
  extractComponentSpec(fileName, lines) {
    return {
      name: fileName,
      variants: this.extractVariants(lines),
      states: this.extractStates(lines),
      properties: this.extractProperties(lines),
      usage: this.extractUsageGuidelines(lines)
    };
  }

  /**
   * Categorize foundation type
   */
  categorizeFoundation(fileName) {
    const name = fileName.toLowerCase();

    if (name.includes('colour') || name.includes('color')) return 'color';
    if (name.includes('typography') || name.includes('type')) return 'typography';
    if (name.includes('spacing')) return 'spacing';
    if (name.includes('border')) return 'borders';
    if (name.includes('corner') || name.includes('radius')) return 'borderRadius';
    if (name.includes('elevation') || name.includes('shadow')) return 'elevation';
    if (name.includes('motion') || name.includes('animation')) return 'motion';
    if (name.includes('icon')) return 'iconography';
    if (name.includes('layout') || name.includes('grid')) return 'layout';
    if (name.includes('writting') || name.includes('writing')) return 'content';

    return 'other';
  }

  /**
   * Extract color values from text
   */
  extractColors(lines) {
    const colors = [];
    const hexPattern = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/g;
    const rgbPattern = /rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/gi;

    lines.forEach((line, index) => {
      // Extract hex colors
      const hexMatches = line.match(hexPattern);
      if (hexMatches) {
        hexMatches.forEach(hex => {
          colors.push({
            value: hex,
            format: 'hex',
            context: line,
            lineNumber: index
          });
        });
      }

      // Extract RGB colors
      const rgbMatches = line.matchAll(rgbPattern);
      for (const match of rgbMatches) {
        colors.push({
          value: match[0],
          format: 'rgb',
          r: parseInt(match[1]),
          g: parseInt(match[2]),
          b: parseInt(match[3]),
          context: line,
          lineNumber: index
        });
      }
    });

    return colors;
  }

  /**
   * Extract spacing values
   */
  extractSpacing(lines) {
    const spacing = [];
    const spacingPattern = /(\d+)\s*(px|rem|em)/gi;

    lines.forEach((line, index) => {
      const matches = line.matchAll(spacingPattern);
      for (const match of matches) {
        spacing.push({
          value: parseInt(match[1]),
          unit: match[2],
          context: line,
          lineNumber: index
        });
      }
    });

    return spacing;
  }

  /**
   * Extract typography values
   */
  extractTypography(lines) {
    const typography = {
      fontFamilies: [],
      fontSizes: [],
      fontWeights: [],
      lineHeights: []
    };

    lines.forEach((line, index) => {
      // Font families
      if (line.toLowerCase().includes('font') && (line.includes('Noto Sans') || line.includes('sans'))) {
        typography.fontFamilies.push({
          value: line,
          lineNumber: index
        });
      }

      // Font sizes
      const sizePattern = /(\d+)\s*(px|pt|rem)/gi;
      const sizeMatches = line.matchAll(sizePattern);
      for (const match of sizeMatches) {
        typography.fontSizes.push({
          value: parseInt(match[1]),
          unit: match[2],
          context: line,
          lineNumber: index
        });
      }

      // Font weights
      if (line.match(/\b(regular|medium|semibold|bold|light)\b/gi)) {
        const weights = line.match(/\b(regular|medium|semibold|bold|light)\b/gi);
        weights.forEach(weight => {
          typography.fontWeights.push({
            value: weight,
            context: line,
            lineNumber: index
          });
        });
      }
    });

    return typography;
  }

  /**
   * Extract border radius values
   */
  extractBorderRadius(lines) {
    const borderRadius = [];
    const radiusPattern = /(\d+)\s*(px|rem)/gi;

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes('radius') || line.toLowerCase().includes('corner')) {
        const matches = line.matchAll(radiusPattern);
        for (const match of matches) {
          borderRadius.push({
            value: parseInt(match[1]),
            unit: match[2],
            context: line,
            lineNumber: index
          });
        }
      }
    });

    return borderRadius;
  }

  /**
   * Extract elevation/shadow values
   */
  extractElevation(lines) {
    const elevation = [];

    lines.forEach((line, index) => {
      if (line.toLowerCase().includes('shadow') || line.toLowerCase().includes('elevation')) {
        elevation.push({
          context: line,
          lineNumber: index
        });
      }
    });

    return elevation;
  }

  /**
   * Extract component variants
   */
  extractVariants(lines) {
    const variants = [];
    const variantKeywords = ['primary', 'secondary', 'tertiary', 'small', 'medium', 'large'];

    lines.forEach((line, index) => {
      variantKeywords.forEach(keyword => {
        if (line.toLowerCase().includes(keyword)) {
          variants.push({
            type: keyword,
            context: line,
            lineNumber: index
          });
        }
      });
    });

    return variants;
  }

  /**
   * Extract component states
   */
  extractStates(lines) {
    const states = [];
    const stateKeywords = ['default', 'hover', 'active', 'focus', 'disabled', 'error', 'success'];

    lines.forEach((line, index) => {
      stateKeywords.forEach(keyword => {
        if (line.toLowerCase().includes(keyword)) {
          states.push({
            state: keyword,
            context: line,
            lineNumber: index
          });
        }
      });
    });

    return states;
  }

  /**
   * Extract component properties
   */
  extractProperties(lines) {
    const properties = [];

    lines.forEach((line, index) => {
      // Look for property-like patterns
      if (line.includes(':') || line.includes('=')) {
        properties.push({
          content: line,
          lineNumber: index
        });
      }
    });

    return properties;
  }

  /**
   * Extract usage guidelines
   */
  extractUsageGuidelines(lines) {
    const guidelines = [];
    const guidelineKeywords = ['usage', 'when to use', 'best practice', 'guideline', 'do', 'don\'t'];

    lines.forEach((line, index) => {
      guidelineKeywords.forEach(keyword => {
        if (line.toLowerCase().includes(keyword)) {
          guidelines.push({
            content: line,
            lineNumber: index
          });
        }
      });
    });

    return guidelines;
  }

  /**
   * Convert directory of PDFs to JSON
   */
  async convertDirectory(pdfDir, outputSubDir = null) {
    const dirName = path.basename(pdfDir);
    const outputDir = outputSubDir
      ? path.join(this.options.outputDir, outputSubDir)
      : path.join(this.options.outputDir, dirName);

    await fs.ensureDir(outputDir);

    console.log(chalk.cyan(`\n📁 Converting ${dirName}...`));

    const files = await fs.readdir(pdfDir);
    const pdfFiles = files.filter(f => f.endsWith('.pdf'));

    const results = {
      directory: dirName,
      totalFiles: pdfFiles.length,
      successful: 0,
      failed: 0,
      outputs: []
    };

    for (const file of pdfFiles) {
      const pdfPath = path.join(pdfDir, file);
      const jsonFileName = file.replace('.pdf', '.json');
      const jsonPath = path.join(outputDir, jsonFileName);

      try {
        const jsonData = await this.convertPDF(pdfPath);

        if (jsonData) {
          await fs.writeJson(jsonPath, jsonData, { spaces: 2 });
          results.successful++;
          results.outputs.push(jsonPath);

          if (this.options.verbose) {
            console.log(chalk.green(`  ✓ ${file} → ${jsonFileName}`));
          }
        } else {
          results.failed++;
        }
      } catch (error) {
        results.failed++;
        console.error(chalk.red(`  ✗ ${file}: ${error.message}`));
      }
    }

    console.log(chalk.green(`✓ Converted ${results.successful}/${results.totalFiles} files`));
    if (results.failed > 0) {
      console.log(chalk.yellow(`⚠ Failed: ${results.failed} files`));
    }

    return results;
  }

  /**
   * Convert all Skapa PDFs
   */
  async convertAll() {
    console.log(chalk.cyan.bold('🎨 Converting IKEA Skapa PDF Specifications to JSON\n'));

    const results = {
      foundations: null,
      components: null
    };

    // Convert foundations
    const foundationsDir = path.join(process.cwd(), 'docs/guides/Skapa-foundations');
    if (await fs.pathExists(foundationsDir)) {
      results.foundations = await this.convertDirectory(foundationsDir, 'foundations');
    }

    // Convert components
    const componentsDir = path.join(process.cwd(), 'docs/guides/Skapa-components');
    if (await fs.pathExists(componentsDir)) {
      results.components = await this.convertDirectory(componentsDir, 'components');
    }

    // Create index file
    await this.createIndex(results);

    return results;
  }

  /**
   * Create index JSON file
   */
  async createIndex(results) {
    const indexPath = path.join(this.options.outputDir, 'index.json');

    const index = {
      generated: new Date().toISOString(),
      version: '1.0.0',
      description: 'IKEA Skapa Design System - JSON Format',
      source: 'Converted from PDF specifications',
      foundations: results.foundations ? {
        count: results.foundations.successful,
        files: results.foundations.outputs.map(p => path.relative(this.options.outputDir, p))
      } : null,
      components: results.components ? {
        count: results.components.successful,
        files: results.components.outputs.map(p => path.relative(this.options.outputDir, p))
      } : null
    };

    await fs.writeJson(indexPath, index, { spaces: 2 });
    console.log(chalk.green(`\n✓ Created index: ${indexPath}`));
  }
}

module.exports = { PDFToJSONConverter };
