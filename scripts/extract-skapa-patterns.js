#!/usr/bin/env node

/**
 * Extract Skapa Design Patterns from Screenshots
 *
 * This script uses Tesseract OCR to extract text content from Skapa pattern
 * screenshots and generates JSON specifications for AI agent documentation.
 *
 * Usage:
 *   node scripts/extract-skapa-patterns.js
 *
 * Requirements:
 *   - tesseract (install: brew install tesseract)
 *   - node-tesseract-ocr package
 *
 * Input:
 *   docs/guides/Skapa-patterns/*.png
 *
 * Output:
 *   docs/guides/Skapa-json/patterns/*.json
 */

const { exec } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');

const execAsync = promisify(exec);

// Directories
const PATTERNS_DIR = path.join(__dirname, '../docs/guides/Skapa-patterns');
const OUTPUT_DIR = path.join(__dirname, '../docs/guides/Skapa-json/patterns');

/**
 * Extract text from image using Tesseract OCR
 */
async function extractTextFromImage(imagePath) {
  try {
    console.log(`📸 Extracting text from: ${path.basename(imagePath)}`);

    // Use tesseract CLI directly
    const { stdout, stderr } = await execAsync(
      `tesseract "${imagePath}" stdout --psm 6`
    );

    if (stderr && !stderr.includes('Tesseract Open Source')) {
      console.warn(`⚠️  Warning: ${stderr}`);
    }

    return stdout.trim();
  } catch (error) {
    console.error(`❌ Error extracting from ${imagePath}:`, error.message);
    return '';
  }
}

/**
 * Parse pattern name from filename
 * Example: screencapture-skapa-ikea-net-patterns-dark-mode-2025-11-04-16_49_28.png
 * Returns: "Dark Mode"
 */
function parsePatternName(filename) {
  const match = filename.match(/patterns-([a-z-]+)-\d{4}/);
  if (match) {
    // Convert kebab-case to Title Case
    return match[1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fallback: use filename without extension
  return path.basename(filename, path.extname(filename))
    .replace(/screencapture-skapa-ikea-net-patterns-/, '')
    .replace(/-\d{4}.*$/, '')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Extract best practices from OCR text
 */
function extractBestPractices(text) {
  const practices = [];
  const lines = text.split('\n');

  let inBestPractices = false;
  let currentPractice = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Start of best practices section
    if (/^(—|–|-)\s*(Best practices?|Guidelines?|Principles?)/i.test(trimmed)) {
      inBestPractices = true;
      continue;
    }

    // End of best practices section
    if (inBestPractices && /^(Up next|Examples?|Code)/i.test(trimmed)) {
      inBestPractices = false;
      if (currentPractice.length > 0) {
        practices.push(currentPractice.join(' ').trim());
        currentPractice = [];
      }
      break;
    }

    // Collect best practice lines
    if (inBestPractices && trimmed.length > 0) {
      // New practice starts with heading
      if (/^[A-Z]/.test(trimmed) && !/^[a-z]/.test(trimmed.charAt(1))) {
        if (currentPractice.length > 0) {
          practices.push(currentPractice.join(' ').trim());
        }
        currentPractice = [trimmed];
      } else {
        currentPractice.push(trimmed);
      }
    }
  }

  // Add last practice
  if (currentPractice.length > 0) {
    practices.push(currentPractice.join(' ').trim());
  }

  return practices;
}

/**
 * Create JSON specification from extracted text
 */
function createPatternSpec(filename, rawText) {
  const patternName = parsePatternName(filename);
  const lines = rawText.split('\n').filter(line => line.trim().length > 0);
  const bestPractices = extractBestPractices(rawText);

  // Extract description (usually first meaningful paragraph)
  let description = '';
  for (let i = 0; i < Math.min(lines.length, 20); i++) {
    const line = lines[i].trim();
    if (line.length > 50 && !line.includes('Skapa') && !line.includes('Search')) {
      description = line;
      break;
    }
  }

  return {
    name: patternName,
    category: 'Skapa-patterns',
    source: `Screenshot from skapa.ikea.net`,
    extractedAt: new Date().toISOString(),
    extractionMethod: 'tesseract-ocr',
    description: description || `${patternName} design pattern specifications`,
    type: 'pattern',
    bestPractices: bestPractices.length > 0 ? bestPractices : undefined,
    content: {
      rawText,
      lines
    }
  };
}

/**
 * Main execution
 */
async function main() {
  console.log('🎨 Skapa Pattern Extraction Tool\n');

  // Check if tesseract is installed
  try {
    await execAsync('tesseract --version');
  } catch (error) {
    console.error('❌ Error: Tesseract OCR is not installed');
    console.error('   Install with: brew install tesseract');
    process.exit(1);
  }

  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Get all PNG files from patterns directory
  const files = await fs.readdir(PATTERNS_DIR);
  const imageFiles = files.filter(f => f.endsWith('.png'));

  console.log(`📂 Found ${imageFiles.length} pattern screenshots\n`);

  let extracted = 0;
  let failed = 0;

  // Process each image
  for (const filename of imageFiles) {
    const imagePath = path.join(PATTERNS_DIR, filename);

    try {
      // Extract text using OCR
      const rawText = await extractTextFromImage(imagePath);

      if (!rawText || rawText.length < 50) {
        console.warn(`⚠️  Warning: Minimal text extracted from ${filename}`);
        failed++;
        continue;
      }

      // Create JSON specification
      const spec = createPatternSpec(filename, rawText);

      // Generate output filename
      const outputFilename = `${spec.name.replace(/\s+/g, '-')}.json`;
      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      // Write JSON file
      await fs.writeFile(outputPath, JSON.stringify(spec, null, 2));

      console.log(`✅ Extracted: ${spec.name} (${rawText.length} chars)`);
      extracted++;

    } catch (error) {
      console.error(`❌ Failed to process ${filename}:`, error.message);
      failed++;
    }
  }

  console.log(`\n📊 Extraction Complete:`);
  console.log(`   ✅ Successful: ${extracted}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📁 Output: ${OUTPUT_DIR}`);

  if (extracted > 0) {
    console.log(`\n🎉 Pattern JSON files created successfully!`);
    console.log(`   Next step: Document patterns in docs/ai-agents/skapa-design-system/`);
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
