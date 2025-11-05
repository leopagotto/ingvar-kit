#!/usr/bin/env node

/**
 * Skapa Components - Direct Import Test
 * 
 * This script tests that all @ingka package exports
 * can be imported successfully from ingka-direct.ts
 */

console.log('🧪 Testing @ingka Direct Imports...\n');

async function testImports() {
  const results = {
    passed: [],
    failed: [],
  };

  // Test cases: [componentName, importName]
  const testCases = [
    // LAYOUT
    ['Accordion', 'Accordion'],
    ['Avatar', 'Avatar'],
    ['Card', 'Card'],
    ['CompactCard', 'CompactCard'],
    ['Image', 'Image'],
    ['List', 'List'],
    ['MemberCard', 'MemberCard'],
    ['Rating', 'Rating'],
    ['ShoppableImage', 'ShoppableImage'],
    ['SimpleVideo', 'SimpleVideo'],
    ['Table', 'Table'],
    ['Tabs', 'Tabs'],
    ['Teaser', 'Teaser'],
    ['Text', 'Text'],
    ['TextOverlayCard', 'TextOverlayCard'],
    
    // ACTIONS
    ['Button', 'Button'],
    ['DualButton', 'DualButton'],
    ['JumboButton', 'JumboButton'],
    ['Pill', 'Pill'],
    
    // INPUTS
    ['Checkbox', 'Checkbox'],
    ['Choice', 'Choice'],
    ['Combobox', 'Combobox'],
    ['InputField', 'InputField'],
    ['QuantityStepper', 'QuantityStepper'],
    ['RadioButton', 'RadioButton'],
    ['Search', 'Search'],
    ['SegmentedControl', 'SegmentedControl'],
    ['Select', 'Select'],
    ['Slider', 'Slider'],
    ['Switch', 'Switch'],
    ['TextArea', 'TextArea'],
    ['Toggle', 'Toggle'],
    
    // INDICATORS
    ['Badge', 'Badge'],
    ['Loading', 'Loading'],
    ['ProgressIndicator', 'ProgressIndicator'],
    ['Skeleton', 'Skeleton'],
    ['Status', 'Status'],
    
    // MESSAGES
    ['Banner', 'Banner'],
    ['HelperText', 'HelperText'],
    ['InlineMessage', 'InlineMessage'],
    ['Modal', 'Modal'],
    ['Toast', 'Toast'],
    
    // NAVIGATION
    ['Breadcrumb', 'Breadcrumb'],
    ['Hyperlink', 'Hyperlink'],
    ['Tag', 'Tag'],
    
    // CONTAINERS
    ['AspectRatioBox', 'AspectRatioBox'],
    ['Carousel', 'Carousel'],
    ['EndorsementLabel', 'EndorsementLabel'],
    ['Expander', 'Expander'],
    ['ListBox', 'ListBox'],
    ['ListView', 'ListView'],
    ['PaymentLogo', 'PaymentLogo'],
    ['SkipContent', 'SkipContent'],
    ['Tooltip', 'Tooltip'],
    
    // PRODUCT
    ['Price', 'Price'],
    ['PriceModule', 'PriceModule'],
    ['ProductIdentifier', 'ProductIdentifier'],
    
    // FOUNDATION
    ['Icon', 'Icon'],
  ];

  console.log(`Testing ${testCases.length} components...\n`);

  for (const [componentName, importName] of testCases) {
    try {
      const module = await import('../dist/index.esm.js');
      
      if (module[importName]) {
        results.passed.push(componentName);
        process.stdout.write('✅ ');
      } else {
        results.failed.push(`${componentName} (not exported)`);
        process.stdout.write('❌ ');
      }
    } catch (error) {
      results.failed.push(`${componentName} (${error.message})`);
      process.stdout.write('❌ ');
    }
  }

  console.log('\n\n📊 Test Results:\n');
  console.log(`✅ Passed: ${results.passed.length}/${testCases.length}`);
  console.log(`❌ Failed: ${results.failed.length}/${testCases.length}`);
  
  if (results.failed.length > 0) {
    console.log('\n❌ Failed imports:');
    results.failed.forEach(name => console.log(`  - ${name}`));
    process.exit(1);
  } else {
    console.log('\n🎉 All imports successful!');
    console.log('\n📦 Components available:');
    results.passed.slice(0, 10).forEach(name => console.log(`  - ${name}`));
    if (results.passed.length > 10) {
      console.log(`  ... and ${results.passed.length - 10} more`);
    }
    process.exit(0);
  }
}

testImports().catch(error => {
  console.error('\n❌ Test failed:', error);
  process.exit(1);
});
