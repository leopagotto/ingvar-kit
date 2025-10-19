# Changelog

All notable changes to LEO Workflow Kit will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2.0] - 2025-10-19

### 🚀 Major Feature: Automatic Issue Creation via GitHub Copilot

This release enables GitHub Copilot to automatically create issues when you describe work in conversation - no more manual form filling!

### Added
- **Automatic Issue Creation Instructions**: Added comprehensive Copilot instructions for detecting when users describe work and automatically creating GitHub issues
- **GitHub Authentication Flow**: Added interactive GitHub CLI authentication during `leo init` setup
- **Smart Intent Detection**: Copilot now recognizes patterns like "We need to fix...", "Let's add...", "There's a bug..." and creates issues automatically
- **Context Extraction**: Automatically extracts priority, type, component from user descriptions

### Changed
- **Copilot Instructions Enhanced**: Added detailed examples and rules for automatic issue creation at the top of instructions (CRITICAL section)
- **Init Command**: Now checks GitHub authentication and offers to authenticate interactively if not logged in
- **Package Optimization**: Further reduced package size by excluding more unnecessary files via improved .npmignore

### Improved
- **User Experience**: Users can now describe issues in conversation and Copilot creates them automatically
- **Authentication UX**: Clear prompts and guidance for GitHub authentication during setup
- **Package Size**: Maintained lean package size (46.8 KB) while adding new features

### How It Works
When you say to Copilot:
- "We need to fix the login button not working on mobile"
- "Let's add dark mode support"
- "The search is too slow"

Copilot will automatically:
1. Detect you're describing work
2. Extract key details (priority, type, component)
3. Run `leo issue` with smart defaults
4. Confirm issue creation with link

No more interrupting your flow to fill out forms!

## [2.1.1] - 2025-10-19

### Fixed
- **Package Publishing**: Added explicit `files` field to package.json to ensure all templates are included in npm package
- **Installation Flow**: Enhanced postinstall.js to detect local vs global installs and guide users accordingly
- **Smart Setup**: Postinstall now detects if you're in a git repo and prompts to run `leo init` for quick setup
- **Package Size**: Reduced package size from 94.1 KB to 45.3 KB by excluding unnecessary documentation files via .npmignore

### Added
- `.npmignore` file to exclude development documentation and keep package lean
- Auto-detection of existing LEO setup to avoid duplicate initialization
- Context-aware installation messages based on install type (global/local) and repository status

### Changed
- Improved postinstall messaging to clearly guide users on next steps
- Updated version references to 2.1.1 across banner and scripts

## [2.0.3] - 2025-10-18

### Changed
- **Brand Refresh**: Updated banner from "LEO WORKFLOW KIT" to "LEO-KIT" for cleaner, more memorable branding
- **Visual Enhancement**: Redesigned ASCII art banner with bold block letters for outstanding visual appeal
- **Compact Design**: Simplified compact banner for better readability on smaller terminals

