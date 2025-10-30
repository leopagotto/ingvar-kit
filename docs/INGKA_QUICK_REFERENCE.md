# 🇸🇪 Ingka Quick Reference

## Generate Apps with Official IKEA Components

```bash
# With Ingka (Official IKEA)
ingvar spark --prompt "todo app" --name my-todo --style ingka

# Auto-detect from prompt
ingvar spark --prompt "create a dashboard with Ingka components"

# Natural language
ingvar spark --prompt "build me an app for tracking expenses"
```

## Style Options

| Style     | Description                   | Use Case                                |
| --------- | ----------------------------- | --------------------------------------- |
| `ingka`   | **Official IKEA** Ingka Skapa | Production apps, internal IKEA projects |
| `ikea`    | Custom IKEA-inspired          | Fallback, no registry access            |
| `default` | Standard shadcn/ui            | Non-IKEA projects                       |

## Most Used Components

```tsx
// Buttons
import { Button } from "@ingka/button";
<Button variant="primary">Click</Button>;

// Forms
import { InputField } from "@ingka/input-field";
<InputField label="Email" type="email" />;

// Layout
import { Card } from "@ingka/card";
import { Grid } from "@ingka/grid";

<Grid cols={3} gap="md">
  <Card>Content</Card>
</Grid>;

// Typography
import { Text } from "@ingka/text";
<Text variant="heading1">Title</Text>;

// Design Tokens
import { colors } from "@ingka/colours";
import { tokens } from "@ingka/design-tokens";
```

## Install Packages Manually

```bash
# Registry setup (one-time)
npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"

# Core packages
npm i @ingka/design-tokens @ingka/colours @ingka/button @ingka/card

# All packages (copy from INGKA_DESIGN_SYSTEM.md)
```

## Troubleshooting

| Issue              | Solution                       |
| ------------------ | ------------------------------ |
| Module not found   | `npm install @ingka/<package>` |
| 404 from registry  | Check VPN, contact IT support  |
| AI not using Ingka | Add `--style ingka` flag       |

## Documentation

- **Full Guide:** `docs/guides/INGKA_DESIGN_SYSTEM.md`
- **Integration Docs:** `docs/development/INGKA_INTEGRATION_COMPLETE.md`
- **Registry:** `https://npm.m2.blue.cdtapps.com`
