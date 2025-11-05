export interface BottomNavItem {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  activeIndex?: number;
  className?: string;
}
