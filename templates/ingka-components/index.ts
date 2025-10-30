/**
 * IKEA Ingka Skapa Component Library
 *
 * Complete set of React components built with the official IKEA design system.
 * All components follow WCAG 2.1 AA accessibility standards and use official
 * IKEA design tokens for consistent styling.
 *
 * @see https://npm.m2.blue.cdtapps.com (IKEA Ingka Skapa registry)
 */

// === BUTTON COMPONENTS ===
export { Button } from './Button/Button';
export type { ButtonProps, ButtonVariant, ButtonSize, ButtonState } from './Button/Button';

// === CARD COMPONENTS ===
export { Card } from './Card/Card';
export type { CardProps } from './Card/Card';

// === FORM COMPONENTS ===
export { Input } from './Input/Input';
export type { InputProps } from './Input/Input';

export { TextArea } from './TextArea';
export type { TextAreaProps } from './TextArea';

export { Checkbox, CheckboxGroup } from './Checkbox';
export type { CheckboxProps, CheckboxGroupProps } from './Checkbox';

export { RadioButton, RadioButtonGroup } from './RadioButton';
export type { RadioButtonProps, RadioButtonGroupProps } from './RadioButton';

export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Switch } from './Switch';
export type { SwitchProps } from './Switch';

export { Slider } from './Slider';
export type { SliderProps } from './Slider';

export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';

export { Search } from './Search';
export type { SearchProps } from './Search';

export { Combobox } from './Combobox';
export type { ComboboxProps, ComboboxOption } from './Combobox';

// === FEEDBACK COMPONENTS ===
export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Banner } from './Banner';
export type { BannerProps } from './Banner';

export { Toast } from './Toast';
export type { ToastProps } from './Toast';

export { Loading } from './Loading';
export type { LoadingProps } from './Loading';

export { ProgressIndicator } from './ProgressIndicator';
export type { ProgressIndicatorProps } from './ProgressIndicator';

export { Status } from './Status';
export type { StatusProps } from './Status';

// === LAYOUT COMPONENTS ===
export { Divider } from './Divider';
export type { DividerProps } from './Divider';

export { Accordion } from './Accordion';
export type { AccordionProps } from './Accordion';

export { Grid } from './Grid';
export type { GridProps } from './Grid';

export { AspectRatioBox } from './AspectRatioBox';
export type { AspectRatioBoxProps } from './AspectRatioBox';

// === NAVIGATION COMPONENTS ===
export { Tabs } from './Tabs';
export type { TabsProps, Tab } from './Tabs';

// === OVERLAY COMPONENTS ===
export { Modal } from './Modal';
export type { ModalProps } from './Modal';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

// === DISPLAY COMPONENTS ===
export { Avatar } from './Avatar';
export type { AvatarProps } from './Avatar';

export { Icon, IconNames } from './Icon';
export type { IconProps, IconName } from './Icon';

export { Text } from './Text';
export type { TextProps } from './Text';

export { Image } from './Image';
export type { ImageProps } from './Image';

export { List, ListItem } from './List';
export type { ListProps, ListItemProps } from './List';

export { Table } from './Table';
export type { TableProps, TableColumn } from './Table';

// === NAVIGATION COMPONENTS ===
export { Hyperlink } from './Hyperlink';
export type { HyperlinkProps } from './Hyperlink';

// === BUTTON VARIANTS ===
export { IconButton } from './IconButton';
export type { IconButtonProps } from './IconButton';

export { Pill } from './Pill';
export type { PillProps } from './Pill';

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
 * ✅ Production Ready (34 components):
 *    - Buttons (3): Button, IconButton, Pill
 *    - Display (7): Card, Avatar, Icon, Text, Image, List, Table
 *    - Forms (10): Input, TextArea, Checkbox, RadioButton, Select, Combobox, Switch, Slider, QuantityStepper, Search
 *    - Feedback (6): Badge, Banner, Toast, Loading, ProgressIndicator, Status
 *    - Layout (4): Divider, Accordion, Grid, AspectRatioBox
 *    - Navigation (2): Tabs, Hyperlink
 *    - Overlays (2): Modal, Tooltip
 *
 * 📋 Planned for future releases:
 *    - Price, Tag, Rating
 *    - Carousel, Video
 *    - Breadcrumbs, Stepper
 */
