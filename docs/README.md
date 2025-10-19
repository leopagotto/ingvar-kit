# Project Documentation

All project documentation is organized here following the LEO Workflow structure.

## Structure

### 📋 specs/ - Specification Files (Planning Phase)

Future features and planning documents. Write detailed specs here BEFORE development.

**Current Specs:**

- `EXAMPLE_SPEC.md` - Template for creating new specs
- `FUTURE_VISION_V3.0.md` - Roadmap for version 3.0
- `QUICK_WINS_PLAN.md` - High-impact features for quick implementation
- `UX_DESIGNER_FEATURES.md` - Voice-powered UX designer workflow features

### 📚 guides/

User guides and tutorials _(currently empty - ready for guides)_

### ⚙️ setup/

Installation and configuration guides _(currently empty - ready for setup docs)_

### 💻 development/ - Development Documentation

Active development documentation, best practices, and technical guides.

**Current Docs:**

- `AUTH_LOGIC.md` - GitHub authentication flow and logic
- `BEST_PRACTICES.md` - Development best practices and guidelines
- `TESTING_GUIDE.md` - Testing strategies and procedures

### 📦 archive/ - Historical Documentation

Completed work, old release notes, and historical decisions. Reference material only.

**Archived Docs:** 17 historical documents including:

- Release notes (v2.0.3, v2.1.0, v2.2.0)
- Deployment records
- Implementation summaries
- Bug fixes and enhancements

## LEO Workflow

### Phase 1: Specification (Planning)

Write detailed specification files in `specs/` folder. Include problem statement, solution approach, technical details, and acceptance criteria.

**Process:**

1. Create spec file in `docs/specs/[feature-name].md`
2. Review and discuss with team
3. Get approval before coding

### Phase 2: Execution (GitHub Issues)

Convert approved specs into GitHub issues. Track all work in GitHub Projects. Reference issues in all commits.

**Process:**

1. Run `leo issue` to create issues from approved specs
2. Track work in GitHub Projects
3. Reference issues in commits: `feat: add feature (#42)`
4. Create PRs with "Closes #42"

**Remember: Specifications are FILES. Tasks are GITHUB ISSUES.**

## Navigation

- **Planning a feature?** → Start in `specs/`
- **Need dev guidelines?** → Check `development/`
- **Looking for history?** → Browse `archive/`
- **Writing a guide?** → Add to `guides/`
- **Setup instructions?** → Add to `setup/`

## Contributing

Keep documentation up to date as the project evolves. Follow the structure:

- New features → Create spec in `specs/`
- Completed work → Move to `archive/`
- Active development → Keep in `development/`
- User-facing → Add to `guides/` or `setup/`
