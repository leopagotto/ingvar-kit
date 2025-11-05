# ⚠️ DEPRECATED: ingvar-skapa-components

**This package has been deprecated as of November 5, 2025.**

## 🎉 Components Are Now Bundled!

Skapa components are now bundled directly with `ingvar-kit@6.7.1+`. No separate package installation needed!

---

## Migration Guide

### Old Installation (v6.6.x and earlier)

```bash
npm install ingvar-kit
npm install ingvar-skapa-components
```

```javascript
import { Button } from "ingvar-skapa-components";
import { Card } from "ingvar-skapa-components/ingka-direct";
```

### New Installation (v6.7.1+)

```bash
npm install ingvar-kit react react-dom
```

```javascript
// Option 1: Simplified wrappers
import { Button, TextField } from "ingvar-kit/skapa";

// Option 2: Direct @ingka exports (Recommended)
import { Button, Card } from "ingvar-kit/skapa/ingka-direct";
```

---

## Why the Change?

**Benefits of bundled approach:**

- ✅ **Simpler Installation** - One package instead of two
- ✅ **No Confusion** - All 64 components included by default
- ✅ **Easier Maintenance** - Single source of truth
- ✅ **Same Quality** - Tree-shakeable ES modules, 97% TypeScript coverage
- ✅ **Unified Versioning** - No separate package versioning

---

## What Happened to This Directory?

This `packages/skapa-components/` directory remains in the repository for:

1. **Historical Reference** - Original source code and build configuration
2. **Development** - Local testing and component development
3. **Documentation** - Architecture docs and component mappings

**The components are now copied to `lib/skapa-components/` during the build process and published as part of the main `ingvar-kit` package.**

---

## Need Help?

- **Main README**: [README.md](../../README.md)
- **Migration Guide**: [CHANGELOG.md](../../CHANGELOG.md#670)
- **Component List**: [lib/skapa-components/COMPONENT_STATUS.md](../../lib/skapa-components/COMPONENT_STATUS.md)
- **Issues**: [GitHub Issues](https://github.com/leopagotto/ingvar-kit/issues)

---

**Last Updated:** November 5, 2025
**Deprecated Version:** ingvar-skapa-components@0.1.0
**Replacement:** ingvar-kit@6.7.1+ (bundled components)
