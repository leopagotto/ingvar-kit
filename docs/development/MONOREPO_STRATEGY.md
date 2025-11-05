# Skapa Component Library - Monorepo Strategy

**Created:** November 4, 2025
**Status:** Phase 3 In Progress
**Architecture:** Monorepo with NPM packages

---

## 🎯 Strategic Overview

The Skapa component library uses a **monorepo architecture** where both the source code and the published NPM package live in the same repository (`ingvar-kit`). This document explains why this approach benefits users and developers.

---

## 📦 How NPM Package Users Benefit

### When developers install the package:

```bash
npm install @ingvar-kit/skapa-components
```

### They immediately get:

| Feature | Benefit |
|---------|---------|
| **Ready-to-use components** | Import and use in production apps |
| **TypeScript definitions** | Full IntelliSense and type safety |
| **Built-in documentation** | Pattern docs bundled with package |
| **Design tokens** | CSS custom properties for consistency |
| **Accessibility** | WCAG 2.1 AA compliance built-in |
| **Theme support** | Light/dark mode out of the box |
| **Tree-shakeable** | Import only what you need (smaller bundles) |

### Example workflow:

```tsx
// 1. Install package
npm install @ingvar-kit/skapa-components

// 2. Import component
import { Button } from '@ingvar-kit/skapa-components';

// 3. Use with full TypeScript support
<Button
  variant="primary"    // ← IntelliSense shows: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size="medium"        // ← IntelliSense shows: 'small' | 'medium' | 'large'
  onClick={handleClick}
>
  Add to cart
</Button>
```

### GitHub Copilot Integration:

When the package is installed, Copilot can:

1. **Read bundled documentation** - Pattern docs included in `node_modules/@ingvar-kit/skapa-components/docs/`
2. **Suggest components** - Types "Add to cart button" → Copilot suggests `<Button variant="primary">`
3. **Auto-complete props** - Shows all available variants, sizes, states
4. **Generate patterns** - Suggests complete implementations from 09-DESIGN-PATTERNS.md
5. **Follow guidelines** - Uses Skapa best practices automatically

**Example Copilot behavior:**

```tsx
// User types: "Create a product filtering interface"

// Copilot suggests (learned from our 09-DESIGN-PATTERNS.md):
import { Pill, Listbox } from '@ingvar-kit/skapa-components';

function ProductFilters() {
  return (
    <div className="flex gap-4">
      <Pill variant="filter" active>All</Pill>
      <Pill variant="filter">Living Room</Pill>
      <Pill variant="filter">Bedroom</Pill>
      <Listbox
        label="Price Range"
        options={priceRanges}
      />
    </div>
  );
}
```

---

## 🏗️ Why Monorepo Architecture?

### Current Structure:

```
ingvar-kit/                              ← Monorepo root
├── packages/
│   └── skapa-components/                ← NPM package source
│       ├── src/                         ← Component implementations
│       ├── dist/                        ← Build output (published to NPM)
│       ├── package.json                 ← Package configuration
│       └── README.md                    ← Package documentation
├── lib/
│   └── ai-instructions/                 ← Copilot learns here
│       ├── designer-agent.md
│       ├── frontend-agent.md
│       └── frontend-agent-ingka.instructions.md
├── docs/
│   └── ai-agents/skapa-design-system/   ← Master documentation
│       ├── 01-ACTIONS.md                ← Component specs (58 files)
│       ├── 09-DESIGN-PATTERNS.md        ← Pattern implementations
│       └── 10-FOUNDATIONS-EXTENDED.md   ← Design tokens
├── bin/
│   └── cli.js                           ← Ingvar CLI tool
└── templates/
    └── ingka-components/                ← Quick-start templates
```

---

## ✅ Benefits of Keeping Both in ingvar-kit

### 1. **Single Source of Truth**

**Problem (Separate Repos):**
- Documentation in repo A
- Components in repo B
- Docs drift from code → outdated examples

**Solution (Monorepo):**
- Documentation and components in same repo
- Docs always match component version
- One commit updates both

**Example:**
```bash
# Update Button component + documentation in one commit
git commit -m "feat(button): add new variant + update docs"
```

---

### 2. **Version Synchronization**

**Problem (Separate Repos):**
- Component v2.0 released
- Documentation still shows v1.0 API
- Users confused by mismatched versions

**Solution (Monorepo):**
- Components and docs versioned together
- Package version = documentation version
- Git tags ensure sync

**Example:**
```bash
# Tag releases everything together
git tag v1.0.0
# → Components, docs, CLI all at v1.0.0
```

---

### 3. **Fast Development Cycle**

**Problem (Separate Repos):**
1. Change component in repo B
2. Build and publish to NPM
3. Update docs in repo A
4. Wait for NPM propagation
5. Test in consuming app
(⏱️ Hours to see changes)

**Solution (Monorepo):**
1. Change component in `packages/skapa-components/src/`
2. Build locally: `npm run build`
3. Test with `npm link` immediately
4. Update docs in same commit
(⏱️ Minutes to see changes)

