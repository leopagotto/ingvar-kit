#!/usr/bin/env node

/**
 * Extract CWDS Component Specifications from Figma
 *
 * This script connects to the official IKEA Ingka Co-worker Design Components Figma file
 * and extracts component specifications to generate accurate React/TypeScript templates.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=your_token node scripts/extract-cwds-from-figma.js
 *
 * Output:
 *   - templates/cwds-components/*.tsx - React component templates
 *   - templates/cwds-components/styles/*.css - Design tokens and styles
 *   - docs/guides/CWDS_FIGMA_SPECS.md - Extracted specifications
 */

const https = require('https');
const fs = require('fs').promises;
const path = require('path');

// Figma API Configuration
const FIGMA_FILE_ID = 'Zec1eGMCNeB0IkPMWs35qx';
const FIGMA_ACCESS_TOKEN = process.env.FIGMA_ACCESS_TOKEN;

if (!FIGMA_ACCESS_TOKEN) {
  console.error('❌ Error: FIGMA_ACCESS_TOKEN environment variable not set');
  console.error('   Get token from: https://www.figma.com/settings');
  process.exit(1);
}

// CWDS Component Node IDs from Figma
const CWDS_COMPONENTS = {
  'Global Header': '301:142',
  'Navigation Menu': '702:2930',
  'App Switcher': '702:2931',
  'Profile': '2941:96',
  'Bottom Bar Navigation': '2941:97'
};

/**
 * Fetch data from Figma API
 */
