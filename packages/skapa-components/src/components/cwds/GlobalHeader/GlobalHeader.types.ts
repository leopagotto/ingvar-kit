import React from 'react';

export interface GlobalHeaderProps {
  appName: string;
  logo?: React.ReactNode;
  userName?: string;
  userAvatar?: string;
  notifications?: number;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  onLogoClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}
