#!/bin/bash
# LEO Workflow Kit - Automated Wiki Deployment Script
# This script automatically pushes wiki content to the GitHub repository wiki

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_URL="https://github.com/leonpagotto/leo-kit.wiki.git"
WIKI_DIR="./wiki"
TEMP_WIKI_CLONE="/tmp/leo-kit-wiki"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  LEO Workflow Kit - Wiki Deployment${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

# Check if wiki directory exists
if [ ! -d "$WIKI_DIR" ]; then
    echo -e "${RED}✗ Wiki directory not found: $WIKI_DIR${NC}"
    exit 1
fi

# Check if gh CLI is authenticated (check for any active account)
if ! gh auth status 2>&1 | grep -q "Logged in to github.com"; then
    echo -e "${RED}✗ GitHub CLI not authenticated${NC}"
    echo -e "${YELLOW}  Run: gh auth login${NC}"
    exit 1
fi

echo -e "${GREEN}✓ GitHub CLI authenticated${NC}"

# Count wiki files (excluding README.md)
WIKI_FILES=$(find "$WIKI_DIR" -name "*.md" ! -name "README.md" | wc -l | tr -d ' ')
echo -e "${GREEN}✓ Found $WIKI_FILES wiki pages to deploy${NC}\n"

# Clean up any existing temp directory
if [ -d "$TEMP_WIKI_CLONE" ]; then
    echo -e "${YELLOW}Cleaning up previous wiki clone...${NC}"
    rm -rf "$TEMP_WIKI_CLONE"
fi

# Clone the wiki repository
echo -e "${BLUE}📥 Cloning wiki repository...${NC}"
if git clone "$REPO_URL" "$TEMP_WIKI_CLONE" 2>/dev/null; then
    echo -e "${GREEN}✓ Wiki repository cloned${NC}"
else
    echo -e "${YELLOW}⚠ Wiki repository doesn't exist yet, will be created on first push${NC}"
    mkdir -p "$TEMP_WIKI_CLONE"
    cd "$TEMP_WIKI_CLONE"
    git init
    git remote add origin "$REPO_URL"
    cd - > /dev/null
fi

# Copy wiki files to the cloned repository (excluding README.md)
echo -e "\n${BLUE}📝 Copying wiki content...${NC}"

# Get the absolute path to the wiki directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"
WIKI_SOURCE="$PROJECT_ROOT/$WIKI_DIR"

cd "$TEMP_WIKI_CLONE"

# Copy all markdown files except README.md
for file in "$WIKI_SOURCE"/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        if [ "$filename" != "README.md" ]; then
            cp "$file" .
            echo -e "${GREEN}  ✓ Copied: $filename${NC}"
        fi
    fi
done

# Check if there are changes to commit
if [ -z "$(git status --porcelain)" ]; then
    echo -e "\n${YELLOW}⚠ No changes detected - wiki is already up to date${NC}"
    cd - > /dev/null
    rm -rf "$TEMP_WIKI_CLONE"
    exit 0
fi

# Stage all changes
git add .

# Get the current package version
PACKAGE_VERSION=$(node -e "console.log(require('$PROJECT_ROOT/package.json').version)")

# Commit changes
echo -e "\n${BLUE}💾 Committing changes...${NC}"
git commit -m "docs: update wiki for LEO Workflow Kit v${PACKAGE_VERSION}

Deployed wiki pages:
$(git diff --cached --name-only | sed 's/^/- /')"

echo -e "${GREEN}✓ Changes committed${NC}"

# Push to GitHub
echo -e "\n${BLUE}🚀 Pushing to GitHub wiki...${NC}"

# Try master branch first, then main
PUSH_OUTPUT=$(git push -u origin master 2>&1) || PUSH_OUTPUT=$(git push -u origin main 2>&1)

if echo "$PUSH_OUTPUT" | grep -q "Repository not found\|does not appear to be"; then
    echo -e "${YELLOW}⚠ Wiki repository doesn't exist yet - creating initial page...${NC}"
    echo -e "${BLUE}📝 Opening GitHub to create wiki...${NC}\n"
    echo -e "${YELLOW}Action required:${NC}"
    echo -e "  1. Your browser will open to the wiki creation page"
    echo -e "  2. Click 'Create the first page'"
    echo -e "  3. Add any title and content (will be replaced)"
    echo -e "  4. Click 'Save Page'"
    echo -e "  5. Run this script again: ${GREEN}npm run deploy:wiki${NC}\n"
    
    # Open the wiki page in browser
    sleep 2
    open "https://github.com/leonpagotto/leo-kit/wiki" 2>/dev/null || \
        echo -e "Visit: ${BLUE}https://github.com/leonpagotto/leo-kit/wiki${NC}"
    
    cd - > /dev/null
    rm -rf "$TEMP_WIKI_CLONE"
    exit 0
elif echo "$PUSH_OUTPUT" | grep -q "successfully\|up-to-date\|Everything up-to-date"; then
    echo -e "${GREEN}✓ Wiki successfully deployed!${NC}"
else
    echo -e "${RED}✗ Failed to push to wiki${NC}"
    echo -e "${YELLOW}Error: $PUSH_OUTPUT${NC}"
    cd - > /dev/null
    rm -rf "$TEMP_WIKI_CLONE"
    exit 1
fi

# Clean up
cd - > /dev/null
rm -rf "$TEMP_WIKI_CLONE"

# Summary
echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Wiki Deployment Complete!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "\n${GREEN}📚 View your wiki at:${NC}"
echo -e "   ${BLUE}https://github.com/leonpagotto/leo-kit/wiki${NC}\n"
echo -e "${GREEN}Pages deployed:${NC}"
cd "$WIKI_DIR"
for file in *.md; do
    if [ "$file" != "README.md" ]; then
        echo -e "   ${GREEN}✓${NC} $file"
    fi
done
cd - > /dev/null

echo ""
