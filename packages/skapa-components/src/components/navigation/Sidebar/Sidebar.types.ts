import React from 'react';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  width?: string;
  position?: 'left' | 'right';
  collapsed?: boolean;
}
