import React from 'react';

export interface MenuItem {
  label: string;
  onClick?: () => void;
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  divider?: boolean;
}

export interface MenuProps {
  items: MenuItem[];
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}
