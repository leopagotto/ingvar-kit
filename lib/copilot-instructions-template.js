// Enhanced Copilot Instructions Template for LEO Workflow Kit
// This will be embedded in both init.js and vscode.js

module.exports = `\`\`\`instructions
# GitHub Copilot Instructions - LEO Workflow Kit

## Core Principles

### User Experience First
Always prioritize usability, clarity, and aesthetics in all output. Code should not only function but also feel smooth and visually consistent.

Favor clean, minimal, and modern design patterns that enhance user experience. Avoid clutter and overly complex solutions.

### Audience Awareness
Assume collaborators may have varying levels of coding experience. Explanations and outputs must be explicit, descriptive, and self-contained. Include comments in plain, easy-to-understand language.

### Complete Solutions
Automatically generate complete and working solutions, avoiding half-finished code or requiring extra setup unless absolutely necessary.

Follow best practices in structure, naming conventions, accessibility, and performance.

## Spec-Driven Development with GitHub Integration (MANDATORY)

### The LEO Workflow Philosophy
**Specifications are FILES. Tasks are GITHUB ISSUES.**

This is optimized spec-driven development (like spec-kit) with integrated GitHub Projects.

### Phase 1: Specification (Planning)
**Create specification files in \`docs/specs/\`**

1. **Write Detailed Spec File**
   - Location: \`docs/specs/[feature-name].md\`
   - Include: Problem statement, solution approach, technical details, acceptance criteria
   - Format: Use issue template structure (from \`leo issue\`)
   
2. **Review & Discussion**
   - Team reviews the spec file
   - Discuss approach, risks, alternatives
   - Make changes to spec file as needed
   
3. **Approval**
   - Spec is approved and finalized
   - Ready to move to execution phase

### Phase 2: Execution (GitHub Issues)
**Convert approved specs into GitHub issues - DON'T CREATE FILES FOR TASKS**

1. **Create GitHub Issues from Spec**
   - Use \`leo issue\` command or GitHub UI
   - Break down spec into actionable issues/tasks
   - Reference spec file in issue description
   - Add proper labels (P0/P1/P2/P3, type, component)
   - Add to GitHub Project board

2. **Work on Issues**
   - Check project board for next task
   - Move issue to "In Progress"
   - Reference issue in all commits: \`feat: add login UI (#42)\`
   - Update progress in issue comments

3. **Complete & Close**
   - Mark tasks complete in issue
   - Create PR referencing issue: "Closes #42"
   - Issue auto-closes and moves to "Done"

### Key Rules
✅ **DO:**
- Write specs as markdown files in \`docs/specs/\`
- Create GitHub issues for all tasks/work items
- Track all work in GitHub Projects
- Reference issues in commits and PRs
- Keep specs updated if approach changes

❌ **DON'T:**
- Create files for individual tasks (use GitHub issues instead)
- Start coding before spec is approved
- Work on tasks not tracked in GitHub
- Create markdown files in project root (except README.md)

## Documentation Organization

All documentation files must be organized within the \`docs/\` folder structure. **Never create markdown files in the root directory** (except README.md).

### Structure:

- **\`docs/specs/\`** - Specification files (planning artifacts)
  - Feature specifications, technical proposals, architecture decisions (PRE-DEVELOPMENT)
  
- **\`docs/guides/\`** - User guides and tutorials
  - Feature guides, user instructions, how-to documents, user manuals
  
- **\`docs/setup/\`** - Installation and configuration
  - Installation guides, environment setup, deployment checklists, configuration references
  
- **\`docs/development/\`** - Development documentation
  - API documentation, technical specifications, active development notes, architecture
  
- **\`docs/archive/\`** - Completed/historical work
  - Implementation completion reports, old schemas, deprecated features, historical decisions
  
- **GitHub Issues** - All tasks, bugs, features (execution artifacts)

### Rules:

1. **Always place new documentation in the appropriate \`docs/\` subfolder** based on its purpose
2. **Check \`docs/README.md\`** for the current organization structure and guidelines
3. **Move completed work to \`docs/archive/\`** when features are stable and documentation is historical
4. **Delete obsolete files** rather than archiving them if they have no historical value
5. **Keep root directory clean** - only README.md should exist at the root level

## UI Development Standards

When building UIs, always:

### Design Consistency
- Use consistent spacing, typography, and color hierarchy
- Follow the project's design system (if exists)
- Maintain visual coherence across all components
- Use design tokens or CSS variables for consistency

### Accessibility (WCAG 2.1 AA Minimum)
- Ensure proper color contrast ratios
- Include meaningful alt text for all images
- Support keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Add appropriate ARIA roles and labels
- Test with screen readers
- Provide focus indicators for interactive elements

### Responsive Design
- **Default to mobile-first layouts** - start with mobile, enhance for desktop
- Use flexible units (rem, em, %, vh/vw) over fixed pixels
- Test at multiple breakpoints (320px, 768px, 1024px, 1440px+)
- Ensure touch targets are at least 44x44px
- Consider landscape and portrait orientations

### Code Quality
- Write modular and scalable code, easy to extend or adapt later
- Use meaningful, descriptive variable and function names
- Include comments and inline guidance in plain language
- Avoid deeply nested components (max 3-4 levels)
- Keep components small and focused (Single Responsibility Principle)

## Frontend Development Best Practices (CRITICAL)

### Component-First Architecture

#### Atomic Design Principles
- **Atoms**: Basic building blocks (Button, Input, Icon, Label)
- **Molecules**: Simple combinations (SearchBar = Input + Button + Icon)
- **Organisms**: Complex components (Header, ProductCard, UserProfile)
- **Templates**: Page layouts with placeholder content
- **Pages**: Specific instances of templates with real data

#### Component Reusability (DRY - Don't Repeat Yourself)
- **NEVER duplicate components** - if similar UI exists, extract shared component
- **Use composition over duplication** - combine small components to build complex ones
- **Create a component library** - maintain \`/components/common\` or \`/components/ui\` folder
- **Props for variations** - use props to handle different states, not separate components
- **Shared utilities** - extract common logic into hooks or utility functions

Example of BAD practice (duplication):
\`\`\`jsx
// ❌ DON'T DO THIS
function PrimaryButton() { return <button className="bg-blue-500">Click</button> }
function SecondaryButton() { return <button className="bg-gray-500">Click</button> }
function DangerButton() { return <button className="bg-red-500">Click</button> }
\`\`\`

Example of GOOD practice (reusable):
\`\`\`jsx
// ✅ DO THIS
function Button({ variant = 'primary', children, ...props }) {
  const styles = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500'
  };
  return <button className={styles[variant]} {...props}>{children}</button>;
}
\`\`\`

### Performance Optimization (MANDATORY)

#### Code Splitting & Lazy Loading
- **Route-based splitting**: Lazy load pages/routes that aren't immediately needed
\`\`\`javascript
// React example
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));
\`\`\`

- **Component-based splitting**: Lazy load heavy components (charts, editors, modals)
- **Third-party libraries**: Import only what you need
\`\`\`javascript
// ❌ BAD: Imports entire library
import _ from 'lodash';

// ✅ GOOD: Tree-shakeable, smaller bundle
import debounce from 'lodash/debounce';
\`\`\`

#### Image Optimization
- **Always use next-gen formats**: WebP, AVIF with fallbacks
- **Implement lazy loading**: \`loading="lazy"\` attribute for images below fold
- **Use responsive images**: \`srcset\` and \`sizes\` attributes
- **Optimize file size**: Compress images (use tools like ImageOptim, Squoosh)
- **Define dimensions**: Always set width/height to prevent layout shift
\`\`\`html
<img 
  src="image.webp" 
  alt="Description"
  width="800" 
  height="600"
  loading="lazy"
  srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
/>
\`\`\`

#### Bundle Optimization
- **Analyze bundle size**: Use webpack-bundle-analyzer or similar tools
- **Tree shaking**: Ensure dead code is eliminated
- **Code splitting**: Split vendor bundles from application code
- **Minimize dependencies**: Audit and remove unused packages regularly
- **Use production builds**: Always minify and uglify for production

#### Runtime Performance
- **React.memo()**: Memoize components that re-render unnecessarily
- **useMemo() / useCallback()**: Memoize expensive computations and functions
- **Virtual scrolling**: Use for long lists (react-window, react-virtualized)
- **Debounce/Throttle**: For search inputs, scroll handlers, resize events
- **Avoid inline functions**: In render methods (create stable references)
\`\`\`javascript
// ❌ BAD: Creates new function on every render
<button onClick={() => handleClick(id)}>Click</button>

// ✅ GOOD: Stable function reference
const handleButtonClick = useCallback(() => handleClick(id), [id]);
<button onClick={handleButtonClick}>Click</button>
\`\`\`

### SEO Best Practices (CRITICAL)

#### Meta Tags & Structured Data
- **Title tags**: Unique, descriptive, 50-60 characters
- **Meta descriptions**: Compelling, 150-160 characters
- **Open Graph tags**: For social media sharing (og:title, og:description, og:image)
- **Twitter Cards**: Specific Twitter meta tags
- **Canonical URLs**: Prevent duplicate content issues
- **JSON-LD structured data**: Help search engines understand content

\`\`\`html
<head>
  <title>Page Title - Brand Name</title>
  <meta name="description" content="Compelling description that encourages clicks">
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description for social sharing">
  <meta property="og:image" content="https://example.com/og-image.jpg">
  <meta property="og:url" content="https://example.com/page">
  
  <!-- JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "author": { "@type": "Person", "name": "Author Name" }
  }
  </script>
</head>
\`\`\`

#### Semantic HTML (MANDATORY)
- **Use proper HTML5 elements**: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`
- **Heading hierarchy**: Proper h1-h6 structure (only one h1 per page)
- **Lists for navigation**: Use \`<ul>\`/\`<ol>\` for menus
- **Buttons vs Links**: \`<button>\` for actions, \`<a>\` for navigation

\`\`\`html
<!-- ✅ GOOD: Semantic structure -->
<header>
  <nav>
    <ul>
      <li><a href="/home">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </nav>
</header>
<main>
  <article>
    <h1>Main Page Title</h1>
    <section>
      <h2>Section Title</h2>
      <p>Content...</p>
    </section>
  </article>
</main>
<footer>
  <p>&copy; 2025 Company Name</p>
</footer>
\`\`\`

#### Performance for SEO
- **Core Web Vitals**: Optimize for LCP, FID, CLS
  - **LCP (Largest Contentful Paint)**: < 2.5s
  - **FID (First Input Delay)**: < 100ms
  - **CLS (Cumulative Layout Shift)**: < 0.1
- **Server-Side Rendering (SSR)**: For content-heavy pages
- **Static Site Generation (SSG)**: When possible for best performance
- **Preload critical resources**: \`<link rel="preload">\` for fonts, critical CSS
- **Defer non-critical JavaScript**: Use \`async\` or \`defer\` attributes
- **Minify CSS/JS**: Remove whitespace and comments in production
- **Enable compression**: Gzip or Brotli on server

#### URL Structure & Internal Linking
- **Clean URLs**: Use hyphens, lowercase, descriptive keywords
  - ✅ GOOD: \`/products/blue-running-shoes\`
  - ❌ BAD: \`/products?id=12345&cat=shoes\`
- **Breadcrumbs**: Help users and search engines understand site structure
- **Internal links**: Link related content with descriptive anchor text
- **XML sitemap**: Generate and submit to search engines
- **robots.txt**: Control what search engines can crawl

### State Management Best Practices

#### Choose the Right Tool
- **Local State (useState)**: Component-specific UI state, form inputs
- **Context API**: Shared state across related components (theme, auth, language)
- **Global State (Redux/Zustand/Recoil)**: Complex app-wide state
- **Server State (React Query/SWR)**: API data, caching, synchronization
- **URL State**: For shareable/bookmark-able state (filters, pagination)

#### Avoid Common Pitfalls
- **Don't over-use Context**: Can cause unnecessary re-renders
- **Normalize state shape**: Flat structure, avoid nested objects
- **Derive don't store**: Calculate values instead of storing duplicates
- **Colocate state**: Keep state close to where it's used

### Code Organization & Architecture

#### Folder Structure (Recommended)
\`\`\`
src/
├── components/
│   ├── common/         # Reusable UI components
│   ├── layout/         # Layout components (Header, Footer, Sidebar)
│   └── features/       # Feature-specific components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API calls, external services
├── contexts/           # React contexts
├── styles/             # Global styles, themes
├── assets/             # Images, fonts, static files
└── types/              # TypeScript types/interfaces
\`\`\`

#### Naming Conventions
- **Components**: PascalCase (\`UserProfile.tsx\`, \`SearchBar.tsx\`)
- **Hooks**: camelCase with 'use' prefix (\`useAuth.ts\`, \`useFetch.ts\`)
- **Utils**: camelCase (\`formatDate.ts\`, \`validateEmail.ts\`)
- **Constants**: UPPER_SNAKE_CASE (\`API_BASE_URL\`, \`MAX_FILE_SIZE\`)

#### File Organization
- **One component per file**: Easier to find and maintain
- **Colocate related files**: Component, styles, tests in same folder
\`\`\`
Button/
├── Button.tsx
├── Button.test.tsx
├── Button.stories.tsx
└── Button.module.css
\`\`\`

### Forms & Data Validation

#### Form Best Practices
- **Controlled vs Uncontrolled**: Prefer controlled for complex forms
- **Form libraries**: Use react-hook-form or Formik for complex forms
- **Validation**: Validate on blur, show errors clearly
- **Accessibility**: Proper labels, error messages, focus management
- **Loading states**: Disable submit during API calls, show progress
- **Success feedback**: Confirm successful submission clearly

#### Input Validation
- **Client-side validation**: Immediate feedback, better UX
- **Server-side validation**: ALWAYS validate on server (security)
- **Clear error messages**: Explain what's wrong and how to fix it
- **Inline validation**: Show errors next to relevant fields

### Accessibility Checklist (Beyond WCAG)

- ☐ **Skip links**: "Skip to main content" for keyboard users
- ☐ **Focus management**: Proper focus order, visible focus indicators
- ☐ **Error identification**: Clear error messages with instructions
- ☐ **Loading states**: Announce to screen readers
- ☐ **Modal accessibility**: Trap focus, ESC to close, restore focus on close
- ☐ **Form labels**: Every input has associated label
- ☐ **Button text**: Descriptive (not just "Click here" or "Submit")
- ☐ **Link text**: Descriptive (not just "Read more")
- ☐ **Alt text**: Meaningful, context-appropriate
- ☐ **Color contrast**: Test with tools like WebAIM Contrast Checker
- ☐ **Reduced motion**: Respect prefers-reduced-motion media query

## GitHub Projects Integration

### Project Board Management
- All issues must be added to project board immediately
- Use standard status columns: Backlog, Ready, In Progress, Review, Done
- Update status as work progresses (don't let issues go stale)
- Use draft PRs for work in progress

### Priority System
- **P0 (Critical)**: Production down, security issues, data loss risk
- **P1 (High)**: Major features, significant bugs affecting many users
- **P2 (Medium)**: Standard features, minor bugs, improvements
- **P3 (Low)**: Nice-to-have features, polish, tech debt

### Label Strategy
- **Type**: bug, enhancement, documentation, refactoring, deployment, integration, testing
- **Component**: frontend, backend, database, devops, design, api
- **Status**: blocked, needs-review, in-progress, ready-to-merge

## Code Quality Standards

### Testing Requirements
- Write tests for all new features and bug fixes
- Unit tests for business logic and utilities
- Integration tests for API endpoints and workflows
- Component tests for UI with different states
- E2E tests for critical user flows
- Aim for meaningful coverage, not just high percentages

### Error Handling
- Always handle errors gracefully
- Provide user-friendly error messages
- Log errors with sufficient context for debugging
- Never expose stack traces or sensitive data to users
- Implement retry logic for transient failures

### Performance
- Lazy load routes and heavy components
- Optimize images and assets
- Minimize bundle size - tree shake and code split
- Monitor and optimize database queries
- Use pagination/virtualization for long lists
- Implement proper caching strategies

### Security Best Practices
- Never commit secrets, API keys, or credentials
- Validate and sanitize all user inputs
- Use parameterized queries to prevent SQL injection
- Implement proper authentication and authorization
- Follow OWASP security guidelines
- Use HTTPS for all production traffic
- Implement rate limiting for APIs

## Code Style & Conventions

### General Guidelines
- **Be concise**: Remove redundant code, but never sacrifice clarity
- **Consistent formatting**: Use project's linting rules (ESLint, Prettier, etc.)
- **Self-documenting code**: Write code that explains itself through clear naming
- **Comments for "why", not "what"**: Code shows what it does, comments explain why

### Naming Conventions
- **Variables & Functions**: camelCase (\`getUserData\`, \`isActive\`)
- **Classes & Components**: PascalCase (\`UserProfile\`, \`DataService\`)
- **Constants**: UPPER_SNAKE_CASE (\`MAX_RETRY_COUNT\`, \`API_BASE_URL\`)
- **Files**: Match component/class name or use kebab-case for utilities

### TypeScript/JavaScript Best Practices
- Use \`const\` by default, \`let\` when reassignment needed, avoid \`var\`
- Prefer named exports over default exports
- Use async/await over raw promises for readability
- Destructure objects and arrays for cleaner code
- Use optional chaining (\`?.\`) and nullish coalescing (\`??\`)

## Git & Version Control

### Commit Messages
Follow conventional commit format:

\`\`\`
type(scope): brief description

Longer description if needed

Refs: #123, #456
\`\`\`

**Types**: feat, fix, docs, style, refactor, test, chore

**Examples**:
- \`feat(auth): add OAuth2 login support (#42)\`
- \`fix(ui): resolve button alignment issue (#89)\`
- \`docs(api): update endpoint documentation\`

### Pull Request Guidelines
- Reference related issues: "Closes #42", "Fixes #89", "Relates to #100"
- Include description of changes and why they were made
- Add screenshots/videos for UI changes
- List breaking changes prominently
- Check all tests pass before requesting review
- Keep PRs focused and reasonably sized (< 400 lines when possible)

## Decision Making

When multiple approaches are valid:

1. **Prioritize user experience** over technical convenience
2. **Follow existing patterns** in the codebase rather than introducing new ones
3. **Choose maintainable solutions** over clever hacks
4. **Optimize for readability** - code is read more often than written
5. **Make smart assumptions** when context is unclear, and state those assumptions

Where choices are possible, pick the option that improves UX and aesthetics rather than the fastest hack.

Always provide sensible defaults and avoid requiring unnecessary configuration.

## Working with Teams

### For Designers
- Ask clarifying questions about edge cases and states early
- Provide feedback on technical constraints proactively
- Suggest UX improvements backed by technical reasoning
- Ensure responsive behavior is properly defined
- Document component variants and states in Storybook/similar

### For Product Managers
- Break down large features into smaller, shippable increments
- Provide realistic effort estimates with assumptions stated
- Highlight technical risks and dependencies early
- Suggest alternatives when requirements are technically challenging

### For Developers
- Write clear documentation for APIs and complex logic
- Leave helpful code review comments (suggest improvements, don't just criticize)
- Share knowledge through pair programming and documentation
- Consider future maintainers when writing code

## Continuous Improvement

### Code Reviews
- Review code promptly (within 24 hours)
- Be respectful and constructive in feedback
- Focus on logic, security, performance, and maintainability
- Approve when code meets standards, even if you'd write it differently
- Use GitHub's suggestion feature for small improvements

### Refactoring
- Leave code better than you found it (Boy Scout Rule)
- Refactor in small, focused commits
- Don't mix refactoring with feature work
- Ensure tests pass after refactoring
- Document significant architectural changes

### Documentation
- Keep documentation up-to-date with code changes
- Document the "why" behind non-obvious decisions
- Include examples in API documentation
- Update README when adding new features
- Archive old documentation, don't delete it

---

## Quick Reference Card

**Before Starting Work:**
1. Check if spec exists in \`docs/specs/\`
2. If not, create spec file and get approval
3. Create GitHub issue from approved spec
4. Add issue to project board
5. Move to "In Progress"

**During Development:**
- Reference issue in all commits: \`feat: add feature (#42)\`
- Write tests alongside code
- Update documentation
- Follow project code style
- Handle errors gracefully

**Before Merging:**
- All tests passing
- Code reviewed and approved
- Documentation updated
- Issue will auto-close with PR merge

**Remember**: Specifications are FILES. Tasks are GITHUB ISSUES.

\`\`\`
`;
