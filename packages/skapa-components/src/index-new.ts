/**
 * @ingvar-kit/skapa-components
 *
 * Complete Skapa Design System implementation
 * Combines our custom wrappers with direct @ingka package exports
 */

// ============================================================================
// DIRECT @INGKA EXPORTS (Official Skapa Components)
// Use these for maximum compatibility with official Skapa design system
// ============================================================================

// LAYOUT
export {
  Accordion,
  Avatar,
  Card,
  // CompactCard, // Not installed
  Image,
  List,
  // MemberCard, // Not installed
  Rating,
  // ShoppableImage, // Not installed
  // SimpleVideo, // Not installed
  Table,
  Tabs as IngkaTabs, // Rename to avoid conflict
  Teaser,
  Text,
  // TextOverlayCard, // Not installed
  // ThumbnailGrid, // Not installed
  // Typography, // Not installed
} from './ingka-direct';

// PRODUCT RANGE
export {
  Price,
  // PriceModule, // Not installed
  // ProductIdentifier, // Not installed
} from './ingka-direct';

// NAVIGATION (Direct @ingka)
export {
  Hyperlink as IngkaHyperlink,
  Tag,
  Breadcrumb,
} from './ingka-direct';

// ACTIONS (Direct @ingka)
export {
  Button as IngkaButton,
  DualButton as IngkaDualButton,
  JumboButton as IngkaJumboButton,
  Pill as IngkaPill,
} from './ingka-direct';

// INPUTS (Direct @ingka)
export {
  Checkbox as IngkaCheckbox,
  // Choice, // Not installed
  // Combobox, // Not installed
  InputField,
  QuantityStepper,
  RadioButton,
  Search,
  SegmentedControl as IngkaSegmentedControl,
  Select as IngkaSelect,
  Slider as IngkaSlider,
  Switch,
  TextArea as IngkaTextArea,
  Toggle as IngkaToggle, // Button group toggle
  // FileUpload as IngkaFileUpload, // Has type issues
} from './ingka-direct';

// INDICATORS (Direct @ingka)
export {
  Badge as IngkaBadge,
  Loading as IngkaLoading,
  ProgressIndicator,
  Skeleton as IngkaSkeleton,
  Status,
} from './ingka-direct';

// MESSAGES (Direct @ingka)
export {
  Banner as IngkaBanner,
  HelperText,
  InlineMessage,
  Toast as IngkaToast,
  Modal as IngkaModal,
} from './ingka-direct';

// CONTAINERS (Direct @ingka)
export {
  // AspectRatioBox, // Not installed
  Carousel,
  // EndorsementLabel, // Not installed
  Expander,
  // ListBox, // Not installed
  // ListView, // Not installed
  // PaymentLogo, // Not installed
  // SkipContent, // Not installed
  Tooltip as IngkaTooltip,
} from './ingka-direct';

// FOUNDATION (Direct @ingka)
export {
  // Grid, // Not installed or missing types
  Icon,
} from './ingka-direct';

// ============================================================================
// CUSTOM WRAPPED COMPONENTS
// Our thin wrappers around @ingka components for simplified APIs
// ============================================================================

// Actions
export { Button } from './components/actions/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/actions/Button';

export { IconButton } from './components/actions/IconButton';
export type { IconButtonProps, IconButtonVariant, IconButtonSize } from './components/actions/IconButton';

export { Pill } from './components/actions/Pill';
export type { PillProps, PillVariant, PillSize } from './components/actions/Pill';

export { Hyperlink } from './components/actions/Hyperlink';
export type { HyperlinkProps, HyperlinkVariant } from './components/actions/Hyperlink';

export { DualButton } from './components/actions/DualButton';
export type { DualButtonProps, DualButtonVariant, DualButtonSize } from './components/actions/DualButton';

export { JumboButton } from './components/actions/JumboButton';
export type { JumboButtonProps, JumboButtonVariant } from './components/actions/JumboButton';

export { FAB } from './components/actions/FAB';
export type { FABProps, FABSize, FABPosition } from './components/actions/FAB';

export { SplitButton } from './components/actions/SplitButton';
export type { SplitButtonProps, SplitButtonOption, SplitButtonSize, SplitButtonVariant } from './components/actions/SplitButton';

// Inputs
export { TextField } from './components/inputs/TextField';
export type { TextFieldProps, TextFieldSize, TextFieldVariant } from './components/inputs/TextField';

export { TextArea } from './components/inputs/TextArea';
export type { TextAreaProps, TextAreaSize, TextAreaVariant, TextAreaResize } from './components/inputs/TextArea';

export { Checkbox } from './components/inputs/Checkbox';
export type { CheckboxProps, CheckboxSize } from './components/inputs/Checkbox';

export { Radio } from './components/inputs/Radio';
export type { RadioProps, RadioSize } from './components/inputs/Radio';

export { Toggle } from './components/inputs/Toggle';
export type { ToggleProps, ToggleSize } from './components/inputs/Toggle';

export { Select } from './components/inputs/Select';
export type { SelectProps, SelectOption, SelectSize, SelectVariant } from './components/inputs/Select';

export { Slider } from './components/inputs/Slider';
export type { SliderProps, SliderSize } from './components/inputs/Slider';

export { NumberField } from './components/inputs/NumberField';
export type { NumberFieldProps, NumberFieldSize } from './components/inputs/NumberField';

