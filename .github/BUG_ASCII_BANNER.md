# 🐛 Bug Report: ASCII Banner Not Displaying Correctly

**Date:** October 18, 2025  
**Version:** 2.0.2  
**Priority:** P2 (Medium)  
**Component:** CLI / Banner  
**Status:** 🔴 Open

---

## 📋 Issue Description

The ASCII banner in LEO Workflow Kit is not picking up the right ASCII art file and the current design lacks visual appeal. The banner should be more striking, professional, and memorable to create a strong first impression.

---

## 🐞 Current Behavior

The current banner uses a simple box design that doesn't fully represent the power and sophistication of the LEO Workflow Kit:

```
    ╔═══════════════════════════════════════════════════════════════╗
    ║                                                               ║
    ║             🦁  LEO WORKFLOW KIT  🦁                    ║
    ║                                                               ║
    ║        Complete GitHub Workflow Automation Toolkit        ║
    ║                                                               ║
    ╚═══════════════════════════════════════════════════════════════╝
```

### Issues:
1. ❌ Not visually striking enough
2. ❌ Doesn't stand out in terminal
3. ❌ Lacks personality and brand identity
4. ❌ Too much empty space
5. ❌ Missing the "wow" factor

---

## ✅ Expected Behavior

The ASCII banner should:
- ✅ Be visually stunning and memorable
- ✅ Represent the "LEO" brand with a lion motif
- ✅ Use creative ASCII art techniques
- ✅ Be immediately recognizable
- ✅ Create a professional first impression
- ✅ Use colors effectively (via Chalk)
- ✅ Be properly sized for standard terminals (80-120 chars wide)

---

## 🎨 Proposed Solutions

### Option 1: ASCII Lion + Bold Typography
A majestic ASCII lion with bold "LEO" typography that commands attention.

### Option 2: Geometric Lion Design
Modern, geometric representation of a lion with clean lines and sharp edges.

### Option 3: Minimalist Icon Style
Sleek, minimalist lion icon with elegant typography.

---

## 🔍 Root Cause

**File:** `lib/banner.js`  
**Function:** `getBanner()`

The current implementation uses basic box-drawing characters instead of leveraging more creative ASCII art possibilities.

```javascript
// Current (boring)
function getBanner() {
  return `
${chalk.yellow('                    ╔═══════════════╗')}
${chalk.yellow('                    ║')}      🦁       ${chalk.yellow('║')}
${chalk.yellow('                    ╚═══════════════╝')}
...
```

---

## 🎯 Proposed Solution

Create multiple ASCII art options in separate files and allow the banner system to select the best one based on:
1. Terminal width
2. Color support
3. User preference (future enhancement)

**New Structure:**
```
lib/
  banner/
    lion-full.ascii       # Full ASCII lion artwork
    lion-compact.ascii    # Smaller version for narrow terminals
    lion-minimal.ascii    # Minimal version
    banner.js            # Smart selector
```

---

## 📝 Implementation Checklist

- [ ] Design 3-5 outstanding ASCII art options
- [ ] Create dedicated ASCII art files
- [ ] Update `lib/banner.js` to load from files
- [ ] Add terminal width detection
- [ ] Implement color gradient effects
- [ ] Add fallback for non-color terminals
- [ ] Test on different terminal sizes (80, 100, 120+ columns)
- [ ] Test on Windows, macOS, Linux
- [ ] Update tests
- [ ] Document ASCII art source/credits

---

## 🎨 Design Requirements

### Must Have:
1. **Lion Element** - Represents "LEO" brand
2. **Bold Typography** - "LEO WORKFLOW KIT" clearly visible
3. **Professional Look** - Enterprise-ready appearance
4. **Color Accents** - Strategic use of yellow/gold (lion), cyan (tech), white (text)
5. **Proper Spacing** - Balanced composition

### Nice to Have:
1. Animated version (for welcome message)
2. Multiple color schemes
3. Seasonal variants
4. Achievement badges integration

---

## 📏 Technical Constraints

- **Terminal Width:** Support 80-120 character widths
- **Height:** Maximum 15-20 lines (keep it compact)
- **Colors:** Use Chalk library (already dependency)
- **Encoding:** UTF-8 safe characters only
- **Performance:** Load time < 50ms

---

## 🔗 References

### Inspiration Sources:
- **Figlet Fonts:** http://www.figlet.org/
- **ASCII Art Archive:** https://www.asciiart.eu/
- **Box Drawing Characters:** Unicode U+2500 to U+257F
- **Block Elements:** Unicode U+2580 to U+259F

### Similar Projects with Great Banners:
- npm: Simple but effective
- Yarn: Clean and modern
- Docker: Recognizable whale
- Kubernetes: Professional helm

---

## 🧪 Testing Scenarios

### Test Case 1: Full Color Terminal (iTerm2, Windows Terminal)
```bash
leo --version
# Expected: Full color ASCII art with gradients
```

### Test Case 2: Limited Color Terminal
```bash
TERM=xterm leo --version
# Expected: Fallback to 16-color version
```

### Test Case 3: No Color Terminal
```bash
NO_COLOR=1 leo --version
# Expected: Plain ASCII art, no colors
```

### Test Case 4: Narrow Terminal (80 cols)
```bash
# Resize terminal to 80 columns
leo --version
# Expected: Compact version of banner
```

### Test Case 5: Wide Terminal (120+ cols)
```bash
# Resize terminal to 120 columns
leo --version
# Expected: Full-width banner with extra details
```

---

## 💡 Recommended ASCII Art Design

See `PROPOSED_ASCII_BANNER.md` for the new design options.

---

## 📊 Impact Assessment

**User Experience:** ⭐⭐⭐⭐⭐ (High)  
**Technical Complexity:** ⭐⭐⭐ (Medium)  
**Time Estimate:** 2-4 hours  
**Breaking Changes:** None (internal implementation only)

### Benefits:
- ✅ Better brand recognition
- ✅ More professional appearance
- ✅ Increased user engagement
- ✅ Memorable first impression
- ✅ Social media worthy (users will share screenshots)

---

## 🚀 Priority Justification

**Why P2 (Medium)?**
- Not blocking functionality
- Significantly improves UX
- Easy to implement
- High visual impact
- Good for marketing/branding

**Could be P1 if:**
- Planning major marketing push
- Preparing for conference demos
- Aiming for trending on social media

---

## 📝 Related Issues

- #TBD - Add animated welcome banner
- #TBD - Terminal theme detection
- #TBD - Custom banner configuration

---

## 👥 Assignee

**Assigned to:** Leo Pagotto  
**Reviewer:** TBD  
**Due Date:** October 20, 2025

---

## 💬 Comments

### October 18, 2025 - Leo Pagotto
Initial bug report created. The current banner works but doesn't have the "wow" factor we want for v2.0. Users should feel excited when they see the LEO banner for the first time!

Next steps:
1. Create PROPOSED_ASCII_BANNER.md with design options
2. Get community feedback on preferred design
3. Implement the winner
4. Update documentation with new screenshots

---

**Labels:** `enhancement`, `ux`, `design`, `good-first-issue`  
**Milestone:** v2.1.0  
**Status:** 🔴 Open
