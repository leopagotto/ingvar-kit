#!/bin/bash

# LEO Workflow Kit - Installation Verification Script
# Version: 2.0.3
# Author: Leo de Souza

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║        🦁  LEO Workflow Kit - Installation Verification      ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Counter for passed tests
PASSED=0
FAILED=0

# Test function
test_command() {
  local description=$1
  local command=$2
  
  echo -n "Testing: $description... "
  
  if eval "$command" > /dev/null 2>&1; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC}"
    ((FAILED++))
    return 1
  fi
}

# Test function with output check
test_command_output() {
  local description=$1
  local command=$2
  local expected=$3
  
  echo -n "Testing: $description... "
  
  OUTPUT=$(eval "$command" 2>&1)
  
  if echo "$OUTPUT" | grep -q "$expected"; then
    echo -e "${GREEN}✓ PASS${NC}"
    ((PASSED++))
    return 0
  else
    echo -e "${RED}✗ FAIL${NC}"
    echo "  Expected: $expected"
    echo "  Got: $OUTPUT"
    ((FAILED++))
    return 1
  fi
}

echo -e "${CYAN}Running installation verification tests...${NC}"
echo ""

# Test 1: Check if leo command exists
test_command "leo command is available" "which leo"

# Test 2: Check version
test_command_output "leo version is correct" "leo --version" "2.0.3"

# Test 3: Check help command
test_command "leo help works" "leo --help"

# Test 4: Check welcome command
test_command "leo welcome command exists" "leo welcome | head -1"

# Test 5: Check welcome alias
test_command "leo w alias works" "leo w | head -1"

# Test 6: Check init command (list only)
test_command "leo init command exists" "leo --help | grep -q 'init'"

# Test 7: Check issue command
test_command "leo issue command exists" "leo --help | grep -q 'issue'"

# Test 8: Check labels command
test_command "leo labels command exists" "leo --help | grep -q 'labels'"

# Test 9: Check vscode command
test_command "leo vscode command exists" "leo --help | grep -q 'vscode'"

# Test 10: Check status command
test_command "leo status command exists" "leo --help | grep -q 'status'"

# Test 11: Check docs command
test_command "leo docs command exists" "leo --help | grep -q 'docs'"

# Test 12: Check installation tracking file
test_command "Installation tracking file exists" "test -f ~/.leo-workflow/.last-install"

# Test 13: Verify banner displays
test_command "Banner displays on help" "leo 2>&1 | grep -q 'GitHub Workflow'"

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                     Verification Results                     ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo -e "  ${GREEN}Passed: $PASSED${NC}"
echo -e "  ${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All tests passed! LEO Workflow Kit is properly installed.${NC}"
  echo ""
  echo -e "${CYAN}Next steps:${NC}"
  echo "  1. Navigate to your project directory"
  echo "  2. Run: leo init"
  echo "  3. Follow the interactive setup"
  echo ""
  echo -e "💡 For help anytime, run: ${YELLOW}leo welcome${NC}"
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please check your installation.${NC}"
  echo ""
  echo -e "${YELLOW}To reinstall:${NC}"
  echo "  npm uninstall -g leo-workflow-kit"
  echo "  npm install -g leo-workflow-kit"
  exit 1
fi
