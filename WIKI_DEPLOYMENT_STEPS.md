# 🚀 Wiki Deployment Instructions for v2.4.0

## ✅ Wiki Content Updated

The following wiki pages have been updated with v2.4.0 information:

1. **Home.md** (532 lines) - Updated with v2.4.0 features
   - ✅ New version: 2.4.0
   - ✅ Intelligent Spec-First AI feature highlighted
   - ✅ Two example workflows (simple vs complex)
   - ✅ Updated roadmap section
   - ✅ Enhanced key concepts

2. **Roadmap.md** (updated) - v2.4.0 moved to "Released"
   - ✅ v2.4.0 release history added
   - ✅ Decision logic documented
   - ✅ Impact metrics included
   - ✅ Future roadmap adjusted

3. **Spec-First-Decision-Making.md** (NEW - 420 lines)
   - ✅ Complete guide to intelligent decision making
   - ✅ Decision tree diagram
   - ✅ Real-world examples
   - ✅ Best practices and FAQ
   - ✅ Configuration options

## 📋 Deployment Steps

### Option 1: Manual Deployment (Recommended First Time)

Since the GitHub wiki repository needs to be initialized, follow these steps:

#### Step 1: Create First Wiki Page on GitHub

1. Open your browser and visit:
   ```
   https://github.com/leonpagotto/leo-kit/wiki
   ```

2. Click **"Create the first page"**

3. You can add any content (it will be replaced), for example:
   ```
   Title: Home
   Content: LEO Workflow Kit Wiki - Setting up...
   ```

4. Click **"Save Page"**

This creates the wiki Git repository on GitHub.

#### Step 2: Clone and Push All Wiki Pages

```bash
# Clone the wiki repository
cd /tmp
git clone https://github.com/leonpagotto/leo-kit.wiki.git

# Navigate into it
cd leo-kit.wiki

# Copy all wiki files from your project
cp ~/workflow-cli/wiki/Home.md .
cp ~/workflow-cli/wiki/Installation-Guide.md .
cp ~/workflow-cli/wiki/Commands-Reference.md .
cp ~/workflow-cli/wiki/Roadmap.md .
cp ~/workflow-cli/wiki/Spec-First-Decision-Making.md .

# Stage and commit
git add .
git commit -m "Update wiki for LEO Workflow Kit v2.4.0

- Updated Home page with v2.4.0 features
- Updated Roadmap with v2.4.0 release
- Added new page: Spec-First-Decision-Making
- Complete documentation for intelligent spec-first feature"

# Push to GitHub
git push origin master

# Clean up
cd ~
rm -rf /tmp/leo-kit.wiki
```

#### Step 3: Verify Deployment

Visit https://github.com/leonpagotto/leo-kit/wiki and verify:
- ✅ Home page shows v2.4.0
- ✅ Spec-First-Decision-Making page exists
- ✅ All navigation links work
- ✅ Roadmap shows v2.4.0 as released

### Option 2: Automated Script (After Initial Setup)

Once the wiki exists, you can use the automated script:

```bash
cd ~/workflow-cli
npm run deploy:wiki
```

This will:
- Clone the wiki
- Copy all updated files
- Commit with version info
- Push to GitHub

## 📊 What Changed in v2.4.0 Wiki

### Home.md Changes
```diff
- **Current Version:** 2.3.0
+ **Current Version:** 2.4.0

+ - **🧠 Intelligent Spec-First AI**: Automatically decides when to create specs vs direct issues

+ ### Core Features
+ - [Intelligent Spec-First Decision Making](./Spec-First-Decision-Making) - AI chooses spec vs direct issue ⭐ NEW

- ### Latest Release: v2.3.0
+ ### Latest Release: v2.4.0 ⭐ NEW
+ - ✅ **Intelligent Spec-First Decision Making** - AI analyzes work complexity
+ - ✅ Automatic spec creation for complex features in `docs/specs/`
```

### Roadmap.md Changes
```diff
+ ### ✅ v2.4.0 - Intelligent Spec-First Decision Making (October 19, 2025)
+ **Status:** ✅ Released
+ 
+ **Major Features:**
+ - Intelligent work complexity analysis
+ - Automatic spec creation for complex features
+ - User review workflow before implementation
```

### New Page: Spec-First-Decision-Making.md
- Complete 420-line guide
- Decision tree diagram
- Real examples (OAuth2 vs button fix)
- Configuration options
- Best practices
- FAQ section

## 🎯 Expected Result

After deployment, visitors to your wiki will see:

**Homepage:**
- Current version: 2.4.0
- Highlighted new feature: Intelligent Spec-First AI
- Link to new Spec-First-Decision-Making page
- Updated examples showing simple vs complex workflow

**Navigation:**
- New page listed in "Core Features" section
- ⭐ NEW badge next to Spec-First-Decision-Making
- All internal links working

**Roadmap:**
- v2.4.0 showing as "Released"
- Future versions adjusted (v2.5.0, v2.6.0, v3.0.0)

## 🔍 Verification Checklist

After deployment, verify:

- [ ] Home page loads successfully
- [ ] Version shows 2.4.0
- [ ] Spec-First-Decision-Making link works
- [ ] New page has proper formatting
- [ ] Mermaid diagram renders on the new page
- [ ] Roadmap shows v2.4.0 as released
- [ ] All cross-references work
- [ ] No broken links

## 🐛 Troubleshooting

### "Repository not found" when cloning wiki
**Solution:** Create the first page manually via GitHub web interface first

### "Permission denied" when pushing
**Solution:** 
```bash
gh auth login
# Make sure token has 'repo' scope
```

### Mermaid diagrams not rendering
**Wait:** GitHub sometimes takes a few minutes to render diagrams after push

### Changes not showing up
**Clear cache:** Hard refresh your browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## 📞 Support

If you encounter issues:
1. Check this guide
2. See `docs/guides/WIKI_DEPLOYMENT.md` for detailed troubleshooting
3. Open an issue at https://github.com/leonpagotto/leo-kit/issues

---

## 🎉 After Successful Deployment

Consider:

1. **Announce the update:**
   ```bash
   # Tweet, LinkedIn, etc.
   "Just released LEO Workflow Kit v2.4.0! 🦁
   
   New: Intelligent Spec-First Decision Making
   - AI analyzes work complexity
   - Creates specs for complex features
   - Direct issues for simple tasks
   
   Check it out: https://github.com/leonpagotto/leo-kit/wiki"
   ```

2. **Update other documentation:**
   - README.md (already done ✅)
   - CHANGELOG.md (already done ✅)
   - npm package.json (already done ✅)

3. **Monitor feedback:**
   - Watch for issues/discussions
   - Track wiki page views (GitHub Insights)
   - Gather user feedback on the new feature

---

**Ready to deploy! Follow Option 1 for first-time setup.** 🚀
