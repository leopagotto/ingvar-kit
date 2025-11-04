import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /**
   * Tab items
   */
  items: TabItem[];

  /**
   * Active tab ID
   */
  activeTab?: string;

  /**
   * Default active tab ID
   */
  defaultActiveTab?: string;

  /**
   * Tab change handler
   */
  onChange?: (tabId: string) => void;

  /**
   * Subtle style variant
   * @default false
   */
  subtle?: boolean;

  /**
   * Additional CSS class
   */
  className?: string;
}