---

### 4. **CLI Integration**

The Ingvar CLI can work with BOTH local and published packages:

**Strategy 1: Install from NPM (Production)**
```bash
ingvar add button
# → Installs from @ingvar-kit/skapa-components NPM package
```

**Strategy 2: Copy from Local (Customization)**
```bash
ingvar add button --source=local
# → Copies from packages/skapa-components/src/components/actions/Button/
# → Full source code, fully editable
```

**Strategy 3: Smart Fallback**
```bash
ingvar add button
# → Checks: Is @ingvar-kit/skapa-components installed?
#   - YES: Use NPM version (faster, managed updates)
#   - NO: Copy from local packages/ (customizable)
```

**Implementation in CLI:**
```javascript
// lib/commands/add-component.js
async function addComponent(componentName) {
  const npmInstalled = await checkNpmPackage('@ingvar-kit/skapa-components');

  if (npmInstalled) {
    // Strategy 1: Use NPM package
    console.log('Using installed @ingvar-kit/skapa-components');
    return installFromNpm(componentName);
  } else {
    // Strategy 2: Copy from local
    console.log('Copying from local packages/');
    return copyFromLocal(componentName);
  }
}
```

---

### 5. **Copilot Context Window**

**Problem (Separate Repos):**
- Copilot in repo B (components) can't see repo A (docs)
- Copilot in repo A (docs) can't see repo B (implementations)
- AI learns from fragmented context

**Solution (Monorepo):**
- Copilot sees EVERYTHING in one workspace
- AI learns from: docs → specs → implementations → patterns
- Better suggestions because full context available

**Example:**
```tsx
// Copilot in ingvar-kit can see:
// 1. docs/ai-agents/skapa-design-system/09-DESIGN-PATTERNS.md (patterns)
// 2. packages/skapa-components/src/components/actions/Button/Button.tsx (implementation)
// 3. lib/ai-instructions/frontend-agent-ingka.instructions.md (guidelines)

// Result: When user types "filter", Copilot suggests:
import { Pill, Listbox } from '@ingvar-kit/skapa-components';
// ↑ Learned from pattern docs + saw implementation
```

---

### 6. **Contributor Experience**

**Problem (Separate Repos):**
- Contributor A fixes docs (repo A)
- Contributor B fixes components (repo B)
- No one sees full picture
- PRs conflict across repos

**Solution (Monorepo):**
- One PR changes docs + component + tests
- Code reviewers see full context
- Contributors understand entire system

**Example PR:**
```
Title: feat(button): add loading state

Modified files:
✓ packages/skapa-components/src/components/actions/Button/Button.tsx
✓ packages/skapa-components/src/components/actions/Button/Button.types.ts
✓ docs/ai-agents/skapa-design-system/01-ACTIONS.md
✓ tests/integration/button.test.tsx

Reviewers see: implementation + docs + tests in ONE place
```

---

### 7. **Dogfooding (Using Own Components)**

**Benefit:** Ingvar-kit can use its own components internally

**Example:**
```tsx
// bin/cli.js - Ingvar CLI itself uses Skapa components
import { Spinner, ProgressBar } from '../packages/skapa-components';

async function installDependencies() {
  console.log(<Spinner text="Installing dependencies..." />);
  await npm.install();
  console.log(<ProgressBar value={100} />);
}
```

**Why this matters:**
- We "eat our own dog food"
- Find bugs before users do
- Ensure components work in real scenarios

---

## 🔄 Developer Workflows Comparison

### Workflow 1: NPM Installation (Production Apps)

**Use case:** Building a production e-commerce site

```bash
# Install package
npm install @ingvar-kit/skapa-components

# Import and use
import { Button, Card, Modal } from '@ingvar-kit/skapa-components';
```

**Benefits:**
- ✅ Stable, tested versions
- ✅ Automatic security updates
- ✅ Semantic versioning
- ✅ Tree-shakeable (smaller bundles)
- ✅ CDN-cacheable

**When to use:**
- Production applications
- Multiple projects using same version
- Want managed updates via `npm update`

---

### Workflow 2: Local Development (Customization)

**Use case:** Need to customize Button for specific brand

```bash
# Copy component source
ingvar add button --source=local

# Files copied to your project:
src/components/Button/
  ├── Button.tsx         ← Full source, editable
  ├── Button.types.ts
  └── Button.module.css

# Customize freely
# No NPM dependency, full control
```

**Benefits:**
- ✅ Full source code access
- ✅ Customize any aspect
- ✅ No version lock-in
- ✅ Learn from implementation

**When to use:**
- Need heavy customization
- Learning component architecture
- Building custom design system
- Forking for different brand

---

### Workflow 3: Hybrid (Best of Both)

**Use case:** Use NPM package but customize one component

