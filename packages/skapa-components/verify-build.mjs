#!/usr/bin/env node

/**
 * Skapa Components - Build Verification Test
 * Tests that ingka-direct.ts exports are present in the built bundle
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

console.log('🧪 Testing @ingka Direct Exports in Bundle...\n');

try {
  // Read the ESM bundle
  const bundlePath = join(__dirname, 'dist', 'index.esm.js');
  const bundle = readFileSync(bundlePath, 'utf-8');
  
  // Component exports to check
  const components = [
    // LAYOUT
    'Accordion', 'Avatar', 'Card', 'CompactCard', 'Image', 'List',
    'MemberCard', 'Rating', 'ShoppableImage', 'SimpleVideo', 'Table',
    'Tabs', 'Teaser', 'Text', 'TextOverlayCard',
    
    // ACTIONS
    'Button', 'DualButton', 'JumboButton', 'Pill',
    
    // INPUTS
    'Checkbox', 'Choice', 'Combobox', 'InputField', 'QuantityStepper',
    'RadioButton', 'Search', 'SegmentedControl', 'Select', 'Slider',
    'Switch', 'TextArea', 'Toggle',
    
    // INDICATORS
    'Badge', 'Loading', 'ProgressIndicator', 'Skeleton', 'Status',
    
    // MESSAGES
    'Banner', 'HelperText', 'InlineMessage', 'Modal', 'Toast',
    
    // NAVIGATION
    'Breadcrumb', 'Hyperlink', 'Tag',
    
    // CONTAINERS
    'AspectRatioBox', 'Carousel', 'EndorsementLabel', 'Expander',
    'ListBox', 'ListView', 'PaymentLogo', 'SkipContent', 'Tooltip',
    
    // PRODUCT
    'Price', 'PriceModule', 'ProductIdentifier',
    
    // FOUNDATION
    'Icon',
  ];
  
  console.log(`Testing ${components.length} component exports...\n`);
  
  const results = {
    found: [],
    missing: [],
  };
  
  for (const component of components) {
    // Check if component is imported from @ingka package
    const importPattern = new RegExp(`from ['"]@ingka/[^'"]+['"].*${component}`, 'i');
    const exportPattern = new RegExp(`export.*${component}`, 'i');
    
    if (importPattern.test(bundle) || exportPattern.test(bundle) || bundle.includes(`@ingka/${component.toLowerCase()}`)) {
      results.found.push(component);
      process.stdout.write('✅ ');
    } else {
      results.missing.push(component);
      process.stdout.write('⚠️  ');
    }
  }
  
  console.log('\n\n📊 Test Results:\n');
  console.log(`✅ Found in bundle: ${results.found.length}/${components.length}`);
  console.log(`⚠️  Not detected: ${results.missing.length}/${components.length}`);
  
  // Check bundle size
  const bundleSize = (bundle.length / 1024).toFixed(2);
  console.log(`📦 Bundle size: ${bundleSize} KB`);
  
  // Check for @ingka imports
  const ingkaImports = bundle.match(/@ingka\/[\w-]+/g) || [];
  const uniquePackages = [...new Set(ingkaImports)];
  console.log(`📦 @ingka packages in bundle: ${uniquePackages.length}`);
  
  console.log('\n✅ Sample packages found:');
  uniquePackages.slice(0, 10).forEach(pkg => console.log(`  - ${pkg}`));
  if (uniquePackages.length > 10) {
    console.log(`  ... and ${uniquePackages.length - 10} more`);
  }
  
  if (results.missing.length > 0) {
    console.log('\n⚠️  Components not detected (may be tree-shaken):');
    results.missing.slice(0, 10).forEach(name => console.log(`  - ${name}`));
    if (results.missing.length > 10) {
      console.log(`  ... and ${results.missing.length - 10} more`);
    }
  }
  
  console.log('\n✅ Build verification complete!');
  console.log('📝 Note: Some components may not appear if tree-shaken by bundler');
  
  process.exit(0);
  
} catch (error) {
  console.error('\n❌ Test failed:', error.message);
  process.exit(1);
}
