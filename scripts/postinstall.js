#!/usr/bin/env node

const { welcomeMessage } = require('../lib/banner');

// Show welcome message after installation
// Note: npm suppresses output for global installs, so this mainly works for local installs
// For global installs, the welcome message shows on first command run
try {
  console.log(welcomeMessage);
} catch (error) {
  // Silently fail if there are issues (e.g., during npm publish)
}
