import React from 'react';

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  id: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}