### Design Details
- Full banner now uses modern block characters (`█╗║╝═╔╚`) for professional appearance
- Maintained golden yellow color scheme (#FFD700) for consistency with lion branding
- All three banner variants updated: full, compact, and welcome message
- Terminal width responsive behavior preserved

## [2.0.0] - 2025-10-18

### 🎉 Major Release: Development Best Practices & Enhanced Project Management

This major release transforms LEO Workflow Kit from a simple setup tool into a comprehensive development best practices platform.

### Added

#### Component-First Development
- **Atomic Design Guidelines**: Comprehensive component hierarchy structure (atoms, molecules, organisms, templates, pages)
- **Composition Patterns**: Best practices for building reusable components through composition
- **Smart Extraction Rules**: Guidelines on when to extract components vs. keeping them local
- **TypeScript Patterns**: Type-safe component patterns with prop definitions and JSDoc documentation
- **Component Documentation**: Standards for documenting reusable components

#### Performance Optimization
- **Lazy Loading Strategies**: Route-based and component-based code splitting guidelines
- **Image Optimization**: WebP format, responsive images, lazy loading best practices
- **Bundle Optimization**: Tree shaking, code splitting, and vendor chunk strategies
- **Core Web Vitals**: Detailed guidelines for LCP, FID, and CLS optimization
- **Resource Hints**: Preconnect, prefetch, and preload implementation patterns
- **Critical CSS**: Above-the-fold optimization strategies
- **Font Optimization**: System fonts with web font fallback patterns
- **Caching Strategies**: Browser cache, service workers, and CDN implementation

#### SEO Excellence
- **Semantic HTML**: Proper HTML5 structure for better accessibility and SEO
- **Meta Tags System**: Comprehensive templates for Open Graph, Twitter Cards, and meta descriptions
- **Structured Data**: Schema.org implementation guidelines for rich snippets
- **Image SEO**: Alt text best practices, dimensions, and lazy loading for images
- **URL Structure**: SEO-friendly URL pattern guidelines
- **Sitemap & Robots**: Automated generation templates and best practices

#### DRY Principle Enforcement
- **Code Duplication Detection**: Guidelines for identifying and eliminating repeated code
- **Utility Function Patterns**: Best practices for extracting common logic
- **Custom Hooks**: Patterns for creating reusable React hooks
- **Extraction Thresholds**: When to extract (3+ similar blocks rule)
- **Shared Component Library**: Patterns for building reusable component libraries

#### GitHub Project Management
- **Flexible Project Setup**: Choose between creating new GitHub Projects or connecting to existing ones
- **Interactive Project Creation**: Guided workflow for setting up new projects with proper structure
- **Pre-configured Columns**: Automatic setup of LEO workflow columns (Backlog, Ready, In Progress, Review, Done)
- **Custom Fields**: Automatic Priority and Component field creation for new projects
- **Smart Detection**: Automatic detection of organization vs. personal repositories

#### Enhanced Copilot Instructions
- **Component-First Principles**: Embedded best practices for component architecture
- **Performance Guidelines**: Comprehensive performance optimization instructions
- **SEO Best Practices**: Built-in SEO optimization guidelines
- **Accessibility Standards**: WCAG 2.1 AA compliance guidelines
- **Code Quality Rules**: Testing, error handling, and security best practices

### Changed
- **Version**: Bumped to 2.0.0 to reflect major feature additions
- **Package Description**: Updated to highlight new component-first and optimization features
- **Init Flow**: Enhanced `leo init` command with interactive project setup options
- **Project Configuration**: More flexible project setup supporting both new and existing scenarios
- **Keywords**: Added component-first, best-practices, seo-optimization, performance, frontend, code-quality

### Improved
- **User Experience**: Better prompts and guidance during initialization
- **Error Handling**: More descriptive error messages for GitHub API failures
- **Documentation**: Comprehensive documentation of all new features
- **Success Messages**: Enhanced feedback showing exactly what was configured

### Technical Details
- Enhanced `lib/commands/init.js` with project creation and connection logic
- Updated `lib/copilot-instructions-template.js` with 2000+ lines of best practices
- Improved project detection and organization handling
- Added support for creating custom fields in GitHub Projects

## [1.3.0] - 2025-10-15

### Added
- Initial release of LEO Workflow Kit
- Core CLI framework with 4 main commands
- 8 professional issue templates
- 22+ GitHub labels configuration
- VS Code Copilot integration
- Documentation structure with specs folder
- Spec-driven development workflow

### Features
- `leo init` - Initialize workflow in current project
- `leo issue` - Create issues from templates
- `leo labels` - Manage GitHub labels
- `leo vscode` - Configure VS Code settings
- `leo status` - Check workflow status
- `leo docs` - Open documentation

---

## Migration Guide: 1.x to 2.0

If you're upgrading from version 1.x:

1. **No Breaking Changes**: Version 2.0 is fully backward compatible
2. **New Features**: Simply run `leo init` in existing projects to get new Copilot instructions
3. **Project Setup**: New projects can now choose between creating or connecting to GitHub Projects
4. **Best Practices**: All new best practices are embedded in Copilot instructions automatically

### To Update Existing Projects

```bash
# Update to latest version
npm install -g leo-workflow-kit@latest

# Re-run init to update Copilot instructions (optional)
cd your-project
leo vscode --project
```

Your existing setup will remain intact, and new best practices will be available through updated Copilot instructions.

---

## Support

For issues, questions, or suggestions:
- GitHub Issues: https://github.com/leonpagotto/leo-kit/issues
- Documentation: https://github.com/leonpagotto/leo-kit#readme

