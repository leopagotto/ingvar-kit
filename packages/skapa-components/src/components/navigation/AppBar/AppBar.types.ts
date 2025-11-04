import React from 'react';

export interface AppBarProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  children?: React.ReactNode;
  position?: 'static' | 'fixed' | 'sticky';
}
