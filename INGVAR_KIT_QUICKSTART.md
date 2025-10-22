# Ingvar Kit - Quick Start Guide

🪑 **Rebranding Ingvar Kit → Ingvar Kit** 🇸🇪

**Created**: October 22, 2025  
**Status**: Core rebranding complete, ready for file updates  
**Target**: Ingka Digital standards with Ingvar Kamprad philosophy  

---

## ✅ What's Been Done

### Core Rebranding (Complete)

1. **✅ New IKEA-Inspired Banner** (`lib/banner.js`)
   - IKEA Blue & Yellow colors (#0051BA, #FFDB00)
   - Chair emoji 🪑 + Swedish flag 🇸🇪
   - "Inspired by Ingvar Kamprad & Ingka Way of Working"
   - All commands changed: `leo` → `ingvar`

2. **✅ Package Rebranded** (`package.json`)
   - Name: `ingvar-workflow-kit` v1.0.0
   - Author: Ingka Digital
   - Repo: `ingka-group/ingvar-kit`
   - Keywords: ingka, ikea, ingvar-kamprad

3. **✅ CLI Commands Updated** (`bin/cli.js`)
   - Program name: `ingvar-workflow`
   - Bin commands: `ingvar`, `ingvar-workflow`
   - All descriptions reference Ingka Way of Working

4. **✅ New README** (`README_INGVAR.md`)
   - Complete Ingvar Kit documentation
   - Ingvar Kamprad philosophy
   - IKEA/Ingka branding throughout
   - Swedish design principles
   - Full command reference

5. **✅ Comprehensive Guide** (`INGVAR_KIT_REBRANDING.md`)
   - Complete TODO checklist
   - Search & replace patterns
   - Testing checklist
   - Deployment steps
   - Brand guidelines

---

## 📋 What's Left To Do

### High Priority

1. **AI Assistant Instructions** (4 files)
   - [ ] `.github/copilot-instructions.md`
   - [ ] `.cursorrules`
   - [ ] `.clinerules`
   - [ ] `.codeium/instructions.md`
   - **Action**: Replace "LEO" with "Ingvar", update workflow references

2. **Configuration Files**
   - [ ] Rename: `.leorc.json.example` → `.ingvarrc.json.example`
   - [ ] Update: `.gitignore` (`.leorc.json` → `.ingvarrc.json`)
   - [ ] Update all code references: `.leorc` → `.ingvarrc`

3. **Source Code** (`lib/commands/`)
   - [ ] `init.js`, `issue.js`, `labels.js`, `vscode.js`
   - [ ] `config.js`, `ai.js`, `agent.js`, `github.js`, `health.js`
   - **Action**: Search for "leo", "LEO", ".leorc" and replace

4. **Documentation**
   - [ ] `docs/guides/leorc-configuration.md` → `ingvarrc-configuration.md`
   - [ ] Update all docs files with Ingvar references
   - [ ] `CHANGELOG.md` - Add v1.0.0 entry
   - [ ] `CONTRIBUTING.md` - Add Ingka guidelines

5. **Wiki Pages**
   - [ ] `wiki/Home.md`, `Commands-Reference.md`, `Installation-Guide.md`
   - **Action**: Update all `leo` → `ingvar` commands

### Medium Priority

6. **Templates** (`templates/`)
   - [ ] Check for LEO branding
   - [ ] Update issue templates if needed

7. **Diagrams** (`diagrams/`)
   - [ ] `architecture.mmd` - Update references
   - [ ] `workflow.mmd` - Update references

### Low Priority

8. **Archive Files** (optional)
   - [ ] Decide what to keep from LEO version history
   - [ ] Archive or remove `RELEASE_V*.md`, `SESSION_SUMMARY_*.md`

---

## 🚀 Quick Commands

### Search & Replace Patterns

```bash
# Find all LEO references
grep -r "LEO" --exclude-dir=node_modules .
grep -r "leo" --exclude-dir=node_modules .
grep -r "leorc" --exclude-dir=node_modules .

# Common replacements needed:
"Ingvar Kit" → "Ingvar Kit"
"Ingvar Workflow Kit" → "Ingvar Workflow Kit"
"leo-kit" → "ingvar-kit"
"`leo " → "`ingvar "
".leorc" → ".ingvarrc"
"leonpagotto" → "ingka-group"
"Leo Pagotto" → "Ingka Digital"
```

### File Renaming

```powershell
# PowerShell (Windows)
Rename-Item ".leorc.json.example" ".ingvarrc.json.example"
Rename-Item "docs\guides\leorc-configuration.md" "docs\guides\ingvarrc-configuration.md"
```

### Testing

```bash
# After updates complete
node bin/cli.js --version
node bin/cli.js --help
node bin/cli.js init --help
```

---

## 📁 Key Files Reference

### Already Updated ✅
- `lib/banner.js` ✅
- `bin/cli.js` ✅
- `package.json` ✅
- `README_INGVAR.md` ✅ (new)
- `INGVAR_KIT_REBRANDING.md` ✅ (new)

### Need Updating ⏳
- `.github/copilot-instructions.md` ⏳
- `.cursorrules` ⏳
- `.clinerules` ⏳
- `.codeium/instructions.md` ⏳
- `.leorc.json.example` ⏳ (rename)
- `.gitignore` ⏳
- `lib/commands/*.js` ⏳ (all command files)
- `lib/utils/*.js` ⏳
- `docs/**/*.md` ⏳
- `wiki/*.md` ⏳

---

## 🎨 Brand Identity

### Visual Elements
- **Icon**: 🪑 (chair - IKEA furniture)
- **Flag**: 🇸🇪 (Sweden)
- **Colors**: 
  - Blue: `#0051BA` (IKEA Blue)
  - Yellow: `#FFDB00` (IKEA Yellow)

### Key Messages
- Named after **Ingvar Kamprad** (IKEA founder)
- Follows **Ingka Way of Working**
- Embodies **Swedish design**: Simple, Quality, Efficient
- Built for **Ingka Digital** and the developer community

### Tone
- Professional but approachable
- Clear and simple (Ingvar's principle)
- Efficient and practical
- References to IKEA values: simplicity, quality, accessibility

---

## 🧪 Testing Checklist

Before final release:

**CLI Commands**
- [ ] `ingvar --version` works
- [ ] `ingvar init` creates `.ingvarrc.json`
- [ ] `ingvar issue` creates issues
- [ ] `ingvar config` reads/writes config
- [ ] All aliases work (`ingvar i`, `ingvar s`, etc.)

**AI Integration**
- [ ] Copilot uses Ingvar instructions
- [ ] Cursor uses Ingvar instructions
- [ ] Auto-issue creation mentions "Ingvar"
- [ ] Agent routing works

**Documentation**
- [ ] README displays correctly
- [ ] All links work (no 404s)
- [ ] Command examples are accurate
- [ ] Wiki pages render correctly

---

## 📦 Deployment Checklist

When ready to publish:

1. **Final Code Review**
   - [ ] All LEO references removed
   - [ ] All tests pass
   - [ ] Documentation complete

2. **Create New Repository**
   ```bash
   gh repo create ingka-group/ingvar-kit --public
   ```

3. **Publish to NPM**
   ```bash
   npm login
   npm publish --access public
   ```

4. **GitHub Release**
   - [ ] Create v1.0.0 release
   - [ ] Add changelog
   - [ ] Tag commit

5. **Announce**
   - [ ] Share with Ingka Digital team
   - [ ] Update internal documentation
   - [ ] Create tutorial/demo

---

## 💡 Next Steps

### Immediate (Do Now)
1. Update AI instruction files (4 files)
2. Rename `.leorc.json.example` → `.ingvarrc.json.example`
3. Update `.gitignore`
4. Search & replace in `lib/commands/` files

### Soon (This Week)
1. Update all documentation files
2. Update wiki pages
3. Run full test suite
4. Create migration guide for LEO users

### Later (Before Release)
1. Create new GitHub repository
2. Publish NPM package
3. Deploy documentation
4. Create demo video

---

## 📞 Resources

**Documentation**:
- Full rebranding guide: `INGVAR_KIT_REBRANDING.md`
- New README: `README_INGVAR.md`
- This quick start: `INGVAR_KIT_QUICKSTART.md`

**Original Ingvar Kit**:
- Repo: https://github.com/leopagotto/ingvar-kit
- NPM: https://www.npmjs.com/package/ingvar-workflow-kit

**New Ingvar Kit** (target):
- Repo: https://github.com/ingka-group/ingvar-kit
- NPM: https://www.npmjs.com/package/ingvar-workflow-kit

---

## 🎯 Success Criteria

**Rebranding is complete when**:
- ✅ No "LEO" references in code (except archives/changelog)
- ✅ All commands use `ingvar`
- ✅ All config files use `.ingvarrc`
- ✅ All AI instructions reference "Ingvar"
- ✅ Documentation is Ingka-branded
- ✅ Package published as `ingvar-workflow-kit`
- ✅ Repository is `ingka-group/ingvar-kit`
- ✅ All tests pass
- ✅ Installation works: `npm i -g ingvar-workflow-kit`

---

**Current Status**: 🚧 ~40% Complete  
**Estimated Remaining Work**: 4-6 hours  
**Ready for**: File-by-file systematic updates  

---

**Made with 🪑 by Ingka Digital**  
*Following Ingvar Kamprad's principles: Simple, Quality, Efficient*
