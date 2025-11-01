# IKEA Ingka Private Registry Setup Guide

## ⚠️ IMPORTANT UPDATE (v6.4.0)

**CWDS is now available as React/TypeScript templates, NOT npm packages!**

This guide has been updated to reflect the new template-based CWDS system. The previous `@ingka-group-digital/cwds-*` packages **do not exist** - CWDS is a design specification, not an npm package ecosystem.

---

## Overview

**CWDS (Co-worker Design System)** is IKEA's design specification for internal co-worker applications. Starting with Ingvar Kit v6.4.0, CWDS components are provided as **React/TypeScript templates** extracted directly from the official IKEA Figma designs.

**Real IKEA npm Packages:** Only `@ingka/*` UI primitives (button, card, input, avatar, etc.) exist on npm and require registry authentication.

---

## 🎨 What Is CWDS?

CWDS is **not** a set of npm packages. It's a **design pattern** that you implement by:

1. Using the CWDS component templates (Header, Navigation, Profile, etc.)
2. Composing real `@ingka/*` UI primitives inside those templates
3. Following CWDS design tokens (colors, spacing, typography)

**Think of CWDS as:**
- ✅ Design specification (Figma file)
- ✅ Component templates (React/TypeScript code)
- ✅ Design patterns (layout, navigation, auth)
- ❌ NOT npm packages you install

---

## 📦 Installing CWDS Templates

Use the built-in CWDS installer:

```bash
# Install all 5 CWDS components
node lib/components/cwds-installer.js .

# Or during ingvar init, select "CWDS"
ingvar init
> Design System: CWDS (Co-worker Design System)
✅ Yes - Install CWDS components
```

**This installs:**
- `GlobalHeader.tsx` (7.9KB) - Main navigation bar
- `NavigationMenu.tsx` (3.4KB) - Side navigation
- `AppSwitcher.tsx` (4.3KB) - App switching modal
- `Profile.tsx` (6.4KB) - User profile dropdown
- `BottomBarNavigation.tsx` (3.4KB) - Mobile navigation
- Design tokens & documentation

**Location:** `src/components/cwds/`

---

## 🔐 What DOES Require Authentication?

Only the **real `@ingka/*` UI primitives** require authentication:

### Packages that exist and require auth:

```bash
# These are REAL packages on npm
@ingka/button
@ingka/card
@ingka/input
@ingka/avatar
@ingka/modal
@ingka/icon
@ingka/grid
# ... 60+ other UI primitives
```

### Packages that DON'T exist:

```bash
# ❌ These were never real packages
@ingka-group-digital/cwds-react-header
@ingka-group-digital/cwds-react-layout
@ingka-group-digital/cwds-react-app-switcher
@ingka-group-digital/iloff-layout-react
# ... any other @ingka-group-digital/cwds-* packages
```

---

## ✅ Registry Setup for @ingka/* Packages

If you need to use real `@ingka/*` UI primitives in your CWDS templates:

### Step 1: Configure npm Registry

```bash
npm config set @ingka:registry https://npm.m2.blue.cdtapps.com/
```

**Note:** We're using `@ingka`, NOT `@ingka-group-digital`.

### Step 2: Authenticate

```bash
npm login --registry=https://npm.m2.blue.cdtapps.com/ --scope=@ingka
```

This opens SSO authentication in your browser.

### Step 3: Verify

```bash
npm view @ingka/button
# Should show package info, NOT 404
```

---

## 📦 Installing Real @ingka/* Dependencies

After installing CWDS templates, install the required UI primitives:

```bash
# Required dependencies for CWDS templates
npm install @ingka/button @ingka/icon @ingka/avatar @ingka/modal @ingka/card
```

**These are the ONLY packages you need to install from the IKEA registry.**

---

## 🚀 Using CWDS Templates

After installation:

```tsx
// Import from your local components directory
import { GlobalHeader, Profile } from './components/cwds';

function App() {
  return (
    <>
      <GlobalHeader
        appName="Warehouse Management"
        userName="John Doe"
        userRole="Developer"
        notificationCount={3}
      />
      <Profile
        isOpen={true}
        userName="John Doe"
        onSignOut={() => console.log('Sign out')}
      />
    </>
  );
}
```

