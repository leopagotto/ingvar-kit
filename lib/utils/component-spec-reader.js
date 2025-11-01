#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

/**
 * Component Specification Reader
 *
 * Reads IKEA Skapa Design System component specifications from JSON files
 * with PDF fallback support. Used by AI code generators to ensure correct
 * component implementation following design system guidelines.
 */

const SKAPA_JSON_DIR = path.join(__dirname, '../../docs/guides/Skapa-json');
const SKAPA_SS_DIR = path.join(__dirname, '../../docs/guides/Skapa SS');

/**
 * Component spec cache to avoid repeated file reads
 */
const specCache = new Map();

/**
 * Read component specification from JSON file
 *
 * @param {string} componentName - Component name (e.g., 'button', 'card', 'input-field')
 * @returns {Promise<Object|null>} Component specification or null if not found
 */
async function readComponentSpec(componentName) {
  // Check cache first
  const cacheKey = componentName.toLowerCase();
  if (specCache.has(cacheKey)) {
    return specCache.get(cacheKey);
  }

  // Normalize component name (handle various formats)
  const normalizedName = normalizeComponentName(componentName);

  // Try to find JSON file
  const jsonPath = path.join(SKAPA_JSON_DIR, 'components', `${normalizedName}.json`);

  try {
    if (await fs.pathExists(jsonPath)) {
      const spec = await fs.readJson(jsonPath);
      specCache.set(cacheKey, spec);
      return spec;
    }
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Could not read JSON spec for ${componentName}: ${error.message}`));
  }

  // Try PDF fallback
  const pdfFallback = await tryPDFfallback(normalizedName);
  if (pdfFallback) {
    specCache.set(cacheKey, pdfFallback);
    return pdfFallback;
  }

  console.warn(chalk.yellow(`⚠️  No specification found for component: ${componentName}`));
  return null;
}

/**
 * Read foundation specification (colors, typography, spacing, etc.)
 *
 * @param {string} foundationName - Foundation name (e.g., 'spacing', 'typography-system')
 * @returns {Promise<Object|null>} Foundation specification or null if not found
 */
async function readFoundationSpec(foundationName) {
  const cacheKey = `foundation:${foundationName.toLowerCase()}`;
  if (specCache.has(cacheKey)) {
    return specCache.get(cacheKey);
  }

  const normalizedName = normalizeComponentName(foundationName);
  const jsonPath = path.join(SKAPA_JSON_DIR, 'foundations', `${normalizedName}.json`);

  try {
    if (await fs.pathExists(jsonPath)) {
      const spec = await fs.readJson(jsonPath);
      specCache.set(cacheKey, spec);
      return spec;
    }
  } catch (error) {
    console.warn(chalk.yellow(`⚠️  Could not read foundation spec for ${foundationName}: ${error.message}`));
  }

  return null;
}

/**
 * Read multiple component specs at once
 *
 * @param {string[]} componentNames - Array of component names
 * @returns {Promise<Object>} Map of component names to specifications
 */
async function readComponentSpecs(componentNames) {
  const specs = {};

  await Promise.all(
    componentNames.map(async (name) => {
      const spec = await readComponentSpec(name);
      if (spec) {
        specs[name] = spec;
      }
    })
  );

  return specs;
}

/**
 * Get component usage guidelines from spec
 *
 * @param {Object} spec - Component specification
 * @returns {string} Formatted usage guidelines
 */
function extractUsageGuidelines(spec) {
  if (!spec || !spec.content) return '';

  const { content } = spec;
  const lines = content.lines || [];

  // Extract key sections: variants, states, usage, anatomy
  const guidelines = [];

  if (spec.variants && spec.variants.length > 0) {
    guidelines.push('**Variants:**');
    spec.variants.forEach(v => {
      guidelines.push(`  - ${v.name}${v.description ? ': ' + v.description : ''}`);
    });
  }

  if (spec.states && spec.states.length > 0) {
    guidelines.push('\n**States:**');
    spec.states.forEach(s => {
      guidelines.push(`  - ${s.name}${s.description ? ': ' + s.description : ''}`);
    });
  }

  // Look for usage patterns in content
  const usageSection = findSection(lines, ['Usage', 'Behaviours', 'Best practices']);
  if (usageSection.length > 0) {
    guidelines.push('\n**Usage Guidelines:**');
    usageSection.slice(0, 10).forEach(line => {
      if (line.trim()) guidelines.push(`  ${line.trim()}`);
    });
  }

  return guidelines.join('\n');
}

/**
 * Get component properties and API from spec
 *
 * @param {Object} spec - Component specification
 * @returns {string} Formatted component API
 */
function extractComponentAPI(spec) {
  if (!spec) return '';

  const api = [];

  api.push(`**Component:** ${spec.name}`);
  api.push(`**Category:** ${spec.category || 'Skapa-components'}`);

  if (spec.description) {
    api.push(`**Description:** ${spec.description}`);
  }

  if (spec.variants && spec.variants.length > 0) {
    api.push(`\n**Available Variants:** ${spec.variants.map(v => v.name).join(', ')}`);
  }

  if (spec.states && spec.states.length > 0) {
    api.push(`**Available States:** ${spec.states.map(s => s.name).join(', ')}`);
  }

  if (spec.props && spec.props.length > 0) {
    api.push('\n**Props:**');
    spec.props.forEach(prop => {
      api.push(`  - ${prop.name}: ${prop.type || 'any'}${prop.required ? ' (required)' : ''}`);
      if (prop.description) api.push(`    ${prop.description}`);
    });
  }

  return api.join('\n');
}

/**
 * Create AI-friendly spec summary for code generation
 *
 * @param {string} componentName - Component name
 * @returns {Promise<string>} AI-friendly specification text
 */
async function getSpecForAI(componentName) {
  const spec = await readComponentSpec(componentName);

  if (!spec) {
    return `Component "${componentName}" specification not found. Please implement based on general IKEA design principles.`;
  }

  const summary = [];

  summary.push(`# ${spec.name} Component Specification`);
  summary.push('');
  summary.push(extractComponentAPI(spec));
  summary.push('');
  summary.push(extractUsageGuidelines(spec));
  summary.push('');

  if (spec.content && spec.content.rawText) {
    // Add excerpt from raw text (first 500 chars)
    const excerpt = spec.content.rawText.substring(0, 500).trim();
    summary.push('**Additional Context:**');
    summary.push(excerpt);
    if (spec.content.rawText.length > 500) {
      summary.push('...(truncated)');
    }
  }

  summary.push('');
  summary.push(`**Source:** ${spec.source || 'Skapa Design System'}`);
  summary.push(`**Extracted:** ${spec.extractedAt || 'N/A'}`);

  return summary.join('\n');
}

/**
 * Get specs for multiple components formatted for AI
 *
 * @param {string[]} componentNames - Array of component names
 * @returns {Promise<string>} Combined AI-friendly specs
 */
async function getSpecsForAI(componentNames) {
  const specs = await Promise.all(
    componentNames.map(name => getSpecForAI(name))
  );

  return specs.join('\n\n---\n\n');
}

/**
 * Helper: Normalize component name for file lookup
 */
function normalizeComponentName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .replace(/button$/i, 'Button')  // Preserve Button suffix capitalization
    .replace(/field$/i, 'field')    // Preserve field suffix
    .replace(/card$/i, 'Card');     // Preserve Card suffix
}

