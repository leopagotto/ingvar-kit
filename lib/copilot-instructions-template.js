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