**The templates use inline styles initially.** You can gradually replace styled divs with real `@ingka/*` components:

```tsx
// Before (template default)
<button onClick={onMenuClick}>Menu</button>

// After (using @ingka/button)
import { Button } from '@ingka/button';
<Button onClick={onMenuClick}>Menu</Button>
```

---

## 🔄 Migration from Old Documentation

If you followed previous versions of this guide:

**Old Way (v6.3.0 and earlier):**
```bash
# ❌ This never worked - packages don't exist
npm install @ingka-group-digital/cwds-react-header
npm install @ingka-group-digital/cwds-react-layout
```

**New Way (v6.4.0+):**
```bash
# ✅ Install templates (not packages)
node lib/components/cwds-installer.js .

# ✅ Then install real @ingka/* primitives
npm install @ingka/button @ingka/icon @ingka/avatar
```

---

## 💡 Key Differences Summary

| Aspect | Old (Incorrect) | New (Correct) |
|--------|----------------|---------------|
| **CWDS Components** | npm packages | React templates |
| **Package Scope** | `@ingka-group-digital/cwds-*` | No packages - templates only |
| **Installation** | `npm install @ingka-group-digital/cwds-*` | `cwds-installer .` |
| **Location** | `node_modules/` | `src/components/cwds/` |
| **Customization** | Limited - locked to package version | Full - edit templates directly |
| **UI Primitives** | Bundled inside CWDS packages | Install separately: `@ingka/*` |
| **Registry** | Private registry required | No registry for templates |
| **Source of Truth** | npm packages (didn't exist) | Figma + local templates |

---

## 🔧 Troubleshooting

### Issue 1: "Package @ingka-group-digital/cwds-* not found"

**Solution:** These packages don't exist. Use the template installer instead:

```bash
node lib/components/cwds-installer.js .
```

### Issue 2: "401 Unauthorized" for @ingka/button

**Solution:** Authenticate with IKEA registry:

```bash
npm login --registry=https://npm.m2.blue.cdtapps.com/ --scope=@ingka
```

### Issue 3: Templates not found

**Solution:** Ensure you're running installer from Ingvar Kit root:

```bash
cd /path/to/ingvar-kit
node lib/components/cwds-installer.js /path/to/your-project
```

---

## 📚 Additional Resources

- **CWDS Templates:** `templates/cwds-components/`
- **Template Documentation:** `templates/cwds-components/README.md`
- **Figma Source:** [Ingka Co-worker Design Components](https://www.figma.com/design/Zec1eGMCNeB0IkPMWs35qx/)
- **Ingka UI Primitives:** https://www.npmjs.com/search?q=%40ingka
- **Extraction Script:** `scripts/extract-cwds-from-figma.js`

---

## ❓ FAQ

**Q: Why don't `@ingka-group-digital/cwds-*` packages exist?**
A: CWDS is a design specification, not a packaged component library. The templates give you more control and customization.

**Q: Can I still use previous Ingvar Kit versions?**
A: Yes, but they reference non-existent packages. Upgrade to v6.4.0+ for the template-based system.

**Q: Do I need IKEA VPN for templates?**
A: No! Templates are included in Ingvar Kit. You only need VPN/auth for `@ingka/*` packages.

**Q: Can I modify the templates?**
A: Yes! That's the whole point. Edit them directly in `src/components/cwds/`.

**Q: What about ILOFF Layout?**
A: ILOFF is a separate system. CWDS templates provide similar functionality without the ILOFF dependency.

---

**Last Updated:** November 1, 2025  
**Ingvar Kit Version:** 6.4.0+  
**CWDS Template System:** v1.0.0

---

## 🔐 Authentication Requirements

**Who needs this:**

- IKEA employees and contractors
- Developers building internal co-worker tools
- Anyone using CWDS components (Header, Layout, Navigation, etc.)

**You do NOT need this for:**

- Public IKEA Ingka Skapa components (customer-facing apps)
- Apps that only use icons and basic components

---

## ✅ Quick Check: Are You Already Authenticated?

Before proceeding, check if you already have access:

```bash
npm config get registry
# Should show: https://npm.m2.blue.cdtapps.com/

npm whoami
# Should show your IKEA username (not an error)
```

If both commands work, **you're already authenticated** ✅ Skip to [Testing Installation](#testing-installation).

---

## 🚀 Setup Instructions

### Step 1: Configure npm Registry

Tell npm to use the IKEA private registry for `@ingka-group-digital` packages:

```bash
npm config set @ingka-group-digital:registry https://npm.m2.blue.cdtapps.com/
```

**Verify configuration:**

```bash
npm config get @ingka-group-digital:registry
# Should output: https://npm.m2.blue.cdtapps.com/
```

---

### Step 2: Authenticate with SSO

IKEA uses **Single Sign-On (SSO)** for registry access. Authentication happens automatically when you try to install a package.

**Option A: Authenticate via npm login (Recommended)**

```bash
npm login --registry=https://npm.m2.blue.cdtapps.com/ --scope=@ingka-group-digital
```

This will:

1. Open your browser for SSO authentication
2. Prompt you to log in with your IKEA credentials
3. Store authentication token in `~/.npmrc`

**Option B: Authenticate during package installation**

When you run `ingvar init` and select CWDS components, the first package installation will trigger SSO authentication automatically.

---

### Step 3: Verify Access

Test that you can access the registry:

```bash
npm view @ingka-group-digital/cwds-react-header
```

**Expected output:**

```
@ingka-group-digital/cwds-react-header@x.x.x | Proprietary | deps: X | versions: X
IKEA Co-worker Design System - Header component
...
```

**If you see "404 Not Found"** → Authentication failed, proceed to [Troubleshooting](#troubleshooting).

---

## 📦 Testing Installation

Create a test project to verify everything works:

```bash
# Create test directory
mkdir test-cwds && cd test-cwds

# Initialize project
npm init -y

# Try installing a CWDS package
npm install @ingka-group-digital/cwds-react-header
```

**Success looks like:**

```
added 1 package, and audited 2 packages in 3s
```

**Failure looks like:**

```
npm ERR! 401 Unauthorized
npm ERR! code E401
npm ERR! Unable to authenticate
```

→ See [Troubleshooting](#troubleshooting) below.

---

## 🔧 Troubleshooting

### Issue 1: "401 Unauthorized" or "403 Forbidden"

**Cause:** Not authenticated or token expired.

**Solution:**

```bash
# Clear existing auth token
npm logout --registry=https://npm.m2.blue.cdtapps.com/

# Re-authenticate
npm login --registry=https://npm.m2.blue.cdtapps.com/ --scope=@ingka-group-digital
```

---

### Issue 2: "404 Not Found"

**Cause:** Registry configuration missing or incorrect.

**Solution:**

```bash
# Check current config
npm config list

# Re-configure registry
npm config set @ingka-group-digital:registry https://npm.m2.blue.cdtapps.com/

# Verify
npm config get @ingka-group-digital:registry
```

---

### Issue 3: "Network Error" or "Connection Timeout"

**Cause:** Not connected to IKEA VPN or corporate network.

**Solution:**

1. Connect to IKEA VPN if working remotely
2. Verify you can access `https://npm.m2.blue.cdtapps.com/` in your browser
3. Check firewall settings

---

### Issue 4: SSO Window Doesn't Open

**Cause:** Browser not configured correctly.

**Solution:**

```bash
# Manually open SSO authentication URL
open https://npm.m2.blue.cdtapps.com/-/v1/login

# Copy the token from the browser and add to ~/.npmrc manually
```

Add this line to `~/.npmrc`:

```
//npm.m2.blue.cdtapps.com/:_authToken=YOUR_TOKEN_HERE
```

---

### Issue 5: "You do not have permission"

**Cause:** Your IKEA account doesn't have registry access.

**Solution:**

1. Contact your IKEA manager or team lead
2. Request access to "CWDS npm registry"
3. Provide your IKEA email address
4. Wait for access approval (usually 24-48 hours)

---

## 🏢 Working Offline or Without IKEA Access

If you're working on a demo or prototype without IKEA registry access:

**Option 1: Use Ingka Skapa (Public) Instead**

```bash
# During ingvar init, select "Ingka Skapa" instead of "CWDS"
ingvar init
> Design System: Ingka Skapa
```

**Option 2: Mock Components**
For demos/testing, you can create mock implementations:

```jsx
// Mock Header component
export const Header = ({ children }) => (
  <header className="bg-blue-900 text-white p-4">{children}</header>
);
```

**Option 3: Request Temporary Access**
Contact IKEA's Developer Portal team for temporary guest access.

---

## 📦 Available CWDS Packages

Once authenticated, you can install these packages:

| Package                                             | Description      | Used For                   |
| --------------------------------------------------- | ---------------- | -------------------------- |
| `@ingka-group-digital/cwds-react-header`            | Header component | App navigation bar         |
| `@ingka-group-digital/cwds-react-layout`            | Layout container | Page structure             |
| `@ingka-group-digital/cwds-react-app-switcher`      | App switcher     | Switch between IKEA tools  |
| `@ingka-group-digital/cwds-react-nav-menu`          | Navigation menu  | Sidebar navigation         |
| `@ingka-group-digital/cwds-react-user-profile`      | User profile     | User info display          |
| `@ingka-group-digital/iloff-layout-react`           | ILOFF Layout     | Enterprise layout system   |
| `@ingka-group-digital/cwds-react-mobile-navigation` | Mobile nav       | Mobile-friendly navigation |

---

## 🔄 Using with Ingvar Kit

When you run `ingvar init`, the workflow is:

1. **Select Design System:** Choose "CWDS (Co-worker Design System)"
2. **Authentication Check:** Ingvar checks if you're authenticated
3. **Auto-Install:** If authenticated, packages install automatically
4. **Error Handling:** If not authenticated, you'll see clear instructions

**Example:**

```bash
ingvar init

? Select design system: CWDS (Co-worker Design System)
? Select components: Header, Layout, Navigation

✅ Checking registry authentication...
✅ Authenticated as: john.doe@ingka.com
📦 Installing @ingka-group-digital/cwds-react-header...
📦 Installing @ingka-group-digital/cwds-react-layout...
✅ All packages installed successfully!
```

**If authentication fails:**

```bash
⚠️  Registry authentication required!

Please authenticate with IKEA SSO:
  npm login --registry=https://npm.m2.blue.cdtapps.com/ --scope=@ingka-group-digital

Then re-run: ingvar init
```

---

## 💡 Pro Tips

1. **Store credentials securely:** Use npm's built-in auth token storage (don't commit `.npmrc` to git)
2. **CI/CD pipelines:** Use npm auth tokens as environment variables
3. **Team onboarding:** Share this guide with new developers
4. **Token expiration:** Tokens expire after 90 days, re-authenticate when needed
5. **VPN required:** Always connect to IKEA VPN when working remotely

---

## 📚 Additional Resources

- **IKEA Developer Portal:** [Internal IKEA link]
- **CWDS Documentation:** [Internal IKEA link]
- **Support:** Contact CWDS team in Microsoft Teams
- **Registry Status:** https://npm.m2.blue.cdtapps.com/

---

## ❓ FAQ

**Q: Do I need to authenticate every time?**
A: No, authentication tokens are stored in `~/.npmrc` and last ~90 days.

**Q: Can I use these components in public projects?**
A: No, CWDS components are for internal IKEA tools only. Use Ingka Skapa for public projects.

**Q: What if I leave IKEA?**
A: Your registry access will be automatically revoked when your IKEA account is deactivated.

**Q: Can I share my auth token with teammates?**
A: No, each developer needs their own authentication. Sharing tokens violates security policies.

**Q: Does this work on Windows/Mac/Linux?**
A: Yes, npm authentication works the same on all platforms.

---

## 🆘 Still Having Issues?

If you're still experiencing problems after trying the troubleshooting steps:

1. **Check NPM logs:**

   ```bash
   npm install @ingka-group-digital/cwds-react-header --loglevel verbose
   ```

2. **Verify network connectivity:**

   ```bash
   curl -I https://npm.m2.blue.cdtapps.com/
   ```

3. **Contact support:**
   - IKEA Internal: Microsoft Teams → "CWDS Support" channel
   - Email: [IKEA support email]
   - Include error logs and npm version (`npm --version`)

---

**Last Updated:** November 1, 2025
**Ingvar Kit Version:** 6.2.0+