/**
 * Helper: Find section in lines array
 */
function findSection(lines, sectionNames) {
  const section = [];
  let inSection = false;
  let sectionName = '';

  for (const line of lines) {
    // Check if line matches section header
    if (sectionNames.some(name => line.includes(name))) {
      inSection = true;
      sectionName = line;
      continue;
    }

    // Stop at next major section
    if (inSection && /^[A-Z][a-z]+/.test(line) && !line.startsWith(' ')) {
      break;
    }

    if (inSection) {
      section.push(line);
    }
  }

  return section;
}

/**
 * Try to read PDF as fallback (placeholder for future implementation)
 */
async function tryPDFfallback(componentName) {
  // Check if PDF exists in Skapa SS directory
  const pdfPath = path.join(SKAPA_SS_DIR, `${componentName}.pdf`);

  if (await fs.pathExists(pdfPath)) {
    console.log(chalk.blue(`ℹ️  Found PDF spec for ${componentName}, use JSON files for better parsing`));
    return {
      name: componentName,
      source: 'PDF (fallback)',
      message: 'PDF spec found but not parsed. Use JSON specs for full details.',
      pdfPath
    };
  }

  return null;
}

/**
 * Clear the spec cache (useful for testing)
 */
function clearCache() {
  specCache.clear();
}

/**
 * List all available component specs
 */
async function listAvailableSpecs() {
  const componentsDir = path.join(SKAPA_JSON_DIR, 'components');
  const foundationsDir = path.join(SKAPA_JSON_DIR, 'foundations');

  const components = await fs.readdir(componentsDir);
  const foundations = await fs.readdir(foundationsDir);

  return {
    components: components
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', '')),
    foundations: foundations
      .filter(f => f.endsWith('.json'))
      .map(f => f.replace('.json', ''))
  };
}

module.exports = {
  readComponentSpec,
  readFoundationSpec,
  readComponentSpecs,
  extractUsageGuidelines,
  extractComponentAPI,
  getSpecForAI,
  getSpecsForAI,
  clearCache,
  listAvailableSpecs
};
