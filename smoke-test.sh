#!/bin/bash

# LEO Workflow Kit v2.0 - Quick Smoke Test Script
# This script creates a temporary test repository and runs leo init

set -e  # Exit on error

echo "🦁 LEO Workflow Kit v2.0 - Smoke Test"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ GitHub CLI (gh) not found. Install from https://cli.github.com/${NC}"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git not found. Please install git.${NC}"
    exit 1
fi

if ! command -v leo &> /dev/null; then
    echo -e "${RED}❌ leo command not found. Run: npm link${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites found${NC}"
echo ""

# Check version
VERSION=$(leo --version)
echo "📦 LEO Version: $VERSION"

if [ "$VERSION" != "2.0.0" ]; then
    echo -e "${YELLOW}⚠️  Warning: Expected version 2.0.0, got $VERSION${NC}"
fi
echo ""

# Check if --skip-project option exists
echo "🔍 Checking new --skip-project option..."
if leo init --help | grep -q "skip-project"; then
    echo -e "${GREEN}✓ --skip-project option found${NC}"
else
    echo -e "${RED}❌ --skip-project option not found in help${NC}"
    exit 1
fi
echo ""

# Create temporary test directory
TIMESTAMP=$(date +%s)
TEST_DIR="/tmp/leo-smoke-test-$TIMESTAMP"
REPO_NAME="leo-smoke-test-$TIMESTAMP"

echo "📁 Creating test directory: $TEST_DIR"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

# Initialize git
echo "🔧 Initializing git repository..."
git init > /dev/null 2>&1
echo "# LEO Workflow Kit Test" > README.md
git add .
git commit -m "initial commit" > /dev/null 2>&1
echo -e "${GREEN}✓ Git repository initialized${NC}"
echo ""

# Create GitHub repository
echo "🚀 Creating GitHub repository: $REPO_NAME"
if gh repo create "$REPO_NAME" --public --source=. --remote=origin --push > /dev/null 2>&1; then
    echo -e "${GREEN}✓ GitHub repository created${NC}"
    REPO_URL=$(gh repo view --json url -q .url)
    echo -e "   ${YELLOW}$REPO_URL${NC}"
else
    echo -e "${RED}❌ Failed to create GitHub repository${NC}"
    exit 1
fi
echo ""

# Run leo init with --skip-project to avoid interactive prompts
echo "🦁 Running: leo init --skip-project"
echo "   (Skipping project setup to avoid interactive prompts)"
echo ""
echo "================================================"

leo init --skip-project

echo "================================================"
echo ""

# Verify files were created
echo "✅ Verifying installation..."
ERRORS=0

if [ -d "docs" ]; then
    echo -e "${GREEN}✓ docs/ folder created${NC}"
else
    echo -e "${RED}✗ docs/ folder NOT created${NC}"
    ((ERRORS++))
fi

if [ -d "docs/specs" ]; then
    echo -e "${GREEN}✓ docs/specs/ folder created${NC}"
else
    echo -e "${RED}✗ docs/specs/ folder NOT created${NC}"
    ((ERRORS++))
fi

if [ -f "docs/specs/EXAMPLE_SPEC.md" ]; then
    echo -e "${GREEN}✓ EXAMPLE_SPEC.md created${NC}"
else
    echo -e "${RED}✗ EXAMPLE_SPEC.md NOT created${NC}"
    ((ERRORS++))
fi

if [ -d ".github/ISSUE_TEMPLATE" ]; then
    TEMPLATE_COUNT=$(ls .github/ISSUE_TEMPLATE/*.md 2>/dev/null | wc -l)
    if [ "$TEMPLATE_COUNT" -ge 8 ]; then
        echo -e "${GREEN}✓ $TEMPLATE_COUNT issue templates created${NC}"
    else
        echo -e "${YELLOW}⚠️  Only $TEMPLATE_COUNT issue templates found (expected 8)${NC}"
    fi
else
    echo -e "${RED}✗ .github/ISSUE_TEMPLATE/ folder NOT created${NC}"
    ((ERRORS++))
fi

if [ -f ".github/copilot-instructions.md" ]; then
    LINES=$(wc -l < .github/copilot-instructions.md)
    echo -e "${GREEN}✓ Copilot instructions created ($LINES lines)${NC}"
else
    echo -e "${RED}✗ Copilot instructions NOT created${NC}"
    ((ERRORS++))
fi

if [ -d ".vscode" ]; then
    echo -e "${GREEN}✓ .vscode/ folder created${NC}"
else
    echo -e "${RED}✗ .vscode/ folder NOT created${NC}"
    ((ERRORS++))
fi

if [ -f ".vscode/settings.json" ]; then
    echo -e "${GREEN}✓ VS Code settings.json created${NC}"
else
    echo -e "${RED}✗ settings.json NOT created${NC}"
    ((ERRORS++))
fi

echo ""
echo "================================================"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 SUCCESS! All tests passed!${NC}"
    echo ""
    echo "✅ LEO Workflow Kit v2.0 is working correctly"
    echo ""
    echo "📂 Test repository: $TEST_DIR"
    echo "🌐 GitHub URL: $REPO_URL"
    echo ""
    echo "🧹 To clean up, run:"
    echo "   rm -rf $TEST_DIR"
    echo "   gh repo delete $REPO_NAME --yes"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Test interactive mode manually: cd $TEST_DIR && leo init"
    echo "   2. Test with existing project: leo init --project <number>"
    echo "   3. If all tests pass, publish: npm publish"
    exit 0
else
    echo -e "${RED}❌ FAILED: $ERRORS error(s) found${NC}"
    echo ""
    echo "Test repository preserved for debugging: $TEST_DIR"
    exit 1
fi
