export interface UserProfileMenuItem {
  label: string;
  icon?: string;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
}

export interface UserProfileProps {
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  menuItems?: UserProfileMenuItem[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
