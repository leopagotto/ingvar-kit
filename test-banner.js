#!/usr/bin/env node

const banner = require('./lib/banner');

console.log('\n=== FULL BANNER ===');
console.log(banner.getBanner());

console.log('\n=== COMPACT BANNER ===');
console.log(banner.compactBanner);

console.log('\n=== WELCOME MESSAGE (FIRST RUN) ===');
console.log(banner.welcomeMessage);
