import React from 'react';

export interface NavbarProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  position?: 'static' | 'fixed' | 'sticky';
}