```bash
# Install package for most components
npm install @ingvar-kit/skapa-components

# Use most components from NPM
import { Card, Modal, TextField } from '@ingvar-kit/skapa-components';

# But customize Button locally
ingvar add button --source=local --output=src/components/
import { Button } from './components/Button';
```

**Benefits:**
- ✅ Get updates for unchanged components
- ✅ Customize specific components
- ✅ Smaller custom code footprint
- ✅ Gradual migration path

---

## 📊 Impact Comparison

### **Scenario: Separate Repositories**

```
Repository A: skapa-components-docs
└── Documentation only

Repository B: skapa-components
└── Component code

Repository C: ingvar-kit
└── CLI tool
```

**Problems:**
- ❌ Documentation drifts from code
- ❌ Manual version syncing across 3 repos
- ❌ Slow publish → test → document cycles
- ❌ Contributors see only fragments
- ❌ Copilot can't see full context
- ❌ 3 separate CI/CD pipelines
- ❌ 3 separate issue trackers

---

### **Scenario: Monorepo (Current Strategy)**

```
Repository: ingvar-kit
├── packages/skapa-components/     ← Components
├── docs/ai-agents/                ← Documentation
├── lib/ai-instructions/           ← Copilot context
└── bin/cli.js                     ← CLI tool
```

**Benefits:**
- ✅ Docs always in sync with code
- ✅ Automatic version management
- ✅ Test locally before publishing
- ✅ Contributors see everything
- ✅ Copilot learns from unified context
- ✅ Single CI/CD pipeline
- ✅ Single issue tracker (#15 tracks all phases)
- ✅ One git tag = one release

---

## 🚀 Publishing Workflow

### Development → Production Pipeline:

```
1. Development (Local)
   └─ packages/skapa-components/src/
      └─ Make changes, test locally

2. Build (Pre-publish)
   └─ npm run build
      └─ Creates: packages/skapa-components/dist/
         ├── index.js          (CommonJS)
         ├── index.esm.js      (ES Modules)
         ├── index.d.ts        (TypeScript)
         └── styles.css        (Design tokens)

3. Publish to NPM
   └─ npm publish
      └─ Uploads: dist/ folder to NPM registry
         └─ Available as: @ingvar-kit/skapa-components

4. Install in Apps
   └─ npm install @ingvar-kit/skapa-components
      └─ Downloads: dist/ folder to node_modules/
```

**But all source code stays in monorepo for future development!**

---

## 🎯 Strategic Benefits Summary

| Aspect | Separate Repos | Monorepo |
|--------|---------------|----------|
| **Docs sync** | Manual, drift risk | Automatic, always in sync |
| **Version control** | 3 separate versions | Single unified version |
| **Development speed** | Hours (publish → test) | Minutes (local test) |
| **CLI integration** | NPM only | NPM + local fallback |
| **Copilot context** | Fragmented | Complete picture |
| **Contributor UX** | See only pieces | See full system |
| **Dogfooding** | Not possible | Use own components |
| **CI/CD complexity** | 3 pipelines | 1 pipeline |
| **Issue tracking** | 3 trackers | 1 tracker |
| **Git tags** | Manual sync | Automatic sync |

---

## 🔮 Future Possibilities

### With monorepo architecture, we can easily:

1. **Add more packages:**
   ```
   packages/
   ├── skapa-components/        ← Already done
   ├── skapa-icons/             ← Icon library
   ├── skapa-themes/            ← Theme presets
   └── skapa-cli/               ← Standalone CLI
   ```

2. **Share utilities across packages:**
   ```
   packages/
   ├── shared/                  ← Common utilities
   │   ├── hooks/
   │   ├── utils/
   │   └── types/
   └── skapa-components/        ← Uses shared/
   ```

3. **Create workspace scripts:**
   ```json
   {
     "scripts": {
       "build:all": "npm run build --workspaces",
       "test:all": "npm run test --workspaces",
       "publish:all": "npm run publish --workspaces"
     }
   }
   ```

---

## 📝 Conclusion

The **monorepo strategy** for Skapa component library provides:

✅ **For NPM Users:**
- Production-ready components with built-in docs
- TypeScript + IntelliSense support
- Copilot integration out of the box
- Tree-shakeable imports

✅ **For Ingvar-kit:**
- Single source of truth
- Fast development cycles
- Unified versioning
- Complete Copilot context

✅ **For Contributors:**
- See full system
- One PR for docs + code
- Better code reviews

✅ **For CLI:**
- NPM + local flexibility
- Smart fallback strategy
- Customization options

**This is why we keep both the source code AND the published package in the ingvar-kit monorepo.**

---

**Next Steps:**
- ✅ Phase 1: Pattern extraction (COMPLETE)
- ✅ Phase 2: Pattern documentation (COMPLETE)
- 🔄 Phase 3: Component library (IN PROGRESS - 1/58 components done)
- 🔜 Phase 4: NPM package publishing
- 🔮 Phase 5: Copilot integration

---

**Document Version:** 1.0
**Last Updated:** November 4, 2025
**Issue Tracking:** #15
