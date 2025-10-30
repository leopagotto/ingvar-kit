/**
 * IKEA Ingka Skapa Component Library
 *
 * Complete set of React components built with the official IKEA design system.
 * All components follow WCAG 2.1 AA accessibility standards and use official
 * IKEA design tokens for consistent styling.
 *
 * @see https://npm.m2.blue.cdtapps.com (IKEA Ingka Skapa registry)
 */

// Components
export { Button } from './Button/Button';
export type { ButtonProps } from './Button/Button';

export { Card } from './Card/Card';
export type { CardProps } from './Card/Card';

export { Input } from './Input/Input';
export type { InputProps } from './Input/Input';

// Re-export all Button types
export type { ButtonVariant, ButtonSize, ButtonState } from './Button/Button.types';

/**
 * Component Categories
 */

// Layout & Structure
export const LayoutComponents = {
  // Grid, AspectRatio, Divider will be added here
};

// Buttons & Actions
export const ButtonComponents = {
  Button,
};

// Form Controls
export const FormComponents = {
  Input,
  // Checkbox, RadioButton, Select, Switch will be added here
};

// Display & Content
export const DisplayComponents = {
  Card,
  // Text, Image, Badge will be added here
};

// Feedback & Status
export const FeedbackComponents = {
  // Toast, Banner, Loading, Progress will be added here
};

// Modals & Overlays
export const OverlayComponents = {
  // Modal, Tooltip will be added here
};

/**
 * Design System Exports
 *
 * These should be imported from the actual @ingka packages
 * in your project after setting up the registry.
 */

// Example usage - uncomment when @ingka packages are available:
// export { colors } from '@ingka/colours';
// export { tokens } from '@ingka/design-tokens';
// export { typography } from '@ingka/typography';

/**
 * Component Installation Guide
 *
 * 1. Set up IKEA Ingka Skapa registry:
 *    npm set --location project @ingka:registry="https://npm.m2.blue.cdtapps.com"
 *
 * 2. Install required design system packages:
 *    npm install @ingka/design-tokens @ingka/colours @ingka/typography
 *
 * 3. Install component packages as needed:
 *    npm install @ingka/button @ingka/card @ingka/input-field
 *
 * 4. Copy component templates from this directory to your project:
 *    cp -r templates/ingka-components/Button src/components/ui/
 *
 * 5. Import and use:
 *    import { Button } from './components/ui/Button/Button';
 */

/**
 * Documentation Links
 */
export const ComponentDocs = {
  button: './Button/README.md',
  card: './Card/README.md',
  input: './Input/README.md',
  designSystem: '../../docs/guides/INGKA_DESIGN_SYSTEM.md',
  componentPDFs: '../../docs/guides/Skapa-components/',
  foundationPDFs: '../../docs/guides/Skapa-foundations/',
};

/**
 * Development Status
 *
 * ✅ Ready: Button, Card, Input
 * 🚧 In Development: Checkbox, Select, Modal
 * 📋 Planned: Badge, Tooltip, Progress, Table
 */