async function fetchFigmaAPI(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_ACCESS_TOKEN
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Failed to parse Figma response: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Extract design tokens from Figma node
 */
function extractDesignTokens(node) {
  const tokens = {
    colors: {},
    spacing: {},
    typography: {},
    borders: {},
    shadows: {}
  };

  // Extract colors
  if (node.backgroundColor) {
    const bg = node.backgroundColor;
    tokens.colors.background = rgbaToHex(bg);
  }

  if (node.fills && node.fills.length > 0) {
    node.fills.forEach((fill, i) => {
      if (fill.type === 'SOLID') {
        tokens.colors[`fill_${i}`] = rgbaToHex(fill.color);
      }
    });
  }

  // Extract spacing
  if (node.paddingLeft !== undefined) {
    tokens.spacing.paddingLeft = node.paddingLeft;
    tokens.spacing.paddingRight = node.paddingRight;
    tokens.spacing.paddingTop = node.paddingTop;
    tokens.spacing.paddingBottom = node.paddingBottom;
  }

  if (node.itemSpacing !== undefined) {
    tokens.spacing.itemSpacing = node.itemSpacing;
  }

  // Extract layout
  if (node.layoutMode) {
    tokens.layout = {
      mode: node.layoutMode,
      primaryAxisSizingMode: node.primaryAxisSizingMode,
      counterAxisSizingMode: node.counterAxisSizingMode,
      primaryAxisAlignItems: node.primaryAxisAlignItems,
      counterAxisAlignItems: node.counterAxisAlignItems
    };
  }

  // Extract dimensions
  if (node.absoluteBoundingBox) {
    tokens.dimensions = {
      width: node.absoluteBoundingBox.width,
      height: node.absoluteBoundingBox.height
    };
  }

  return tokens;
}

/**
 * Convert RGBA object to hex color
 */
function rgbaToHex(rgba) {
  const r = Math.round(rgba.r * 255).toString(16).padStart(2, '0');
  const g = Math.round(rgba.g * 255).toString(16).padStart(2, '0');
  const b = Math.round(rgba.b * 255).toString(16).padStart(2, '0');
  const hex = `#${r}${g}${b}`;

  if (rgba.a !== undefined && rgba.a < 1) {
    const a = Math.round(rgba.a * 255).toString(16).padStart(2, '0');
    return `${hex}${a}`;
  }

  return hex;
}

/**
 * Extract component hierarchy
 */
function extractComponentHierarchy(node, depth = 0) {
  const info = {
    name: node.name,
    type: node.type,
    id: node.id,
    depth
  };

  // Component properties
  if (node.componentPropertyDefinitions) {
    info.properties = node.componentPropertyDefinitions;
  }

  // Children
  if (node.children && node.children.length > 0) {
    info.children = node.children.map(child =>
      extractComponentHierarchy(child, depth + 1)
    );
  }

  return info;
}

/**
 * Main extraction logic
 */
async function main() {
  console.log('🎨 Extracting CWDS Components from Figma...\n');

  // Create output directories
  const outputDir = path.join(__dirname, '../templates/cwds-components');
  const stylesDir = path.join(outputDir, 'styles');
  const docsDir = path.join(__dirname, '../docs/guides');

  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(stylesDir, { recursive: true });
  await fs.mkdir(docsDir, { recursive: true });

  const extractedData = {};

  // Fetch file structure first
  console.log('📡 Fetching Figma file structure...');
  const fileData = await fetchFigmaAPI(`/v1/files/${FIGMA_FILE_ID}`);
  console.log(`✅ File: ${fileData.name}\n`);

  // Extract each CWDS component
  for (const [componentName, nodeId] of Object.entries(CWDS_COMPONENTS)) {
    console.log(`📦 Extracting: ${componentName} (${nodeId})`);

    try {
      const nodeData = await fetchFigmaAPI(`/v1/files/${FIGMA_FILE_ID}/nodes?ids=${nodeId}`);
      const node = nodeData.nodes[nodeId]?.document;

      if (!node) {
        console.log(`   ⚠️  Node not found: ${nodeId}`);
        continue;
      }

      // Extract specifications
      const tokens = extractDesignTokens(node);
      const hierarchy = extractComponentHierarchy(node);

      extractedData[componentName] = {
        nodeId,
        tokens,
        hierarchy,
        figmaUrl: `https://www.figma.com/design/${FIGMA_FILE_ID}?node-id=${nodeId.replace(':', '-')}`
      };

      console.log(`   ✅ Extracted design tokens and hierarchy`);

    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }

  // Save extracted data
  const dataFile = path.join(docsDir, 'CWDS_FIGMA_SPECS.json');
  await fs.writeFile(dataFile, JSON.stringify(extractedData, null, 2));
  console.log(`\n💾 Saved specifications: ${dataFile}`);

  // Generate markdown documentation
  const markdown = generateMarkdownDocs(extractedData);
  const docsFile = path.join(docsDir, 'CWDS_FIGMA_SPECS.md');
  await fs.writeFile(docsFile, markdown);
  console.log(`📄 Generated documentation: ${docsFile}`);

  // Generate CSS design tokens
  const css = generateCSSTokens(extractedData);
  const cssFile = path.join(stylesDir, 'cwds-tokens.css');
  await fs.writeFile(cssFile, css);
  console.log(`🎨 Generated design tokens: ${cssFile}`);

  console.log('\n✨ Extraction complete!');
  console.log('\nNext steps:');
  console.log('1. Review extracted specifications in docs/guides/CWDS_FIGMA_SPECS.md');
  console.log('2. Run: node scripts/generate-cwds-templates.js');
  console.log('3. Test templates: ingvar init (select CWDS design system)');
}

/**
 * Generate markdown documentation
 */
function generateMarkdownDocs(data) {
  let md = '# CWDS Component Specifications from Figma\n\n';
  md += '> **Source of Truth**: Official IKEA Ingka Co-worker Design Components Figma file\n';
  md += '> **Last Updated**: ' + new Date().toISOString().split('T')[0] + '\n\n';
  md += '---\n\n';

  for (const [componentName, specs] of Object.entries(data)) {
    md += `## ${componentName}\n\n`;
    md += `**Figma Node**: \`${specs.nodeId}\`  \n`;
    md += `**Figma Link**: [View in Figma](${specs.figmaUrl})\n\n`;

    // Design Tokens
    md += `### Design Tokens\n\n`;
    if (specs.tokens.colors && Object.keys(specs.tokens.colors).length > 0) {
      md += `**Colors:**\n`;
      for (const [key, value] of Object.entries(specs.tokens.colors)) {
        md += `- \`${key}\`: ${value}\n`;
      }
      md += '\n';
    }

    if (specs.tokens.spacing && Object.keys(specs.tokens.spacing).length > 0) {
      md += `**Spacing:**\n`;
      for (const [key, value] of Object.entries(specs.tokens.spacing)) {
        md += `- \`${key}\`: ${value}px\n`;
      }
      md += '\n';
    }

    if (specs.tokens.dimensions) {
      md += `**Dimensions:**\n`;
      md += `- Width: ${specs.tokens.dimensions.width}px\n`;
      md += `- Height: ${specs.tokens.dimensions.height}px\n\n`;
    }

    // Component Hierarchy
    md += `### Component Structure\n\n`;
    md += '```\n';
    md += formatHierarchy(specs.hierarchy);
    md += '```\n\n';

    md += '---\n\n';
  }

  return md;
}

/**
 * Format component hierarchy as ASCII tree
 */
function formatHierarchy(node, prefix = '', isLast = true) {
  let output = '';
  const connector = isLast ? '└── ' : '├── ';
  output += prefix + connector + node.name + ` (${node.type})\n`;

  if (node.children && node.children.length > 0) {
    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    node.children.forEach((child, i) => {
      output += formatHierarchy(child, newPrefix, i === node.children.length - 1);
    });
  }

  return output;
}

/**
 * Generate CSS design tokens
 */
function generateCSSTokens(data) {
  let css = '/**\n';
  css += ' * CWDS Design Tokens\n';
  css += ' * Extracted from Figma: Ingka Co-worker Design Components\n';
  css += ' * DO NOT EDIT MANUALLY - Generated by scripts/extract-cwds-from-figma.js\n';
  css += ' */\n\n';
  css += ':root {\n';

  // Collect all unique colors
  const allColors = new Set();
  for (const specs of Object.values(data)) {
    if (specs.tokens.colors) {
      Object.values(specs.tokens.colors).forEach(color => allColors.add(color));
    }
  }

  // Generate CSS variables
  let colorIndex = 0;
  for (const color of allColors) {
    css += `  --cwds-color-${colorIndex++}: ${color};\n`;
  }

  css += '\n';

  // Spacing tokens
  const spacingValues = new Set();
  for (const specs of Object.values(data)) {
    if (specs.tokens.spacing) {
      Object.values(specs.tokens.spacing).forEach(val => {
        if (typeof val === 'number') spacingValues.add(val);
      });
    }
  }

  for (const spacing of Array.from(spacingValues).sort((a, b) => a - b)) {
    css += `  --cwds-spacing-${spacing}: ${spacing}px;\n`;
  }

  css += '}\n';

  return css;
}

// Run extraction
main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