export { SearchField } from './components/inputs/SearchField';
export type { SearchFieldProps, SearchFieldSize } from './components/inputs/SearchField';

export { DatePicker } from './components/inputs/DatePicker';
export type { DatePickerProps, DatePickerSize, DatePickerVariant } from './components/inputs/DatePicker';

export { FileUpload } from './components/inputs/FileUpload';
export type { FileUploadProps, FileUploadSize } from './components/inputs/FileUpload';

export { ColorPicker } from './components/inputs/ColorPicker';
export type { ColorPickerProps, ColorPickerSize } from './components/inputs/ColorPicker';

// Display
export { Card as SkapaCard } from './components/display/Card';
export type { CardProps as SkapaCardProps, CardVariant } from './components/display/Card';

export { Badge } from './components/display/Badge';
export type { BadgeProps, BadgeVariant, BadgeSize } from './components/display/Badge';

export { Avatar as SkapaAvatar } from './components/display/Avatar';
export type { AvatarProps as SkapaAvatarProps, AvatarSize, AvatarVariant } from './components/display/Avatar';

export { Image as SkapaImage } from './components/display/Image';
export type { ImageProps as SkapaImageProps } from './components/display/Image';

export { Skeleton } from './components/display/Skeleton';
export type { SkeletonProps, SkeletonVariant } from './components/display/Skeleton';

export { Tooltip } from './components/display/Tooltip';
export type { TooltipProps, TooltipPlacement } from './components/display/Tooltip';

export { Loading } from './components/display/Loading';
export type { LoadingProps, LoadingSize } from './components/display/Loading';

export { Divider } from './components/display/Divider';
export type { DividerProps, DividerOrientation, DividerVariant } from './components/display/Divider';

export { Spinner } from './components/display/Spinner';
export type { SpinnerProps, SpinnerSize } from './components/display/Spinner';

// Feedback
export { Toast } from './components/feedback/Toast';
export type { ToastProps } from './components/feedback/Toast';

export { Banner } from './components/feedback/Banner';
export type { BannerProps, BannerVariant } from './components/feedback/Banner';

export { Modal } from './components/feedback/Modal';
export type { ModalProps } from './components/feedback/Modal';

export { Alert } from './components/feedback/Alert';
export type { AlertProps, AlertVariant, AlertSize } from './components/feedback/Alert';

export { ProgressBar } from './components/feedback/ProgressBar';
export type { ProgressBarProps, ProgressBarVariant, ProgressBarSize } from './components/feedback/ProgressBar';

export { Snackbar } from './components/feedback/Snackbar';
export type { SnackbarProps, SnackbarPosition } from './components/feedback/Snackbar';

export { Dialog } from './components/feedback/Dialog';
export type { DialogProps, DialogSize } from './components/feedback/Dialog';

// Navigation (Our custom wrappers)
export { Tabs } from './components/navigation/Tabs';
export type { TabsProps, TabItem } from './components/navigation/Tabs';

export { Breadcrumbs } from './components/navigation/Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './components/navigation/Breadcrumbs';

export { Pagination } from './components/navigation/Pagination';
export type { PaginationProps } from './components/navigation/Pagination';

export { Header } from './components/navigation/Header';
export type { HeaderProps } from './components/navigation/Header';

export { Footer } from './components/navigation/Footer';
export type { FooterProps } from './components/navigation/Footer';

export { Menu } from './components/navigation/Menu';
export type { MenuProps, MenuItem } from './components/navigation/Menu';

export { Navbar } from './components/navigation/Navbar';
export type { NavbarProps } from './components/navigation/Navbar';

export { Stepper } from './components/navigation/Stepper';
export type { StepperProps, Step } from './components/navigation/Stepper';

export { Sidebar } from './components/navigation/Sidebar';
export type { SidebarProps } from './components/navigation/Sidebar';

export { Drawer } from './components/navigation/Drawer';
export type { DrawerProps } from './components/navigation/Drawer';

export { BottomNav } from './components/navigation/BottomNav';
export type { BottomNavProps, BottomNavItem } from './components/navigation/BottomNav';

export { AppBar } from './components/navigation/AppBar';
export type { AppBarProps } from './components/navigation/AppBar';

export { SegmentedControl } from './components/navigation/SegmentedControl';
export type { SegmentedControlProps, SegmentOption } from './components/navigation/SegmentedControl';

export { Accordion as SkapaAccordion } from './components/navigation/Accordion';
export type { AccordionProps as SkapaAccordionProps, AccordionItem } from './components/navigation/Accordion';

// CWDS Components
export { GlobalHeader } from './components/cwds/GlobalHeader';
export type { GlobalHeaderProps } from './components/cwds/GlobalHeader';

export { SearchBar } from './components/cwds/SearchBar';
export type { SearchBarProps } from './components/cwds/SearchBar';

export { UserProfile } from './components/cwds/UserProfile';
export type { UserProfileProps, UserProfileMenuItem } from './components/cwds/UserProfile';

export { Cart } from './components/cwds/Cart';
export type { CartProps, CartItem } from './components/cwds/Cart';

export { ProductCard } from './components/cwds/ProductCard';
export type { ProductCardProps } from './components/cwds/ProductCard';

export { CategoryNav } from './components/cwds/CategoryNav';
export type { CategoryNavProps, Category } from './components/cwds/CategoryNav';

// Styles
import './styles/tokens.css';
