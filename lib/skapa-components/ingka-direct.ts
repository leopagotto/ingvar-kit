/**
 * @ingvar-kit/skapa-components
 *
 * Direct exports of official Skapa (@ingka) components
 * This file re-exports all installed @ingka packages using their official names
 * for maximum compatibility with the Skapa design system.
 */

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================

export { default as Accordion } from '@ingka/accordion';
export { default as Avatar } from '@ingka/avatar';
export { default as Card } from '@ingka/card';
export { default as CompactCard } from '@ingka/compact-card';
export { default as Image } from '@ingka/image';
export { default as List } from '@ingka/list';
export { default as MemberCard } from '@ingka/member-card';
export { default as Rating } from '@ingka/rating';
export { default as ShoppableImage } from '@ingka/shoppable-image';
export { default as SimpleVideo } from '@ingka/simple-video';
export { default as Table } from '@ingka/table';
export { default as Tabs } from '@ingka/tabs';
export { default as Teaser } from '@ingka/teaser';
export { default as Text } from '@ingka/text';
export { default as TextOverlayCard } from '@ingka/text-overlay-card';
// export { default as ThumbnailGrid } from '@ingka/thumbnail-grid'; // Missing TypeScript types

// Typography
// export { default as Typography } from '@ingka/typography'; // Missing TypeScript types

// ============================================================================
// PRODUCT RANGE COMPONENTS
// ============================================================================

export { default as Price } from '@ingka/price';
export { default as PriceModule } from '@ingka/price-module';
export { default as ProductIdentifier } from '@ingka/product-identifier';

// ============================================================================
// NAVIGATION COMPONENTS
// ============================================================================

export { default as Hyperlink } from '@ingka/hyperlink';
export { default as Tag } from '@ingka/tag';
export { default as Breadcrumb } from '@ingka/breadcrumb';

// ============================================================================
// ACTION COMPONENTS
// ============================================================================

export { default as Button } from '@ingka/button';
export { default as DualButton } from '@ingka/dual-button';
export { default as JumboButton } from '@ingka/jumbo-button';
export { default as Pill } from '@ingka/pill';

// ============================================================================
// INPUT & CONTROL COMPONENTS
// ============================================================================

export { default as Checkbox } from '@ingka/checkbox';
export { default as Choice } from '@ingka/choice';
export { default as Combobox } from '@ingka/combobox';
export { default as InputField } from '@ingka/input-field';
export { default as QuantityStepper } from '@ingka/quantity-stepper';
export { default as RadioButton } from '@ingka/radio-button';
export { default as Search } from '@ingka/search';
export { default as SegmentedControl } from '@ingka/segmented-control';
export { default as Select } from '@ingka/select';
export { default as Slider } from '@ingka/slider';
export { default as Switch } from '@ingka/switch';
export { default as TextArea } from '@ingka/text-area';
export { default as Toggle } from '@ingka/toggle';
// export { default as FileUpload } from '@ingka/file-upload'; // Missing TypeScript types

// ============================================================================
// INDICATOR COMPONENTS
// ============================================================================

export { default as Badge } from '@ingka/badge';
export { default as Loading } from '@ingka/loading';
export { default as ProgressIndicator } from '@ingka/progress-indicator';
export { default as Skeleton } from '@ingka/skeleton';
export { default as Status } from '@ingka/status';

// ============================================================================
// MESSAGE COMPONENTS
// ============================================================================

export { default as Banner } from '@ingka/banner';
export { default as HelperText } from '@ingka/helper-text';
export { default as InlineMessage } from '@ingka/inline-message';
export { default as Toast } from '@ingka/toast';
export { default as Modal } from '@ingka/modal';

// ============================================================================
// CONTAINER & OVERFLOW COMPONENTS
// ============================================================================

export { default as AspectRatioBox } from '@ingka/aspect-ratio-box';
export { default as Carousel } from '@ingka/carousel';
export { default as EndorsementLabel } from '@ingka/endorsement-label';
export { default as Expander } from '@ingka/expander';
export { default as ListBox } from '@ingka/list-box';
export { default as ListView } from '@ingka/list-view';
export { default as PaymentLogo } from '@ingka/payment-logo';
export { default as SkipContent } from '@ingka/skip-content';
export { default as Tooltip } from '@ingka/tooltip';

// ============================================================================
// FOUNDATION
// ============================================================================

// export { default as Grid } from '@ingka/grid'; // CSS-only package, no TS exports
export { default as Icon } from '@ingka/ssr-icon';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Re-export types for TypeScript users
export type { AccordionProps } from '@ingka/accordion';
export type { CheckboxProps } from '@ingka/checkbox';
export type { RadioButtonProps } from '@ingka/radio-button';
export type { SelectProps } from '@ingka/select';
export type { SliderProps } from '@ingka/slider';
export type { SwitchProps } from '@ingka/switch';
export type { TabsProps } from '@ingka/tabs';
export type { ToastProps } from '@ingka/toast';
export type { BannerProps } from '@ingka/banner';
export type { ModalProps } from '@ingka/modal';
export type { TooltipProps } from '@ingka/tooltip';
export type { ButtonProps } from '@ingka/button';

// ... add more type exports as needed
